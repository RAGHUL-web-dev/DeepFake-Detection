"use client";

import ProfileView from '@/app/components/ProfileView';
import { useAuthStore } from '@/store/authStore';

export default function AdminProfilePage() {
    const { user } = useAuthStore();
    return (
        <div className="p-4">
            <ProfileView user={user} isAdmin={true} />
        </div>
    );
}
