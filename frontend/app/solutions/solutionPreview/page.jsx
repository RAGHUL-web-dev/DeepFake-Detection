'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
                    <div className="md:w-1/2 space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="w-12 h-[1px] bg-primary"></span>
                            <span className="text-primary tracking-widest uppercase text-sm font-semibold">01. Image Analysis</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-light">Pixel-Level Component <span className="block font-semibold">Inspection</span></h3>
                        <p className="text-gray-400 leading-relaxed">
                            Our algorithms dissect images at the sub-pixel level, identifying artifacts invisible to the human eye.
                            We detect inconsistencies in noise distribution, lighting gradients, and compression signatures that reveal synthetic generation.
                        </p>
                        <ul className="grid grid-cols-2 gap-4 pt-4">
                            <li className="flex items-center gap-2 text-sm text-gray-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Error Level Analysis
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Metadata Forensics
                            </li>
                        </ul>

                        <div className="pt-6">
                            <Link href="/deepfakeVerification/imageDetection" className="inline-flex items-center gap-2 px-6 py-3 bg-[#5C45FD] hover:bg-[#4A36CA] text-white rounded-lg font-semibold transition-colors">
                                Try Image Detection
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-1/2 w-full">
                        {/* Interactive Image Comparison Slider */}
                        <ImageComparisonSlider />
                    </div>
                </motion.div>

                {/* 2. Video Detection (Right Content / Left Visual) */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16"
                >
                    <div className="md:w-1/2 space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="w-12 h-[1px] bg-primary"></span>
                            <span className="text-primary tracking-widest uppercase text-sm font-semibold">02. Video Forensics</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-light">Temporal Consistency <span className="block font-semibold">Verification</span></h3>
                        <p className="text-gray-400 leading-relaxed">
                            Deepfakes often struggle with temporal coherence. We analyze frame-to-frame transitions, tracking biological signals
                            like microsaccades (eye movements) and subtle pulse-induced color changes (photoplethysmography) that generative models fail to replicate perfectly.
                        </p>
                        <ul className="grid grid-cols-2 gap-4 pt-4">
                            <li className="flex items-center gap-2 text-sm text-gray-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Frame-by-Frame Logic
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Lip-Sync Alignment
                            </li>
                        </ul>

                        <div className="pt-6">
                            <Link href="/deepfakeVerification/videoDetection" className="inline-flex items-center gap-2 px-6 py-3 bg-[#5C45FD] hover:bg-[#4A36CA] text-white rounded-lg font-semibold transition-colors">
                                Try Video Analysis
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-1/2 w-full">
                        {/* Placeholder for Video Visual */}
                        <div className="aspect-video bg-neutral-900 rounded-xl border border-neutral-800 relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full border-2 border-primary/30 flex items-center justify-center">
                                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[16px] border-l-primary/80 border-b-8 border-b-transparent ml-1"></div>
                                </div>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                                <div className="h-1 flex-1 bg-neutral-800 rounded-full overflow-hidden">
                                    <div className="h-full w-2/3 bg-primary/60"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 3. Voice Detection (Left Content / Right Visual) */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16"
                >
                    <div className="md:w-1/2 space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="w-12 h-[1px] bg-primary"></span>
                            <span className="text-primary tracking-widest uppercase text-sm font-semibold">03. Audio Analysis</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-light">Synthetic Frequency <span className="block font-semibold">Mapping</span></h3>
                        <p className="text-gray-400 leading-relaxed">
                            Cloned voices lack the organic imperfections of human speech.
                            Our spectral analysis identifies flattening in high-frequency bands and
                            detects phase discontinuities typical of text-to-speech synthesis engines.
                        </p>
                        <ul className="grid grid-cols-2 gap-4 pt-4">
                            <li className="flex items-center gap-2 text-sm text-gray-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Spectral Fingerprinting
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Emotion/Tone Match
                            </li>
                        </ul>

                        <div className="pt-6">
                            <Link href="/deepfakeVerification/voiceDetection" className="inline-flex items-center gap-2 px-6 py-3 bg-[#5C45FD] hover:bg-[#4A36CA] text-white rounded-lg font-semibold transition-colors">
                                Try Audio Analysis
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-1/2 w-full">
                        {/* Placeholder for Audio Visual */}
                        <div className="aspect-[4/3] bg-neutral-900 rounded-xl border border-neutral-800 relative flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-40">
                                {[...Array(20)].map((_, i) => (
                                    <div key={i} className="w-2 bg-primary/50 rounded-full animate-pulse" style={{
                                        height: `${Math.random() * 60 + 20}%`,
                                        animationDelay: `${i * 0.1}s`
                                    }}></div>
                                ))}
                            </div>
                            <span className="relative z-10 text-neutral-500 font-mono text-sm tracking-wider">[ Audio Spectrum Analysis ]</span>
                        </div>
                    </div>
                </motion.div>

            </section>

            {/* Blockchain Verification Section */}
            <BlockchainSection />

            {/* Trust & Credibility Section */}
            <TrustSection />

            {/* Final CTA Section */}
            <CTASection />
        </>
    )
}

export default SolutionPreview