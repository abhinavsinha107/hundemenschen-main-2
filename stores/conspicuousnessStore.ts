import { Database } from "@/db/database";
import { Conspicuousness, InsertConspicuousness } from "@/db/schema";
import { create } from "zustand";

interface ConspicuousnessStore {
  conspicuousness: Conspicuousness | null;
  setConspicuousness: (conspicuousness: Conspicuousness | null) => void;
  createNewConspicuousness: (
    insertConspicuousness: InsertConspicuousness
  ) => Promise<void>;
  deleteConspicuousness: () => Promise<void>;
}

const useConspicuousnessStore = create<ConspicuousnessStore>((set, get) => ({
  conspicuousness: null,
  setConspicuousness: (conspicuousness: Conspicuousness | null) =>
    set({ conspicuousness }),
  createNewConspicuousness: async (
    insertConspicuousness: InsertConspicuousness
  ) => {
    const store = get();
    if (store.conspicuousness) {
      console.error(`Conspicuousness already exists`, store.conspicuousness);
      throw new Error("Conspicuousness already exists");
    }

    await Database.insertConspicuousness(insertConspicuousness);
    const dbConspicuousness = await Database.getPrimaryConspicuousness();
    if (!dbConspicuousness) {
      console.error(
        `Conspicuousness not found after creation`,
        dbConspicuousness
      );
      throw new Error("Conspicuousness not found after creation");
    }

    set({ conspicuousness: dbConspicuousness });
  },
  deleteConspicuousness: async () => {
    await Database.deleteConspicuousness();
    set({ conspicuousness: null });
  },
}));

export default useConspicuousnessStore;
