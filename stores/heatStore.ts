import { Database } from '@/db/database';
import { Heat, InsertHeat, insertHeatSchema } from '@/db/schema';
import { create } from 'zustand';

interface HeatStore {
  heat: Heat[];
  fetchHeat: (dogId: number) => Promise<void>;
  createNewHeat: (heat: InsertHeat) => Promise<void>;
}

const useHeatStore = create<HeatStore>((set, get) => ({
  heat: [],

  fetchHeat: async (dogId: number) => {
    try {
      const heat = await Database.getHeatByDogId(dogId).then((heat) =>
        heat.sort((a, b) => b.start_date.getTime() - a.start_date.getTime()),
      );

      set({ heat });
    } catch (error) {
      console.error('Failed to fetch heat:', error);
      throw error;
    }
  },

  createNewHeat: async (heat: InsertHeat) => {
    const validatedHeat = insertHeatSchema.parse(heat);

    try {
      await Database.insertHeat(validatedHeat);
      get().fetchHeat(heat.dog_id);
    } catch (error) {
      console.error('Failed to create heat:', error);
      throw error;
    }
  },
}));

export const useLatestHeat = () => {
  const heat = useHeatStore((state) => state.heat);

  const sortedHeat = [...heat].sort(
    (a, b) =>
      new Date(b.start_date).getTime() - new Date(a.start_date).getTime(),
  );

  return {
    latest: sortedHeat[0] || null,
    previous: sortedHeat[1] || null,
    all: sortedHeat,
  };
};

export default useHeatStore;
