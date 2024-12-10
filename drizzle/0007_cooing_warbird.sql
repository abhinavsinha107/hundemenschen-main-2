CREATE TABLE `weight` (
	`id` integer PRIMARY KEY NOT NULL,
	`dog_id` integer NOT NULL,
	`date` integer NOT NULL,
	`weight` real NOT NULL,
	`notes` text,
	`new_goal` text,
	FOREIGN KEY (`dog_id`) REFERENCES `dogs`(`id`) ON UPDATE no action ON DELETE no action
);
