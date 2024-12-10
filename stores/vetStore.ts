import { create } from 'zustand';
import { Vet, InsertVet } from '@/db/schema';
import { Database } from '@/db/database';

interface VetStore {
  vets: Vet[];
  setVets: (vets: Vet[]) => void;
  createNewVet: (insertVet: InsertVet) => Promise<void>;
  deleteVet: (vetId: number) => Promise<void>;
  deleteAllVets: () => Promise<void>;
  setVet: (data: Partial<InsertVet>, vetId: number) => Promise<void>;
}

const useVetStore = create<VetStore>((set, get) => ({
  vets: [],
  setVets: (vets: Vet[]) => set({ vets }),
  createNewVet: async (insertVet: InsertVet) => {
    await Database.insertVet(insertVet);
    const updatedVets = await Database.getAllVets();
    set({ vets: updatedVets });
  },
  deleteVet: async (vetId: number) => {
    await Database.deleteVet(vetId);
    const updatedVets = await Database.getAllVets();
    set({ vets: updatedVets });
  },
  deleteAllVets: async () => {
    await Database.deleteAllVets();
    set({ vets: [] });
  },
  setVet: async (data: Partial<InsertVet>, vetId: number) => {
    await Database.updateVet(data, vetId);
    const updatedVets = await Database.getAllVets();
    set({ vets: updatedVets });
  },
}));

export default useVetStore;
