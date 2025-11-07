import { serve } from "@hono/node-server";
import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { users_table } from "./db/schema.js";
import { createInsertSchema } from "drizzle-zod";
const db = drizzle(process.env.DB_FILE_NAME!);
const app = new Hono();

app.post(
    "/user",
    zValidator("json", createInsertSchema(users_table)),
    async (c) => {
        const data = c.req.valid("json");
        await db.insert(users_table).values(data);
        return c.text("success", 200);
    }
);

serve({ fetch: app.fetch, port: 3000 }, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
