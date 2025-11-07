import {
    sqliteTable,
    AnySQLiteColumn,
    foreignKey,
    integer,
    text,
    primaryKey,
    uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const adminsTable = sqliteTable("admins_table", {
    userId: integer("user_id")
        .primaryKey()
        .notNull()
        .references(() => usersTable.id),
});

export const itemsTable = sqliteTable("items_table", {
    id: integer().primaryKey({ autoIncrement: true }).notNull(),
    name: text().notNull(),
});

export const timestamp = sqliteTable("timestamp", {
    id: integer().primaryKey({ autoIncrement: true }).notNull(),
    timestamp: text().default("sql`(current_timestamp)`").notNull(),
    expectedReturn: text("expected_return"),
});

export const transactions = sqliteTable(
    "transactions",
    {
        userId: integer("user_id").references(() => usersTable.id),
        itemId: integer("item_id").references(() => itemsTable.id),
        timestampId: integer("timestamp_id").references(() => timestamp.id),
        checkinTimestamp: text("checkin_timestamp"),
    },
    (table) => [
        primaryKey({
            columns: [table.userId, table.itemId, table.timestampId],
            name: "transactions_user_id_item_id_timestamp_id_pk",
        }),
    ]
);

export const usersTable = sqliteTable(
    "users_table",
    {
        id: integer().primaryKey({ autoIncrement: true }).notNull(),
        rfid: integer().notNull(),
        username: text(),
    },
    (table) => [uniqueIndex("users_table_rfid_unique").on(table.rfid)]
);
