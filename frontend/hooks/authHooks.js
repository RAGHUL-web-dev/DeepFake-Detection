import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'next/navigation';

const API_URL = 'http://localhost:5000/api/v1/auth'; // Adjust based on backend

export const useRegisterUser = () => {
    const setAuth = useAuthStore((state) => state.setAuth);
    const router = useRouter();

    return useMutation({
        mutationFn: async (userData) => {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            return response.json();
        },
        onSuccess: (data) => {
            if (data.success) {
                // No auto-login on register, redirect to login page
                router.push('/auth/login');
            }
        },
    });
};

export const useLoginUser = () => {
    const setAuth = useAuthStore((state) => state.setAuth);
    const router = useRouter();

    return useMutation({
        mutationFn: async (credentials) => {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            return response.json();
        },
        onSuccess: (data) => {
            if (data.success) {
                setAuth(data.user, data.token);
                router.push('/'); // Redirect to home or dashboard
            }
        },
    });
};
