CREATE TABLE `log_table` (
	`timestamp` text DEFAULT (datetime('now')) NOT NULL,
	`level` text,
	`type` text NOT NULL,
	`message` text
);
