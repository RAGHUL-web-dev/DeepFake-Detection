"use client";

import {
    ShieldCheck,
    ShieldAlert,
    Clock,
    Activity,
    ArrowUpRight,
    Plus,
    FileText,
    History as HistoryIcon,
    Search
} from 'lucide-react';
import { Card, Table, Tag, Button, Progress } from 'antd';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const router = useRouter();

    const stats = [
        {
            title: 'Total Verifications',
            value: '1,284',
            change: '+12%',
            icon: <Activity size={24} className="text-[#5C45FD]" />,
            gradient: 'from-[#5C45FD]/20 to-transparent'
        },
        {
            title: 'Authentic Results',
            value: '842',
            change: '65.5%',
            icon: <ShieldCheck size={24} className="text-green-500" />,
            gradient: 'from-green-500/20 to-transparent'
        },
        {
            title: 'Fake / Manipulated',
            value: '392',
            change: '30.5%',
            icon: <ShieldAlert size={24} className="text-red-500" />,
            gradient: 'from-red-500/20 to-transparent'
        },
        {
            title: 'Pending Analysis',
            value: '50',
            change: '4.0%',
            icon: <Clock size={24} className="text-amber-500" />,
            gradient: 'from-amber-500/20 to-transparent'
        }
    ];

    const recentActivity = [
        {
            key: '1',
            media: 'IMG_4829.jpg',
            type: 'Image',
            verdict: 'Authentic',
            confidence: 98.4,
            date: '2024-02-27 14:20'
        },
        {
            key: '2',
            media: 'Tiktok_Video_Ref.mp4',
            type: 'Video',
            verdict: 'Fake',
            confidence: 92.1,
            date: '2024-02-27 11:05'
        },
        {
            key: '3',
            media: 'Interview_Audio.wav',
            type: 'Audio',
            verdict: 'Uncertain',
            confidence: 45.8,
            date: '2024-02-26 18:30'
        }
    ];

    const columns = [
        {
            title: 'Media Asset',
            dataIndex: 'media',
            key: 'media',
            render: (text) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                        <FileText size={18} className="text-gray-400" />
                    </div>
                    <span className="font-medium text-white">{text}</span>
                </div>
            )
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type) => <span className="text-gray-400">{type}</span>
        },
        {
            title: 'Verdict',
            dataIndex: 'verdict',
            key: 'verdict',
            render: (verdict) => {
                const colors = {
                    'Authentic': 'success',
                    'Fake': 'error',
                    'Uncertain': 'warning'
                };
                return (
                    <Tag variant="filled" color={colors[verdict]} className="rounded-full px-3 py-0.5">
                        {verdict}
                    </Tag>
                );
            }
        },
        {
            title: 'Confidence',
            dataIndex: 'confidence',
            key: 'confidence',
            render: (score) => (
                <div className="flex items-center gap-3 min-w-[120px]">
                    <span className="text-sm font-mono text-white">{score}%</span>
                    <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full ${score > 80 ? 'bg-[#5C45FD]' : score > 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${score}%` }}
                        />
                    </div>
                </div>
            )
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => <span className="text-gray-500 text-sm italic">{date}</span>
        },
        {
            title: '',
            key: 'action',
            render: () => (
                <Button type="text" icon={<ArrowUpRight size={18} className="text-gray-500" />} />
            )
        }
    ];

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <Card key={idx} className="bg-[#0F0F10] border-white/5 overflow-hidden group hover:border-[#5C45FD]/50 transition-all duration-300">
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} blur-3xl opacity-20 -mr-16 -mt-16`} />
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                                    {stat.icon}
                                </div>
                                <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-green-500' : 'text-gray-400'}`}>
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
                            <p className="text-3xl font-bold text-white tracking-tight">{stat.value}</p>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                            <HistoryIcon size={20} className="text-[#5C45FD]" />
                            Recent Activity
                        </h2>
                        <Button type="link" className="text-[#5C45FD] hover:text-[#8E78FF]">View All</Button>
                    </div>
                    <Card className="bg-[#0F0F10] border-white/5">
                        <Table
                            dataSource={recentActivity}
                            columns={columns}
                            pagination={false}
                            className="dashboard-table"
                        />
                    </Card>
                </div>

                {/* Quick Actions & Usage */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                            <Plus size={20} className="text-[#5C45FD]" />
                            Quick Actions
                        </h2>
                        <div className="grid grid-cols-1 gap-4">
                            <Button
                                type="primary"
                                size="large"
                                className="h-14 bg-[#5C45FD] hover:bg-[#4A38CC] border-none rounded-xl flex items-center justify-center gap-2 font-semibold shadow-lg shadow-[#5C45FD]/20"
                                onClick={() => router.push('/deepfakeVerification')}
                            >
                                <ShieldCheck size={20} />
                                Verify New Media
                            </Button>
                            <Button
                                size="large"
                                className="h-14 bg-white/5 hover:bg-white/10 border-white/10 text-white rounded-xl flex items-center justify-center gap-2 font-semibold"
                                onClick={() => router.push('/dashboard/results')}
                            >
                                {/* <Library size={20} /> */}
                                View All Results
                            </Button>
                            <Button
                                size="large"
                                className="h-14 bg-white/5 hover:bg-white/10 border-white/10 text-white rounded-xl flex items-center justify-center gap-2 font-semibold"
                                onClick={() => router.push('/dashboard/provenance')}
                            >
                                <HistoryIcon size={20} />
                                Provenance History
                            </Button>
                        </div>
                    </div>

                    <Card className="bg-gradient-to-br from-[#1A1A1B] to-[#0F0F10] border border-white/10 rounded-2xl p-2 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#5C45FD] blur-3xl opacity-10" />
                        <h4 className="text-white font-semibold mb-4 text-center">Plan Usage</h4>
                        <div className="space-y-6 px-2">
                            <div>
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="text-gray-400">Verifications Used</span>
                                    <span className="text-white font-bold">128 / 1000</span>
                                </div>
                                <Progress percent={12.8} showInfo={false} strokeColor="#5C45FD" trailColor="rgba(255,255,255,0.05)" />
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="text-gray-400">Storage Used</span>
                                    <span className="text-white font-bold">2.4 GB / 10 GB</span>
                                </div>
                                <Progress percent={24} showInfo={false} strokeColor="#8E78FF" trailColor="rgba(255,255,255,0.05)" />
                            </div>
                            <Button className="w-full mt-2 bg-white/5 border-white/10 text-white hover:border-white/20 transition-all rounded-lg">
                                Upgrade Plan
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>

            <style jsx global>{`
                .dashboard-table .ant-table {
                    background: transparent !important;
                }
                .dashboard-table .ant-table-thead > tr > th {
                    background: transparent !important;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
                    color: #4B5563 !important;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                }
                .dashboard-table .ant-table-tbody > tr > td {
                    border-bottom: 1px solid rgba(255, 255, 255, 0.02) !important;
                    padding: 20px 16px !important;
                    color: #9CA3AF !important;
                }
                .dashboard-table .ant-table-tbody > tr:hover > td {
                    background: rgba(255, 255, 255, 0.01) !important;
                }
            `}</style>
        </div>
    );
}