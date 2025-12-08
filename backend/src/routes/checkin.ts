import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { and, eq, isNull } from "drizzle-orm";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
import * as schema from "../db/schema.js";
import { checkinSchema } from "../api.js";

export default function checkinRoute(
    db: LibSQLDatabase<typeof schema>
) {
    const router = new Hono();

    router.post(
        "/checkin",
        zValidator("json", checkinSchema),
        async (c) => {
            const { rfid, item } = c.req.valid("json");

            //  find user by RFID (TEXT)
            const [user] = await db
                .select()
                .from(schema.users_table)
                .where(eq(schema.users_table.rfid, rfid));

            if (!user) {
                return c.json({ error: "User not found" }, 404);
            }

            //  find item by name
            const [itemRow] = await db
                .select()
                .from(schema.items_table)
                .where(eq(schema.items_table.name, item));

            if (!itemRow) {
                return c.json({ error: "Item not found" }, 404);
            }

            //  find active transaction
            const [tx] = await db
                .select()
                .from(schema.transactions)
                .where(
                    and(
                        eq(schema.transactions.user_id, user.id),
                        eq(schema.transactions.item_id, itemRow.id),
                        isNull(schema.transactions.checkin)
                    )
                );

            if (!tx) {
                return c.json({ error: "No active checkout found" }, 400);
            }

            //  check in
            const now = new Date().toISOString();

            await db
                .update(schema.transactions)
                .set({ checkin: now })
                .where(
                    and(
                        eq(schema.transactions.user_id, tx.user_id),
                        eq(schema.transactions.item_id, tx.item_id),
                        eq(schema.transactions.timestamp_id, tx.timestamp_id)
                    )
                );

            return c.json({
                status: "success",
                checkinTimestamp: now,
            });
        }
    );

    return router;
}
