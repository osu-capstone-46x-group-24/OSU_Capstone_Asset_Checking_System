import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import "dotenv/config";
import { createInsertSchema } from "drizzle-zod";
import * as schema from "./db/schema.js";

import checkinRoute from "./routes/checkin.js";
import checkoutRoute from "./routes/checkout.js";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
import itemsRoute from "./routes/items.js";

function app_constructor(db: LibSQLDatabase<typeof schema>) {
    const app = new Hono();

    // TODO: Refactor into seperate file
    app.post(
        "api/user",
        zValidator(
            "json",
            createInsertSchema(schema.users_table).omit({ id: true })
        ),
        async (c) => {
            const data = c.req.valid("json");
            await db.insert(schema.users_table).values(data);
            return c.text("success", 200);
        }
    );

    app.route("api/", itemsRoute(db));

    app.route("api/", checkinRoute(db));
    app.route("api/", checkoutRoute(db));
    return app;
}
export default app_constructor;
