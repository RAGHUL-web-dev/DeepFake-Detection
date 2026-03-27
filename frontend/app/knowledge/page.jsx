"use client";

import { motion } from 'framer-motion';
import { 
    Info, 
    Cpu, 
    Shield, 
    ArrowRight, 
    Activity, 
    Layers, 
    Database, 
    Search,
    MessageSquare,
    Image as ImageIcon,
    Video,  // Add this line
    Mic,
    Lock,
    Eye,
    TrendingUp,
    CheckCircle2,
    Sparkles,
    Zap,
    FileCheck,
    Brain,
    Target
} from 'lucide-react';  
import { Card, Button, Steps, Tag, Progress, Badge } from 'antd';
import Navbar from '../components/Navbar';

export default function KnowledgeHub() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const models = [
        {
            title: "CNN (Convolutional Neural Networks)",
            type: "Image & Video Analysis",
            description: "Used for detecting frame-level manipulation. Our CNNs are trained on millions of real and synthetic images to identify microscopic texture inconsistencies, lighting mismatches, and biological signal absences.",
            strengths: ["High accuracy in pixel-level detection", "Efficient for visual synthesis artifacts"],
            accuracy: 98.5,
            latency: "120ms",
            icon: <ImageIcon className="text-blue-400" size={24} />,
            gradient: "from-blue-500/20 to-cyan-500/20",
            badgeColor: "blue"
        },
        {
            title: "Transformers & LSTM",
            type: "Text & Audio Analysis",
            description: "For text and audio, we use state-of-the-art Transformers (like BERT/GPT variants) and LSTMs to detect unnatural semantic flow, synthetic prosody, and frequency-domain anomalies in voice clones.",
            strengths: ["Detects long-range temporal patterns", "Excellent at semantic context analysis"],
            accuracy: 97.2,
            latency: "85ms",
            icon: <MessageSquare className="text-purple-400" size={24} />,
            gradient: "from-purple-500/20 to-pink-500/20",
            badgeColor: "purple"
        },
        {
            title: "Ensemble Pretrained Models",
            type: "General Detection",
            description: "We leverage industry-leading pretrained architectures (Xception, EfficientNet) fine-tuned on the latest Deepfake Forensics datasets to ensure our platform stays ahead of generative AI evolution.",
            strengths: ["Robust against known manipulation types", "Scalable and reliable performance"],
            accuracy: 99.1,
            latency: "95ms",
            icon: <Layers className="text-amber-400" size={24} />,
            gradient: "from-amber-500/20 to-orange-500/20",
            badgeColor: "gold"
        }
    ];

    const pipelineSteps = [
        {
            title: 'Media Intake',
            description: 'User uploads media file (Image, Video, Audio, or Text).',
            icon: <Database />
        },
        {
            title: 'Preprocessing',
            description: 'Normalization, frame extraction, and signal cleaning.',
            icon: <Activity />
        },
        {
            title: 'Feature Extraction',
            description: 'Identifying key patterns, artifacts, and metadata.',
            icon: <Search />
        },
        {
            title: 'Inference',
            description: 'AI Models process features to generate a score.',
            icon: <Cpu />
        },
        {
            title: 'Output & Storage',
            description: 'Results are verified, hashed, and stored for traceability.',
            icon: <Lock />
        }
    ];

    const metrics = [
        { label: "Detection Accuracy", value: 60, unit: "%", icon: <Target size={20} /> },
        { label: "Average Latency", value: 0.12, unit: "s", icon: <Zap size={20} /> },
        { label: "Models Deployed", value: 4, unit: "", icon: <Brain size={20} /> },
        { label: "Daily Verifications", value: 500, unit: "+", icon: <FileCheck size={20} /> }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0A0A0B] via-[#0F0F10] to-[#0A0A0B] text-white">
            <Navbar />
            
            <main className="max-w-7xl mx-auto px-6 pt-40 pb-24">
<motion.section {...fadeIn} className="w-full h-screen flex items-center mb-0">
    <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 flex-1">
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#5C45FD]/20 to-[#5C45FD]/5 border border-[#5C45FD]/30 text-[#5C45FD] text-xs font-bold uppercase tracking-widest backdrop-blur-sm w-fit"
                >
                    <Sparkles size={14} />
                    <span>Next-Gen AI Forensics</span>
                </motion.div>
                
                <h1 className="text-3xl md:text-8xl lg:text-3xl font-extrabold mb-6 tracking-tight text-left leading-[1.1]">
                    Demystifying{' '}
                    <span className="relative inline-block">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5C45FD] via-purple-400 to-cyan-400">
                            DeepShield
                        </span>
                        <motion.div 
                            className="absolute -inset-1 bg-gradient-to-r from-[#5C45FD] to-cyan-400 blur-xl opacity-30"
                            animate={{ opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </span>
                </h1>
                
                <p className="max-w-2xl text-gray-300 text-xl md:text-2xl leading-relaxed text-left">
                    DeepShield is an advanced AI forensic platform designed to restore digital trust. 
                    In an era of generative misinformation, we provide the tools to verify the authenticity of video, audio, image, and text content through multi-modal neural analysis.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 pt-6">
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-gradient-to-r from-[#5C45FD] to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                        Get Started
                    </motion.button>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
                    >
                        Watch Demo
                    </motion.button>
                </div>
            </div>
            
            {/* Right Image/Illustration - INCREASED WIDTH */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="relative flex justify-center items-center flex-1"
            >
                <div className="relative w-full max-w-2xl lg:max-w-3xl">
                    {/* Animated Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#5C45FD] to-cyan-500 rounded-full blur-[80px] opacity-30 animate-pulse" />
                    
                    {/* Main Image Container */}
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm p-2">
                        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                        
                        {/* Decorative Elements */}
                        <div className="absolute top-4 left-4 w-20 h-20 border-l-2 border-t-2 border-[#5C45FD]/30 rounded-tl-2xl" />
                        <div className="absolute bottom-4 right-4 w-20 h-20 border-r-2 border-b-2 border-cyan-500/30 rounded-br-2xl" />
                        
                        {/* AI Visualization Illustration */}
                        <div className="relative p-8 flex flex-col items-center justify-center min-h-[500px]">
                            {/* Central Icon - ENLARGED */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#5C45FD] to-cyan-500 rounded-full blur-2xl opacity-50 animate-ping" />
                                <div className="relative z-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#5C45FD] to-purple-600 flex items-center justify-center shadow-2xl">
                                    <Cpu size={56} className="text-white" />
                                </div>
                            </div>
                            
                            {/* Floating Elements - ENLARGED */}
                            <div className="absolute top-8 right-8 animate-float">
                                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-500/30 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                                    <ImageIcon size={32} className="text-blue-400" />
                                </div>
                            </div>
                            
                            <div className="absolute bottom-8 left-8 animate-float-delay">
                                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                                    <MessageSquare size={32} className="text-purple-400" />
                                </div>
                            </div>
                            
                            <div className="absolute top-1/2 -left-8 animate-float-slow">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-500/30 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                                    <Video size={28} className="text-amber-400" />
                                </div>
                            </div>
                            
                            <div className="absolute bottom-1/2 -right-8 animate-float">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/30 to-emerald-500/30 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                                    <Mic size={28} className="text-green-400" />
                                </div>
                            </div>
                            
                            {/* Orbiting Circles - ENLARGED */}
                            <div className="absolute inset-0">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] border border-[#5C45FD]/20 rounded-full animate-spin-slow" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-cyan-500/20 rounded-full animate-spin-slow-reverse" />
                            </div>
                            
                            {/* Center Text */}
                            <div className="relative z-10 mt-8 text-center">
                                <p className="text-sm text-gray-400 uppercase tracking-wider font-mono">Multi-Modal Analysis</p>
                                <div className="flex gap-2 justify-center mt-3">
                                    <div className="w-2 h-2 rounded-full bg-[#5C45FD] animate-pulse" />
                                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse delay-150" />
                                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-300" />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Stats Badge - ENLARGED */}
                    <div className="absolute -bottom-6 -left-6 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl px-5 py-3 shadow-xl">
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5C45FD] to-purple-600 flex items-center justify-center text-sm font-bold border-2 border-black">99%</div>
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-sm font-bold border-2 border-black">AI</div>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Detection Accuracy</p>
                                <p className="text-base font-bold text-white">98.7% <span className="text-green-400 text-xs">↑12%</span></p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Trust Badge - ENLARGED */}
                    <div className="absolute -top-6 -right-6 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl px-5 py-3 shadow-xl">
                        <div className="flex items-center gap-2">
                            <Shield size={20} className="text-[#5C45FD]" />
                            <div>
                                <p className="text-xs text-gray-400">Verified</p>
                                <p className="text-sm font-mono text-white">Enterprise Grade</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    </div>
    
    <style jsx>{`
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        @keyframes float-delay {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
        }
        
        @keyframes float-slow {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
        }
        
        .animate-float {
            animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delay {
            animation: float-delay 4s ease-in-out infinite;
        }
        
        .animate-float-slow {
            animation: float-slow 5s ease-in-out infinite;
        }
        
        .animate-spin-slow {
            animation: spin 20s linear infinite;
        }
        
        .animate-spin-slow-reverse {
            animation: spin 25s linear infinite reverse;
        }
        
        @keyframes spin {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        .bg-grid-pattern {
            background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0);
            background-size: 40px 40px;
        }
    `}</style>
</motion.section>
                {/* Key Metrics */}
<motion.section 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24 mt-12"
>
    {metrics.map((metric, idx) => (
        <Card 
            key={idx}
            className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 rounded-2xl backdrop-blur-sm h-32 flex items-center"
            styles={{ body: { padding: '16px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' } }}
        >
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-[#5C45FD]/20 text-[#5C45FD]">
                    {metric.icon}
                </div>
                <span className="text-gray-700 text-sm">{metric.label}</span>
            </div>
            <div className="text-3xl font-bold text-black">
                {metric.value}{metric.unit}
            </div>
        </Card>
    ))}
</motion.section>

{/* Model Architecture Section */}
<motion.section 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="mb-32"
>
    <div className="flex items-center mt-20 gap-4 mb-12">
        <h2 className="text-3xl font-bold text-white">Deep Forensics Architecture</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-black/20 to-transparent" />
        <Badge count="v3.0" style={{ backgroundColor: '#5C45FD' }} />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {models.map((model, idx) => (
            <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="h-full"
            >
                <Card 
                    className={`bg-gradient-to-br ${model.gradient} border-black/10 hover:border-[#5C45FD]/40 transition-all duration-300 rounded-2xl overflow-hidden backdrop-blur-sm h-full flex flex-col`}
                    styles={{ body: { padding: '24px', height: '100%', display: 'flex', flexDirection: 'column' } }}
                >
                    <div className="relative flex flex-col h-full">
                        <div className="absolute top-0 right-0">
                            <Tag color={model.badgeColor} className="uppercase text-xs font-mono">
                                {model.type.split(' ')[0]}
                            </Tag>
                        </div>
                        <div className="p-3 rounded-xl bg-black/10 w-fit mb-4 backdrop-blur-sm">
                            {model.icon}
                        </div>
                        <h3 className="text-xl font-bold text-black mb-2 pr-20">{model.title}</h3>
                        <p className="text-[#5C45FD] text-xs font-mono uppercase tracking-widest mb-4">{model.type}</p>
                        <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-grow">
                            {model.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-black/5 rounded-xl">
                            <div>
                                <div className="text-xs text-gray-600 mb-1">Accuracy</div>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold text-green-600">{model.accuracy}%</span>
                                    <Progress 
                                        percent={model.accuracy} 
                                        showInfo={false} 
                                        strokeColor="#5C45FD"
                                        size="small"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-600 mb-1">Latency</div>
                                <div className="text-lg font-bold text-cyan-600">{model.latency}</div>
                            </div>
                        </div>

                        <div className="space-y-2 mt-auto">
                            <h4 className="text-xs font-bold text-gray-600 uppercase tracking-tighter flex items-center gap-2">
                                <CheckCircle2 size={12} />
                                Core Strengths
                            </h4>
                            {model.strengths.map((s, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                                    <div className="w-1 h-1 rounded-full bg-[#5C45FD]" />
                                    {s}
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </motion.div>
        ))}
    </div>
</motion.section>

                {/* Pipeline Section */}
<motion.section 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="mb-32 relative mt-16"
>
    <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-br from-[#0F0F10] via-[#0B0B0C] to-[#0A0A0B] p-14 shadow-[0_0_80px_rgba(92,69,253,0.08)] min-h-[700px]">

        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#5C45FD] blur-[180px] opacity-20" />
        <div className="absolute bottom-[-120px] right-[-100px] w-[400px] h-[400px] bg-cyan-500 blur-[160px] opacity-10" />
        
        {/* Animated gradient border effect */}
        <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-r from-[#5C45FD] via-transparent to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-[#5C45FD] rounded-full opacity-30"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animation: `float ${3 + Math.random() * 5}s infinite ease-in-out`,
                        animationDelay: `${Math.random() * 5}s`
                    }}
                />
            ))}
        </div>

        <div className="relative z-10">

            {/* Header with icon decoration */}
            <div className="text-center mb-20">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-[#5C45FD]/20 to-transparent border border-[#5C45FD]/30 mb-6">
                    <Activity size={16} className="text-[#5C45FD]" />
                    <span className="text-[#5C45FD] text-xs font-bold uppercase tracking-wider">End-to-End Process</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
                    Verification Pipeline
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
                    A high-precision, multi-stage AI pipeline engineered to detect deepfake artifacts 
                    with maximum accuracy, explainability, and trust.
                </p>
            </div>

            {/* Steps with enhanced styling */}
            <div className="px-4 md:px-8 py-6">
                <Steps
                    current={0}
                    direction="horizontal"
                    items={pipelineSteps.map((step, idx) => ({
                        title: (
                            <div className="mt-2">
                                <span className="text-white font-semibold text-base md:text-lg">
                                    {step.title}
                                </span>
                            </div>
                        ),
                        description: (
                            <div className="mt-2 max-w-[200px] mx-auto">
                                <span className="text-gray-400 text-sm leading-relaxed block">
                                    {step.description}
                                </span>
                            </div>
                        ),
                        icon: (
                            <div className={`
                                flex items-center justify-center w-12 h-12 rounded-xl 
                                bg-gradient-to-br from-[#5C45FD]/40 to-cyan-500/30 
                                border-2 ${idx === 0 ? 'border-[#5C45FD]' : 'border-white/20'} 
                                backdrop-blur-md shadow-lg transition-all duration-300
                                ${idx === 0 ? 'scale-110 shadow-[0_0_20px_rgba(92,69,253,0.5)]' : 'group-hover:scale-105'}
                            `}>
                                <div className={idx === 0 ? 'text-[#5C45FD]' : 'text-gray-400'}>
                                    {step.icon}
                                </div>
                            </div>
                        ),
                        status: idx === 0 ? 'process' : 'wait'
                    }))}
                    className="custom-steps enhanced-steps"
                />
            </div>

            {/* Progress indicator */}
            <div className="mt-16 flex justify-center">
                <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#5C45FD] animate-pulse" />
                        <div className="w-2 h-2 rounded-full bg-[#5C45FD]/60" />
                        <div className="w-2 h-2 rounded-full bg-[#5C45FD]/30" />
                        <div className="w-2 h-2 rounded-full bg-[#5C45FD]/15" />
                        <div className="w-2 h-2 rounded-full bg-[#5C45FD]/8" />
                    </div>
                    <span className="text-xs text-gray-400 font-mono">Pipeline Status: Active • Processing</span>
                </div>
            </div>
        </div>
    </div>

    <style jsx>{`
        @keyframes float {
            0%, 100% {
                transform: translateY(0px) translateX(0px);
                opacity: 0.3;
            }
            50% {
                transform: translateY(-20px) translateX(10px);
                opacity: 0.6;
            }
        }
        
        .custom-steps :global(.ant-steps-item) {
            flex: 1;
            padding: 0 8px;
        }
        
        .custom-steps :global(.ant-steps-item-container) {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }
        
        .custom-steps :global(.ant-steps-item-tail) {
            display: none !important;
        }
        
        .custom-steps :global(.ant-steps-item-process .ant-steps-item-icon) {
            background: transparent !important;
            border: none !important;
        }
        
        .custom-steps :global(.ant-steps-item-wait .ant-steps-item-icon) {
            background: transparent !important;
            border: none !important;
        }
        
        .custom-steps :global(.ant-steps-item-icon) {
            margin: 0 auto 16px !important;
        }
        
        .custom-steps :global(.ant-steps-item-title) {
            padding: 0 !important;
            margin-top: 8px !important;
        }
        
        .custom-steps :global(.ant-steps-item-description) {
            padding: 0 !important;
            margin-top: 4px !important;
        }
        
        .enhanced-steps :global(.ant-steps-item) {
            position: relative;
        }
        
        .enhanced-steps :global(.ant-steps-item::after) {
            content: '';
            position: absolute;
            top: 24px;
            left: calc(50% + 32px);
            width: calc(100% - 64px);
            height: 2px;
            background: linear-gradient(90deg, rgba(92,69,253,0.3), rgba(92,69,253,0.1));
            pointer-events: none;
        }
        
        .enhanced-steps :global(.ant-steps-item:last-child::after) {
            display: none;
        }
        
        .enhanced-steps :global(.ant-steps-item-process::after) {
            background: linear-gradient(90deg, #5C45FD, rgba(92,69,253,0.3));
        }
        
        @media (max-width: 768px) {
            .enhanced-steps :global(.ant-steps-item::after) {
                display: none;
            }
        }
        
        .bg-grid-pattern {
            background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0);
            background-size: 40px 40px;
        }
    `}</style>
</motion.section>

                {/* Transparency & Trust Section */}
                <motion.section 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 mt-10 gap-12 items-center"
                >
                    <div className="space-y-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5C45FD]/10 border border-[#5C45FD]/20 mb-4">
                                <Shield size={14} />
                                <span className="text-xs font-bold uppercase tracking-wider">Transparency First</span>
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Trust Through Transparency</h2>
                            <p className="text-gray-400 leading-relaxed">
                                We believe that detection is only half the battle. Explaining the reasoning behind an AI's decision is crucial for true accountability and human trust.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {[
                                {
                                    icon: <ArrowRight size={20} />,
                                    title: "Deciphering Confidence Scores",
                                    description: "Every prediction is accompanied by a confidence percentage. A score of 95% indicates high statistical certainty of manipulation based on learned artifacts.",
                                    color: "from-[#5C45FD] to-purple-500"
                                },
                                {
                                    icon: <Shield size={20} />,
                                    title: "Ethical Framework",
                                    description: "DeepShield is built with privacy-first principles. We do not store biometric data, and all analyses are performed in secured, sandboxed environments.",
                                    color: "from-cyan-500 to-blue-500"
                                },
                                {
                                    icon: <Eye size={20} />,
                                    title: "Model Limitations",
                                    description: "While our models are 99% accurate, they can be challenged by intentional noise injection or low-resolution sources.",
                                    color: "from-amber-500 to-orange-500"
                                }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.02 }}
                                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 transition-all"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                                    <div className="relative p-6 flex gap-4">
                                        <div className={`p-3 h-fit rounded-xl bg-gradient-to-br ${item.color} text-white shadow-lg`}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold mb-2">{item.title}</h4>
                                            <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-[#1A1A1B] to-[#0F0F10] border border-white/10 flex items-center justify-center p-12 overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#5C45FD]/5 to-transparent" />
                            <div className="relative z-10 text-center space-y-4">
                                <motion.div
                                    animate={{ 
                                        scale: [1, 1.1, 1],
                                    }}
                                    transition={{ 
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-[#5C45FD] to-purple-500 blur-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30"
                                />
                                <Lock size={80} className="text-[#5C45FD] mx-auto mb-6 relative z-10" />
                                <h3 className="text-2xl font-bold italic text-gray-300 font-serif">"Truth is the bedrock of digital society."</h3>
                                <p className="text-[#5C45FD] font-mono text-sm font-bold uppercase tracking-widest">— DEEPSHIELD MISSION STATEMENT</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.section>
            </main>

            {/* Enhanced CTA Section */}
            <section className="relative overflow-hidden bg-gradient-to-r from-[#5C45FD] to-purple-600 py-20">
                <div className="absolute inset-0 bg-black/20" />
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-black mb-6 text-white">Ready to Verify?</h2>
                        <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto">
                            Join the fight against digital misinformation. Start verifying content with DeepShield's advanced AI forensics.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Button 
                                href="/dashboard"
                                size="large" 
                                className="h-14 px-10 bg-white text-[#5C45FD] border-none rounded-xl font-bold shadow-xl hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                            >
                                Enter Dashboard
                                <ArrowRight size={18} className="ml-2 inline" />
                            </Button>
                            <Button 
                                href="/deepfakeVerification/imageDetection"
                                size="large" 
                                className="h-14 px-10 bg-white/20 text-white border-white/20 rounded-xl font-bold backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
                            >
                                Try Quick Detection
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

           {/* <style jsx>{`
                .custom-steps :global(.ant-steps-item-title) {
                    color: white !important;
                    font-weight: 500 !important;
                }
                .custom-steps :global(.ant-steps-item-description) {
                    color: #d1d5db !important;
                }
                .custom-steps :global(.ant-steps-item-process .ant-steps-item-icon) {
                    background-color: #5C45FD !important;
                    border-color: #5C45FD !important;
                }
                .custom-steps :global(.ant-steps-item-process .ant-steps-item-icon .ant-steps-icon) {
                    color: white !important;
                }
                .custom-steps :global(.ant-steps-item-wait .ant-steps-item-icon) {
                    background-color: #1f1f23 !important;
                    border-color: #2a2a2e !important;
                }
                .custom-steps :global(.ant-steps-item-wait .ant-steps-item-icon .ant-steps-icon) {
                    color: #9ca3af !important;
                }
                .bg-grid-pattern {
                    background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0);
                    background-size: 40px 40px;
                }
                .enhanced-steps :global(.ant-steps-item-title) {
                    color: #ffffff !important;
                    font-weight: 600 !important;
                    letter-spacing: 0.3px;
                }

                .enhanced-steps :global(.ant-steps-item-description) {
                    color: #d1d5db !important;
                }

                .enhanced-steps :global(.ant-steps-item-icon) {
                    background: transparent !important;
                    border: none !important;
                }

                .enhanced-steps :global(.ant-steps-item-process .ant-steps-item-icon) {
                    background: linear-gradient(135deg, #5C45FD, #7C6CFF) !important;
                    box-shadow: 0 0 20px rgba(92, 69, 253, 0.6);
                }

                .enhanced-steps :global(.ant-steps-item-process .ant-steps-icon) {
                    color: #fff !important;
                }

                .enhanced-steps :global(.ant-steps-item-wait .ant-steps-item-icon) {
                    background: rgba(255, 255, 255, 0.05) !important;
                    border: 1px solid rgba(255,255,255,0.1) !important;
                }

                .enhanced-steps :global(.ant-steps-item-tail::after) {
                    background: linear-gradient(to right, rgba(92,69,253,0.5), rgba(255,255,255,0.1)) !important;
                }
            `}</style> */}
        </div>
    );
}