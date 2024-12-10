CREATE TABLE `heat` (
	`id` integer PRIMARY KEY NOT NULL,
	`dog_id` integer NOT NULL,
	`start_date` integer NOT NULL,
	`end_date` integer,
	`problems` text,
	`notes` text,
	FOREIGN KEY (`dog_id`) REFERENCES `dogs`(`id`) ON UPDATE no action ON DELETE no action
);
