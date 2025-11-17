import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { db } from "../db/index";
import { usersTable, itemsTable, timestamp, transactions } from "../db/schema";

export const checkoutRoute = new Hono();

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
    const user = await db.query.usersTable.findFirst({
      where: (u) => u.id.eq(userId),
    });
    if (!user) return c.json({ error: "User not found" }, 404);

    // 2. Verify item exists
    const item = await db.query.itemsTable.findFirst({
      where: (i) => i.id.eq(itemId),
    });
    if (!item) return c.json({ error: "Item not found" }, 404);

    // 3. Create entry in timestamp table
    const [ts] = await db.insert(timestamp).values({
      expectedReturn,
    }).returning();

    // 4. Insert into transactions
    await db.insert(transactions).values({
      userId,
      itemId,
      timestampId: ts.id,
    });

    return c.json({
      status: "success",
      userId,
      itemId,
      timestampId: ts.id,
    });
  }
);
