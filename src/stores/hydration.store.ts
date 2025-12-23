import { create } from 'zustand';
import { http } from '../services/http';
import { useUserStore } from './user.store';
import type { HydrationResponse } from '../types/api';

interface HydrationStore {
    hydration: number;
    meta: number;
    loading: boolean;
    progress: number;
    isGoalReached: boolean;
    fetchHydrationDaily: () => void;
    addHydration: (value: number) => void;
    setMeta: (value: number) => void;
}

const calculateState = (hydration: number, meta: number) => ({
    hydration,
    progress: meta > 0 ? Math.min((hydration / meta) * 100, 100) : 0,
    isGoalReached: hydration >= meta,
});

export const useHydrationStore = create<HydrationStore>()((set, get) => ({
    hydration: 0,
    meta: 2000,
    loading: false,
    progress: 0,
    isGoalReached: false,

    fetchHydrationDaily: async () => {
        const userId = useUserStore.getState().user?.id;
        if (!userId) return;

        const date = new Date().toISOString().split('T')[0];
        set({ loading: true });

        try {
            const { data } = await http.get<HydrationResponse>(`/hydration/${userId}/${date}`);
            const value = Number(data?.totalMl) || 0;

            set({ ...calculateState(value, get().meta), loading: false });
        } catch (error) {
            set({ ...calculateState(0, get().meta), loading: false });
        }
    },

    addHydration: async (value: number) => {
        const userId = useUserStore.getState().user?.id;
        if (!userId || value <= 0) return;

        const date = new Date().toISOString().split('T')[0];
        const newTotal = get().hydration + value;

        set({ loading: true });

        try {
            const { data } = await http.post<HydrationResponse>('/hydration', {
                userId,
                date,
                totalMl: newTotal,
            });

            const confirmedValue = Number(data?.totalMl) || newTotal;
            set({ ...calculateState(confirmedValue, get().meta), loading: false });
        } catch (error) {
            set({ loading: false });
        }
    },

    setMeta: (value: number) => {
        const newMeta = Math.max(value, 1);
        set({ meta: newMeta, ...calculateState(get().hydration, newMeta) });
    },
}));
