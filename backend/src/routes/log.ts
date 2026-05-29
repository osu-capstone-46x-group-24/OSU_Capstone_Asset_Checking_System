import { Hono } from "hono";
import * as schema from "../db/schema.js";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
import { zValidator } from "@hono/zod-validator";
import { createInsertSchema } from "drizzle-zod";
import { eq } from "drizzle-orm";

function log_route(db: LibSQLDatabase<typeof schema>) {
    const app = new Hono();

    // Timestamp Sender Request Type RAW Message
    app.post(
        "/log/:level",
        zValidator(
            "json",
            createInsertSchema(schema.log_table).omit({
                level: true,
            })
        ),
        async (c) => {
            const level = c.req.param("level");
            const event = c.req.valid("json");
            await db.insert(schema.log_table).values({ level, ...event });
            return c.json({ success: true });
        }
    );

    app.get("/log/:level", async (c) => {
        const level = c.req.param("level");
        const logs = await db
            .select()
            .from(schema.log_table)
            .where(eq(schema.log_table.level, level));
        return c.json(logs);
    });

    app.get("/log/", async (c) => {
        const logs = await db.select().from(schema.log_table);
        return c.json(logs);
    });

    return app;
}

export default log_route;
