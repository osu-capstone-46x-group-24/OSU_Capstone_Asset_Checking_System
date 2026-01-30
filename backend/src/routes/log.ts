import { Hono } from "hono";
import * as schema from "../db/schema.js";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
import { zValidator } from "@hono/zod-validator";
import { createInsertSchema } from "drizzle-zod";

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
        }
    );

    return app;
}

export default log_route;
