import { Database } from "@/db/database";
import { GeneralInfo, InsertGeneralInfo } from "@/db/schema";
import { create } from "zustand";

interface GeneralInfoStore {
  generalInfo: GeneralInfo | null;
  setGeneralInfo: (generalInfo: GeneralInfo | null) => void;
  createNewGeneralInfo: (insertGeneralInfo: InsertGeneralInfo) => Promise<void>;
  deleteGeneralInfo: () => Promise<void>;
}

const useGeneralInfoStore = create<GeneralInfoStore>((set, get) => ({
  generalInfo: null,
  setGeneralInfo: async (generalInfo: GeneralInfo | null) => {
    if (generalInfo) {
      await Database.updateVet(generalInfo);
    }
    set({ generalInfo });
  },
  createNewGeneralInfo: async (insertGeneralInfo: InsertGeneralInfo) => {
    const store = get();
    if (store.generalInfo) {
      console.error(`General Info already exists`, store.generalInfo);
      throw new Error("General Info already exists");
    }

    await Database.insertGeneralInfo(insertGeneralInfo);
    const dbGeneralInfo = await Database.getPrimaryGeneralInfo();
    if (!dbGeneralInfo) {
      console.error(`General Info not found after creation`, dbGeneralInfo);
      throw new Error("General Info not found after creation");
    }

    set({ generalInfo: dbGeneralInfo });
  },
  deleteGeneralInfo: async () => {
    await Database.deleteGeneralInfo();
    set({ generalInfo: null });
  },
}));

export default useGeneralInfoStore;
