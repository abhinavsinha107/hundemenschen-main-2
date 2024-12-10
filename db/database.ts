import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite/next';
import {
  conspicuousness,
  Conspicuousness,
  Contact,
  contacts,
  Diagnosis,
  diagnosis,
  Dog,
  dogs,
  general_info,
  GeneralInfo,
  InsertConspicuousness,
  InsertContact,
  InsertDiagnosis,
  InsertDog,
  InsertGeneralInfo,
  InsertMedicalInfo,
  InsertVet,
  medical_info,
  MedicalInfo,
  medication,
  Medication,
  Vet,
  vet,
  checkup,
  checkup_answers,
  InsertCheckup,
  InsertCheckupAnswer,
  Checkup,
  CheckupAnswer,
  weight,
  Weight,
  InsertWeight,
  heat,
  InsertHeat,
  Heat,
  InsertHeatPhase,
  heat_phase,
  HeatPhase,
} from './schema';
import { eq, inArray } from 'drizzle-orm';

export class Database {
  static expo = openDatabaseSync('db.db');
  static db = drizzle(Database.expo);

  static async getPrimaryDog(): Promise<Dog | null> {
    const data = await Database.db.select().from(dogs).limit(1).execute();
    if (data.length === 0) {
      return null;
    }

    return data[0];
  }

  static async insertDog(data: InsertDog): Promise<number> {
    const res = await Database.db.insert(dogs).values(data).execute();
    return res.lastInsertRowId;
  }

  static async deleteDogs(): Promise<void> {
    await Database.db.delete(dogs).execute();
  }

  static async updateDog(data: Partial<InsertDog>): Promise<void> {
    const existingDog = await Database.db
      .select()
      .from(dogs)
      .limit(1)
      .execute();

    if (existingDog.length === 0) {
      throw new Error('Kein Hund in der Datenbank gefunden.');
    }

    const dogId = existingDog[0].id;

    await Database.db
      .update(dogs)
      .set(data)
      .where(eq(dogs.id, dogId))
      .execute();
  }

  static async getPrimaryContact(): Promise<Contact | null> {
    const data = await Database.db
      .select()
      .from(contacts)
      .where(eq(contacts.position, 1))
      .limit(1)
      .execute();
    return data.length === 0 ? null : data[0];
  }

  static async getSecondaryContact(): Promise<Contact | null> {
    const data = await Database.db
      .select()
      .from(contacts)
      .where(eq(contacts.position, 2))
      .limit(1)
      .execute();
    return data.length === 0 ? null : data[0];
  }

  static async createPrimaryContact(data: InsertContact): Promise<number> {
    const res = await Database.db
      .insert(contacts)
      .values({ ...data, position: 1 })
      .execute();
    return res.lastInsertRowId;
  }

  static async createSecondaryContact(data: InsertContact): Promise<number> {
    const res = await Database.db
      .insert(contacts)
      .values({ ...data, position: 2 })
      .execute();
    return res.lastInsertRowId;
  }

  static async updateContact(
    contactId: number,
    data: Partial<InsertContact>,
  ): Promise<void> {
    await Database.db
      .update(contacts)
      .set(data)
      .where(eq(contacts.id, contactId))
      .execute();
  }

  static async deleteContact(contactId: number): Promise<void> {
    await Database.db
      .delete(contacts)
      .where(eq(contacts.id, contactId))
      .execute();
  }

  static async getAllVets(): Promise<Vet[]> {
    const data = await Database.db.select().from(vet).execute();
    return data;
  }

  static async getPrimaryVet(): Promise<Vet | null> {
    const data = await Database.db
      .select()
      .from(vet)
      .where(eq(vet.origin_veterinary_practice, true))
      .limit(1)
      .execute();
    return data.length > 0 ? data[0] : null;
  }

  static async insertVet(data: InsertVet): Promise<number> {
    const res = await Database.db.insert(vet).values(data).execute();
    return res.lastInsertRowId;
  }

  static async deleteVet(vetId: number): Promise<void> {
    await Database.db.delete(vet).where(eq(vet.id, vetId)).execute();
  }

  static async deleteAllVets(): Promise<void> {
    await Database.db.delete(vet).execute();
  }

  static async updateVet(
    data: Partial<InsertVet>,
    vetId: number,
  ): Promise<void> {
    await Database.db.update(vet).set(data).where(eq(vet.id, vetId)).execute();
  }

  static async getPrimaryMedicalInfo(): Promise<MedicalInfo | null> {
    const data = await Database.db
      .select()
      .from(medical_info)
      .limit(1)
      .execute();
    if (data.length === 0) {
      return null;
    }

    return data[0];
  }

  static async insertMedicalInfo(data: InsertMedicalInfo): Promise<number> {
    const res = await Database.db.insert(medical_info).values(data).execute();
    return res.lastInsertRowId;
  }

  static async deleteMedicalInfo(): Promise<void> {
    await Database.db.delete(medical_info).execute();
  }

  static async updateMedicalInfo(
    data: Partial<InsertMedicalInfo>,
  ): Promise<void> {
    const existingMedicalInfo = await Database.db
      .select()
      .from(medical_info)
      .limit(1)
      .execute();

    if (existingMedicalInfo.length === 0) {
      throw new Error('Kein Arzt in der Datenbank gefunden.');
    }

    const medicalInfoId = existingMedicalInfo[0].id;

    await Database.db
      .update(medical_info)
      .set(data)
      .where(eq(medical_info.id, medicalInfoId))
      .execute();
  }

  static async getPrimaryDiagnosis(): Promise<Diagnosis | null> {
    const data = await Database.db.select().from(diagnosis).limit(1).execute();
    if (data.length === 0) {
      return null;
    }

    return data[0];
  }

  static async insertDiagnosis(data: InsertDiagnosis): Promise<number> {
    const res = await Database.db.insert(diagnosis).values(data).execute();
    return res.lastInsertRowId;
  }

  static async insertCheckup(data: InsertCheckup): Promise<number> {
    const res = await Database.db.insert(checkup).values(data).execute();
    return res.lastInsertRowId;
  }

  static async insertCheckupAnswers(
    data: InsertCheckupAnswer[],
  ): Promise<void> {
    await Database.db.insert(checkup_answers).values(data).execute();
  }

  static async getCheckupsByDogId(dogId: number): Promise<Checkup[]> {
    return await Database.db
      .select()
      .from(checkup)
      .where(eq(checkup.dog_id, dogId))
      .execute();
  }

  static async getCheckupAnswers(checkupId: number): Promise<CheckupAnswer[]> {
    return await Database.db
      .select()
      .from(checkup_answers)
      .where(eq(checkup_answers.checkup_id, checkupId))
      .execute();
  }

  static async getCheckupAnswersByCheckupIds(
    checkupIds: number[],
  ): Promise<CheckupAnswer[]> {
    return await Database.db
      .select()
      .from(checkup_answers)
      .where(inArray(checkup_answers.checkup_id, checkupIds))
      .execute();
  }

  static async deleteCheckups(): Promise<void> {
    await Database.db.delete(checkup).execute();
    await Database.db.delete(checkup_answers).execute();
  }

  static async deleteDiagnosis(): Promise<void> {
    await Database.db.delete(diagnosis).execute();
  }

  static async getPrimaryGeneralInfo(): Promise<GeneralInfo | null> {
    const data = await Database.db
      .select()
      .from(general_info)
      .limit(1)
      .execute();
    if (data.length === 0) {
      return null;
    }

    return data[0];
  }

  static async insertGeneralInfo(data: InsertGeneralInfo): Promise<number> {
    const res = await Database.db.insert(general_info).values(data).execute();
    return res.lastInsertRowId;
  }

  static async deleteGeneralInfo(): Promise<void> {
    await Database.db.delete(general_info).execute();
  }

  static async updateGeneralInfo(
    data: Partial<InsertGeneralInfo>,
  ): Promise<void> {
    const existingGeneralInfo = await Database.db
      .select()
      .from(general_info)
      .limit(1)
      .execute();

    if (existingGeneralInfo.length === 0) {
      throw new Error('Kein Arzt in der Datenbank gefunden.');
    }

    const generalInfoId = existingGeneralInfo[0].id;

    await Database.db
      .update(general_info)
      .set(data)
      .where(eq(general_info.id, generalInfoId))
      .execute();
  }

  static async getPrimaryConspicuousness(): Promise<Conspicuousness | null> {
    const data = await Database.db
      .select()
      .from(conspicuousness)
      .limit(1)
      .execute();
    if (data.length === 0) {
      return null;
    }

    return data[0];
  }

  static async insertConspicuousness(
    data: InsertConspicuousness,
  ): Promise<number> {
    const res = await Database.db
      .insert(conspicuousness)
      .values(data)
      .execute();
    return res.lastInsertRowId;
  }

  static async deleteConspicuousness(): Promise<void> {
    await Database.db.delete(conspicuousness).execute();
  }

  static async getPrimaryMedication(): Promise<Medication | null> {
    const data = await Database.db.select().from(medication).limit(1).execute();
    if (data.length === 0) {
      return null;
    }

    return data[0];
  }

  static async insertMedication(data: InsertMedicalInfo): Promise<number> {
    const res = await Database.db.insert(medication).values(data).execute();
    return res.lastInsertRowId;
  }

  static async deleteMedication(): Promise<void> {
    await Database.db.delete(medication).execute();
  }

  static async getWeightsByDogId(dogId: number): Promise<Weight[]> {
    return await Database.db
      .select()
      .from(weight)
      .where(eq(weight.dog_id, dogId))
      .execute();
  }

  static async insertWeight(data: InsertWeight): Promise<number> {
    const res = await Database.db.insert(weight).values(data).execute();
    return res.lastInsertRowId;
  }

  static async getHeatByDogId(dogId: number): Promise<Heat[]> {
    return await Database.db
      .select()
      .from(heat)
      .where(eq(heat.dog_id, dogId))
      .execute();
  }

  static async insertHeat(data: InsertHeat): Promise<number> {
    const res = await Database.db.insert(heat).values(data).execute();
    return res.lastInsertRowId;
  }

  static async getHeatPhaseByHeatId(heatId: number): Promise<HeatPhase[]> {
    return await Database.db
      .select()
      .from(heat_phase)
      .where(eq(heat_phase.heat_id, heatId))
      .execute();
  }

  static async insertHeatPhase(data: InsertHeatPhase): Promise<number> {
    const res = await Database.db.insert(heat_phase).values(data).execute();
    return res.lastInsertRowId;
  }
}
