import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-zod';

export const dogs = sqliteTable('dogs', {
  // Schnellprofil
  id: integer().primaryKey(),
  full_name: text(), // Vollständiger Name
  call_name: text().notNull(), // Rufname
  birthday: integer({ mode: 'timestamp' }), // Geburtsdatum
  estimated_birthday: integer({ mode: 'boolean' }).default(false), // Geschätzt
  birthday_unknown: integer({ mode: 'boolean' }).default(false), // Unbekanntes Geburtsdatum
  gender: text().notNull(), // Geschlecht (m = male, w = female, d = diverse)
  neutered: integer({ mode: 'boolean' }).default(false), // Kastriert/sterilisiert
  breeding_dog: integer({ mode: 'boolean' }).default(false), // Zuchthund
  breed: text(), // Hunderasse
  mixed_breed: integer({ mode: 'boolean' }).default(false), // Mischling
  breed_unknown: integer({ mode: 'boolean' }).default(false), // Rasse nicht bekannt
  image: text(),

  // Identifikation
  chip_number: text(), // Chipnummer (12-stellig)
  chip_date: integer({ mode: 'timestamp' }), // Chipdatum
  chip_location: text(), // Stelle des Chips
  pet_passport_number: text(), // Heimtierausweisnummer
  origin_country: text(), // Herkunftsland des Hundes
  tasso_number: text(), // Tasso-Nummer
  tax_number: text(), // Steuermarken-Nummer
  identification_notes: text(), // Anmerkungen zu Kennzeichnungen des Hundes
  has_pet_insurance: integer({ mode: 'boolean' }).default(false), // Besteht eine Tierkrankenversicherung?
  insurance_name: text(), // Krankenversicherung Name

  // Foreign key to contacts table
  owner_contact_id: integer().references(() => contacts.id), // Reference to owner contact
  secondary_contact_id: integer().references(() => contacts.id), // Reference to secondary contact
});

export type Dog = InferSelectModel<typeof dogs>;
export type InsertDog = InferInsertModel<typeof dogs>;

export const contacts = sqliteTable('contacts', {
  // Halter*in
  id: integer().primaryKey(),
  first_name: text().notNull(), // Vorname
  last_name: text(), // Nachname
  gender: text().notNull(), // Geschlecht (m = male, w = female, d = diverse)
  additional_info: text(), // Zusatz
  zip_code: text(), // PLZ
  city: text(), // Wohnort
  street: text(), // Straße
  house_number: text(), // Hausnr.
  address_additional_info: text(), // Adresszusatz
  country: text(), // Land
  mobile: text(), // Mobilnummer
  secondary_phone: text(), // Zweitnummer
  email: text(), // E-Mailadresse
  notes: text(), // Anmerkungen
  position: integer(),
});

export type Contact = InferSelectModel<typeof contacts>;
export type InsertContact = InferInsertModel<typeof contacts>;

export const vet = sqliteTable('vet', {
  id: integer().primaryKey(),
  origin_veterinary_practice: integer({ mode: 'boolean' }).default(true), // Stammpraxis
  practice_name: text().notNull(), // Praxisname
  vet_name: text().notNull(), // Arztname
  zip_code: text(), // PLZ
  city: text(), // Stadt
  street: text(), // Straße
  house_number: text(), // Hausnr.
  address_additional_info: text(), // Adresszusatz
  mobile: text(), // Mobilnummer
  secondary_phone: text(), // Zweitnummer
  email: text(), // E-Mailadresse
  notes: text(), // Anmerkung
});

export type Vet = InferSelectModel<typeof vet>;
export type InsertVet = InferInsertModel<typeof vet>;

export const medical_info = sqliteTable('medical_info', {
  id: integer().primaryKey(),
  food_intolerances: text(), // Unverträglichkeit Futter
  medication_intolerances: text(), // Unverträglichkeit Medikamente
  contraindications: text(), // Gegenanzeigen
  blood_type: text(), // Blutgruppe
  blood_transfusion_received: integer({ mode: 'boolean' }).default(false), // Bluttransfusion erhalten
  problematic_body_parts: text(), // Schwierigkeiten Körperteile
  chronic_illness: integer({ mode: 'boolean' }).default(false), // Chronische Krankheit

  medical_history: text(), // Vorgeschichte
  countries_visited: text(), // Bereiste Länder
  mediterranean_disease: integer({ mode: 'boolean' }).default(false), // Mittelmeerkrankheit
  mediterranean_disease_findings: text(), // Mittelmeerkrankheit Befunde
  caution_with_aggression: integer({ mode: 'boolean' }).default(false), // Vorsicht bei Behandlung
  notes: text(), // Anmerkungen
});

export type MedicalInfo = InferSelectModel<typeof medical_info>;
export type InsertMedicalInfo = InferInsertModel<typeof medical_info>;

export const general_info = sqliteTable('general_info', {
  id: integer().primaryKey(),
  caution_with_aggression: integer({ mode: 'boolean' }).default(false), // Vorsicht bei Behandlung
  behavior_character: text(), // Verhalten/Charakter
  living_environment: text(), // Umgebung
  everyday_life_notes: text(), // Anmerkungen zum Alltag
  feed_ingredients: text(), // Futtersorte
  feed_manufacturer: text(), // Futterhersteller
  feed_quantity: text(), // Futtermenge
  feed_type: text(), // Futterart
  feed_notes: text(), // Anmerkungen zum Futter
});

export type GeneralInfo = InferSelectModel<typeof general_info>;
export type InsertGeneralInfo = InferInsertModel<typeof general_info>;

export const diagnosis = sqliteTable('diagnosis', {
  id: integer().primaryKey(),
  diagnosis_name: text(), // Diagnose/Krankheit
  description: text(), // Zusatzbeschreibung
  date: text(), // Datum
  notes: text(), // Anmerkungen

  diagnosed_vet_id: integer().references(() => vet.id), // Referenz zum diagnostizierender Tierarzt
  attending_vet_id: integer().references(() => vet.id), // Referenz zum behandelnden Tierarzt
});

export type Diagnosis = InferSelectModel<typeof diagnosis>;
export type InsertDiagnosis = InferInsertModel<typeof diagnosis>;

export const checkup = sqliteTable('checkup', {
  id: integer().primaryKey(),
  dog_id: integer().references(() => dogs.id),
  date: integer({ mode: 'timestamp' }).notNull(),
  notes: text(),
});

export const checkup_questions = sqliteTable('checkup_questions', {
  id: integer().primaryKey(),
  question_number: integer().notNull(), // Question number for ordering
  title: text().notNull(), // Question title with %s placeholder
});

export const checkup_answers = sqliteTable('checkup_answers', {
  id: integer().primaryKey(),
  checkup_id: integer().references(() => checkup.id),
  question_id: integer().references(() => checkup_questions.id), // Reference to the question
  question_number: integer().notNull(), // Store question number for easy ordering
  question_title: text().notNull(), // Store the question title
  answer: text().notNull(), // Selected answer
  note: text(), // Optional note
  image: text(),
  critical: integer({ mode: 'boolean' }).default(false), // Whether this was a critical answer
});

export type Checkup = InferSelectModel<typeof checkup>;
export type InsertCheckup = InferInsertModel<typeof checkup>;
export type CheckupAnswer = InferSelectModel<typeof checkup_answers>;
export type InsertCheckupAnswer = InferInsertModel<typeof checkup_answers>;
export type CheckupQuestion = InferSelectModel<typeof checkup_questions>;
export type InsertCheckupQuestion = InferInsertModel<typeof checkup_questions>;
export const conspicuousness = sqliteTable('conspicuousness', {
  id: integer().primaryKey(),
  conspicuousness: text(), // Auffälligkeit
  symptoms: text(), // Symptome
  date: text(), // Datum
  vet_checked: integer({ mode: 'boolean' }).default(false), // in Praxis vorstellig geworden
  notes: text(), // Anmerkungen
});

export type Conspicuousness = InferSelectModel<typeof conspicuousness>;
export type InsertConspicuousness = InferInsertModel<typeof conspicuousness>;

export const medication = sqliteTable('medication', {
  id: integer().primaryKey(),
  conspicuousness_diagnosis: text(), // Dazugehörige Diagnose/Auffälligkeit
  medicine_name: text(), // Medikament
  medicine_strenght: text(), // Medikamentenstärke
  medicine_manufacturer: text(), // Medikamentenhersteller
  dosage_form: text(), // Darreichungsform
  long_term_medication: integer({ mode: 'boolean' }).default(false), // dauermedikation oder temporär/intervall
  unit_quantity: text(), // Häufigkeit pro Einheit
  unit_unit: text(), // Einheit
  dosis: text(), // Dosis
  dosis_unit: text(), // Dosis Einheit
  day_time: text(), // Tageszeit
  medication_ended: integer({ mode: 'boolean' }).default(false), // Medikation beendet
  end_date: integer({ mode: 'timestamp' }), // Enddatum
  notes: text(), // Anmerkungen

  // dauerhaft
  medication_start: integer({ mode: 'timestamp' }), // Beginn der Medikation

  // temporär
  period: text(), // Zeitraum
  pause_duration: text(), // Dauer der Medikationspause
  administer_until_used_up: integer({ mode: 'boolean' }).default(false), // in Praxis vorstellig geworden
  repeat: text(), // Wiederholen
  repeat_if_necessary: integer({ mode: 'boolean' }).default(false), // Bei bedarf wiederholen
});

export type Medication = InferSelectModel<typeof medication>;
export type InsertMedication = InferInsertModel<typeof medication>;

export const weight = sqliteTable('weight', {
  id: integer().primaryKey(),
  dog_id: integer()
    .references(() => dogs.id)
    .notNull(),
  date: integer({ mode: 'timestamp' }).notNull(),
  weight: real().notNull(),
  notes: text(),
  new_goal: text({ enum: ['increase', 'keep', 'decrease'] }),
});

export type Weight = InferSelectModel<typeof weight>;
export type InsertWeight = InferInsertModel<typeof weight>;

export const insertWeightSchema = createInsertSchema(weight);

export const heat = sqliteTable('heat', {
  id: integer().primaryKey(),
  dog_id: integer()
    .references(() => dogs.id)
    .notNull(),
  start_date: integer({ mode: 'timestamp' }).notNull(),
  end_date: integer({ mode: 'timestamp' }),
  problems: text(),
  notes: text(),
});

export type Heat = InferSelectModel<typeof heat>;
export type InsertHeat = InferInsertModel<typeof heat>;

export const insertHeatSchema = createInsertSchema(heat);

export const heat_phase = sqliteTable('heat_phase', {
  heat_id: integer()
    .references(() => heat.id)
    .notNull(),
  id: integer().primaryKey(),
  phase: text().notNull(),
  start_date: integer({ mode: 'timestamp' }).notNull(),
  end_date: integer({ mode: 'timestamp' }),
  problems: text(),
  hypocritical: integer({ mode: 'boolean' }).default(false), //scheinträchtig
  pregnant: integer({ mode: 'boolean' }).default(false), //trächtig
  notes: text(),
});

export type HeatPhase = InferSelectModel<typeof heat_phase>;
export type InsertHeatPhase = InferInsertModel<typeof heat_phase>;

export const insertHeatPhaseSchema = createInsertSchema(heat_phase);
