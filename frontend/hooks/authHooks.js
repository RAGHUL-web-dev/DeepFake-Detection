import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

// Shared fetch helper — always sends cookies
const apiFetch = async (path, options = {}) => {
    const res = await fetch(`${API_BASE}${path}`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
        ...options,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Request failed');
    return data;
};

// ─── AUTH Mutations ────────────────────────────────────────────────────────────

export const useRegisterUser = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: (userData) =>
            apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
        onSuccess: (data) => {
            if (data.success) router.push('/auth/login');
        },
    });
};

export const useLoginUser = () => {
    const { setAuth } = useAuthStore();
    const router = useRouter();

    return useMutation({
        mutationFn: (credentials) =>
            apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
        onSuccess: (data) => {
            if (data.success) {
                setAuth(data.user, data.token);
                // Role-based redirect
                if (data.user?.role === 'admin') {
                    router.push('/admin');
                } else {
                    router.push('/dashboard');
                }
            }
        },
    });
};

export const useLogoutUser = () => {
    const { logout } = useAuthStore();
    const router = useRouter();

    return useMutation({
        mutationFn: () => apiFetch('/auth/logout'),
        onSuccess: () => {
            logout();
            router.push('/auth/login');
        },
        onError: () => {
            // Always clear local state even if server errors
            logout();
            router.push('/auth/login');
        }
    });
};

// ─── SESSION Rehydration ───────────────────────────────────────────────────────

// Call this in layouts to verify the session is still valid
export const useCurrentUser = () => {
    const { setUser, logout } = useAuthStore();

    return useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const data = await apiFetch('/user/me');
            setUser(data.user);
            return data;
        },
        retry: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
        onError: () => {
            logout(); // clear stale local state if session expired
        }
    });
};

// ─── USER Dashboard Data ───────────────────────────────────────────────────────

export const useUserStats = () => {
    return useQuery({
        queryKey: ['userStats'],
        queryFn: () => apiFetch('/user/me'),
        staleTime: 1000 * 60 * 2,
    });
};

export const useUserMedia = () => {
    return useQuery({
        queryKey: ['userMedia'],
        queryFn: () => apiFetch('/user/media'),
        staleTime: 1000 * 60 * 2,
    });
};
