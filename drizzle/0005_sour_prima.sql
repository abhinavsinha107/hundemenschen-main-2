PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_dogs` (
	`id` integer PRIMARY KEY NOT NULL,
	`full_name` text,
	`call_name` text NOT NULL,
	`birthday` integer,
	`estimated_birthday` integer DEFAULT false,
	`birthday_unknown` integer DEFAULT false,
	`gender` text NOT NULL,
	`neutered` integer DEFAULT false,
	`breeding_dog` integer DEFAULT false,
	`breed` text,
	`mixed_breed` integer DEFAULT false,
	`breed_unknown` integer DEFAULT false,
	`image` text,
	`chip_number` text,
	`chip_date` integer,
	`chip_location` text,
	`pet_passport_number` text,
	`origin_country` text,
	`tasso_number` text,
	`tax_number` text,
	`identification_notes` text,
	`has_pet_insurance` integer DEFAULT false,
	`insurance_name` text,
	`owner_contact_id` integer,
	`secondary_contact_id` integer,
	FOREIGN KEY (`owner_contact_id`) REFERENCES `contacts`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`secondary_contact_id`) REFERENCES `contacts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_dogs`("id", "full_name", "call_name", "birthday", "estimated_birthday", "birthday_unknown", "gender", "neutered", "breeding_dog", "breed", "mixed_breed", "breed_unknown", "image", "chip_number", "chip_date", "chip_location", "pet_passport_number", "origin_country", "tasso_number", "tax_number", "identification_notes", "has_pet_insurance", "insurance_name", "owner_contact_id", "secondary_contact_id") SELECT "id", "full_name", "call_name", "birthday", "estimated_birthday", "birthday_unknown", "gender", "neutered", "breeding_dog", "breed", "mixed_breed", "breed_unknown", "image", "chip_number", "chip_date", "chip_location", "pet_passport_number", "origin_country", "tasso_number", "tax_number", "identification_notes", "has_pet_insurance", "insurance_name", "owner_contact_id", "secondary_contact_id" FROM `dogs`;--> statement-breakpoint
DROP TABLE `dogs`;--> statement-breakpoint
ALTER TABLE `__new_dogs` RENAME TO `dogs`;--> statement-breakpoint
PRAGMA foreign_keys=ON;