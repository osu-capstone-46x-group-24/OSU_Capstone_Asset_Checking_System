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
    logger: true,
});
// auto migrate database using generated migrations
await migrate(db, { migrationsFolder: "drizzle/" });

const app = appfn(db);

beforeAll(async () => {
    // setup database for testing
    await reset(drizzle(testdb), schema); // defaults to 10 items
    await seed(drizzle(testdb), {
        users_table: schema.users_table,
        items_table: schema.items_table,
    });
});
afterAll(async () => {
    // print db
    const users_table = await db.select().from(schema.users_table).all();
    const items_table = await db.select().from(schema.items_table).all();
    const transactions = await db.select().from(schema.transactions).all();
    const items = await db.select().from(schema.available_items).all();
    const timestamps = await db.select().from(schema.timestamp).all();
    console.log(timestamps);
    console.log(users_table);
    console.log(items_table);
    console.log(transactions);
    console.log(items);
});

// sequential is required because test are dependent on shared state (database)
describe.sequential("POST /api/checkout", async () => {
    test.sequential("Valid checkout", async () => {
        const req = await app.request("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: 1,
                items: [1],
                expectedReturn: new Date().toISOString(),
            }),
        });

        expect(req.status).toBe(200);
        expect(await req.json()).containSubset({
            items: [1],
            status: "success",
            userId: 1,
        });
    });

    test.sequential("Item is already checkedout", async () => {
        const req = await app.request("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: 1,
                items: [1],
                expectedReturn: new Date().toISOString(),
            }),
        });

        expect(req.status).toBe(404);
    });

    test.sequential("User doesn't exist", async () => {
        const req = await app.request("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: 200,
                items: [1],
                expectedReturn: new Date().toISOString(),
            }),
        });

        expect(req.status).toBe(404);
    });

    test.sequential("Checkout many with invalid item", async () => {
        const available_items = await db.select().from(schema.available_items);
        const req = await app.request("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: 2,
                items: [1, 2, 3],
                expectedReturn: new Date().toISOString(),
            }),
        });
        const available_items_after_transaction = await db
            .select()
            .from(schema.available_items);

        expect(available_items).toStrictEqual(
            available_items_after_transaction
        );

        expect(req.status).toBe(404);
    });

    test.sequential("Checkout many", async () => {
        const available_items = await db.select().from(schema.available_items);
        const req = await app.request("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: 2,
                items: available_items.map((item) => item.id),
                expectedReturn: new Date().toISOString(),
            }),
        });

        const available_items_after_transaction = await db
            .select()
            .from(schema.available_items);
        expect(available_items_after_transaction).toStrictEqual([]);

        expect(req.status).toBe(200);
    });
});

describe.sequential("POST /api/items", async () => {
    test("Add item", async () => {
        const res = await app.request("/api/items", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                rfid: "7e39f83d-70ee-4b19-90db-099245563e18",
                name: "My item",
            }),
        });
        expect(res.status).toBe(200);
    });
    test("Add duplicate item", async () => {
        const res = await app.request("/api/items", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                rfid: "7e39f83d-70ee-4b19-90db-099245563e18",
                name: "My item",
            }),
        });
        expect(res.status).toBe(501);
    });
});

describe.sequential("GET /api/items", async () => {
    test.concurrent("GET /available", async () => {
        const res = await app.request("/api/items/available");
        const items = await res.json();
        const expected_items = await db.select().from(schema.available_items);
        expect(items).toStrictEqual(expected_items);
    });
    test.concurrent("GET /all", async () => {
        const res = await app.request("/api/items/all");
        const items = await res.json();
        const expected_items = await db.select().from(schema.items_table);
        expect(items).toStrictEqual(expected_items);
    });
});

describe.todo.sequential("POST /api/checkin", async () => {
    test.sequential("Valid checkin", async () => {
        await app.request("/api/checkin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: 1,
            }),
        });
    });
});
