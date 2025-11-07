import { relations } from "drizzle-orm/relations";
import { usersTable, adminsTable, timestamp, transactions, itemsTable } from "./schema";

export const adminsTableRelations = relations(adminsTable, ({one}) => ({
	usersTable: one(usersTable, {
		fields: [adminsTable.userId],
		references: [usersTable.id]
	}),
}));

export const usersTableRelations = relations(usersTable, ({many}) => ({
	adminsTables: many(adminsTable),
	transactions: many(transactions),
}));

export const transactionsRelations = relations(transactions, ({one}) => ({
	timestamp: one(timestamp, {
		fields: [transactions.timestampId],
		references: [timestamp.id]
	}),
	itemsTable: one(itemsTable, {
		fields: [transactions.itemId],
		references: [itemsTable.id]
	}),
	usersTable: one(usersTable, {
		fields: [transactions.userId],
		references: [usersTable.id]
	}),
}));

export const timestampRelations = relations(timestamp, ({many}) => ({
	transactions: many(transactions),
}));

export const itemsTableRelations = relations(itemsTable, ({many}) => ({
	transactions: many(transactions),
}));