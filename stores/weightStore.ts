import { Database } from '@/db/database';
import { InsertWeight, insertWeightSchema, Weight } from '@/db/schema';
import { create } from 'zustand';
import { z } from 'zod';

interface WeightStore {
  weights: Weight[];

  fetchWeights: (dogId: number) => Promise<void>;

  createNewWeight: (weight: InsertWeight) => Promise<void>;
}

const useWeightStore = create<WeightStore>((set, get) => ({
  weights: [],

  fetchWeights: async (dogId: number) => {
    try {
      const weights = await Database.getWeightsByDogId(dogId).then((weights) =>
        weights.sort((a, b) => b.date.getTime() - a.date.getTime()),
      );

      set({ weights });
    } catch (error) {
      console.error('Failed to fetch checkups:', error);
      throw error;
    }
  },

  createNewWeight: async (weight: InsertWeight) => {
    const validatedWeight = insertWeightSchema.parse(weight);

    try {
      await Database.insertWeight(validatedWeight);
      get().fetchWeights(weight.dog_id);
    } catch (error) {
      console.error('Failed to create weight:', error);
      throw error;
    }
  },
}));

export const useLatestWeights = () => {
  const weights = useWeightStore((state) => state.weights);

  const sortedWeights = [...weights].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return {
    latest: sortedWeights[0] || null,
    previous: sortedWeights[1] || null,
    all: sortedWeights,
  };
};

export default useWeightStore;
