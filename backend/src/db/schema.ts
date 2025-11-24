import { isNull, notInArray, sql } from "drizzle-orm/sql";
import {
    int,
    primaryKey,
    sqliteTable,
    sqliteView,
    text,
} from "drizzle-orm/sqlite-core";

export const items_table = sqliteTable("items_table", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    rfid: text("rfid").notNull().unique(),
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
        .default(sql`(datetime('now'))`),
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

export const available_items = sqliteView("available_items_view").as((qb) => {
    // items which are not currently checkedout

    // item is in transaction where there is no checkin time
    const checkedout = qb
        .select({ item_id: transactions.item_id })
        .from(transactions)
        .where(isNull(transactions.checkin));

    return qb
        .select()
        .from(items_table)
        .where(notInArray(items_table.id, checkedout));
});

// stores what users are admins
export const admins_table = sqliteTable("admins_table", {
    user_id: int()
        .primaryKey()
        .references(() => users_table.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),
});
