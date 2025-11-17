import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { transactions } from "../db/schema.js";
import { and, eq } from "drizzle-orm";
import * as Schema from "../db/schema.js";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
declare const db: LibSQLDatabase<typeof Schema>;

const checkinRoute = new Hono();

const checkinSchema = z.object({
    userId: z.number().int(),
    itemId: z.number().int(),
    timestampId: z.number().int(),
});

checkinRoute.post("/checkin", zValidator("json", checkinSchema), async (c) => {
    const { userId, itemId, timestampId } = c.req.valid("json");

    const now = new Date().toISOString();

    const updated = await db
        .update(transactions)
        .set({ checkin: now })
        .where(
            and(
                eq(transactions.user_id, userId),
                eq(transactions.item_id, itemId),
                eq(transactions.timestamp_id, timestampId)
            )
        )
        .limit(1);

    return c.json({
        status: "success",
        checkinTimestamp: now,
    });
});

export default checkinRoute;
