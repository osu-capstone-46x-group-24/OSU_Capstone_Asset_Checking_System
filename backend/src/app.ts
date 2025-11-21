import { Hono } from "hono";

import * as z from "zod";
import { zValidator } from "@hono/zod-validator";
import "dotenv/config";
import { createInsertSchema } from "drizzle-zod";
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import * as Schema from "./db/schema.js";

import checkinRoute from "./routes/checkin.js";
import checkoutRoute from "./routes/checkout.js";

function app_constructor(db: LibSQLDatabase<typeof Schema>) {
    const app = new Hono();

    app.post(
        "api/user",
        zValidator(
            "json",
            createInsertSchema(Schema.users_table).omit({ id: true })
        ),
        async (c) => {
            const data = c.req.valid("json");
            await db.insert(Schema.users_table).values(data);
            return c.text("success", 200);
        }
    );

    // requires id of user and of each item, will fail if these do not exist
    const checkout_schema = z.object({
        user_id: z.int(),
        items: z.array(z.int()),
        expected_return: z.string(), // what should this be?
    });
    app.post(
        "/api/checkout",
        zValidator("json", checkout_schema),
        async (c) => {
            const data = c.req.valid("json");
            // insert new timestamp
            const timestamp = await db
                .insert(Schema.timestamp)
                .values({ expected_return: data.expected_return })
                .returning();
            const timestamp_id = timestamp[0].id;

            const insert_values = data.items.map((item) => {
                return {
                    user_id: data.user_id,
                    item_id: item,
                    timestamp_id: timestamp_id,
                };
            });
            const result = await db
                .insert(Schema.transactions)
                .values(insert_values)
                .onConflictDoNothing();
            if (result.rowsAffected != data.items.length) {
                return c.text("failed to insert rows", 501);
            } else {
                return c.text("success", 200);
            }
        }
    );

    app.route("api/", checkinRoute(db));
    app.route("api/", checkoutRoute(db));
    return app;
}
export default app_constructor;
