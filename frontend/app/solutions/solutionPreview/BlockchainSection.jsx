'use client';

import { motion } from 'framer-motion';
import { Database, ShieldCheck, Lock, ArrowRight, Share2 } from 'lucide-react';
import Link from 'next/link';

const BlockchainSection = () => {
    // Generate static positions for the network nodes to ensure hydration consistency
    // In a real app, these could be randomly generated on the client, but static is safer for SSR
    const nodes = [
        { x: 10, y: 20, size: 1.2 }, { x: 30, y: 10, size: 0.8 }, { x: 50, y: 15, size: 1.5 }, { x: 70, y: 10, size: 0.9 }, { x: 90, y: 25, size: 1.1 },
        { x: 15, y: 45, size: 0.9 }, { x: 35, y: 35, size: 1.4 }, { x: 55, y: 40, size: 1.0 }, { x: 75, y: 30, size: 1.2 }, { x: 95, y: 45, size: 0.8 },
        { x: 5, y: 70, size: 1.3 }, { x: 25, y: 60, size: 0.8 }, { x: 45, y: 65, size: 1.5 }, { x: 65, y: 55, size: 1.1 }, { x: 85, y: 60, size: 0.9 },
        { x: 20, y: 85, size: 1.0 }, { x: 40, y: 90, size: 1.2 }, { x: 60, y: 80, size: 0.9 }, { x: 80, y: 85, size: 1.4 }, { x: 95, y: 75, size: 0.8 }
    ];

    // Connections between nodes (indices)
    const connections = [
        [0, 1], [1, 2], [2, 3], [3, 4],
        [0, 5], [1, 6], [2, 7], [3, 8], [4, 9],
        [5, 6], [6, 7], [7, 8], [8, 9],
        [5, 10], [6, 11], [7, 12], [8, 13], [9, 14],
        [10, 11], [11, 12], [12, 13], [13, 14],
        [10, 15], [11, 16], [12, 17], [13, 18], [14, 19],
        [15, 16], [16, 17], [17, 18], [18, 19]
    ];

    return (
        <section className="w-full min-h-screen py-24 px-4 md:px-12 bg-[#0B0F19] flex items-center justify-center overflow-hidden">
            {/* Main Container - 95% Width/Height */}
            <div className="w-full max-w-[95%] min-h-[85vh] rounded-[2.5rem] bg-[#0F1423] border border-blue-500/10 relative overflow-hidden flex flex-col items-center justify-center p-8 md:p-20 shadow-2xl shadow-blue-900/20">

                {/* Animated Background Mesh */}
                <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0F1423] to-[#0F1423]"></div>
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px]"></div>
                </div>

                <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Left: Content */}
                    <div className="lg:w-1/2 space-y-10 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
                                <Share2 size={13} className="text-cyan-400" />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Decentralized Verification</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
                                Immutable Trust. <br />
                                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">
                                    Forever Verified.
                                </span>
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-slate-400 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
                        >
                            We don't just detect deepfakes; we prove authenticity.
                            Every analysis is cryptographically hashed and anchored to our blockchain network,
                            creating a permanent, verifiable record that stands up to any scrutiny.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
                        >
                            <Link href="/auth/register" className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl overflow-hidden shadow-lg shadow-blue-500/25 transition-all hover:scale-105 active:scale-95">
                                <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 origin-left"></div>
                                <span className="relative flex items-center gap-2 text-white font-bold tracking-wide">
                                    Start Verifying
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>

                            <button className="px-8 py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-white font-medium flex items-center gap-2 group">
                                <Database size={18} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                                <span>Explore Ledger</span>
                            </button>
                        </motion.div>

                        {/* Trust Badges */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className="pt-8 grid grid-cols-2 gap-6 opacity-60"
                        >
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="text-emerald-500" size={20} />
                                <span className="text-sm font-medium text-slate-300">ISO 27001 Certified</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Lock className="text-blue-500" size={20} />
                                <span className="text-sm font-medium text-slate-300">End-to-End Encryption</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Network Animation */}
                    <div className="lg:w-1/2 w-full h-[500px] relative flex items-center justify-center perspective-1000">
                        <div className="relative w-full h-full max-w-lg mx-auto">

                            {/* Connections */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                                {connections.map(([start, end], i) => (
                                    <motion.line
                                        key={`line-${i}`}
                                        x1={`${nodes[start].x}%`}
                                        y1={`${nodes[start].y}%`}
                                        x2={`${nodes[end].x}%`}
                                        y2={`${nodes[end].y}%`}
                                        stroke="url(#gradient-line)"
                                        strokeWidth="1"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 0.4 }}
                                        transition={{ duration: 1.5, delay: i * 0.02, ease: "easeInOut" }}
                                    />
                                ))}
                                <defs>
                                    <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#3B82F6" />
                                        <stop offset="100%" stopColor="#06B6D4" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Nodes */}
                            {nodes.map((node, i) => (
                                <motion.div
                                    key={`node-${i}`}
                                    className="absolute w-8 h-8 -ml-4 -mt-4 cursor-pointer z-10"
                                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 260,
                                        damping: 20,
                                        delay: i * 0.05 + 0.5
                                    }}
                                    whileHover={{ scale: 1.5, zIndex: 50 }}
                                >
                                    {/* Cube visual */}
                                    <motion.div
                                        className="w-full h-full relative preserve-3d"
                                        animate={{
                                            rotateY: [0, 360],
                                            rotateX: [0, 360],
                                        }}
                                        transition={{
                                            duration: 10 + Math.random() * 10,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-blue-500/20 border border-blue-400/50 backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.3)]"></div>
                                        {/* Inner glow core */}
                                        <div className="absolute inset-2 bg-cyan-400/80 blur-sm rounded-full"></div>
                                    </motion.div>

                                    {/* Pulse effect */}
                                    <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20" style={{ animationDuration: `${2 + i % 3}s` }}></div>
                                </motion.div>
                            ))}

                            {/* Floating Context Labels (Decorative) */}
                            <motion.div
                                className="absolute top-[15%] right-[10%] bg-blue-900/80 border border-blue-500/30 px-3 py-1 rounded text-[10px] font-mono text-cyan-300 pointer-events-none"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                Hash: 0x7f...a29
                            </motion.div>
                            <motion.div
                                className="absolute bottom-[20%] left-[5%] bg-blue-900/80 border border-blue-500/30 px-3 py-1 rounded text-[10px] font-mono text-emerald-300 pointer-events-none"
                                animate={{ y: [0, 15, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            >
                                Block #892104
                            </motion.div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default BlockchainSection;
