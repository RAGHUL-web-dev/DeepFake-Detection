'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const SERVICES = [
    {
        title: 'Identity Protection',
        description: 'Ensure your digital persona remains yours. Our AI scans for real-time face variations and deepfake injections in video calls and live streams.',
        image: 'C:/Users/SURENDHAR/.gemini/antigravity/brain/82f85fac-20d8-47cd-be2d-ef4c0ab5a6e4/face_swap_detection_feature_1770147148277.png',
        color: 'from-blue-600/20 to-cyan-500/20',
    },
    {
        title: 'Voice Authentication',
        description: 'Protect against voice cloning heists. We analyze frequency patterns and synthetic artifacts to distinguish between human and AI-generated speech.',
        image: 'C:/Users/SURENDHAR/.gemini/antigravity/brain/82f85fac-20d8-47cd-be2d-ef4c0ab5a6e4/voice_detection_feature_1770147168062.png',
        color: 'from-purple-600/20 to-pink-500/20',
    },
    {
        title: 'Document Integrity',
        description: 'Validate digital credentials with blockchain-backed certainty. Our system detects pixel-level edits in IDs, passports, and legal documents.',
        image: 'C:/Users/SURENDHAR/.gemini/antigravity/brain/82f85fac-20d8-47cd-be2d-ef4c0ab5a6e4/document_integrity_feature_1770147187022.png',
        color: 'from-emerald-600/20 to-teal-500/20',
    },
    {
        title: 'Social Media Guard',
        description: 'Stay ahead of misinformation. We monitor social platforms for deepfake campaign patterns, helping brands and individuals protect their reputation.',
        image: 'C:/Users/SURENDHAR/.gemini/antigravity/brain/82f85fac-20d8-47cd-be2d-ef4c0ab5a6e4/social_media_security_feature_1770147207764.png',
        color: 'from-orange-600/20 to-red-500/20',
    },
    {
        title: 'Forensic Analysis',
        description: 'Deep-dive investigation for legal and commercial needs. Detailed reports on light source consistency, shadow analysis, and metadata verification.',
        image: 'C:/Users/SURENDHAR/.gemini/antigravity/brain/82f85fac-20d8-47cd-be2d-ef4c0ab5a6e4/forensic_pixel_analysis_feature_1770147233890.png',
        color: 'from-indigo-600/20 to-blue-500/20',
    },
];

function Card({ service, index }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5, once: false });
    const [typedTitle, setTypedTitle] = useState('');
    const [typedDesc, setTypedDesc] = useState('');

    useEffect(() => {
        if (isInView) {
            let titleIndex = 0;
            let descIndex = 0;
            setTypedTitle('');
            setTypedDesc('');

            const titleInterval = setInterval(() => {
                if (titleIndex <= service.title.length) {
                    setTypedTitle(service.title.slice(0, titleIndex));
                    titleIndex++;
                } else {
                    clearInterval(titleInterval);
                    const descInterval = setInterval(() => {
                        if (descIndex <= service.description.length) {
                            setTypedDesc(service.description.slice(0, descIndex));
                            descIndex++;
                        } else {
                            clearInterval(descInterval);
                        }
                    }, 20);
                }
            }, 50);

            return () => {
                clearInterval(titleInterval);
            };
        }
    }, [isInView, service]);

    return (
        <div
            ref={ref}
            className="sticky top-0 flex min-h-screen w-full items-center justify-center overflow-hidden bg-[var(--color-dark)] px-6 py-20 md:px-20"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 100 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ margin: '-100px' }}
                className={`relative flex h-[80vh] w-full max-w-7xl flex-col items-center justify-between overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-br ${service.color} p-8 backdrop-blur-3xl md:flex-row md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)]`}
            >
                {/* Left Side: Content */}
                <div className="z-10 w-full text-left md:w-1/2">
                    <h3 className="min-h-[4rem] text-4xl font-black tracking-tighter text-[var(--color-light)] md:text-6xl">
                        {typedTitle}
                        <span className="ml-1 inline-block h-8 w-1 bg-[var(--color-primary-light)] animate-pulse md:h-12" />
                    </h3>
                    <p className="mt-8 min-h-[6rem] text-lg font-medium leading-relaxed text-[var(--color-light-gray)]/80 md:text-2xl">
                        {typedDesc}
                    </p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 1.5 }}
                        className="mt-10"
                    >
                        <button className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-white/5 px-8 py-4 font-bold text-white border border-white/10 transition-all hover:bg-white/10">
                            <span className="relative z-10 text-xl">Learn More</span>
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-[var(--color-primary-light)] transition-transform scale-x-0 group-hover:scale-x-100" />
                        </button>
                    </motion.div>
                </div>

                {/* Right Side: Image */}
                <div className="relative mt-12 w-full md:mt-0 md:w-5/12">
                    <motion.div
                        initial={{ opacity: 0, x: 50, rotate: 5 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="group relative aspect-square overflow-hidden rounded-2xl border-4 border-white/5 shadow-2xl"
                    >
                        {/* Image Placeholder with path to generated asset */}
                        <div className="absolute inset-0 bg-black/40 mix-blend-overlay transition-opacity group-hover:opacity-20" />
                        <img
                            src={service.image}
                            alt={service.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Decorative Corner */}
                        <div className="absolute top-0 left-0 h-12 w-12 border-t-2 border-l-2 border-[var(--color-primary-light)]/50" />
                        <div className="absolute bottom-0 right-0 h-12 w-12 border-b-2 border-r-2 border-[var(--color-primary-light)]/50" />
                    </motion.div>

                    {/* Background Glow */}
                    <div className="absolute -inset-4 z-[-1] rounded-full bg-[var(--color-primary)]/20 blur-3xl" />
                </div>
            </motion.div>
        </div>
    );
}

function ServiceIntro() {
    const revealRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: revealRef,
        offset: ["start", "end"]
    });

    const x = useTransform(scrollYProgress, [0, 1], ["90%", "-130%"]);

    return (
        <section className="relative z-0 bg-[var(--color-dark)]">
            {/* Introduction Header */}
            <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[var(--color-dark)] px-6 text-center">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="rounded-full border border-white/20 bg-white/5 px-6 py-2 text-sm font-bold uppercase tracking-widest text-[var(--color-primary-light)]"
                >
                    Our Capabilities
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 text-5xl font-black tracking-tighter text-[var(--color-light)] md:text-8xl"
                >
                    How We Protect You
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 max-w-2xl text-xl text-[var(--color-light-gray)] md:text-2xl"
                >
                    Experience our multi-layered defense system designed to secure your identity,
                    voice, and digital presence in an era of synthetic media.
                </motion.p>
            </div>

            {/* Cards Section */}
            <div className="relative">
                {SERVICES.map((service, index) => (
                    <Card key={index} service={service} index={index} />
                ))}
            </div>

            {/* Final Scroll Reveal Section (Pinned) */}
            <section ref={revealRef} className="relative h-[300vh] bg-[var(--color-dark)] mt-20">
                <div className="sticky top-0 h-screen overflow-hidden flex items-center">
                    <motion.div style={{ x }} className="whitespace-nowrap">
                        <h2 className="text-[55vw] font-black leading-none tracking-tighter text-white opacity-[0.03] uppercase italic select-none">
                            TRUST WHAT YOU SEE
                        </h2>
                    </motion.div>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="text-center"
                        >
                            <p className="text-2xl font-bold tracking-[0.5em] text-[var(--color-primary-light)]">DEEPSHIELD FORENSICS</p>
                            <h3 className="mt-4 text-6xl font-black text-white md:text-8xl px-4">Securing the Truth.</h3>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer Buffer */}
            <div className="h-[20vh] bg-[var(--color-dark)]" />
        </section>
    );
}

export default ServiceIntro;
