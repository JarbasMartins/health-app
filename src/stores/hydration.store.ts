import { create } from 'zustand';
import { http } from '../services/http';
import { useUserStore } from './user.store';
import type { HydrationResponse } from '../types/api';

interface HydrationStore {
    hydration: number;
    meta: number;
    loading: boolean;
    error: string | null;
    progress: number;
    isGoalReached: boolean;
    fetchHydrationDaily: () => Promise<void>;
    addHydration: (value: number) => Promise<void>;
    resetHydration: () => Promise<void>;
    setMeta: (value: number) => void;
    clearError: () => void;
}

const calculateState = (hydration: number, meta: number) => ({
    progress: meta > 0 ? Math.min((hydration / meta) * 100, 100) : 0,
    isGoalReached: hydration >= meta,
});

const getCurrentDate = () => new Date().toISOString().split('T')[0];

export const useHydrationStore = create<HydrationStore>()((set, get) => {
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    let stableValue: number | null = null;

    return {
        hydration: 0,
        meta: 2000,
        loading: false,
        error: null,
        progress: 0,
        isGoalReached: false,

        fetchHydrationDaily: async () => {
            const userId = useUserStore.getState().user?.id;
            if (!userId) {
                set({ error: 'Usuário não identificado' });
                return;
            }
            set({ loading: true, error: null });

            try {
                const date = getCurrentDate();
                const { data } = await http.get<HydrationResponse>(`/hydration/${userId}/${date}`);
                const value = Number(data?.totalMl) || 0;
                set({ hydration: value, ...calculateState(value, get().meta), loading: false });
            } catch (error) {
                set({ loading: false, error: 'Erro ao carregar dados.' });
            }
        },

        addHydration: async (value: number) => {
            const userId = useUserStore.getState().user?.id;
            if (!userId || value <= 0) return;

            if (stableValue === null) {
                stableValue = get().hydration;
            }

            const newHydration = get().hydration + value;
            set({ hydration: newHydration, ...calculateState(newHydration, get().meta), error: null });
            if (debounceTimer) clearTimeout(debounceTimer);

            debounceTimer = setTimeout(async () => {
                const date = getCurrentDate();
                try {
                    const totalToSend = get().hydration;
                    const { data } = await http.post<HydrationResponse>('/hydration', {
                        userId,
                        date,
                        totalMl: totalToSend,
                    });

                    const confirmedValue = Number(data?.totalMl);
                    set({ hydration: confirmedValue, ...calculateState(confirmedValue, get().meta) });
                    stableValue = null;
                } catch (error) {
                    const rollbackValue = stableValue ?? 0;
                    set({ hydration: rollbackValue, ...calculateState(rollbackValue, get().meta), error: 'Falha ao sincronizar. Tente novamente.' });
                }
            }, 1500);
        },

        resetHydration: async () => {
            const userId = useUserStore.getState().user?.id;
            if (!userId) return;

            if (debounceTimer) clearTimeout(debounceTimer);
            stableValue = null;

            const previousValue = get().hydration;
            set({ hydration: 0, ...calculateState(0, get().meta), loading: true });

            try {
                const date = getCurrentDate();
                const { data } = await http.post<HydrationResponse>('/hydration', {
                    userId,
                    date,
                    totalMl: 0,
                });
                set({ loading: false, hydration: Number(data?.totalMl) || 0 });
            } catch (error) {
                console.error('Erro ao resetar:', error);
                set({ hydration: previousValue, ...calculateState(previousValue, get().meta), loading: false, error: 'Não foi possível resetar.' });
            }
        },

        setMeta: (value: number) => {
            const normalizedMeta = Math.max(100, value);
            const hydration = get().hydration;

            const derived = calculateState(hydration, normalizedMeta);

            set({
                meta: normalizedMeta,
                ...derived,
            });
        },

        clearError: () => set({ error: null }),
    };
});
