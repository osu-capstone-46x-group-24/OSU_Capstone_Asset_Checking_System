import { drizzle } from "drizzle-orm/libsql";
import app from "./app.js";
import { serve } from "@hono/node-server";

import * as Schema from "./db/schema.js";
import { migrate } from "drizzle-orm/libsql/migrator";

// handle error where .env is not present / DB_FILE_NAME is not defined as an environment variable
if (process.env.DB_FILE_NAME == undefined) {
    console.log(
        "Failed to get DB_FILE_NAME from env. Is there a .env present?"
    );
    process.exit(1);
}

const db = drizzle({
    connection: process.env.DB_FILE_NAME,
    schema: Schema,
});
// auto migrate database using generated migrations
await migrate(db, { migrationsFolder: "drizzle/" });

serve({ fetch: app(db).fetch, port: 3000 }, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
