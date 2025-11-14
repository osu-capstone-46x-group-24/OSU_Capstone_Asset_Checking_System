CREATE TABLE `admins_table` (
	`user_id` integer PRIMARY KEY NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `items_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `timestamp` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL,
	`expected_return` text
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`user_id` integer,
	`item_id` integer,
	`timestamp_id` integer,
	`checkin_timestamp` text,
	PRIMARY KEY(`user_id`, `item_id`, `timestamp_id`),
	FOREIGN KEY (`user_id`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`item_id`) REFERENCES `items_table`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`timestamp_id`) REFERENCES `timestamp`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`rfid` integer NOT NULL,
	`username` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_rfid_unique` ON `users_table` (`rfid`);