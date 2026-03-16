"use client";

import { useState } from 'react';
import { Card, Table, Tag, Modal, Space, message } from 'antd';
import {
    Search,
    Trash2,
    Eye,
    ImageIcon,
    Video,
    Music,
    AlertTriangle,
    ShieldCheck,
    HelpCircle,
    RefreshCw,
    FileText
} from 'lucide-react';
import { useAdminMedia, useDeleteMedia } from '@/hooks/adminHooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

const typeIcon = (type) => {
    if (type === 'Image') return <ImageIcon size={18} className="text-blue-500" />;
    if (type === 'Video') return <Video size={18} className="text-purple-500" />;
    if (type === 'Audio') return <Music size={18} className="text-amber-500" />;
    return <FileText size={18} className="text-gray-400" />;
};

export default function MediaModeration() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const { data, isLoading, error, refetch } = useAdminMedia();
    const { mutate: deleteMedia } = useDeleteMedia();

    const mediaList = data?.media || [];

    const handleDelete = (record) => {
        Modal.confirm({
            title: 'Delete Media Content',
            content: `Permanently remove "${record.fileName}" from the platform?`,
            okType: 'danger',
            okText: 'Yes, Remove',
            onOk: () => {
                deleteMedia(record._id, {
                    onSuccess: () => message.success('Media removed successfully'),
                    onError: (err) => message.error(err.message),
                });
            },
        });
    };

    const columns = [
        {
            title: 'Media File',
            key: 'file',
            render: (_, record) => (
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center shrink-0">
                        {typeIcon(record.fileType)}
                    </div>
                    <div>
                        <p className="font-bold text-black text-sm">{record.fileName}</p>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                            {record.fileType} • {record.fileSize ? `${(record.fileSize / 1024).toFixed(1)} KB` : 'N/A'}
                        </p>
                    </div>
                </div>
            )
        },
        {
            title: 'Uploaded By',
            key: 'uploader',
            render: (_, record) => (
                <span className="text-gray-600 font-medium text-sm">
                    {record.user?.email || record.user?.name || 'Unknown'}
                </span>
            )
        },
        {
            title: 'AI Verdict',
            dataIndex: 'verdict',
            key: 'verdict',
            render: (verdict) => {
                const map = {
                    Authentic: { color: 'success', icon: <ShieldCheck size={13} className="mr-1" /> },
                    Fake: { color: 'error', icon: <AlertTriangle size={13} className="mr-1" /> },
                    Uncertain: { color: 'warning', icon: <HelpCircle size={13} className="mr-1" /> },
                    Processing: { color: 'processing', icon: null },
                    Failed: { color: 'default', icon: null },
                };
                const cfg = map[verdict] || { color: 'default', icon: null };
                return (
                    <Tag color={cfg.color} className="flex items-center w-fit rounded-full px-3 py-0.5 font-bold">
                        {cfg.icon}{verdict}
                    </Tag>
                );
            }
        },
        {
            title: 'Confidence',
            dataIndex: 'confidenceScore',
            key: 'confidenceScore',
            render: (score) => score != null
                ? <span className="font-bold text-black">{score.toFixed(1)}%</span>
                : <span className="text-gray-400">—</span>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag
                    color={status === 'active' ? 'default' : status === 'flagged' ? 'error' : 'default'}
                    className="rounded-md px-2 font-bold uppercase text-[10px] tracking-wider"
                >
                    {status}
                </Tag>
            )
        },
        {
            title: 'Date',
            key: 'createdAt',
            render: (_, record) => (
                <span className="text-gray-400 text-sm font-medium">
                    {record.createdAt ? new Date(record.createdAt).toLocaleDateString() : '—'}
                </span>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'right',
            render: (_, record) => (
                <Space size={4}>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-lg text-gray-400 hover:text-[#5C45FD] hover:bg-[#5C45FD]/5"
                        onClick={() => setSelectedItem(record)}
                    >
                        <Eye size={16} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600"
                        onClick={() => handleDelete(record)}
                    >
                        <Trash2 size={16} />
                    </Button>
                </Space>
            )
        }
    ];

    const filtered = mediaList.filter(m =>
        m.fileName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return <div className="space-y-4"><Skeleton className="h-12 w-full" /><Skeleton className="h-80 w-full rounded-3xl" /></div>;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
                <AlertTriangle size={40} className="text-red-500" />
                <p className="font-bold text-black">{error.message}</p>
                <Button onClick={() => refetch()} variant="outline" className="gap-2"><RefreshCw size={16} /> Retry</Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-extrabold text-black">Media Moderation</h2>
                    <p className="text-gray-500 font-medium mt-1">{mediaList.length} total media assets on the platform</p>
                </div>
                <Button onClick={() => refetch()} variant="outline" className="gap-2 rounded-xl">
                    <RefreshCw size={16} /> Refresh
                </Button>
            </div>

            {mediaList.length === 0 ? (
                <Card className="bg-white border-gray-100 shadow-sm rounded-3xl p-16 text-center">
                    <ImageIcon size={48} className="text-gray-200 mx-auto mb-4" />
                    <p className="text-xl font-extrabold text-black mb-2">No Media Yet</p>
                    <p className="text-gray-500 font-medium">
                        Media assets submitted by users through verification will appear here automatically.
                    </p>
                </Card>
            ) : (
                <Card className="bg-white border-gray-100 shadow-sm rounded-3xl overflow-hidden p-0 media-table-card">
                    <div className="p-6 border-b border-gray-100">
                        <div className="relative max-w-md">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <Input
                                placeholder="Search by file name or uploader..."
                                className="pl-10 h-11 bg-gray-50 border-gray-200 rounded-xl"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <Table
                        dataSource={filtered}
                        columns={columns}
                        rowKey="_id"
                        pagination={{ pageSize: 10 }}
                        className="media-mgmt-table"
                    />
                </Card>
            )}

            {/* Detail Modal */}
            <Modal
                open={!!selectedItem}
                onCancel={() => setSelectedItem(null)}
                footer={null}
                width={600}
                centered
                styles={{ content: { background: '#fff', borderRadius: '24px', padding: 0 } }}
            >
                {selectedItem && (
                    <div className="rounded-3xl overflow-hidden">
                        <div className="p-8 border-b border-gray-100">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-2xl font-extrabold text-black">{selectedItem.fileName}</h3>
                                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
                                        ID: {selectedItem._id}
                                    </p>
                                </div>
                                <Tag color={selectedItem.verdict === 'Authentic' ? 'success' : 'error'} className="text-sm px-4 py-1.5 rounded-full font-bold">
                                    {selectedItem.verdict?.toUpperCase()}
                                </Tag>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <p className="text-gray-400 font-bold text-xs uppercase mb-1">Type</p>
                                    <p className="font-bold text-black">{selectedItem.fileType}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <p className="text-gray-400 font-bold text-xs uppercase mb-1">Confidence</p>
                                    <p className="font-bold text-black">{selectedItem.confidenceScore?.toFixed(1) ?? '—'}%</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-2xl col-span-2">
                                    <p className="text-gray-400 font-bold text-xs uppercase mb-1">Uploaded By</p>
                                    <p className="font-bold text-black">{selectedItem.user?.email || selectedItem.user?.name || 'Unknown'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 flex gap-3 justify-end">
                            <Button variant="outline" className="rounded-xl" onClick={() => setSelectedItem(null)}>Close</Button>
                            <Button variant="destructive" className="rounded-xl gap-2" onClick={() => { handleDelete(selectedItem); setSelectedItem(null); }}>
                                <Trash2 size={16} /> Remove Content
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>

            <style jsx global>{`
                .media-table-card .ant-card-body { padding: 0 !important; }
                .media-mgmt-table .ant-table { background: transparent !important; }
                .media-mgmt-table .ant-table-thead > tr > th {
                    background: #FAFAFB !important;
                    color: #6B7280 !important;
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    font-weight: 800;
                    border-bottom: 1px solid #F3F4F6 !important;
                    padding: 14px 24px !important;
                }
                .media-mgmt-table .ant-table-tbody > tr > td {
                    border-bottom: 1px solid #F9FAFB !important;
                    padding: 16px 24px !important;
                }
                .media-mgmt-table .ant-table-tbody > tr:hover > td { background: #F9FAFB !important; }
            `}</style>
        </div>
    );
}
