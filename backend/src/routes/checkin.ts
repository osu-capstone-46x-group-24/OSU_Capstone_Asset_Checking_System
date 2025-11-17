import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { db } from "../db/index";
import { transactions } from "../db/schema";

export const checkinRoute = new Hono();

const checkinSchema = z.object({
  userId: z.number().int(),
  itemId: z.number().int(),
  timestampId: z.number().int(),
});

checkinRoute.post(
  "/checkin",
  zValidator("json", checkinSchema),
  async (c) => {
    const { userId, itemId, timestampId } = c.req.valid("json");

    const now = new Date().toISOString();

    const updated = await db
      .update(transactions)
      .set({ checkinTimestamp: now })
      .where(
        (t) =>
          t.userId.eq(userId) &&
          t.itemId.eq(itemId) &&
          t.timestampId.eq(timestampId)
      )
      .run();

    return c.json({
      status: "success",
      checkinTimestamp: now,
    });
  }
);