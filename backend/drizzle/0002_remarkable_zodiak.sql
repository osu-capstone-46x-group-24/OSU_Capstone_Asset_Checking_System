PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_admins_table` (
	`user_id` integer PRIMARY KEY NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users_table`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_admins_table`("user_id") SELECT "user_id" FROM `admins_table`;--> statement-breakpoint
DROP TABLE `admins_table`;--> statement-breakpoint
ALTER TABLE `__new_admins_table` RENAME TO `admins_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_transactions` (
	`user_id` integer,
	`item_id` integer,
	`timestamp_id` integer,
	`checkin_timestamp` text,
	PRIMARY KEY(`user_id`, `item_id`, `timestamp_id`),
	FOREIGN KEY (`user_id`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`item_id`) REFERENCES `items_table`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`timestamp_id`) REFERENCES `timestamp`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_transactions`("user_id", "item_id", "timestamp_id", "checkin_timestamp") SELECT "user_id", "item_id", "timestamp_id", "checkin_timestamp" FROM `transactions`;--> statement-breakpoint
DROP TABLE `transactions`;--> statement-breakpoint
ALTER TABLE `__new_transactions` RENAME TO `transactions`;--> statement-breakpoint
CREATE VIEW `available_items_view` AS select "id", "name" from "items_table" where "items_table"."id" not in (select "item_id" from "transactions" where "transactions"."checkin_timestamp" is null);