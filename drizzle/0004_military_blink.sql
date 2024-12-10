CREATE TABLE `conspicuousness` (
	`id` integer PRIMARY KEY NOT NULL,
	`conspicuousness` text,
	`symptoms` text,
	`date` text,
	`vet_checked` integer DEFAULT false,
	`notes` text
);
--> statement-breakpoint
CREATE TABLE `general_info` (
	`id` integer PRIMARY KEY NOT NULL,
	`caution_with_aggression` integer DEFAULT false,
	`behavior_character` text,
	`living_environment` text,
	`everyday_life_notes` text,
	`feed_ingredients` text,
	`feed_manufacturer` text,
	`feed_quantity` text,
	`feed_type` text,
	`feed_notes` text
);
--> statement-breakpoint
CREATE TABLE `medication` (
	`id` integer PRIMARY KEY NOT NULL,
	`conspicuousness_diagnosis` text,
	`medicine_name` text,
	`medicine_strenght` text,
	`medicine_manufacturer` text,
	`dosage_form` text,
	`long_term_medication` integer DEFAULT false,
	`unit_quantity` text,
	`unit_unit` text,
	`dosis` text,
	`dosis_unit` text,
	`day_time` text,
	`medication_ended` integer DEFAULT false,
	`end_date` integer,
	`notes` text,
	`medication_start` integer,
	`period` text,
	`pause_duration` text,
	`administer_until_used_up` integer DEFAULT false,
	`repeat` text,
	`repeat_if_necessary` integer DEFAULT false
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_medical_info` (
	`id` integer PRIMARY KEY NOT NULL,
	`food_intolerances` text,
	`medication_intolerances` text,
	`contraindications` text,
	`blood_type` text,
	`blood_transfusion_received` integer DEFAULT false,
	`problematic_body_parts` text,
	`chronic_illness` integer DEFAULT false,
	`medical_history` text,
	`countries_visited` text,
	`mediterranean_disease` integer DEFAULT false,
	`mediterranean_disease_findings` text,
	`caution_with_aggression` integer DEFAULT false,
	`notes` text
);
--> statement-breakpoint
INSERT INTO `__new_medical_info`("id", "food_intolerances", "medication_intolerances", "contraindications", "blood_type", "blood_transfusion_received", "problematic_body_parts", "chronic_illness", "medical_history", "countries_visited", "mediterranean_disease", "mediterranean_disease_findings", "caution_with_aggression", "notes") SELECT "id", "food_intolerances", "medication_intolerances", "contraindications", "blood_type", "blood_transfusion_received", "problematic_body_parts", "chronic_illness", "medical_history", "countries_visited", "mediterranean_disease", "mediterranean_disease_findings", "caution_with_aggression", "notes" FROM `medical_info`;--> statement-breakpoint
DROP TABLE `medical_info`;--> statement-breakpoint
ALTER TABLE `__new_medical_info` RENAME TO `medical_info`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
ALTER TABLE `dogs` ADD `birthday_unknown` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `dogs` ADD `breeding_dog` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `dogs` ADD `insurance_name` text;