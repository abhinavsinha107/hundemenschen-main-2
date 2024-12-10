ALTER TABLE `heatPhase` RENAME TO `heat_phase`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_heat_phase` (
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
--> statement-breakpoint
INSERT INTO `__new_heat_phase`("heat_id", "id", "phase", "start_date", "end_date", "problems", "hypocritical", "pregnant", "notes") SELECT "heat_id", "id", "phase", "start_date", "end_date", "problems", "hypocritical", "pregnant", "notes" FROM `heat_phase`;--> statement-breakpoint
DROP TABLE `heat_phase`;--> statement-breakpoint
ALTER TABLE `__new_heat_phase` RENAME TO `heat_phase`;--> statement-breakpoint
PRAGMA foreign_keys=ON;