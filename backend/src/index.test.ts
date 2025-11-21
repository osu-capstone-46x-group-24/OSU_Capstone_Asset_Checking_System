import { afterAll, describe, expect, test } from "vitest";
import appfn from "./app.js";
import * as schema from "./db/schema.js";
import { drizzle } from "drizzle-orm/libsql/node";
import { migrate } from "drizzle-orm/libsql/migrator";
import { reset, seed } from "drizzle-seed";
import { beforeAll } from "vitest";

const testdb = "file:test.db";
const db = drizzle({
    connection: { url: testdb },
    schema: schema,
});
// auto migrate database using generated migrations
await migrate(db, { migrationsFolder: "drizzle/" });

const app = appfn(db);

beforeAll(async () => {
    // setup database for testing
    await reset(drizzle(testdb), schema);
    // defaults to 10 items
    await seed(drizzle(testdb), {
        users_table: schema.users_table,
        items_table: schema.items_table,
    });
});
afterAll(async (c) => {
    // print db
    const users_table = await db.select().from(schema.users_table).all();
    const items_table = await db.select().from(schema.items_table).all();
    const transactions = await db.select().from(schema.transactions).all();
    const items = await db.select().from(schema.available_items).all();
    console.log(users_table);
    console.log(items_table);
    console.log(transactions);
    console.log(items);
});

// sequential is required because test are dependent on shared state (database)
describe.sequential("POST /api/checkout", async (c) => {
    test.sequential("Valid checkout", async (c) => {
        const req = await app.request("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: 1,
                itemId: 1,
                expectedReturn: new Date().toISOString(),
            }),
        });

        expect(req.status).toBe(200);
        expect(await req.json()).containSubset({
            itemId: 1,
            status: "success",
            userId: 1,
        });
    });

    test.sequential("Item is already checkedout", async (c) => {
        const req = await app.request("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: 1,
                itemId: 1,
                expectedReturn: new Date().toISOString(),
            }),
        });

        expect(req.status).toBe(404);
    });

    test.sequential("User doesn't exist", async (c) => {
        const req = await app.request("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: 200,
                itemId: 1,
                expectedReturn: new Date().toISOString(),
            }),
        });

        expect(req.status).toBe(404);
    });
});
