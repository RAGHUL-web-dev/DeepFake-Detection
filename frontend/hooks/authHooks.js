import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
    const { setAuth } = useAuthStore();
    const router = useRouter();

    return useMutation({
        mutationFn: (userData) =>
            apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
        onSuccess: (data) => {
            if (data.success) {
                // Log them in immediately and send to home page
                setAuth(data.user, data.token);
                router.push('/');
            }
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
                // Always redirect to home page — navbar handles role-aware dashboard link
                router.push('/');
            }
        },
    });
};

export const useLogoutUser = () => {
    const { logout } = useAuthStore();
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: () => apiFetch('/auth/logout', { method: 'GET' }),
        onSuccess: () => {
            logout();
            queryClient.clear();
            router.push('/auth/login');
        },
        onError: () => {
            // Always clear local state even if server errors
            logout();
            queryClient.clear();
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
            try {
                const data = await apiFetch('/auth/me');
                setUser(data.user);
                return data;
            } catch (err) {
                logout(); // clear stale local state if session expired
                throw err;
            }
        },
        retry: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
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

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userData) =>
            apiFetch('/auth/update-details', { method: 'PUT', body: JSON.stringify(userData) }),
        onSuccess: () => {
            queryClient.invalidateQueries(['currentUser']);
        },
    });
};

export const useUpdatePassword = () => {
    return useMutation({
        mutationFn: (passwords) =>
            apiFetch('/auth/password/update', { method: 'PUT', body: JSON.stringify(passwords) }),
    });
};

