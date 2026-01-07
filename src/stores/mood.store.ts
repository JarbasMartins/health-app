import { create } from 'zustand';
import { http } from '../services/http';
import { useUserStore } from './user.store';
import type { MoodResponse, MoodDTO } from '../types/api';

interface MoodStore {
    mood: string;
    tags: string[];
    comment: string;
    error: string | null;
    loading: boolean;
    fetchDailyMood: () => Promise<void>;
    saveMood: (data: MoodDTO) => Promise<boolean>;
    clearError: () => void;
}

const getCurrentDate = () => new Date().toISOString().split('T')[0];

export const useMoodStore = create<MoodStore>()((set) => ({
    mood: '',
    tags: [],
    comment: '',
    error: null,
    loading: false,

    fetchDailyMood: async () => {
        const userId = useUserStore.getState().user?.id;
        if (!userId) return;

        set({ loading: true, error: null });
        try {
            const date = getCurrentDate();
            const { data } = await http.get<MoodResponse>(`/mood/${userId}/${date}`);
            const tags = data?.tags ? data.tags.split(',') : [];
            set({ mood: data?.mood, tags, comment: data?.comment, loading: false });
        } catch (error) {
            set({ loading: false, error: 'Erro ao carregar dados.' });
        }
    },

    saveMood: async (formData) => {
        const userId = useUserStore.getState().user?.id;
        if (!userId) return false;
        set({ loading: true, error: null });
        try {
            const date = getCurrentDate();
            const payload = { userId, date, mood: formData.mood, tags: formData.tags.join(','), comment: formData.comment };
            const { data } = await http.post('mood', payload);
            const tags = data.tags ? data.tags.split(',') : [];
            set({ mood: data.mood, tags, comment: data.comment, loading: false });
            return true;
        } catch (error) {
            set({ loading: false, error: 'Falha ao salvar. Tente novamente.' });
            return false;
        }
    },
    clearError: () => set({ error: null }),
}));
