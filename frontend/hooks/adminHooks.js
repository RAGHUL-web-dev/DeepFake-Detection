import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

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

// Admin Stats
export const useAdminStats = () =>
    useQuery({
        queryKey: ['adminStats'],
        queryFn: () => apiFetch('/admin/stats'),
        staleTime: 1000 * 30, // refresh every 30 seconds
    });

// All Users
export const useAdminUsers = () =>
    useQuery({
        queryKey: ['adminUsers'],
        queryFn: () => apiFetch('/admin/users'),
        staleTime: 1000 * 60,
    });

// Single User
export const useAdminUser = (id) =>
    useQuery({
        queryKey: ['adminUser', id],
        queryFn: () => apiFetch(`/admin/user/${id}`),
        enabled: !!id,
    });

// Update User Role/Status
export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) =>
            apiFetch(`/admin/user/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
        },
    });
};

// Delete User
export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) =>
            apiFetch(`/admin/user/${id}`, { method: 'DELETE' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
        },
    });
};

// All Media
export const useAdminMedia = () =>
    useQuery({
        queryKey: ['adminMedia'],
        queryFn: () => apiFetch('/admin/media'),
        staleTime: 1000 * 60,
    });

// Delete Media
export const useDeleteMedia = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) =>
            apiFetch(`/admin/media/${id}`, { method: 'DELETE' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminMedia'] });
        },
    });
};
