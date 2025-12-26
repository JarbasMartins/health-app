import { create } from 'zustand';
import { http } from '../services/http';
import type { HydrationResponse } from '../types/api';
import { useUserStore } from './user.store';

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

    const clearTimer = () => {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
            debounceTimer = null;
        }
    };

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

            const date = getCurrentDate();
            set({ loading: true, error: null });

            try {
                const { data } = await http.get<HydrationResponse>(`/hydration/${userId}/${date}`);
                const value = Number(data?.totalMl) || 0;

                set({
                    hydration: value,
                    ...calculateState(value, get().meta),
                    loading: false,
                });
            } catch (error) {
                console.error('Erro ao buscar hidratação:', error);
                set({
                    hydration: 0,
                    ...calculateState(0, get().meta),
                    loading: false,
                    error: 'Não foi possível carregar os dados',
                });
            }
        },

        addHydration: async (value: number) => {
            const userId = useUserStore.getState().user?.id;
            if (!userId) {
                set({ error: 'Usuário não identificado' });
                return;
            }

            if (value <= 0) return;

            const date = getCurrentDate();
            const previousHydration = get().hydration;
            const newHydration = previousHydration + value;

            set({
                hydration: newHydration,
                ...calculateState(newHydration, get().meta),
                error: null,
            });

            clearTimer();

            debounceTimer = setTimeout(async () => {
                try {
                    const { data } = await http.post<HydrationResponse>('/hydration', {
                        userId,
                        date,
                        totalMl: newHydration,
                    });

                    const confirmedValue = Number(data?.totalMl) || newHydration;
                    set({
                        hydration: confirmedValue,
                        ...calculateState(confirmedValue, get().meta),
                    });
                } catch (error) {
                    console.error('Erro ao sincronizar:', error);

                    set({
                        hydration: previousHydration,
                        ...calculateState(previousHydration, get().meta),
                        error: 'Falha ao sincronizar. Tente novamente.',
                    });
                }
            }, 2000);
        },

        resetHydration: async () => {
            const userId = useUserStore.getState().user?.id;
            if (!userId) {
                set({ error: 'Usuário não identificado' });
                return;
            }

            const date = getCurrentDate();
            const previousHydration = get().hydration;

            set({
                hydration: 0,
                ...calculateState(0, get().meta),
                loading: true,
                error: null,
            });

            try {
                await http.post<HydrationResponse>('/hydration', {
                    userId,
                    date,
                    totalMl: 0,
                });

                set({ loading: false });
            } catch (error) {
                console.error('Erro ao resetar:', error);

                set({
                    hydration: previousHydration,
                    ...calculateState(previousHydration, get().meta),
                    loading: false,
                    error: 'Falha ao resetar. Tente novamente.',
                });
            }
        },

        setMeta: (value: number) => {
            const newMeta = Math.max(value, 100);
            set({
                meta: newMeta,
                ...calculateState(get().hydration, newMeta),
            });
        },

        clearError: () => set({ error: null }),
    };
});
