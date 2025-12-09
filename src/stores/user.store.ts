import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LoginType, RegisterType } from '../utils/validators';
import { auth } from '../lib/auth.client';

interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;

  loadSession: () => Promise<void>;
  signUp: (data: RegisterType) => Promise<void>;
  signIn: (data: LoginType) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: true,

      loadSession: async () => {
        set({ loading: true });
        try {
          const session = await auth.getSession();
          const u = session.data?.user;
          if (!u) set({ user: null, isAuthenticated: false, loading: false });
          set({ user: u as User, isAuthenticated: true, loading: false });
        } catch (error) {
          set({ user: null, isAuthenticated: false, loading: false });
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      signUp: async (data) => {
        const response = await auth.signUp.email(data);
        if (response.error) throw new Error(response.error.message);
      },

      signIn: async (data) => {
        const response = await auth.signIn.email({
          email: data.email,
          password: data.password,
          callbackURL: '/',
        });
        if (response.error) throw new Error(response.error.message);
        if (response.data?.user) {
          set({ user: response.data.user as User, isAuthenticated: true });
        }
      },

      signOut: async () => {
        await auth.signOut();
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'user-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
