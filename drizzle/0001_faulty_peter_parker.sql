CREATE TABLE `diagnosis` (
	`id` integer PRIMARY KEY NOT NULL,
	`diagnosis_name` text,
	`description` text,
	`date` text,
	`notes` text,
	`diagnosed_vet_id` integer,
	`attending_vet_id` integer,
	FOREIGN KEY (`diagnosed_vet_id`) REFERENCES `vet`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`attending_vet_id`) REFERENCES `vet`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `medical_info` (
	`id` integer PRIMARY KEY NOT NULL,
	`food_intolerances` text,
	`medication_intolerances` text,
	`contraindications` text,
	`blood_type` text,
	`blood_transfusion_received` integer DEFAULT false,
	`problematic_body_parts` text,
	`chronic_illness` text,
	`medical_history` text,
	`countries_visited` text,
	`mediterranean_disease` text,
	`caution_with_treatment` integer DEFAULT false,
	`behavior_character` text,
	`living_environment` text,
	`caution_with_aggression` integer DEFAULT false,
	`notes` text
);
--> statement-breakpoint
CREATE TABLE `vet` (
	`id` integer PRIMARY KEY NOT NULL,
	`origin_veterinary_practice` integer DEFAULT true,
	`practice_name` text NOT NULL,
	`vet_name` text NOT NULL,
	`zip_code` text,
	`city` text,
	`street` text,
	`house_number` text,
	`address_additional_info` text,
	`mobile` text,
	`secondary_phone` text,
	`email` text,
	`notes` text
);
