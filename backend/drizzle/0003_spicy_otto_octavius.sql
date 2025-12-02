PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_timestamp` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`timestamp` text DEFAULT (datetime('now')) NOT NULL,
	`expected_return` text
);
--> statement-breakpoint
INSERT INTO `__new_timestamp`("id", "timestamp", "expected_return") SELECT "id", "timestamp", "expected_return" FROM `timestamp`;--> statement-breakpoint
DROP TABLE `timestamp`;--> statement-breakpoint
ALTER TABLE `__new_timestamp` RENAME TO `timestamp`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
ALTER TABLE `items_table` ADD `rfid` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `items_table_rfid_unique` ON `items_table` (`rfid`);--> statement-breakpoint
DROP VIEW `available_items_view`;--> statement-breakpoint
CREATE VIEW `available_items_view` AS select "id", "name", "rfid" from "items_table" where "items_table"."id" not in (select "item_id" from "transactions" where "transactions"."checkin_timestamp" is null);