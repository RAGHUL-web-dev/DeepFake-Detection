"use client";

import {
    BookOpen,
    ShieldCheck,
    Zap,
    HelpCircle,
    ChevronRight,
    Search,
    Brain,
    Eye,
    CheckCircle2
} from 'lucide-react';
import { Card, Collapse, Input, Button, Divider } from 'antd';

const { Panel } = Collapse;

export default function KnowledgeHub() {
    const categories = [
        {
            title: "What are Deepfakes?",
            description: "Deepfakes are synthetic media in which a person in an existing image or video is replaced with someone else's likeness using artificial neural networks.",
            icon: <Brain size={24} className="text-blue-500" />,
            color: "from-blue-500/20 to-transparent"
        },
        {
            title: "Why They Are Dangerous",
            description: "Deepfakes can be used for misinformation, fraud, and identity theft. Understanding the risks is the first step toward better digital security.",
            icon: <ShieldCheck size={24} className="text-red-500" />,
            color: "from-red-500/20 to-transparent"
        },
        {
            title: "Our Verification Method",
            description: "DeepShield uses a multi-layered approach: spatial analysis, frequency detection, and blockchain provenance to ensure media integrity.",
            icon: <Zap size={24} className="text-[#5C45FD]" />,
            color: "from-[#5C45FD]/20 to-transparent"
        }
    ];

    const faqs = [
        {
            q: "What does an 'Uncertain' result mean?",
            a: "This happens when the model detects conflicting signals. This could be due to low media quality, high compression, or advanced manipulation that requires human review."
        },
        {
            q: "Is my media stored on your servers?",
            a: "Privacy is our priority. Media uploaded for verification is processed in-memory and typically deleted after analysis unless you choose to archive it in your library."
        },
        {
            q: "Can I challenge a detection result?",
            a: "Yes. If you believe a detection is incorrect, use the 'Submit Feedback' feature in the Results panel. Our team and higher-order models will review it."
        },
        {
            q: "How accurate is DeepShield detection?",
            a: "DeepShield maintains a 99.2% accuracy rate on established benchmarks. However, as generative tech evolves, we constantly update our models to detect new artifacts."
        }
    ];

    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden bg-[#0F0F10] border border-white/5 p-12">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#5C45FD] blur-[120px] opacity-10 -mr-48 -mt-48" />
                <div className="relative z-10 max-w-2xl">
                    <h1 className="text-4xl font-bold text-white mb-4">Empowering you with <span className="text-[#5C45FD]">Digital Trust</span></h1>
                    <p className="text-gray-400 text-lg leading-relaxed mb-8">
                        The digital world is evolving fast. At DeepShield, we don't just detect manipulation; we provide the tools and knowledge to understand it.
                    </p>
                    <div className="flex gap-4">
                        <Button type="primary" size="large" className="bg-[#5C45FD] border-none px-8 rounded-xl h-12">Get Started</Button>
                        <Button type="text" size="large" className="text-white hover:bg-white/5 px-8 rounded-xl h-12 flex items-center gap-2">
                            Research Papers <ChevronRight size={18} />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Core Education Cards */}
            <div>
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                    <BookOpen size={24} className="text-[#5C45FD]" />
                    Educational Center
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((cat, idx) => (
                        <Card key={idx} className="bg-[#0F0F10] border-white/5 overflow-hidden group hover:border-white/10 transition-all">
                            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${cat.color} blur-2xl opacity-40`} />
                            <div className="relative z-10">
                                <div className="p-3 rounded-xl bg-white/5 w-fit mb-6 group-hover:bg-[#5C45FD]/10 transition-colors">
                                    {cat.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">{cat.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{cat.description}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Verification Flow */}
            <Card className="bg-[#0F0F10] border-white/5 p-8">
                <h2 className="text-2xl font-bold text-white mb-12 text-center text-gradient-to-r from-white to-gray-500">How Verification Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connecting line */}
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#5C45FD]/20 to-transparent hidden md:block" />

                    {[
                        { step: "01", label: "Analyze", icon: <Brain size={32} />, desc: "Our AI examines spatial coherence & textures." },
                        { step: "02", label: "Explain", icon: <Eye size={32} />, desc: "Results are cross-verified against manipulation patterns." },
                        { step: "03", label: "Prove", icon: <CheckCircle2 size={32} />, desc: "Authenticity is anchored via blockchain hash proof." }
                    ].map((step, idx) => (
                        <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-2xl bg-[#0A0A0B] border border-white/10 flex items-center justify-center text-[#5C45FD] mb-6 shadow-xl shadow-black/40 group hover:border-[#5C45FD] transition-all">
                                {step.icon}
                            </div>
                            <span className="text-[#5C45FD] font-mono text-sm font-bold mb-2 uppercase tracking-widest">{step.step}</span>
                            <h4 className="text-white text-lg font-bold mb-2">{step.label}</h4>
                            <p className="text-gray-500 text-sm max-w-[200px] leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </Card>

            {/* FAQs */}
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-500">Find quick answers to common questions about DeepShield</p>
                </div>

                <Collapse
                    ghost
                    expandIcon={({ isActive }) => <ChevronRight size={18} className={`transition-transform text-gray-400 ${isActive ? 'rotate-90' : ''}`} />}
                    className="knowledge-faq"
                >
                    {faqs.map((faq, idx) => (
                        <Panel header={faq.q} key={idx} className="mb-4 bg-[#0F0F10] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all">
                            <div className="text-gray-400 leading-relaxed px-4 pb-4">
                                {faq.a}
                            </div>
                        </Panel>
                    ))}
                </Collapse>
            </div>

            <style jsx global>{`
                .knowledge-faq .ant-collapse-header {
                    padding: 24px 32px !important;
                    color: #FFFFFF !important;
                    font-weight: 600 !important;
                    font-size: 16px !important;
                }
                .knowledge-faq .ant-collapse-content-box {
                    padding-top: 0 !important;
                }
                .ant-collapse-item { color: white; }
            `}</style>
        </div>
    );
}
