import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import {
    users_table,
    items_table,
    timestamp,
    transactions,
} from "../db/schema.js";
import { DrizzleQueryError, eq, inArray, is } from "drizzle-orm";

import * as schema from "../db/schema.js";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
import { LibsqlError } from "@libsql/client";

function checkoutRoute(db: LibSQLDatabase<typeof schema>) {
    const checkoutRoute = new Hono();

    // Zod validation
    // items is a flat array of item_ids
    const checkoutSchema = z.object({
        userId: z.number().int(),
        items: z.array(z.number().int()),
        expectedReturn: z.string().optional(),
    });

    checkoutRoute.post(
        "/checkout",
        zValidator("json", checkoutSchema),
        async (c) => {
            const { userId, items, expectedReturn } = c.req.valid("json");

            // 1. Verify user exists
            const user = await db.query.users_table.findFirst({
                where: eq(users_table.id, userId),
            });
            if (!user) return c.json({ error: "User not found" }, 404);

            // 2. Verify item exists
            const available_items = await db
                .select()
                .from(schema.available_items)
                .where(inArray(schema.available_items.id, items));

            if (available_items.length < items.length) {
                return c.text("item not available or doesn't exist", 404);
            }

            // 3. Create entry in timestamp table
            const [ts] = await db
                .insert(timestamp)
                .values({
                    expected_return: expectedReturn,
                })
                .returning();

            // 4. Insert into transactions
            try {
                await db
                    .insert(transactions)
                    .values(
                        items.map((itemId) => {
                            return {
                                user_id: userId,
                                item_id: itemId,
                                timestamp_id: ts.id,
                            };
                        })
                    )
                    .onConflictDoNothing();
            } catch (error) {
                if (error instanceof DrizzleQueryError) {
                    console.log(error.cause);
                }
                if (error instanceof LibsqlError) {
                    console.log(error.cause);
                }
                return c.text("insert failed", 501);
            }

            return c.json({
                status: "success",
                userId,
                items,
                timestampId: ts.id,
            });
        }
    );
    return checkoutRoute;
}

export default checkoutRoute;
