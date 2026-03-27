"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    User, 
    Mail, 
    Shield, 
    Lock, 
    Camera, 
    Edit2, 
    Check, 
    X, 
    TrendingUp, 
    Calendar,
    Settings,
    Bell,
    ExternalLink
} from 'lucide-react';
import { Card, Input, Button, Avatar, Tag, Tabs, message, Progress, Divider } from 'antd';
import { useUpdateProfile, useUpdatePassword } from '@/hooks/authHooks';

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

export default function ProfileView({ user, isAdmin = false }) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const { mutate: updateProfile, isLoading: isUpdatingProfile } = useUpdateProfile();
    const { mutate: updatePassword, isLoading: isUpdatingPassword } = useUpdatePassword();

    const handleProfileSubmit = () => {
        updateProfile(formData, {
            onSuccess: () => {
                message.success('Profile updated successfully');
                setIsEditing(false);
            },
            onError: (err) => message.error(err.message),
        });
    };

    const handlePasswordSubmit = () => {
        if (passwords.newPassword !== passwords.confirmPassword) {
            return message.error('Passwords do not match');
        }
        updatePassword({
            oldPassword: passwords.currentPassword,
            newPassword: passwords.newPassword,
        }, {
            onSuccess: () => {
                message.success('Password updated successfully');
                setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
            },
            onError: (err) => message.error(err.message),
        });
    };

    const items = [
        {
            key: '1',
            label: (
                <span className="flex items-center gap-2">
                    <User size={16} />
                    Account
                </span>
            ),
            children: (
                <div className="space-y-6 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Name</label>
                            <Input 
                                prefix={<User size={16} className="text-gray-400" />}
                                value={formData.name}
                                disabled={!isEditing}
                                className="h-12 rounded-xl bg-gray-50/50 border-gray-100"
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address</label>
                            <Input 
                                prefix={<Mail size={16} className="text-gray-400" />}
                                value={formData.email}
                                disabled={!isEditing}
                                className="h-12 rounded-xl bg-gray-50/50 border-gray-100"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        {!isEditing ? (
                            <Button 
                                type="primary" 
                                icon={<Edit2 size={16} />}
                                onClick={() => setIsEditing(true)}
                                className="h-11 rounded-xl bg-[#5C45FD] border-none px-6"
                            >
                                Edit Profile
                            </Button>
                        ) : (
                            <>
                                <Button 
                                    icon={<X size={16} />}
                                    onClick={() => {
                                        setIsEditing(false);
                                        setFormData({ name: user.name, email: user.email });
                                    }}
                                    className="h-11 rounded-xl px-6"
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    type="primary" 
                                    icon={<Check size={16} />}
                                    loading={isUpdatingProfile}
                                    onClick={handleProfileSubmit}
                                    className="h-11 rounded-xl bg-[#5C45FD] border-none px-6"
                                >
                                    Save Changes
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <span className="flex items-center gap-2">
                    <Shield size={16} />
                    Security
                </span>
            ),
            children: (
                <div className="space-y-6 pt-4">
                    <div className="max-w-md space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Current Password</label>
                            <Input.Password 
                                prefix={<Lock size={16} className="text-gray-400" />}
                                value={passwords.currentPassword}
                                className="h-12 rounded-xl bg-gray-50/50 border-gray-100"
                                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">New Password</label>
                            <Input.Password 
                                prefix={<Lock size={16} className="text-gray-400" />}
                                value={passwords.newPassword}
                                className="h-12 rounded-xl bg-gray-50/50 border-gray-100"
                                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Confirm New Password</label>
                            <Input.Password 
                                prefix={<Lock size={16} className="text-gray-400" />}
                                value={passwords.confirmPassword}
                                className="h-12 rounded-xl bg-gray-50/50 border-gray-100"
                                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                            />
                        </div>
                        <Button 
                            type="primary" 
                            className="h-11 rounded-xl bg-black border-none px-6"
                            loading={isUpdatingPassword}
                            onClick={handlePasswordSubmit}
                        >
                            Update Password
                        </Button>
                    </div>
                </div>
            ),
        },
        {
            key: '3',
            label: (
                <span className="flex items-center gap-2">
                    <Settings size={16} />
                    Preferences
                </span>
            ),
            children: (
                <div className="space-y-6 pt-4">
                    <Card className="bg-gray-50/50 border-gray-100 rounded-2xl">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                    <Bell size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Email Notifications</h4>
                                    <p className="text-xs text-gray-500">Stay updated with detection results & security alerts</p>
                                </div>
                            </div>
                            <Button className="rounded-lg">Configure</Button>
                        </div>
                    </Card>
                </div>
            ),
        },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header / Cover */}
            <motion.div 
                {...fadeIn}
                className="relative h-64 rounded-3xl overflow-hidden bg-gradient-to-r from-[#5C45FD] via-[#8E78FF] to-cyan-500 shadow-2xl"
            >
                <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
                <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between">
                    <div className="flex items-center gap-8">
                        <div className="relative group">
                            <Avatar 
                                size={120} 
                                src={user?.avatar?.url}
                                className="border-4 border-white shadow-2xl bg-white text-[#5C45FD] text-4xl font-bold"
                            >
                                {user?.name?.charAt(0)}
                            </Avatar>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <Camera className="text-white" size={24} />
                            </div>
                        </div>
                        <div className="mb-4">
                            <h1 className="text-4xl font-bold text-white tracking-tight">{user?.name}</h1>
                            <div className="flex items-center gap-3 mt-2 text-white/80">
                                <Tag color={isAdmin ? 'gold' : 'blue'} className="bg-white/10 backdrop-blur-md border-white/20 text-white rounded-full px-4 py-0.5 border-none font-medium uppercase tracking-wider text-[10px]">
                                    {user?.role || (isAdmin ? 'Admin' : 'Pro Member')}
                                </Tag>
                                <span className="flex items-center gap-1.5 text-xs">
                                    <Calendar size={12} />
                                    Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Mar 2024'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sidebar Info */}
                <motion.div 
                    {...fadeIn}
                    transition={{ delay: 0.1 }}
                    className="space-y-6"
                >
                    <Card className="rounded-3xl border-gray-100 shadow-sm overflow-hidden" styles={{ body: { padding: 0 } }}>
                        <div className="p-6 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                                    <Shield size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900">Account Status</h4>
                                    <p className="text-xs text-green-600 font-medium">Verified & active</p>
                                </div>
                            </div>
                            <Divider className="my-0" />
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Security Score</span>
                                    <span className="font-bold text-gray-900">98/100</span>
                                </div>
                                <Progress percent={98} strokeColor="#5C45FD" size="small" showInfo={false} />
                            </div>
                        </div>
                        <div className="bg-gray-50 p-6 flex items-center justify-between">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Storage used</span>
                            <span className="text-xs font-bold text-gray-900 tracking-tight">2.4 GB / 10 GB</span>
                        </div>
                    </Card>

                    {!isAdmin && (
                        <Card className="rounded-3xl border-none bg-black text-white p-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#5C45FD]/20 blur-3xl rounded-full translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform" />
                            <div className="relative z-10 space-y-4">
                                <StarIcon className="text-yellow-400 w-8 h-8" />
                                <h3 className="text-xl font-bold">DeepShield Pro</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">Unlock advanced temporal analysis and batch processing.</p>
                                <Button className="w-full bg-white text-black border-none h-11 rounded-xl font-bold">Manage Plan</Button>
                            </div>
                        </Card>
                    )}
                </motion.div>

                {/* Main Content Areas */}
                <motion.div 
                    {...fadeIn}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2"
                >
                    <Card className="rounded-3xl border-gray-100 shadow-sm min-h-[500px]">
                        <Tabs 
                            defaultActiveKey="1" 
                            items={items} 
                            className="profile-tabs"
                        />
                    </Card>
                </motion.div>
            </div>

            <style jsx global>{`
                .profile-tabs .ant-tabs-nav::before {
                    border-bottom: 2px solid #F3F4F6 !important;
                }
                .profile-tabs .ant-tabs-tab {
                    padding: 12px 16px !important;
                    font-weight: 600 !important;
                    color: #9CA3AF !important;
                }
                .profile-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
                    color: #5C45FD !important;
                }
                .profile-tabs .ant-tabs-ink-bar {
                    background: #5C45FD !important;
                    height: 3px !important;
                    border-radius: 3px 3px 0 0 !important;
                }
            `}</style>
        </div>
    );
}

function StarIcon({ className }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
    )
}
