CREATE TABLE `checkup` (
	`id` integer PRIMARY KEY NOT NULL,
	`dog_id` integer,
	`date` integer NOT NULL,
	`notes` text,
	FOREIGN KEY (`dog_id`) REFERENCES `dogs`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `checkup_answers` (
	`id` integer PRIMARY KEY NOT NULL,
	`checkup_id` integer,
	`question_id` integer,
	`question_number` integer NOT NULL,
	`answer` text NOT NULL,
	`note` text,
	`critical` integer DEFAULT false,
	FOREIGN KEY (`checkup_id`) REFERENCES `checkup`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`question_id`) REFERENCES `checkup_questions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `checkup_questions` (
	`id` integer PRIMARY KEY NOT NULL,
	`question_number` integer NOT NULL,
	`title` text NOT NULL
);
