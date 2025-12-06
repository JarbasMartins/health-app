import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface HydrationStore {
  hydration: number;
  meta: number;
  loading: boolean;
  progress: number;
  isGoalReached: boolean;
  setHydration: (value: number) => void;
  addHydration: (value: number) => void;
  resetHydration: () => void;
  setMeta: (value: number) => void;
}

export const useHydrationStore = create<HydrationStore>()(
  persist(
    (set, get) => ({
      hydration: 0,
      meta: 2000,
      loading: false,
      progress: 0,
      isGoalReached: false,

      setHydration: (value: number) => {
        const hydration = Math.max(value, 0);
        const progress = Math.min((hydration / get().meta) * 100, 100);
        const isGoalReached = hydration >= get().meta;
        set({ hydration, progress, isGoalReached });
      },

      addHydration: (value: number) => {
        const meta = get().meta;
        const newHydration = Math.max(get().hydration + value, 0);
        const progress = Math.min((newHydration / get().meta) * 100, 100);
        const isGoalReached = newHydration >= meta;
        set({ hydration: newHydration, progress, isGoalReached });
      },

      resetHydration: () =>
        set({ hydration: 0, progress: 0, isGoalReached: false }),

      setMeta: (value) => {
        const meta = value;
        const hydration = get().hydration;
        const progress = Math.min((hydration / meta) * 100, 100);
        const isGoalReached = hydration >= meta;
        set({ meta, progress, isGoalReached });
      },
    }),
    { name: 'hydration-store' }
  )
);
