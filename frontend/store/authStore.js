import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            // Call this from login mutation onSuccess
            setAuth: (user, token) => set({
                user,
                token,
                isAuthenticated: !!user
            }),

            // Call this to update user from /me endpoint
            setUser: (user) => set({ user, isAuthenticated: !!user }),

            logout: () => {
                set({ user: null, token: null, isAuthenticated: false });
            },

            // Convenience getter for role
            isAdmin: (state) => state.user?.role === 'admin',
        }),
        {
            name: 'auth-storage',
        }
    )
);
