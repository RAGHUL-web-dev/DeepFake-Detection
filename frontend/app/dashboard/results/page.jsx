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
    HelpCircle,
    TrendingUp
} from 'lucide-react';
import { Card, Table, Input, Button, Tag, Space, Select, DatePicker, Modal, Tooltip } from 'antd';

import { useUserMedia } from '@/hooks/authHooks';

const { RangePicker } = DatePicker;

export default function ResultsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [detailVisible, setDetailVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [filterType, setFilterType] = useState('All');
    const [filterVerdict, setFilterVerdict] = useState('All');

    const { data: mediaData, isLoading } = useUserMedia();

    const rawData = mediaData?.success ? mediaData.media : [];

    const filteredData = rawData
        .filter(item => {
            const matchesSearch = item.fileName?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = filterType === 'All' || item.fileType === filterType;
            const matchesVerdict = filterVerdict === 'All' || item.verdict === filterVerdict;
            return matchesSearch && matchesType && matchesVerdict;
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const columns = [
        {
            title: 'Media File',
            dataIndex: 'fileName',
            key: 'fileName',
            render: (text, record) => (
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        {record.fileType === 'Image' && <ImageIcon size={20} className="text-blue-400" />}
                        {record.fileType === 'Video' && <Video size={20} className="text-purple-400" />}
                        {record.fileType === 'Audio' && <Music size={20} className="text-amber-400" />}
                        {record.fileType === 'Document' && <Search size={20} className="text-gray-400" />}
                    </div>
                    <div>
                        <div className="text-white font-medium max-w-[200px] truncate">{text}</div>
                        <div className="text-xs text-gray-500">{record.fileType} • {(record.fileSize / 1024 / 1024).toFixed(2)} MB</div>
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
                    'Authentic': { color: 'success', icon: <ShieldCheck size={14} className="mr-1" />, label: 'Authentic' },
                    'Real': { color: 'success', icon: <ShieldCheck size={14} className="mr-1" />, label: 'Real' },
                    'Fake': { color: 'error', icon: <AlertTriangle size={14} className="mr-1" />, label: 'Fake' },
                    'Uncertain': { color: 'warning', icon: <HelpCircle size={14} className="mr-1" />, label: 'Uncertain' },
                    'Processing': { color: 'processing', icon: <TrendingUp size={14} className="mr-1" />, label: 'Processing' }
                };
                const config = styles[verdict] || { color: 'default', icon: null, label: verdict };
                return (
                    <Tag variant="filled" color={config.color} className="flex items-center w-fit rounded-full px-3">
                        {config.icon}
                        {config.label}
                    </Tag>
                );
            }
        },
        {
            title: 'Confidence',
            dataIndex: 'confidenceScore',
            key: 'confidenceScore',
            render: (score) => (
                <div className="flex items-center gap-3">
                    <span className={`text-sm font-mono ${score > 80 ? 'text-[#5C45FD]' : 'text-gray-400'}`}>{score ? score.toFixed(1) : 0}%</span>
                    <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden hidden md:block">
                        <div
                            className={`h-full rounded-full ${score > 80 ? 'bg-[#5C45FD]' : score > 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${score || 0}%` }}
                        />
                    </div>
                </div>
            )
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => <span className="text-gray-500">{new Date(date).toLocaleDateString()}</span>
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
                        <Select 
                            defaultValue="All" 
                            className="h-11 w-32 results-select"
                            onChange={setFilterType}
                            options={[
                                { value: 'All', label: 'All Types' },
                                { value: 'Image', label: 'Image' },
                                { value: 'Video', label: 'Video' },
                                { value: 'Audio', label: 'Audio' },
                                { value: 'Document', label: 'Text' },
                            ]}
                        />
                        <Select 
                            defaultValue="All" 
                            className="h-11 w-32 results-select"
                            onChange={setFilterVerdict}
                            options={[
                                { value: 'All', label: 'All Results' },
                                { value: 'Real', label: 'Real' },
                                { value: 'Fake', label: 'Fake' },
                                { value: 'Processing', label: 'Processing' },
                            ]}
                        />
                    </div>
                </div>
            </Card>

            {/* Results Table */}
            <Card className="mt-5 bg-[#0F0F10] border-white/5 overflow-hidden">
                <Table
                    loading={isLoading}
                    dataSource={filteredData}
                    columns={columns}
                    pagination={{
                        pageSize: 10,
                        className: 'results-pagination'
                    }}
                    rowKey="_id"
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
                                <div className="max-w-[70%]">
                                    <h3 className="text-2xl font-bold text-white mb-2 break-all">{selectedItem.fileName}</h3>
                                    <span className="text-gray-500 font-mono text-xs">Resource ID: {selectedItem._id}</span>
                                </div>
                                <Tag color={['Real', 'Authentic'].includes(selectedItem.verdict) ? 'success' : selectedItem.verdict === 'Fake' ? 'error' : 'warning'} className="text-lg px-4 py-1 rounded-full">
                                    {selectedItem.verdict.toUpperCase()}
                                </Tag>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                                <div className="aspect-video rounded-xl bg-white/5 border border-white/10 flex items-center justify-center relative group overflow-hidden">
                                    {selectedItem.fileType === 'Image' ? (
                                        <img src={`http://localhost:5000${selectedItem.url}`} alt="Preview" className="w-full h-full object-contain" />
                                    ) : selectedItem.fileType === 'Video' ? (
                                        <video src={`http://localhost:5000${selectedItem.url}`} className="w-full h-full object-contain" controls />
                                    ) : (
                                        <>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <span className="text-gray-600 font-mono text-xs uppercase">{selectedItem.fileType} Preview unavailable</span>
                                        </>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-400">Analysis Confidence</span>
                                            <span className="text-white font-bold">{selectedItem.confidenceScore?.toFixed(1) || 0}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full rounded-full ${selectedItem.confidenceScore > 80 ? 'bg-[#5C45FD]' : 'bg-amber-500'}`}
                                                style={{ width: `${selectedItem.confidenceScore || 0}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <h4 className="text-white font-medium mb-3 text-sm">System Findings</h4>
                                        <ul className="space-y-2 text-sm text-gray-400">
                                            {selectedItem.findings?.length > 0 ? (
                                                selectedItem.findings.map((finding, i) => (
                                                    <li key={i} className="flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#5C45FD]" />
                                                        {finding}
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#5C45FD]" />
                                                    No specific anomalies flagged in this scan.
                                                </li>
                                            )}
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
                
                .results-select .ant-select-selector {
                    background: rgba(255, 255, 255, 0.05) !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    border-radius: 12px !important;
                    color: white !important;
                }
                .results-select .ant-select-arrow { color: #9CA3AF !important; }
                .results-select.ant-select-focused .ant-select-selector { border-color: #5C45FD !important; }
            `}</style>
        </div>
    );
}
