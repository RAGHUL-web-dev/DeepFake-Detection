import { useMutation, useQueryClient } from '@tanstack/react-query';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

// Shared fetch helper
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

// Upload any media file — sends multipart/form-data
export const useUploadMedia = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ file, onProgress }) => {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch(`${API_BASE}/upload`, {
                method: 'POST',
                credentials: 'include',
                // Do NOT set Content-Type header — browser sets it with boundary for multipart
                body: formData,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Upload failed');
            return data;
        },
        onSuccess: () => {
            // Invalidate queries so dashboard updates instantly after upload
            queryClient.invalidateQueries({ queryKey: ['userMedia'] });
            queryClient.invalidateQueries({ queryKey: ['userStats'] });
            queryClient.invalidateQueries({ queryKey: ['adminMedia'] });
            queryClient.invalidateQueries({ queryKey: ['adminStats'] });
        },
    });
};

// Analyze text snippet
export const useAnalyzeText = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (message) => apiFetch('/upload/text', { method: 'POST', body: JSON.stringify({ message }) }),
        onSuccess: () => {
            // Invalidate queries so dashboard updates instantly
            queryClient.invalidateQueries({ queryKey: ['userMedia'] });
            queryClient.invalidateQueries({ queryKey: ['userStats'] });
            queryClient.invalidateQueries({ queryKey: ['adminMedia'] });
            queryClient.invalidateQueries({ queryKey: ['adminStats'] });
        },
    });
};

// Poll detection status for a specific media item
export const useMediaStatus = (mediaId) => {
    return {
        refetchUrl: `${API_BASE}/upload/status/${mediaId}`,
    };
};
