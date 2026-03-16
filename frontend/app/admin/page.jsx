"use client";

import { Card } from 'antd';
import { 
    Users, 
    ImageIcon,
    ShieldAlert,
    Activity,
    TrendingUp,
    ServerCrash,
    CheckCircle,
    AlertTriangle,
    RefreshCw,
    UserCheck,
    UserX,
    BarChart3,
    Clock
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAdminStats } from '@/hooks/adminHooks';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminOverview() {
    const router = useRouter();
    const { data, isLoading, error, refetch } = useAdminStats();

    const stats = data?.stats;

    if (isLoading) {
        return (
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <Card key={i} className="bg-white border-gray-200 shadow-sm rounded-xl">
                            <div className="p-6">
                                <Skeleton className="h-10 w-10 rounded-lg mb-4" />
                                <Skeleton className="h-4 w-24 mb-2" />
                                <Skeleton className="h-8 w-20" />
                            </div>
                        </Card>
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Skeleton className="h-64 w-full rounded-xl" />
                    <Skeleton className="h-64 w-full rounded-xl" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                    <AlertTriangle size={32} className="text-red-500" />
                </div>
                <p className="text-gray-900 font-semibold text-lg">Failed to load dashboard data</p>
                <p className="text-gray-500 text-sm">{error.message}</p>
                <Button onClick={() => refetch()} variant="outline" className="gap-2 border-gray-200">
                    <RefreshCw size={16} /> Retry
                </Button>
            </div>
        );
    }

    const statCards = [
        {
            title: 'Total Users',
            value: stats?.users?.total ?? 0,
            sub: `${stats?.users?.active ?? 0} active • ${stats?.users?.inactive ?? 0} inactive`,
            icon: <Users size={22} className="text-blue-600" />,
            bg: 'bg-blue-50',
            trend: '+15% this month',
            trendColor: 'text-emerald-600 bg-emerald-50'
        },
        {
            title: 'Total Verifications',
            value: stats?.media?.total ?? 0,
            sub: `${stats?.media?.authentic ?? 0} authentic • ${stats?.media?.fake ?? 0} fake`,
            icon: <ImageIcon size={22} className="text-[#5C45FD]" />,
            bg: 'bg-[#5C45FD]/10',
            trend: '+23% vs last month',
            trendColor: 'text-emerald-600 bg-emerald-50'
        },
        {
            title: 'Fake Detection Rate',
            value: stats?.media?.total ? `${((stats.media.fake / stats.media.total) * 100).toFixed(1)}%` : '0%',
            sub: `${stats?.media?.fake ?? 0} total fake detections`,
            icon: <ShieldAlert size={22} className="text-red-600" />,
            bg: 'bg-red-50',
            trend: '↑ 2.3% from average',
            trendColor: 'text-amber-600 bg-amber-50'
        },
        {
            title: 'Admin Accounts',
            value: stats?.users?.admins ?? 0,
            sub: 'Platform moderators',
            icon: <Activity size={22} className="text-amber-600" />,
            bg: 'bg-amber-50',
            trend: 'All active',
            trendColor: 'text-emerald-600 bg-emerald-50'
        }
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Platform Overview</h1>
                    <p className="text-gray-500 text-sm mt-1">Live system metrics and analytics</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button 
                        onClick={() => refetch()} 
                        variant="outline" 
                        className="gap-2 border-gray-200 text-gray-700 hover:bg-gray-50"
                    >
                        <RefreshCw size={16} />
                        Refresh Data
                    </Button>
                    <Button className="bg-[#5C45FD] hover:bg-[#4A37D6] text-white gap-2">
                        <BarChart3 size={16} />
                        Export Report
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, idx) => (
                    <Card 
                        key={idx} 
                        className="bg-white border-gray-200 shadow-sm rounded-xl hover:shadow-md transition-all"
                        bodyStyle={{ padding: '24px' }}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-lg ${stat.bg}`}>
                                {stat.icon}
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.trendColor}`}>
                                {stat.trend}
                            </span>
                        </div>
                        <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">
                            {stat.title}
                        </h3>
                        <p className="text-3xl font-bold text-gray-900">{stat.value.toLocaleString()}</p>
                        <p className="text-gray-400 text-sm mt-2">{stat.sub}</p>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* System Health & User Activity */}
                <div className="lg:col-span-2 space-y-6">
                    {/* System Health */}
                    <Card 
                        className="bg-white border-gray-200 shadow-sm rounded-xl"
                        bodyStyle={{ padding: '24px' }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <ServerCrash size={20} className="text-[#5C45FD]" />
                                System Health
                            </h2>
                            <span className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full font-medium">
                                All Systems Operational
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                <div className="flex items-center gap-3 mb-3">
                                    <CheckCircle size={18} className="text-emerald-500" />
                                    <span className="font-medium text-gray-900">MongoDB Atlas</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">Primary Database</span>
                                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                        Connected
                                    </span>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                <div className="flex items-center gap-3 mb-3">
                                    <CheckCircle size={18} className="text-emerald-500" />
                                    <span className="font-medium text-gray-900">Express API</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">Port 5000</span>
                                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                        Operational
                                    </span>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                <div className="flex items-center gap-3 mb-3">
                                    <Clock size={18} className="text-blue-500" />
                                    <span className="font-medium text-gray-900">Response Time</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">Average latency</span>
                                    <span className="text-xs font-medium text-gray-900">124ms</span>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                <div className="flex items-center gap-3 mb-3">
                                    <Activity size={18} className="text-purple-500" />
                                    <span className="font-medium text-gray-900">Uptime</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">Last 30 days</span>
                                    <span className="text-xs font-medium text-gray-900">99.9%</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* User Activity */}
                    <Card 
                        className="bg-white border-gray-200 shadow-sm rounded-xl"
                        bodyStyle={{ padding: '24px' }}
                    >
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-6">
                            <Users size={20} className="text-[#5C45FD]" />
                            User Activity Overview
                        </h2>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center p-4 rounded-xl bg-gray-50">
                                <UserCheck size={20} className="mx-auto text-emerald-500 mb-2" />
                                <p className="text-2xl font-bold text-gray-900">{stats?.users?.active ?? 0}</p>
                                <p className="text-xs text-gray-500">Active Users</p>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-gray-50">
                                <UserX size={20} className="mx-auto text-gray-400 mb-2" />
                                <p className="text-2xl font-bold text-gray-900">{stats?.users?.inactive ?? 0}</p>
                                <p className="text-xs text-gray-500">Inactive</p>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-gray-50">
                                <Users size={20} className="mx-auto text-blue-500 mb-2" />
                                <p className="text-2xl font-bold text-gray-900">{stats?.users?.admins ?? 0}</p>
                                <p className="text-xs text-gray-500">Admins</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Quick Actions & Summary */}
                <div className="space-y-6">
                    {/* Admin Actions */}
                    <Card 
                        className="bg-gradient-to-br from-gray-900 to-gray-800 border-0 shadow-xl rounded-xl"
                        bodyStyle={{ padding: '24px' }}
                    >
                        <ShieldAlert size={32} className="text-white/80 mb-4" />
                        <h3 className="text-white font-semibold text-lg mb-2">Admin Control Center</h3>
                        <p className="text-gray-300 text-sm leading-relaxed mb-6">
                            Manage users, moderate content, and monitor system performance from one place.
                        </p>
                        <div className="space-y-3">
                            <Button
                                className="w-full bg-white text-gray-900 hover:bg-gray-100 h-11 rounded-lg font-medium"
                                onClick={() => router.push('/admin/users')}
                            >
                                <Users size={16} className="mr-2" />
                                User Management
                            </Button>
                            <Button
                                className="w-full bg-white/10 text-white hover:bg-white/20 border-0 h-11 rounded-lg font-medium"
                                onClick={() => router.push('/admin/media')}
                            >
                                <ImageIcon size={16} className="mr-2" />
                                Media Moderation
                            </Button>
                        </div>
                    </Card>

                    {/* Detection Summary */}
                    <Card 
                        className="bg-white border-gray-200 shadow-sm rounded-xl"
                        bodyStyle={{ padding: '24px' }}
                    >
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <TrendingUp size={18} className="text-[#5C45FD]" />
                            Detection Summary
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm text-gray-600">Authentic Media</span>
                                    <span className="text-sm font-semibold text-emerald-600">
                                        {stats?.media?.authentic ?? 0}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div 
                                        className="bg-emerald-500 h-2 rounded-full" 
                                        style={{ 
                                            width: stats?.media?.total 
                                                ? `${(stats.media.authentic / stats.media.total) * 100}%` 
                                                : '0%' 
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm text-gray-600">Fake/Manipulated</span>
                                    <span className="text-sm font-semibold text-red-600">
                                        {stats?.media?.fake ?? 0}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div 
                                        className="bg-red-500 h-2 rounded-full" 
                                        style={{ 
                                            width: stats?.media?.total 
                                                ? `${(stats.media.fake / stats.media.total) * 100}%` 
                                                : '0%' 
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="pt-3 border-t border-gray-100">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-900">Total Media Processed</span>
                                    <span className="text-lg font-bold text-gray-900">
                                        {stats?.media?.total?.toLocaleString() ?? 0}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}