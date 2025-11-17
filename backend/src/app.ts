import { Hono } from "hono";

import * as z from "zod";
import { zValidator } from "@hono/zod-validator";
import "dotenv/config";
import { createInsertSchema } from "drizzle-zod";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import * as schema from "./db/schema.js";

import checkinRoute from "./routes/checkin.js";
import checkoutRoute from "./routes/checkout.js";

// handle error where .env is not present / DB_FILE_NAME is not defined as an environment variable
if (process.env.DB_FILE_NAME == undefined) {
    console.log(
        "Failed to get DB_FILE_NAME from env. Is there a .env present?"
    );
    process.exit(1);
}

const db = drizzle({
    connection: process.env.DB_FILE_NAME,
    schema: schema,
});
// auto migrate database using generated migrations
await migrate(db, { migrationsFolder: "drizzle/" });
const app = new Hono();

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

// requires id of user and of each item, will fail if these do not exist
const checkout_schema = z.object({
    user_id: z.int(),
    items: z.array(z.int()),
    expected_return: z.string(), // what should this be?
});
app.post("/api/checkout", zValidator("json", checkout_schema), async (c) => {
    const data = c.req.valid("json");
    // insert new timestamp
    const timestamp = await db
        .insert(schema.timestamp)
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
        .insert(schema.transactions)
        .values(insert_values)
        .onConflictDoNothing();
    if (result.rowsAffected != data.items.length) {
        return c.text("failed to insert rows", 501);
    } else {
        return c.text("success", 200);
    }
});

app.route("api/", checkinRoute);
app.route("api/", checkoutRoute);
export default app;
