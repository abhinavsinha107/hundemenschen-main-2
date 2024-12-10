CREATE TABLE `heatPhase` (
	`heat_id` integer NOT NULL,
	`id` integer PRIMARY KEY NOT NULL,
	`phase` text NOT NULL,
	`start_date` integer NOT NULL,
	`end_date` integer,
	`problems` text,
	`hypocritical` integer DEFAULT false,
	`pregnant` integer DEFAULT false,
	`notes` text,
	FOREIGN KEY (`heat_id`) REFERENCES `heat`(`id`) ON UPDATE no action ON DELETE no action
);
