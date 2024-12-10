import { Database } from '@/db/database';
import { Checkup, CheckupAnswer, InsertCheckupAnswer } from '@/db/schema';
import { create } from 'zustand';

interface CheckupStore {
  checkups: Checkup[];
  checkupAnswers: CheckupAnswer[];

  fetchCheckups: (dogId: number) => Promise<void>;

  createNewCheckup: (
    dogId: number,
    answers: Omit<InsertCheckupAnswer, 'checkup_id'>[],
    previousDate?: Date,
  ) => Promise<void>;
  deleteCheckups: () => Promise<void>;
}

const useCheckupStore = create<CheckupStore>((set, get) => ({
  checkups: [],
  checkupAnswers: [],

  fetchCheckups: async (dogId: number) => {
    try {
      const checkups = await Database.getCheckupsByDogId(dogId).then(
        (checkups) =>
          checkups.sort((a, b) => b.date.getTime() - a.date.getTime()),
      );
      const checkupAnswers = await Database.getCheckupAnswersByCheckupIds(
        checkups.map((c) => c.id),
      );

      set({ checkups, checkupAnswers });
    } catch (error) {
      console.error('Failed to fetch checkups:', error);
      throw error;
    }
  },

  createNewCheckup: async (
    dogId: number,
    answers: Omit<InsertCheckupAnswer, 'checkup_id'>[],
    previousDate?: Date,
  ) => {
    try {
      // Create new checkup
      const checkupId = await Database.insertCheckup({
        dog_id: dogId,
        date: previousDate ?? new Date(),
      });

      // Add checkup_id to answers
      const checkupAnswers = answers.map((answer) => ({
        ...answer,
        checkup_id: checkupId,
      }));

      // Save answers
      await Database.insertCheckupAnswers(checkupAnswers);

      // Fetch updated checkups
      get().fetchCheckups(dogId);
    } catch (error) {
      console.error('Failed to create checkup:', error);
      throw error;
    }
  },
  deleteCheckups: async () => {
    await Database.deleteCheckups();
    set({ checkups: undefined, checkupAnswers: undefined });
  },
}));

export default useCheckupStore;
