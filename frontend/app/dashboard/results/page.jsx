"use client";

import { useState } from 'react';
import {
    Search,
    Filter,
    Download,
    ExternalLink,
    Eye,
    Image as ImageIcon,
    Video,
    Music,
    AlertTriangle,
    ShieldCheck,
    HelpCircle
} from 'lucide-react';
import { Card, Table, Input, Button, Tag, Space, Select, DatePicker, Modal, Tooltip } from 'antd';

const { RangePicker } = DatePicker;

export default function ResultsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [detailVisible, setDetailVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const data = [
        {
            key: '1',
            media: 'Election_Speech_Clip.mp4',
            type: 'Video',
            verdict: 'Fake',
            confidence: 94.2,
            date: '2024-02-27',
            status: 'Completed'
        },
        {
            key: '2',
            media: 'Passport_Scan_Check.pdf',
            type: 'Document',
            verdict: 'Authentic',
            confidence: 99.1,
            date: '2024-02-27',
            status: 'Completed'
        },
        {
            key: '3',
            media: 'Profile_Picture_Headshot.png',
            type: 'Image',
            verdict: 'Uncertain',
            confidence: 52.4,
            date: '2024-02-26',
            status: 'Completed'
        },
        {
            key: '4',
            media: 'Phone_Call_Recording.mp3',
            type: 'Audio',
            verdict: 'Fake',
            confidence: 88.7,
            date: '2024-02-25',
            status: 'Completed'
        }
    ];

    const columns = [
        {
            title: 'Media File',
            dataIndex: 'media',
            key: 'media',
            render: (text, record) => (
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        {record.type === 'Image' && <ImageIcon size={20} className="text-blue-400" />}
                        {record.type === 'Video' && <Video size={20} className="text-purple-400" />}
                        {record.type === 'Audio' && <Music size={20} className="text-amber-400" />}
                        {!['Image', 'Video', 'Audio'].includes(record.type) && <Search size={20} className="text-gray-400" />}
                    </div>
                    <div>
                        <div className="text-white font-medium">{text}</div>
                        <div className="text-xs text-gray-500">{record.type} • 4.2 MB</div>
                    </div>
                </div>
            )
        },
        {
            title: 'Verdict',
            dataIndex: 'verdict',
            key: 'verdict',
            render: (verdict) => {
                const styles = {
                    'Authentic': { color: 'success', icon: <ShieldCheck size={14} className="mr-1" /> },
                    'Fake': { color: 'error', icon: <AlertTriangle size={14} className="mr-1" /> },
                    'Uncertain': { color: 'warning', icon: <HelpCircle size={14} className="mr-1" /> }
                };
                const config = styles[verdict];
                return (
                    <Tag variant="filled" color={config.color} className="flex items-center w-fit rounded-full px-3">
                        {config.icon}
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
                <div className="flex items-center gap-3">
                    <span className={`text-sm font-mono ${score > 80 ? 'text-[#5C45FD]' : 'text-gray-400'}`}>{score}%</span>
                    <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden hidden md:block">
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
            render: (date) => <span className="text-gray-500">{date}</span>
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'right',
            render: (_, record) => (
                <Space size={8}>
                    <Tooltip title="View Details">
                        <Button
                            type="text"
                            icon={<Eye size={18} />}
                            className="text-gray-400 hover:text-white"
                            onClick={() => {
                                setSelectedItem(record);
                                setDetailVisible(true);
                            }}
                        />
                    </Tooltip>
                    <Tooltip title="Download Report">
                        <Button type="text" icon={<Download size={18} />} className="text-gray-400 hover:text-white" />
                    </Tooltip>
                </Space>
            )
        }
    ];

    return (
        <div className="space-y-6">
            {/* Toolbar */}
            <Card className="bg-[#0F0F10] border-white/5">
                <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
                    <div className="flex flex-1 gap-4 w-full">
                        <Input
                            placeholder="Search by file name..."
                            prefix={<Search size={18} className="text-gray-500" />}
                            className="bg-white/5 border-white/10 hover:border-white/20 text-white h-11 rounded-xl max-w-md"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <Button
                            icon={<Filter size={18} />}
                            className="h-11 bg-white/5 border-white/10 text-white rounded-xl flex items-center gap-2"
                        >
                            Filters
                        </Button>
                    </div>
                    <div className="flex gap-4 w-full lg:w-auto">
                        <RangePicker
                            className="bg-white/5 border-white/10 text-white h-11 rounded-xl"
                        />
                        <Button
                            type="primary"
                            className="h-11 bg-[#5C45FD] hover:bg-[#4A38CC] border-none rounded-xl font-medium px-6"
                        >
                            Export data
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Results Table */}
            <Card className="mt-5 bg-[#0F0F10] border-white/5 overflow-hidden">
                <Table
                    dataSource={data.filter(item => item.media.toLowerCase().includes(searchTerm.toLowerCase()))}
                    columns={columns}
                    pagination={{
                        pageSize: 10,
                        className: 'results-pagination'
                    }}
                    className="results-table"
                />
            </Card>

            {/* Detail Modal */}
            <Modal
                title={null}
                open={detailVisible}
                onCancel={() => setDetailVisible(false)}
                footer={null}
                width={800}
                centered
                className="result-detail-modal"
                styles={{
                    mask: { backdropFilter: 'blur(10px)' },
                    content: { background: '#0F0F10', border: '1px solid rgba(255,255,255,0.05)', padding: 0 }
                }}
            >
                {selectedItem && (
                    <div className="overflow-hidden rounded-2xl">
                        <div className="p-8 border-bottom border-white/5">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{selectedItem.media}</h3>
                                    <span className="text-gray-500">Resource ID: DB-9283-X12</span>
                                </div>
                                <Tag  color={selectedItem.verdict === 'Authentic' ? 'success' : 'error'} className="text-lg px-4 py-1 rounded-full">
                                    {selectedItem.verdict.toUpperCase()}
                                </Tag>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                                <div className="aspect-video rounded-xl bg-white/5 border border-white/10 flex items-center justify-center relative group">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <Button icon={<Eye size={20} />} className="hidden group-hover:flex items-center gap-2 absolute z-10 bg-white/10 text-white border-white/20">Preview Media</Button>
                                    <span className="text-gray-600 font-mono text-xs">NO PREVIEW AVAILABLE</span>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-400">Analysis Confidence</span>
                                            <span className="text-white font-bold">{selectedItem.confidence}%</span>
                                        </div>
                                        <Progress percent={selectedItem.confidence} showInfo={false} strokeColor="#5C45FD" railColor="rgba(255,255,255,0.05)" />
                                    </div>

                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <h4 className="text-white font-medium mb-3 text-sm">System Findings</h4>
                                        <ul className="space-y-2 text-sm text-gray-400">
                                            <li className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#5C45FD]" />
                                                Spatial inconsistency detected in facial metadata.
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#5C45FD]" />
                                                Compression artifacts indicative of generative manipulation.
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#5C45FD]" />
                                                Metadata mismatch with source camera profiles.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 p-6 flex justify-between items-center">
                            <span className="text-xs text-gray-500 font-mono uppercase tracking-widest">Model: DEEPSHIELD v2.4.8-Stable</span>
                            <div className="flex gap-4">
                                <Button className="bg-white/5 border-white/10 text-white hover:border-white/20">View Provenance</Button>
                                <Button type="primary" className="bg-[#5C45FD] border-none px-8">Download PDF</Button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            <style jsx global>{`
                .results-table .ant-table { background: transparent !important; }
                .results-table .ant-table-thead > tr > th {
                    background: transparent !important;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
                    color: #4B5563 !important;
                    text-transform: uppercase;
                    font-size: 11px;
                    letter-spacing: 0.1em;
                }
                .results-table .ant-table-tbody > tr > td {
                    border-bottom: 1px solid rgba(255, 255, 255, 0.02) !important;
                    padding: 24px 16px !important;
                }
                .results-table .ant-table-tbody > tr:hover > td {
                    background: rgba(255, 255, 255, 0.01) !important;
                }
                .results-pagination .ant-pagination-item {
                    background: transparent !important;
                    border-color: rgba(255, 255, 255, 0.1) !important;
                }
                .results-pagination .ant-pagination-item a { color: #9CA3AF !important; }
                .results-pagination .ant-pagination-item-active { border-color: #5C45FD !important; }
                .results-pagination .ant-pagination-item-active a { color: #5C45FD !important; }
                .ant-modal-close { color: #4B5563 !important; top: 20px; right: 20px; }
            `}</style>
        </div>
    );
}
