"use client";

import { useState } from 'react';
import {
    MessageSquare,
    Send,
    History,
    AlertCircle,
    CheckCircle2,
    Clock,
    Paperclip,
    HelpCircle
} from 'lucide-react';
import { Card, Input, Button, Select, Table, Tag, Upload, message, Divider } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

export default function FeedbackPage() {
    const [formLoading, setFormLoading] = useState(false);

    const handleSubmit = () => {
        setFormLoading(true);
        setTimeout(() => {
            message.success('Feedback submitted successfully. Our team will review this shortly.');
            setFormLoading(false);
        }, 1500);
    };

    const historyData = [
        {
            key: '1',
            media: 'Election_Speech_Clip.mp4',
            type: 'Incorrect Detection',
            date: '2024-02-27',
            status: 'Resolved'
        },
        {
            key: '2',
            media: 'General Platform Performance',
            type: 'Technical Bug',
            date: '2024-02-24',
            status: 'Under Review'
        }
    ];

    const columns = [
        {
            title: 'Media / Subject',
            dataIndex: 'media',
            key: 'media',
            render: (text) => <span className="text-white font-medium">{text}</span>
        },
        {
            title: 'Feedback Type',
            dataIndex: 'type',
            key: 'type',
            render: (type) => <span className="text-gray-400">{type}</span>
        },
        {
            title: 'Date Submitted',
            dataIndex: 'date',
            key: 'date',
            render: (date) => <span className="text-gray-500">{date}</span>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                const colors = {
                    'Resolved': 'success',
                    'Under Review': 'processing',
                    'Submitted': 'default'
                };
                return <Tag bordered={false} color={colors[status]} className="rounded-full px-3">{status}</Tag>;
            }
        }
    ];

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Feedback Form */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                            <MessageSquare size={32} className="text-[#5C45FD]" />
                            Human-in-the-Loop
                        </h2>
                        <p className="text-gray-400">Your feedback helps us train better models. Report incorrect detections or suggest improvements.</p>
                    </div>

                    <Card className="bg-[#0F0F10] border-white/5 rounded-3xl p-4">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select Media (Optional)</label>
                                <Select
                                    placeholder="Choose from recent verifications"
                                    className="w-full feedback-select"
                                    suffixIcon={<HelpCircle size={16} className="text-gray-500" />}
                                >
                                    <Option value="1">Election_Speech_Clip.mp4</Option>
                                    <Option value="2">Passport_Scan_Check.pdf</Option>
                                    <Option value="3">Other / General Feedback</Option>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Feedback Type</label>
                                <Select defaultValue="incorrect" className="w-full feedback-select">
                                    <Option value="incorrect">Incorrect Detection Result</Option>
                                    <Option value="bug">Technical Bug / Issue</Option>
                                    <Option value="suggestion">Feature Suggestion</Option>
                                    <Option value="security">Security Vulnerability</Option>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Detailed Description</label>
                                <TextArea
                                    rows={6}
                                    placeholder="Please describe the issue or your findings in detail..."
                                    className="bg-white/5 border-white/10 text-white hover:border-white/20 rounded-xl p-4"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Attach Proof / File</label>
                                <Upload.Dragger className="feedback-upload bg-white/5 border-dashed border-white/10 rounded-2xl p-8 hover:border-[#5C45FD]/50 transition-all">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-[#5C45FD]/10 flex items-center justify-center text-[#5C45FD]">
                                            <Paperclip size={24} />
                                        </div>
                                        <div className="text-sm text-gray-300">Click or drag proof to this area</div>
                                        <div className="text-xs text-gray-500">Support for images, logs, or verification certificates</div>
                                    </div>
                                </Upload.Dragger>
                            </div>

                            <Button
                                type="primary"
                                size="large"
                                block
                                className="h-14 bg-[#5C45FD] hover:bg-[#4A38CC] border-none rounded-xl font-bold flex items-center justify-center gap-2"
                                onClick={handleSubmit}
                                loading={formLoading}
                            >
                                <Send size={18} />
                                Send Feedback Report
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* History & Info */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <History size={26} className="text-[#5C45FD]" />
                            Feedback History
                        </h2>
                        <Card className="bg-[#0F0F10] border-white/5 overflow-hidden">
                            <Table
                                dataSource={historyData}
                                columns={columns}
                                pagination={false}
                                className="feedback-table"
                            />
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1A1A1B] to-[#0F0F10] border border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <AlertCircle size={64} className="text-[#5C45FD]" />
                            </div>
                            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                                <CheckCircle2 size={18} className="text-green-500" />
                                Transparency Note
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Every piece of feedback you submit is logged and reviewed by our security engineers. We use this data to fine-tune our adversarial benchmarks and improve detection resilience across all supported media types.
                            </p>
                        </div>

                        <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-4">
                            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl">
                                <Clock size={24} />
                            </div>
                            <div>
                                <h4 className="text-white font-semibold mb-1">Expected Response Time</h4>
                                <p className="text-gray-400 text-sm">
                                    General feedback is reviewed within 48 hours. Critical detection challenges or technical bugs are prioritized and typically addressed within 12-24 hours.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .feedback-table .ant-table { background: transparent !important; }
                .feedback-table .ant-table-thead > tr > th {
                    background: transparent !important;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
                    color: #4B5563 !important;
                    font-size: 11px;
                    text-transform: uppercase;
                }
                .feedback-table .ant-table-tbody > tr > td {
                    border-bottom: 1px solid rgba(255, 255, 255, 0.02) !important;
                    padding: 20px 16px !important;
                }
                .feedback-select .ant-select-selector {
                    background: rgba(255, 255, 255, 0.05) !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    height: 48px !important;
                    padding: 8px 16px !important;
                    border-radius: 12px !important;
                }
                .feedback-select .ant-select-selection-item {
                    color: white !important;
                }
                .ant-select-dropdown {
                    background: #1A1A1B !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                }
                .ant-select-item { color: #9CA3AF !important; }
                .ant-select-item-option-selected { background: rgba(92, 69, 253, 0.2) !important; color: white !important; }
                .ant-select-item-option-active { background: rgba(255, 255, 255, 0.05) !important; }
            `}</style>
        </div>
    );
}
