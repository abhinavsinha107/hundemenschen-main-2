import { Database } from '@/db/database';
import { HeatPhase, InsertHeatPhase, insertHeatPhaseSchema } from '@/db/schema';
import { create } from 'zustand';

interface HeatPhaseStore {
  heatPhase: HeatPhase[];
  fetchHeatPhases: (dogId: number) => Promise<void>;
  createNewHeatPhase: (heatPhase: InsertHeatPhase) => Promise<void>;
}

const useHeatPhaseStore = create<HeatPhaseStore>((set, get) => ({
  heatPhase: [],

  fetchHeatPhases: async (heatId: number) => {
    try {
      const heatPhase = await Database.getHeatPhaseByHeatId(heatId).then(
        (heatPhase) =>
          heatPhase.sort(
            (a, b) => b.start_date.getTime() - a.start_date.getTime(),
          ),
      );

      set({ heatPhase });
    } catch (error) {
      console.error('Failed to fetch heat phases:', error);
      throw error;
    }
  },

  createNewHeatPhase: async (heatPhase: InsertHeatPhase) => {
    const validatedHeatPhase = insertHeatPhaseSchema.parse(heatPhase);

    try {
      await Database.insertHeatPhase(validatedHeatPhase);
      get().fetchHeatPhases(heatPhase.heat_id);
    } catch (error) {
      console.error('Failed to create heat phase:', error);
      throw error;
    }
  },
}));

export const useLatestHeatPhase = () => {
  const heatPhase = useHeatPhaseStore((state) => state.heatPhase);

  const sortedHeatPhase = [...heatPhase].sort(
    (a, b) =>
      new Date(b.start_date).getTime() - new Date(a.start_date).getTime(),
  );

  return {
    latest: sortedHeatPhase[0] || null,
    previous: sortedHeatPhase[1] || null,
    all: sortedHeatPhase,
  };
};

export default useHeatPhaseStore;
