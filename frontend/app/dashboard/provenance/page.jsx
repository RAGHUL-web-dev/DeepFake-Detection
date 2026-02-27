"use client";

import {
    History,
    Share2,
    ShieldCheck,
    FileCode,
    Link as LinkIcon,
    Calendar,
    ArrowRight,
    Cpu,
    Database,
    Fingerprint,
    
} from 'lucide-react';
import { Card, Timeline, Button, Tag, Badge, Divider } from 'antd';

export default function ProvenancePage() {
    const blockchainSummary = {
        hash: "0x8f2d...49c1e",
        network: "Polygon POS (Mainnet)",
        timestamp: "2024-02-27 14:20:12 UTC",
        transaction: "0x3e1a...f822",
        status: "Verified & Immutable"
    };

    const timelineData = [
        {
            dot: <div className="p-1 rounded-full bg-[#5C45FD]"><Cpu size={14} className="text-white" /></div>,
            color: '#5C45FD',
            children: (
                <div className="pb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-bold">Media Uploaded</span>
                        <span className="text-gray-500 text-xs font-mono">14:18:05</span>
                    </div>
                    <p className="text-gray-400 text-sm">Secure upload of <span className="text-white font-medium">Election_Speech_Clip.mp4</span> (File Hash: e3b0c442...)</p>
                </div>
            )
        },
        {
            dot: <div className="p-1 rounded-full bg-blue-500"><Brain size={14} className="text-white" /></div>,
            color: '#3B82F6',
            children: (
                <div className="pb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-bold">DeepShield Analysis Engine</span>
                        <span className="text-gray-500 text-xs font-mono">14:19:30</span>
                    </div>
                    <p className="text-gray-400 text-sm">Multi-modal analysis completed. Verdict generated with 94.2% confidence.</p>
                </div>
            )
        },
        {
            dot: <div className="p-1 rounded-full bg-purple-500"><Badge size={14} className="text-white" /></div>,
            color: '#A855F7',
            children: (
                <div className="pb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-bold">Verification Report Generated</span>
                        <span className="text-gray-500 text-xs font-mono">14:19:45</span>
                    </div>
                    <p className="text-gray-400 text-sm">Detailed PDF report compiled with analysis heatmaps and metadata summaries.</p>
                </div>
            )
        },
        {
            dot: <div className="p-1 rounded-full bg-green-500"><LinkIcon size={14} className="text-white" /></div>,
            color: '#22C55E',
            children: (
                <div className="pb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-bold">Blockchain Anchoring</span>
                        <span className="text-gray-500 text-xs font-mono">14:20:12</span>
                    </div>
                    <p className="text-gray-400 text-sm">Integrity certificate anchored to Polygon Mainnet. Media state is now immutable.</p>
                    <div className="mt-2 text-xs font-mono text-green-500/80 bg-green-500/5 px-3 py-1 rounded inline-block">
                        TX: 0x3e1a...f822
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Blockchain Proof Summary */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="bg-gradient-to-br from-[#1A1A1B] to-[#0F0F10] border-white/10 rounded-3xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8">
                            <ShieldCheck size={48} className="text-[#5C45FD] opacity-20" />
                        </div>
                        <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                            <Database size={20} className="text-[#5C45FD]" />
                            Integrity Proof
                        </h2>

                        <div className="space-y-6">
                            {[
                                { label: "Media Fingerprint", value: blockchainSummary.hash, icon: <Fingerprint size={16} /> },
                                { label: "Network", value: blockchainSummary.network, icon: <Share2 size={16} /> },
                                { label: "Blockchain Timestamp", value: blockchainSummary.timestamp, icon: <Calendar size={16} /> },
                                { label: "Integrity Status", value: blockchainSummary.status, icon: <ShieldCheck size={16} />, color: "text-green-500" }
                            ].map((item, idx) => (
                                <div key={idx} className="space-y-1.5">
                                    <span className="text-xs text-gray-500 uppercase tracking-wider font-bold flex items-center gap-2">
                                        {item.icon} {item.label}
                                    </span>
                                    <div className={`text-sm font-mono ${item.color || 'text-white'} bg-white/5 px-3 py-2 rounded-lg border border-white/5`}>
                                        {item.value}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Divider className="border-white/5 my-8" />

                        <Button
                            type="primary"
                            className="w-full h-12 bg-[#5C45FD] hover:bg-[#4A38CC] border-none rounded-xl font-bold"
                        >
                            View on Block Explorer
                        </Button>
                        <Button
                            className="w-full h-12 bg-white/5 hover:bg-white/10 border-white/10 text-white rounded-xl mt-4"
                        >
                            Verify Integrity Manually
                        </Button>
                    </Card>

                    <Card className="bg-[#0F0F10] border-white/5 rounded-3xl p-6">
                        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest text-[#5C45FD]">What is Provenance?</h3>
                        <p className="text-gray-400 text-sm leading-relaxed italic">
                            "Provenance provides a persistent and unchangeable record of a piece of media's history. By anchoring our analysis hashes to the blockchain, we ensure that the results you see today cannot be altered or falsified in the future."
                        </p>
                    </Card>
                </div>

                {/* Timeline Section */}
                <div className="lg:col-span-2">
                    <Card className="bg-[#0F0F10] border-white/5 rounded-3xl p-10 h-full">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <History size={26} className="text-[#5C45FD]" />
                                Asset Lifecycle Timeline
                            </h2>
                            <Tag color="cyan" bordered={false} className="rounded-full px-4">ITEM: ELE-XP-482</Tag>
                        </div>

                        <Timeline
                            items={timelineData}
                            className="provenance-timeline"
                        />

                        <div className="mt-12 p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-4">
                            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-500">
                                <FileCode size={20} />
                            </div>
                            <div>
                                <h4 className="text-amber-500 font-bold mb-1">C2PA Metadata Integration</h4>
                                <p className="text-amber-500/70 text-sm">
                                    DeepShield adheres to the Coalition for Content Provenance and Authenticity (C2PA) standards, allowing these credentials to be read by other supporting platforms like Adobe and Microsoft.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <style jsx global>{`
                .provenance-timeline .ant-timeline-item-label {
                    color: #4B5563 !important;
                }
                .provenance-timeline .ant-timeline-item-tail {
                    border-left: 2px dashed rgba(92, 69, 253, 0.2) !important;
                }
                .provenance-timeline .ant-timeline-item-content {
                    margin-left: 24px !important;
                }
            `}</style>
        </div>
    );
}

// Simple Brain icon for timeline
function Brain({ size, className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54Z" />
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54Z" />
        </svg>
    )
}
