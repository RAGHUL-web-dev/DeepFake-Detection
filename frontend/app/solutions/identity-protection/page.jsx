"use client";

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Zap, ArrowRight, ShieldCheck, Fingerprint, Video } from 'lucide-react';
import Link from 'next/link';

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

export default function IdentityProtectionPage() {
    return (
        <div className="min-h-screen bg-[#0A0A0B] text-white">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#5C45FD]/10 to-transparent" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#5C45FD] blur-[150px] opacity-10 -mr-64 -mt-64" />
                
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-20 h-20 rounded-2xl bg-[#5C45FD]/20 flex items-center justify-center mx-auto mb-8 border border-[#5C45FD]/30"
                    >
                        <Shield className="text-[#5C45FD]" size={40} />
                    </motion.div>
                    <motion.h1 
                        {...fadeIn}
                        className="text-6xl md:text-8xl font-black tracking-tighter mb-6"
                    >
                        Identity <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5C45FD] to-cyan-400">Protection</span>
                    </motion.h1>
                    <motion.p 
                        {...fadeIn}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
                    >
                        Secure your digital persona with enterprise-grade biometric verification. 
                        Detect face-swaps and synthetic injections in real-time.
                    </motion.p>
                </div>
            </section>

            {/* Core Tech Section */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div {...fadeIn}>
                            <h2 className="text-4xl font-bold mb-8">How It Works</h2>
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                        <Fingerprint className="text-[#5C45FD]" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Biometric Liveness</h3>
                                        <p className="text-gray-400">Advanced micro-expression analysis to ensure the subject is a living person, not a high-fidelity mask or projection.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                        <Eye className="text-cyan-400" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Texture Consistency</h3>
                                        <p className="text-gray-400">Our neural networks scan for microscopic skin texture artifacts typically left behind by generative AI models.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                        <Zap className="text-purple-400" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Real-time Injection Detection</h3>
                                        <p className="text-gray-400">Detect modified video streams directly at the driver level, preventing virtual camera exploits.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-[#5C45FD] blur-[100px] opacity-20" />
                            <img 
                                src="https://images.unsplash.com/photo-1633412802994-5c058f151b66?w=800&fit=crop" 
                                alt="Face recognition tech" 
                                className="relative rounded-3xl border border-white/10 shadow-2xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-32 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold mb-16 text-center">Platform Capabilities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <Lock />, title: "Secure Entry", desc: "Multi-factor biometric authentication for high-security environments." },
                            { icon: <ShieldCheck />, title: "Brand Defense", desc: "Protect executives from unauthorized digital likeness usage." },
                            { icon: <Video />, title: "Stream Shield", desc: "Embed real-time verification in video conferencing platforms." }
                        ].map((item, idx) => (
                            <motion.div 
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="p-8 rounded-3xl bg-black border border-white/5 hover:border-[#5C45FD]/40 transition-all"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#5C45FD]/10 flex items-center justify-center text-[#5C45FD] mb-6">
                                    {item.icon}
                                </div>
                                <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-6">
                <div className="max-w-4xl mx-auto rounded-[3rem] bg-gradient-to-br from-[#5C45FD] to-purple-600 p-12 md:p-20 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -mr-32 -mt-32" />
                    <h2 className="text-4xl md:text-5xl font-black mb-8">Ready to secure your identity?</h2>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link href="/dashboard">
                            <button className="h-14 px-10 rounded-full bg-white text-[#5C45FD] font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 group mx-auto">
                                Start Free Trial
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                        <Link href="/contact">
                            <button className="h-14 px-10 rounded-full border border-white/30 text-white font-bold text-lg hover:bg-white/10 transition-colors">
                                Contact Sales
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
