PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`rfid` text NOT NULL,
	`username` text
);
--> statement-breakpoint
INSERT INTO `__new_users_table`("id", "rfid", "username") SELECT "id", "rfid", "username" FROM `users_table`;--> statement-breakpoint
DROP TABLE `users_table`;--> statement-breakpoint
ALTER TABLE `__new_users_table` RENAME TO `users_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_rfid_unique` ON `users_table` (`rfid`);