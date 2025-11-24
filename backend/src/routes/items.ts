import { Hono } from "hono";
import * as schema from "../db/schema.js";
import type { LibSQLDatabase } from "drizzle-orm/libsql";

function itemsRoute(db: LibSQLDatabase<typeof schema>) {
    const app = new Hono();

    app.get("/items/all", async (c) => {
        const items = await db.select().from(schema.items_table);
        return c.json(items);
    });
    app.get("/items/available", async (c) => {
        const items = await db.select().from(schema.items_table);
        return c.json(items);
    });

    return app;
}

export default itemsRoute;
