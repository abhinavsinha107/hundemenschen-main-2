import { Database } from "@/db/database";
import { Diagnosis, InsertDiagnosis } from "@/db/schema";
import { create } from "zustand";

interface DiagnosisStore {
  diagnosis: Diagnosis | null;
  setDiagnosis: (diagnosis: Diagnosis | null) => void;
  createNewDiagnosis: (insertDiagnosis: InsertDiagnosis) => Promise<void>;
  deleteDiagnosis: () => Promise<void>;
}

const useDiagnosisStore = create<DiagnosisStore>((set, get) => ({
  diagnosis: null,
  setDiagnosis: (diagnosis: Diagnosis | null) => set({ diagnosis: diagnosis }),
  createNewDiagnosis: async (insertDiagnosis: InsertDiagnosis) => {
    const store = get();
    if (store.diagnosis) {
      console.error(`Diagnosis already exists`, store.diagnosis);
      throw new Error("Diagnosis already exists");
    }

    await Database.insertDiagnosis(insertDiagnosis);
    const dbDiagnosis = await Database.getPrimaryDiagnosis();
    if (!dbDiagnosis) {
      console.error(`Diagnosis not found after creation`, dbDiagnosis);
      throw new Error("Diagnosis not found after creation");
    }

    set({ diagnosis: dbDiagnosis });
  },
  deleteDiagnosis: async () => {
    await Database.deleteDiagnosis();
    set({ diagnosis: null });
  },
}));

export default useDiagnosisStore;
