import { Database } from "@/db/database";
import { MedicalInfo, InsertMedicalInfo, medical_info } from "@/db/schema";
import { create } from "zustand";

interface MedicalInfoStore {
  medicalInfo: MedicalInfo | null;
  setMedicalInfo: (medicalInfo: MedicalInfo | null) => void;
  createNewMedicalInfo: (insertMedicalInfo: InsertMedicalInfo) => Promise<void>;
  deleteMedicalInfo: () => Promise<void>;
}

const useMedicalInfoStore = create<MedicalInfoStore>((set, get) => ({
  medicalInfo: null,
  setMedicalInfo: async (medicalInfo: MedicalInfo | null) => {
    if (medicalInfo) {
      await Database.updateMedicalInfo(medicalInfo);
    }
    set({ medicalInfo });
  },
  createNewMedicalInfo: async (insertMedicalInfo: InsertMedicalInfo) => {
    const store = get();
    if (store.medicalInfo) {
      console.error(`Medical Info already exists`, store.medicalInfo);
      throw new Error("Medical Info already exists");
    }

    await Database.insertMedicalInfo(insertMedicalInfo);
    const dbMedicalInfo = await Database.getPrimaryMedicalInfo();
    if (!dbMedicalInfo) {
      console.error(`Medical Info not found after creation`, dbMedicalInfo);
      throw new Error("Medical Info not found after creation");
    }

    set({ medicalInfo: dbMedicalInfo });
  },
  deleteMedicalInfo: async () => {
    await Database.deleteMedicalInfo();
    set({ medicalInfo: null });
  },
}));

export default useMedicalInfoStore;
