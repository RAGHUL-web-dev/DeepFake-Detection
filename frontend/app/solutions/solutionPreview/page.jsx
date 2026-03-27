'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import ImageComparisonSlider from './ImageComparisonSlider';
import BlockchainSection from './BlockchainSection';
import TrustSection from './TrustSection';
import CTASection from './CTASection';

function SolutionPreview() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    // Text Animation Variants
    const textReveal = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const staggerChildren = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    // Video Detection Animation State
    const [frameIndex, setFrameIndex] = useState(0);
    const [isAnalyzing, setIsAnalyzing] = useState(true);
    const [particleOffset, setParticleOffset] = useState(0);
    const animationRef = useRef(null);
    const particleRef = useRef(null);

    // Simulated frame analysis data with more detail
    const frames = [
        { 
            confidence: 95, 
            status: 'Authentic', 
            color: '#22c55e', 
            analysis: 'Facial landmarks match',
            details: ['✓ Face geometry verified', '✓ No artifacts detected', '✓ Natural texture pattern']
        },
        { 
            confidence: 92, 
            status: 'Authentic', 
            color: '#22c55e', 
            analysis: 'Micro-expression consistent',
            details: ['✓ 27 facial landmarks tracked', '✓ Expression mapping normal', '✓ Temporal coherence stable']
        },
        { 
            confidence: 34, 
            status: 'Suspicious', 
            color: '#eab308', 
            analysis: 'Lip-sync mismatch detected',
            details: ['⚠ Audio-video offset: 0.3s', '⚠ Mouth movement irregular', '⚠ Syllable timing off']
        },
        { 
            confidence: 28, 
            status: 'Deepfake', 
            color: '#ef4444', 
            analysis: 'Temporal inconsistency',
            details: ['✗ Frame dropout detected', '✗ Motion blur mismatch', '✗ Artifact clusters found']
        },
        { 
            confidence: 31, 
            status: 'Suspicious', 
            color: '#eab308', 
            analysis: 'Eye movement anomaly',
            details: ['⚠ Gaze direction unstable', '⚠ Saccade pattern unusual', '⚠ Blink rate abnormal']
        },
        { 
            confidence: 45, 
            status: 'Suspicious', 
            color: '#eab308', 
            analysis: 'Blink pattern irregular',
            details: ['⚠ Inter-blink interval: 0.8s', '⚠ Incomplete closure detected', '⚠ Timing inconsistent']
        },
        { 
            confidence: 25, 
            status: 'Deepfake', 
            color: '#ef4444', 
            analysis: 'Skin texture artifact',
            details: ['✗ Neural texture synthesis', '✗ Noise pattern mismatch', '✗ Edge blending failed']
        },
        { 
            confidence: 88, 
            status: 'Authentic', 
            color: '#22c55e', 
            analysis: 'Blood flow signal detected',
            details: ['✓ PPG signal present', '✓ Heart rate: 72 BPM', '✓ Color variation natural']
        },
    ];

    useEffect(() => {
        if (isAnalyzing) {
            animationRef.current = setInterval(() => {
                setFrameIndex((prev) => (prev + 1) % frames.length);
            }, 1200);
        }
        return () => {
            if (animationRef.current) clearInterval(animationRef.current);
        };
    }, [isAnalyzing, frames.length]);

    // Particle animation for video detection
    useEffect(() => {
        if (isAnalyzing) {
            particleRef.current = setInterval(() => {
                setParticleOffset(prev => (prev + 1) % 100);
            }, 50);
        }
        return () => {
            if (particleRef.current) clearInterval(particleRef.current);
        };
    }, [isAnalyzing]);

    const currentFrame = frames[frameIndex];

    return (
        <>
            {/* Solutions Showcase Section */}
            <section className="w-full py-24 px-6 md:px-20 bg-[#161616] text-white space-y-32 overflow-hidden">

                {/* 1. Image Detection (Left Content / Right Visual) */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16"
                >
                    <motion.div 
                        variants={staggerChildren}
                        className="md:w-1/2 space-y-6"
                    >
                        <motion.div variants={textReveal} className="flex items-center gap-3">
                            <span className="w-12 h-[1px] bg-primary"></span>
                            <span className="text-primary tracking-widest uppercase text-sm font-semibold">01. Image Analysis</span>
                        </motion.div>
                        <motion.h3 variants={textReveal} className="text-3xl md:text-4xl font-light">
                            Pixel-Level Component <span className="block font-semibold">Inspection</span>
                        </motion.h3>
                        <motion.p variants={textReveal} className="text-gray-400 leading-relaxed">
                            Our algorithms dissect images at the sub-pixel level, identifying artifacts invisible to the human eye.
                            We detect inconsistencies in noise distribution, lighting gradients, and compression signatures that reveal synthetic generation.
                        </motion.p>
                        <motion.ul variants={staggerChildren} className="grid grid-cols-2 gap-4 pt-4">
                            <motion.li variants={textReveal} className="flex items-center gap-2 text-sm text-gray-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Error Level Analysis
                            </motion.li>
                            <motion.li variants={textReveal} className="flex items-center gap-2 text-sm text-gray-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Metadata Forensics
                            </motion.li>
                        </motion.ul>

                        <motion.div variants={textReveal} className="pt-6">
                            <Link href="/deepfakeVerification/imageDetection" className="inline-flex items-center gap-2 px-6 py-3 bg-[#5C45FD] hover:bg-[#4A36CA] text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                                Try Image Detection
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="md:w-1/2 w-full"
                    >
                        <ImageComparisonSlider />
                    </motion.div>
                </motion.div>

                {/* 2. Video Detection (Right Content / Left Visual) - IMPROVED ANIMATION */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16"
                >
                    <motion.div 
                        variants={staggerChildren}
                        className="md:w-1/2 space-y-6"
                    >
                        <motion.div variants={textReveal} className="flex items-center gap-3">
                            <span className="w-12 h-[1px] bg-primary"></span>
                            <span className="text-primary tracking-widest uppercase text-sm font-semibold">02. Video Forensics</span>
                        </motion.div>
                        <motion.h3 variants={textReveal} className="text-3xl md:text-4xl font-light">
                            Temporal Consistency <span className="block font-semibold">Verification</span>
                        </motion.h3>
                        <motion.p variants={textReveal} className="text-gray-400 leading-relaxed">
                            Deepfakes often struggle with temporal coherence. We analyze frame-to-frame transitions, tracking biological signals
                            like microsaccades (eye movements) and subtle pulse-induced color changes (photoplethysmography) that generative models fail to replicate perfectly.
                        </motion.p>
                        <motion.ul variants={staggerChildren} className="grid grid-cols-2 gap-4 pt-4">
                            <motion.li variants={textReveal} className="flex items-center gap-2 text-sm text-gray-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Frame-by-Frame Logic
                            </motion.li>
                            <motion.li variants={textReveal} className="flex items-center gap-2 text-sm text-gray-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Lip-Sync Alignment
                            </motion.li>
                        </motion.ul>

                        <motion.div variants={textReveal} className="pt-6">
                            <Link href="/deepfakeVerification/videoDetection" className="inline-flex items-center gap-2 px-6 py-3 bg-[#5C45FD] hover:bg-[#4A36CA] text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                                Try Video Analysis
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="md:w-1/2 w-full"
                    >
                        {/* Enhanced Animated Video Detection Visual */}
                        <div className="aspect-video bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-xl border border-neutral-800 relative overflow-hidden shadow-2xl">
                            
                            {/* Animated Background Grid */}
                            <div className="absolute inset-0">
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(92,69,253,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(92,69,253,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
                                
                                {/* Particle System */}
                                {[...Array(30)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute w-0.5 h-0.5 bg-primary/30 rounded-full animate-float"
                                        style={{
                                            left: `${(particleOffset + i * 7) % 100}%`,
                                            top: `${(particleOffset * 1.5 + i * 3) % 100}%`,
                                            animationDelay: `${i * 0.1}s`,
                                            animationDuration: `${2 + (i % 3)}s`
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Dynamic Scan Lines */}
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
                                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-reverse" />
                                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-primary to-transparent animate-scan-horizontal" />
                                <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-primary to-transparent animate-scan-horizontal-reverse" />
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute top-3 left-3 w-12 h-12 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" />
                            <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-primary/40 rounded-tr-lg" />
                            <div className="absolute bottom-3 left-3 w-12 h-12 border-b-2 border-l-2 border-primary/40 rounded-bl-lg" />
                            <div className="absolute bottom-3 right-3 w-12 h-12 border-b-2 border-r-2 border-primary/40 rounded-br-lg" />

                            {/* Center Analysis Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6">
                                {/* Status Badge with Enhanced Animation */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentFrame.status}
                                        initial={{ scale: 0.8, opacity: 0, y: -20 }}
                                        animate={{ scale: 1, opacity: 1, y: 0 }}
                                        exit={{ scale: 0.8, opacity: 0, y: 20 }}
                                        transition={{ duration: 0.3, type: "spring" }}
                                        className="mb-6 px-5 py-2.5 rounded-full bg-black/80 backdrop-blur-md border-2"
                                        style={{ borderColor: `${currentFrame.color}60` }}
                                    >
                                        <span className="text-sm font-mono font-semibold tracking-wide" style={{ color: currentFrame.color }}>
                                            {currentFrame.status === 'Deepfake' ? '⚠️ ' : currentFrame.status === 'Suspicious' ? '⚡ ' : '✓ '}
                                            {currentFrame.status.toUpperCase()}
                                        </span>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Confidence Circle with Pulse Effect */}
                                <div className="relative w-36 h-36 mb-6">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="72"
                                            cy="72"
                                            r="66"
                                            fill="none"
                                            stroke="rgba(255,255,255,0.1)"
                                            strokeWidth="8"
                                        />
                                        <motion.circle
                                            cx="72"
                                            cy="72"
                                            r="66"
                                            fill="none"
                                            stroke={currentFrame.color}
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: currentFrame.confidence / 100 }}
                                            transition={{ duration: 0.8, ease: "easeInOut" }}
                                        />
                                    </svg>
                                    <motion.div 
                                        className="absolute inset-0 flex flex-col items-center justify-center"
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <AnimatePresence mode="wait">
                                            <motion.span
                                                key={currentFrame.confidence}
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.5 }}
                                                className="text-3xl font-bold"
                                                style={{ color: currentFrame.color }}
                                            >
                                                {currentFrame.confidence}%
                                            </motion.span>
                                        </AnimatePresence>
                                        <span className="text-[10px] text-white/50 font-mono tracking-wider">CONFIDENCE SCORE</span>
                                    </motion.div>
                                </div>

                                {/* Analysis Text with Enhanced Animation */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentFrame.analysis}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-center mb-4"
                                    >
                                        <p className="text-sm text-white/80 font-mono font-medium bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg">
                                            {currentFrame.analysis}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Detailed Analysis Grid */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={frameIndex}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="grid grid-cols-1 gap-1.5 mt-2 w-full max-w-xs"
                                    >
                                        {currentFrame.details.map((detail, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 + idx * 0.1 }}
                                                className="text-[9px] font-mono text-white/40 bg-black/40 backdrop-blur-sm px-2 py-1 rounded"
                                            >
                                                {detail}
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Frame Counter with Progress Bar */}
                            <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-mono text-white/60">Frame {frameIndex + 1}/{frames.length}</span>
                                    <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                                        <motion.div 
                                            className="h-full bg-primary rounded-full"
                                            animate={{ width: `${((frameIndex + 1) / frames.length) * 100}%` }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Live Indicator with Pulsing Ring */}
                            <div className="absolute top-3 right-3 flex items-center gap-2 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                <div className="relative">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-red-500 animate-ping opacity-75" />
                                </div>
                                <span className="text-[10px] text-white/80 font-mono tracking-wider">LIVE ANALYSIS</span>
                            </div>

                            {/* Control Button */}
                            <button
                                onClick={() => setIsAnalyzing(!isAnalyzing)}
                                className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm hover:bg-black/90 transition-all duration-300 rounded-lg px-3 py-1.5 text-[10px] font-mono text-white/80 hover:text-white"
                            >
                                {isAnalyzing ? '⏸ PAUSE' : '▶ PLAY'}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>

                {/* 3. Audio Analysis (Left Content / Right Visual) */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16"
                >
                    <motion.div 
                        variants={staggerChildren}
                        className="md:w-1/2 space-y-6"
                    >
                        <motion.div variants={textReveal} className="flex items-center gap-3">
                            <span className="w-12 h-[1px] bg-primary"></span>
                            <span className="text-primary tracking-widest uppercase text-sm font-semibold">03. Text Analysis</span>
                        </motion.div>
                        <motion.h3 variants={textReveal} className="text-3xl md:text-4xl font-light">
                            Synthetic Content <span className="block font-semibold">Detection</span>
                        </motion.h3>
                        <motion.p variants={textReveal} className="text-gray-400 leading-relaxed">
                            AI-generated text lacks the natural patterns and inconsistencies of human writing.
                            Our linguistic analysis identifies statistical anomalies, unnatural phrasing patterns, 
                            and stylistic inconsistencies that reveal synthetic content.
                        </motion.p>
                        <motion.ul variants={staggerChildren} className="grid grid-cols-2 gap-4 pt-4">
                            <motion.li variants={textReveal} className="flex items-center gap-2 text-sm text-gray-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Linguistic Pattern Analysis
                            </motion.li>
                            <motion.li variants={textReveal} className="flex items-center gap-2 text-sm text-gray-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Semantic Coherence Check
                            </motion.li>
                        </motion.ul>

                        <motion.div variants={textReveal} className="pt-6">
                            <Link href="/deepfakeVerification/textDetection" className="inline-flex items-center gap-2 px-6 py-3 bg-[#5C45FD] hover:bg-[#4A36CA] text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                                Try Text Analysis
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="md:w-1/2 w-full"
                    >
                        <div className="aspect-[4/3] bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-xl border border-neutral-800 relative flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-40">
                                {[...Array(30)].map((_, i) => (
                                    <div key={i} className="w-1.5 bg-primary/50 rounded-full animate-textPulse" style={{
                                        height: `${Math.random() * 60 + 20}%`,
                                        animationDelay: `${i * 0.05}s`
                                    }}></div>
                                ))}
                            </div>
                            <div className="relative z-10 text-center">
                                <div className="text-neutral-500 font-mono text-sm tracking-wider mb-2">[ TEXT ANALYSIS ]</div>
                                <div className="text-xs text-white/30 font-mono">Analyzing linguistic patterns...</div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* 4. Voice Cloning Detection (Right Content / Left Visual) */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16"
                >
                    <motion.div 
                        variants={staggerChildren}
                        className="md:w-1/2 space-y-6"
                    >
                        <motion.div variants={textReveal} className="flex items-center gap-3">
                            <span className="w-12 h-[1px] bg-primary"></span>
                            <span className="text-primary tracking-widest uppercase text-sm font-semibold">04. Voice Cloning Detection</span>
                        </motion.div>
                        <motion.h3 variants={textReveal} className="text-3xl md:text-4xl font-light">
                            Vocal Biometric <span className="block font-semibold">Authentication</span>
                        </motion.h3>
                        <motion.p variants={textReveal} className="text-gray-400 leading-relaxed">
                            Advanced voice cloning AI creates nearly indistinguishable replicas of human voices. 
                            Our multi-layered detection system analyzes unique vocal biomarkers, including formant structure, 
                            glottal pulse patterns, and natural speech disfluencies that synthetic voices cannot authentically reproduce.
                        </motion.p>
                        <motion.ul variants={staggerChildren} className="grid grid-cols-2 gap-4 pt-4">
                            <motion.li variants={textReveal} className="flex items-center gap-2 text-sm text-gray-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Formant Analysis
                            </motion.li>
                            <motion.li variants={textReveal} className="flex items-center gap-2 text-sm text-gray-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Glottal Pulse Detection
                            </motion.li>
                            <motion.li variants={textReveal} className="flex items-center gap-2 text-sm text-gray-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Natural Disfluency Mapping
                            </motion.li>
                            <motion.li variants={textReveal} className="flex items-center gap-2 text-sm text-gray-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Vocal Tract Resonance
                            </motion.li>
                        </motion.ul>

                        <motion.div variants={textReveal} className="pt-6">
                            <Link href="/deepfakeVerification/voiceDetection" className="inline-flex items-center gap-2 px-6 py-3 bg-[#5C45FD] hover:bg-[#4A36CA] text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                                Try Voice Detection
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="md:w-1/2 w-full"
                    >
                        <div className="aspect-[4/3] bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-xl border border-neutral-800 relative overflow-hidden">
                            <div className="absolute inset-0 flex items-end justify-center gap-[2px] px-6 py-8 opacity-60">
                                {[...Array(48)].map((_, i) => {
                                    const heights = [25, 40, 55, 70, 85, 100, 90, 75, 60, 45, 30, 20];
                                    const height = heights[i % heights.length] * (Math.sin(i * 0.3) + 1) / 2;
                                    return (
                                        <div 
                                            key={i} 
                                            className="flex-1 bg-gradient-to-t from-primary to-primary-light rounded-t-sm animate-voiceWave"
                                            style={{ 
                                                height: `${Math.max(15, height)}%`,
                                                animationDelay: `${i * 0.05}s`,
                                                animationDuration: `${0.8 + (i % 3) * 0.2}s`
                                            }}
                                        />
                                    );
                                })}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative w-32 h-32 animate-pulse-slow">
                                    <svg className="w-full h-full" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(92, 69, 253, 0.2)" strokeWidth="1">
                                            <animate attributeName="r" values="45;48;45" dur="2s" repeatCount="indefinite" />
                                        </circle>
                                        <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(92, 69, 253, 0.4)" strokeWidth="1">
                                            <animate attributeName="r" values="35;38;35" dur="2s" repeatCount="indefinite" />
                                        </circle>
                                        <circle cx="50" cy="50" r="25" fill="none" stroke="rgba(92, 69, 253, 0.6)" strokeWidth="1">
                                            <animate attributeName="r" values="25;28;25" dur="2s" repeatCount="indefinite" />
                                        </circle>
                                        <circle cx="50" cy="50" r="15" fill="none" stroke="rgba(92, 69, 253, 0.8)" strokeWidth="1">
                                            <animate attributeName="r" values="15;18;15" dur="2s" repeatCount="indefinite" />
                                        </circle>
                                        <circle cx="50" cy="50" r="4" fill="#5C45FD" className="animate-pulse">
                                            <animate attributeName="r" values="4;6;4" dur="1s" repeatCount="indefinite" />
                                        </circle>
                                    </svg>
                                </div>
                            </div>
                            <div className="absolute bottom-6 left-6 right-6 flex gap-1 items-end justify-center">
                                {[...Array(12)].map((_, i) => (
                                    <div 
                                        key={i}
                                        className="w-1.5 bg-primary/60 rounded-full animate-soundWave"
                                        style={{
                                            height: `${Math.random() * 40 + 20}px`,
                                            animationDelay: `${i * 0.1}s`,
                                            animationDuration: `${0.8 + Math.random() * 0.4}s`
                                        }}
                                    />
                                ))}
                            </div>
                            <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                                <span className="text-[10px] text-primary/60 font-mono tracking-wider">VOICE SIGNATURE</span>
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/60 animate-pulse"></div>
                                    <span className="text-[8px] text-white/40">Live Analysis</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

            </section>

            {/* Blockchain Verification Section */}
            <BlockchainSection />

            {/* Trust & Credibility Section */}
            <TrustSection />

            {/* Final CTA Section */}
            <CTASection />
            
            {/* Add custom animations */}
            <style jsx>{`
                @keyframes scan {
                    0% {
                        transform: translateY(-100%);
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                }
                
                @keyframes scan-reverse {
                    0% {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100%);
                        opacity: 0;
                    }
                }
                
                @keyframes scan-horizontal {
                    0% {
                        transform: translateX(-100%);
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
                
                @keyframes scan-horizontal-reverse {
                    0% {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateX(-100%);
                        opacity: 0;
                    }
                }
                
                @keyframes float {
                    0% {
                        transform: translateY(0px) translateX(0px);
                        opacity: 0;
                    }
                    50% {
                        opacity: 0.5;
                    }
                    100% {
                        transform: translateY(-20px) translateX(10px);
                        opacity: 0;
                    }
                }
                
                @keyframes pulseWave {
                    0% {
                        opacity: 0.4;
                        transform: scaleY(0.8);
                    }
                    100% {
                        opacity: 1;
                        transform: scaleY(1.2);
                    }
                }
                
                @keyframes soundWave {
                    0% {
                        height: 15px;
                        opacity: 0.3;
                    }
                    50% {
                        height: 45px;
                        opacity: 1;
                    }
                    100% {
                        height: 15px;
                        opacity: 0.3;
                    }
                }
                
                @keyframes textPulse {
                    0%, 100% {
                        opacity: 0.3;
                        transform: scaleY(1);
                    }
                    50% {
                        opacity: 1;
                        transform: scaleY(1.5);
                    }
                }
                
                .animate-scan {
                    animation: scan 2s ease-in-out infinite;
                }
                
                .animate-scan-reverse {
                    animation: scan-reverse 2s ease-in-out infinite;
                }
                
                .animate-scan-horizontal {
                    animation: scan-horizontal 2s ease-in-out infinite;
                }
                
                .animate-scan-horizontal-reverse {
                    animation: scan-horizontal-reverse 2s ease-in-out infinite;
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                
                .animate-soundWave {
                    animation: soundWave 0.8s ease-in-out infinite;
                }
                
                .animate-voiceWave {
                    animation: pulseWave 0.6s ease-in-out infinite alternate;
                }
                
                .animate-textPulse {
                    animation: textPulse 1s ease-in-out infinite;
                }
                
                .animate-pulse-slow {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </>
    )
}

export default SolutionPreview