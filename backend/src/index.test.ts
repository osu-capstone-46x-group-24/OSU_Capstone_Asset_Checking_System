import { afterAll, describe, expect, test } from "vitest";
import appfn from "./app.js";
import * as schema from "./db/schema.js";
import { drizzle } from "drizzle-orm/libsql/node";
import { migrate } from "drizzle-orm/libsql/migrator";
import { reset, seed } from "drizzle-seed";
import { beforeAll } from "vitest";
import { eq, isNull, and } from "drizzle-orm";


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
    const timestamps = await db.select().from(schema.timestamp).all();
    console.log(timestamps);
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

    test.sequential("Item is already checkedout", async (c) => {
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

    test.sequential("User doesn't exist", async (c) => {
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

    test.sequential("Checkout many with invalid item", async (c) => {
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

    test.sequential("Checkout many", async (c) => {
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

describe.sequential("POST /api/checkin", () => {

    test.sequential("Checkin fails if already checked in", async () => {
        const [tx] = await db
            .select()
            .from(schema.transactions)
            .where(isNull(schema.transactions.checkin));

        // manually check in
        await db
            .update(schema.transactions)
            .set({ checkin: new Date().toISOString() })
            .where(
                and(
                    eq(schema.transactions.user_id, tx.user_id),
                    eq(schema.transactions.item_id, tx.item_id),
                    eq(schema.transactions.timestamp_id, tx.timestamp_id)
                )
            );

        const [user] = await db
            .select()
            .from(schema.users_table)
            .where(eq(schema.users_table.id, tx.user_id));

        const [item] = await db
            .select()
            .from(schema.items_table)
            .where(eq(schema.items_table.id, tx.item_id));

        const res = await app.request("/api/checkin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                rfid: user.rfid,
                item: item.name,
            }),
        });

        expect(res.status).toBe(400);
    });
});


    

