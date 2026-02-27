import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { and, eq, isNull } from "drizzle-orm";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
import * as schema from "../db/schema.js";
import { checkinSchema } from "../api.js";

export default function checkinRoute(db: LibSQLDatabase<typeof schema>) {
    const router = new Hono();

    router.post("/checkin", zValidator("json", checkinSchema), async (c) => {
        const { itemId } = c.req.valid("json");

        //  find active transaction
        const [tx] = await db
            .select()
            .from(schema.transactions)
            .where(
                and(
                    eq(schema.transactions.item_id, itemId),
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
                    eq(schema.transactions.item_id, tx.item_id!),
                    eq(schema.transactions.timestamp_id, tx.timestamp_id!)
                )
            );

        return c.json({
            status: "success",
            checkinTimestamp: now,
        });
    });

    return router;
}
