import { Hono } from "hono";
import * as schema from "../db/schema.js";
import type { LibSQLDatabase } from "drizzle-orm/libsql";

import { itemSchema } from "../api.js";
import { zValidator } from "@hono/zod-validator";
import { DrizzleQueryError } from "drizzle-orm";

function itemsRoute(db: LibSQLDatabase<typeof schema>) {
    const app = new Hono();

    app.get("/items/all", async (c) => {
        const items = await db.select().from(schema.items_table);
        return c.json(items);
    });
    app.get("/items/available", async (c) => {
        const items = await db.select().from(schema.available_items);
        return c.json(items);
    });

    app.post("/items", zValidator("json", itemSchema), async (c) => {
        const items = c.req.valid("json");
        try {
            /// @ts-expect-error values can take either an array or object but typescript doesn't understand
            await db.insert(schema.items_table).values(items);
        } catch (error) {
            if (error instanceof DrizzleQueryError) {
                return c.text(
                    `Failed to add items. ${error.cause?.message}`,
                    501
                );
            }
            return c.status(501);
        }
        return c.text("success", 200);
    });

    return app;
}

export default itemsRoute;
