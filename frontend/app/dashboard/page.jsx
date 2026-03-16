"use client";

import {
    ShieldCheck,
    ShieldAlert,
    Clock,
    Activity,
    Plus,
    FileText,
    History as HistoryIcon,
    RefreshCw,
    AlertTriangle,
    ImageIcon,
    TrendingUp,
    Target
} from 'lucide-react';
import { Card, Table, Tag, Progress } from 'antd';
import { useRouter } from 'next/navigation';
import { useUserStats } from '@/hooks/authHooks';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
    const router = useRouter();
    const { data, isLoading, error, refetch } = useUserStats();

    const userStats = data?.stats;
    const recentActivity = data?.recentActivity || [];

    if (isLoading) {
        return (
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                            <Skeleton className="h-10 w-10 rounded-lg mb-4" />
                            <Skeleton className="h-4 w-24 mb-2" />
                            <Skeleton className="h-8 w-16" />
                        </div>
                    ))}
                </div>
                <Skeleton className="h-80 w-full rounded-xl" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
                <AlertTriangle size={40} className="text-red-500" />
                <p className="font-semibold text-gray-900 text-lg">Failed to load your dashboard</p>
                <p className="text-gray-500 text-sm">{error.message}</p>
                <Button onClick={() => refetch()} variant="outline" className="gap-2">
                    <RefreshCw size={16} /> Retry
                </Button>
            </div>
        );
    }

    const stats = [
        {
            title: 'Total Verifications',
            value: userStats?.totalVerifications ?? 0,
            sub: 'All time',
            icon: <Activity size={22} className="text-[#5C45FD]" />,
            bg: 'bg-[#5C45FD]/10',
            trend: userStats?.totalVerifications > 0 ? '+12%' : null
        },
        {
            title: 'Authentic Results',
            value: userStats?.authenticCount ?? 0,
            sub: userStats?.totalVerifications
                ? `${((userStats.authenticCount / userStats.totalVerifications) * 100).toFixed(1)}% of total`
                : '—',
            icon: <ShieldCheck size={22} className="text-emerald-600" />,
            bg: 'bg-emerald-50',
            trend: userStats?.authenticCount > 0 ? '+8%' : null
        },
        {
            title: 'Fake / Manipulated',
            value: userStats?.fakeCount ?? 0,
            sub: userStats?.totalVerifications
                ? `${((userStats.fakeCount / userStats.totalVerifications) * 100).toFixed(1)}% of total`
                : '—',
            icon: <ShieldAlert size={22} className="text-red-500" />,
            bg: 'bg-red-50',
            trend: userStats?.fakeCount > 0 ? '+3%' : null
        },
        {
            title: 'Pending Analysis',
            value: userStats?.pendingCount ?? 0,
            sub: 'Processing now',
            icon: <Clock size={22} className="text-amber-500" />,
            bg: 'bg-amber-50',
            trend: userStats?.pendingCount > 0 ? 'Now' : null
        }
    ];

    const activityColumns = [
        {
            title: 'File Name',
            dataIndex: 'fileName',
            key: 'fileName',
            render: (text) => (
                <span className="font-medium text-gray-900">{text || 'Unnamed File'}</span>
            )
        },
        {
            title: 'Type',
            dataIndex: 'fileType',
            key: 'fileType',
            render: (t) => (
                <span className="text-gray-500 text-sm font-medium">{t || '—'}</span>
            )
        },
        {
            title: 'Verdict',
            dataIndex: 'verdict',
            key: 'verdict',
            render: (verdict) => {
                const colorMap = {
                    Authentic: 'success',
                    Fake: 'error',
                    Uncertain: 'warning',
                    Processing: 'processing',
                    Failed: 'default'
                };
                return (
                    <Tag color={colorMap[verdict] || 'default'} className="rounded-full px-3 font-medium">
                        {verdict || 'Pending'}
                    </Tag>
                );
            }
        },
        {
            title: 'Confidence',
            dataIndex: 'confidenceScore',
            key: 'confidenceScore',
            render: (score) => score != null ? (
                <div className="flex items-center gap-2 w-28">
                    <Progress
                        percent={score}
                        showInfo={false}
                        size="small"
                        strokeColor={score > 70 ? '#10B981' : '#EF4444'}
                        trailColor="#E5E7EB"
                    />
                    <span className="text-xs font-medium text-gray-700">{score.toFixed(1)}%</span>
                </div>
            ) : <span className="text-gray-400">—</span>
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => (
                <span className="text-gray-400 text-sm">
                    {date ? new Date(date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    }) : '—'}
                </span>
            )
        }
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Welcome back! Here's what's happening with your verifications.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button 
                        variant="outline" 
                        className="gap-2 border-gray-200 text-gray-700 hover:bg-gray-50"
                        onClick={() => refetch()}
                    >
                        <RefreshCw size={16} />
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Card 
                        key={i} 
                        className="bg-white border-gray-200 shadow-sm rounded-xl hover:shadow-md transition-all"
                        bodyStyle={{ padding: '24px' }}
                    >
                        <div className="flex items-start justify-between">
                            <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center`}>
                                {stat.icon}
                            </div>
                            {stat.trend && (
                                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                    {stat.trend}
                                </span>
                            )}
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                                {stat.title}
                            </p>
                            <p className="text-3xl font-bold text-gray-900 mt-1">
                                {stat.value.toLocaleString()}
                            </p>
                            <p className="text-gray-400 text-sm mt-1">{stat.sub}</p>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2">
                    <Card 
                        className="bg-white border-gray-200 shadow-sm rounded-xl overflow-hidden"
                        bodyStyle={{ padding: 0 }}
                    >
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Recent Verifications</h2>
                                <p className="text-xs text-gray-500 mt-0.5">Your latest 10 activities</p>
                            </div>
                            <Button
                                variant="ghost"
                                className="text-[#5C45FD] font-medium text-sm hover:bg-[#5C45FD]/10"
                                onClick={() => router.push('/dashboard/results')}
                            >
                                View all
                            </Button>
                        </div>
                        
                        {recentActivity.length === 0 ? (
                            <div className="flex flex-col items-center py-16 gap-3">
                                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                                    <ImageIcon size={28} className="text-gray-400" />
                                </div>
                                <p className="text-gray-700 font-medium">No verifications yet</p>
                                <p className="text-gray-400 text-sm">
                                    Upload your first media file to get started
                                </p>
                                <Button 
                                    className="mt-2 bg-[#5C45FD] hover:bg-[#4A37D6] text-white"
                                    onClick={() => router.push('/deepfakeVerification')}
                                >
                                    <Plus size={16} className="mr-2" />
                                    Upload Media
                                </Button>
                            </div>
                        ) : (
                            <Table
                                dataSource={recentActivity}
                                columns={activityColumns}
                                rowKey="_id"
                                pagination={false}
                                className="activity-table"
                            />
                        )}
                    </Card>
                </div>

                {/* Quick Actions & Insights */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <Card 
                        className="bg-white border-gray-200 shadow-sm rounded-xl"
                        bodyStyle={{ padding: '24px' }}
                    >
                        <h2 className="text-lg font-semibold text-gray-900 mb-5">Quick Actions</h2>
                        <div className="space-y-3">
                            <button
                                className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#5C45FD] hover:bg-[#5C45FD]/5 transition-all group text-left"
                                onClick={() => router.push('/deepfakeVerification')}
                            >
                                <div className="w-10 h-10 rounded-lg bg-[#5C45FD]/10 flex items-center justify-center group-hover:bg-[#5C45FD]/20 transition-colors">
                                    <Plus size={18} className="text-[#5C45FD]" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Verify New Media</p>
                                    <p className="text-xs text-gray-500">Upload image, video or audio</p>
                                </div>
                            </button>
                            
                            <button
                                className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all group text-left"
                                onClick={() => router.push('/dashboard/results')}
                            >
                                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                                    <FileText size={18} className="text-gray-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">View All Results</p>
                                    <p className="text-xs text-gray-500">Browse your evidence library</p>
                                </div>
                            </button>
                            
                            <button
                                className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all group text-left"
                                onClick={() => router.push('/dashboard/provenance')}
                            >
                                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                                    <HistoryIcon size={18} className="text-gray-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Provenance History</p>
                                    <p className="text-xs text-gray-500">Audit trail for all media</p>
                                </div>
                            </button>
                        </div>
                    </Card>

                    {/* Insights Card */}
                    <Card 
                        className="bg-gradient-to-br from-[#5C45FD] to-[#7C66FF] border-0 shadow-lg"
                        bodyStyle={{ padding: '24px' }}
                    >
                        <Target className="text-white/80 mb-4" size={32} />
                        <h3 className="text-white font-semibold text-lg mb-1">Detection Insights</h3>
                        <p className="text-white/80 text-sm mb-4">
                            {userStats?.totalVerifications > 0 
                                ? `You've identified ${userStats.fakeCount} fake media files. Great job!`
                                : 'Start verifying to get insights'}
                            </p>
                        <div className="flex items-center gap-2 text-white/90">
                            <TrendingUp size={16} />
                            <span className="text-sm font-medium">Accuracy rate: 98.5%</span>
                        </div>
                    </Card>
                </div>
            </div>

            <style jsx global>{`
                .activity-table .ant-table { 
                    background: transparent !important;
                }
                .activity-table .ant-table-thead > tr > th {
                    background: #F9FAFB !important;
                    color: #6B7280 !important;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    font-weight: 600;
                    border-bottom: 1px solid #E5E7EB !important;
                    padding: 12px 24px !important;
                }
                .activity-table .ant-table-tbody > tr > td {
                    border-bottom: 1px solid #F3F4F6 !important;
                    padding: 16px 24px !important;
                }
                .activity-table .ant-table-tbody > tr:hover > td { 
                    background: #F9FAFB !important; 
                }
                .activity-table .ant-table-tbody > tr:last-child > td {
                    border-bottom: none !important;
                }
                .activity-table .ant-tag {
                    border: none !important;
                    font-size: 12px !important;
                    padding: 4px 12px !important;
                }
                .ant-tag-success { 
                    background: #10B981 !important;
                    color: white !important;
                }
                .ant-tag-error { 
                    background: #EF4444 !important;
                    color: white !important;
                }
                .ant-tag-warning { 
                    background: #F59E0B !important;
                    color: white !important;
                }
                .ant-tag-processing { 
                    background: #5C45FD !important;
                    color: white !important;
                }
            `}</style>
        </div>
    );
}