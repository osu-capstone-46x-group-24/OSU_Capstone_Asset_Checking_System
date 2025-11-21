import { sql } from "drizzle-orm/sql";
import { int, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const items_table = sqliteTable("items_table", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
});

export const users_table = sqliteTable("users_table", {
    id: int().primaryKey({ autoIncrement: true }),
    rfid: text("rfid").unique().notNull(),
    username: text("username"),
});

// store information about transaction timestamp
export const timestamp = sqliteTable("timestamp", {
    id: int().primaryKey({ autoIncrement: true }),
    checkout: text("timestamp")
        .notNull()
        .default(sql`(current_timestamp)`),
    expected_return: text("expected_return"),
});

// stores transaction information
export const transactions = sqliteTable(
    "transactions",
    {
        user_id: int().references(() => users_table.id),
        item_id: int().references(() => items_table.id),
        timestamp_id: int().references(() => timestamp.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),
        checkin: text("checkin_timestamp"),
    },
    (table) => [
        primaryKey({
            columns: [table.user_id, table.item_id, table.timestamp_id],
        }),
    ]
);

// stores what users are admins
export const admins_table = sqliteTable("admins_table", {
    user_id: int()
        .primaryKey()
        .references(() => users_table.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),
});
