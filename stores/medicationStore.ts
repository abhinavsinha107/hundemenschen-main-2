import { Database } from "@/db/database";
import { Medication, InsertMedication } from "@/db/schema";
import { create } from "zustand";

interface MedicationStore {
  medication: Medication | null;
  setMedication: (medication: Medication | null) => void;
  createNewMedication: (insertMedication: InsertMedication) => Promise<void>;
  deleteMedication: () => Promise<void>;
}

const useMedicationStore = create<MedicationStore>((set, get) => ({
  medication: null,
  setMedication: (medication: Medication | null) => set({ medication }),
  createNewMedication: async (insertMedication: InsertMedication) => {
    const store = get();
    if (store.medication) {
      console.error(`Medication already exists`, store.medication);
      throw new Error("Medication already exists");
    }

    await Database.insertMedication(insertMedication);
    const dbMedication = await Database.getPrimaryMedication();
    if (!dbMedication) {
      console.error(`Medication not found after creation`, dbMedication);
      throw new Error("Medication not found after creation");
    }

    set({ medication: dbMedication });
  },
  deleteMedication: async () => {
    await Database.deleteMedication();
    set({ medication: null });
  },
}));

export default useMedicationStore;
