import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import {
    users_table,
    items_table,
    timestamp,
    transactions,
} from "../db/schema.js";
import { eq } from "drizzle-orm";

import * as Schema from "../db/schema.js";
import type { LibSQLDatabase } from "drizzle-orm/libsql";

function checkoutRoute(db: LibSQLDatabase<typeof Schema>) {
    const checkoutRoute = new Hono();

    // Zod validation
    const checkoutSchema = z.object({
        userId: z.number().int(),
        itemId: z.number().int(),
        expectedReturn: z.string().optional(),
    });

    checkoutRoute.post(
        "/checkout",
        zValidator("json", checkoutSchema),
        async (c) => {
            const { userId, itemId, expectedReturn } = c.req.valid("json");

            // 1. Verify user exists
            const user = await db.query.users_table.findFirst({
                where: eq(users_table.id, userId),
            });
            if (!user) return c.json({ error: "User not found" }, 404);

            // 2. Verify item exists
            const item = await db.query.items_table.findFirst({
                where: eq(items_table.id, itemId),
            });
            if (!item) return c.json({ error: "Item not found" }, 404);

            // 3. Create entry in timestamp table
            const [ts] = await db
                .insert(timestamp)
                .values({
                    expected_return: expectedReturn,
                })
                .returning();

            // 4. Insert into transactions
            await db.insert(transactions).values({
                user_id: userId,
                item_id: itemId,
                timestamp_id: ts.id,
            });

            return c.json({
                status: "success",
                userId,
                itemId,
                timestampId: ts.id,
            });
        }
    );
    return checkoutRoute;
}

export default checkoutRoute;
