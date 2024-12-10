import { Database } from '@/db/database';
import { Dog, InsertDog } from '@/db/schema';
import { create } from 'zustand';

interface DogStore {
  dog: Dog | null;
  setDog: (dog: Dog | null) => void;
  createNewDog: (insertDog: InsertDog) => Promise<void>;
  deleteDog: () => Promise<void>;
}

const useDogStore = create<DogStore>((set, get) => ({
  dog: null,
  setDog: async (dog: Dog | null) => {
    if (dog) {
      await Database.updateDog(dog);
    }
    set({ dog });
  },
  createNewDog: async (insertDog: InsertDog) => {
    const store = get();
    if (store.dog) {
      console.error(`Dog already exists`, store.dog);
      throw new Error("Dog already exists");
    }

    await Database.insertDog(insertDog);
    const dbDog = await Database.getPrimaryDog();
    if (!dbDog) {
      console.error(`Dog not found after creation`, dbDog);
      throw new Error("Dog not found after creation");
    }

    set({ dog: dbDog });
  },
  deleteDog: async () => {
    await Database.deleteDogs();
    set({ dog: null });
  },
}));

export default useDogStore;
