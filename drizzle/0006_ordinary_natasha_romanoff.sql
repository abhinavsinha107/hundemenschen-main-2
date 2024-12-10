PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_contacts` (
	`id` integer PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text,
	`gender` text NOT NULL,
	`additional_info` text,
	`zip_code` text,
	`city` text,
	`street` text,
	`house_number` text,
	`address_additional_info` text,
	`country` text,
	`mobile` text,
	`secondary_phone` text,
	`email` text,
	`notes` text,
	`position` integer
);
--> statement-breakpoint
INSERT INTO `__new_contacts`("id", "first_name", "last_name", "gender", "additional_info", "zip_code", "city", "street", "house_number", "address_additional_info", "country", "mobile", "secondary_phone", "email", "notes", "position") SELECT "id", "first_name", "last_name", "gender", "additional_info", "zip_code", "city", "street", "house_number", "address_additional_info", "country", "mobile", "secondary_phone", "email", "notes", "position" FROM `contacts`;--> statement-breakpoint
DROP TABLE `contacts`;--> statement-breakpoint
ALTER TABLE `__new_contacts` RENAME TO `contacts`;--> statement-breakpoint
PRAGMA foreign_keys=ON;