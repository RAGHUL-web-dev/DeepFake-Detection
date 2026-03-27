"use client";

import { motion } from 'framer-motion';
import { Mic, Music, Radio, Zap, ArrowRight, ShieldCheck, AudioLines, Volume2 } from 'lucide-react';
import Link from 'next/link';

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

export default function VoiceAuthenticationPage() {
    return (
        <div className="min-h-screen bg-[#0A0A0B] text-white">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-transparent" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600 blur-[150px] opacity-10 -mr-64 -mt-64" />
                
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-20 h-20 rounded-2xl bg-purple-600/20 flex items-center justify-center mx-auto mb-8 border border-purple-600/30"
                    >
                        <Mic className="text-purple-400" size={40} />
                    </motion.div>
                    <motion.h1 
                        {...fadeIn}
                        className="text-6xl md:text-8xl font-black tracking-tighter mb-6"
                    >
                        Voice <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Authentication</span>
                    </motion.h1>
                    <motion.p 
                        {...fadeIn}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
                    >
                        Protect against voice cloning heists. Our AI analyzes frequency patterns 
                        and synthetic artifacts to distinguish between human and AI-generated speech.
                    </motion.p>
                </div>
            </section>

            {/* Core Tech Section */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="relative order-2 lg:order-1"
                        >
                            <div className="absolute inset-0 bg-purple-600 blur-[100px] opacity-20" />
                            <img 
                                src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&fit=crop" 
                                alt="Audio frequency tech" 
                                className="relative rounded-3xl border border-white/10 shadow-2xl"
                            />
                        </motion.div>

                        <motion.div {...fadeIn} className="order-1 lg:order-2">
                            <h2 className="text-4xl font-bold mb-8">Audio Forensics</h2>
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                        <AudioLines className="text-purple-400" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Spectral Analysis</h3>
                                        <p className="text-gray-400">Microscopic examination of frequencies to detect "spectral leakage" common in neural voice synthesis.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                        <Volume2 className="text-pink-400" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Breath & Pause Detection</h3>
                                        <p className="text-gray-400">Proprietary models that analyze natural breathing and micro-pauses that synthetic voices often fail to replicate.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                        <Radio className="text-indigo-400" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Device Characterization</h3>
                                        <p className="text-gray-400">Verify if the audio recording preserves the acoustic environment expected from a genuine recording device.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-32 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold mb-16 text-center">Audio Security Solutions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <ShieldCheck />, title: "Call Center Security", desc: "Prevent social engineering attacks and fraudulent account takeovers via voice." },
                            { icon: <Zap />, title: "Real-time verification", desc: "Low-latency streaming analysis for live broadcast and interactive systems." },
                            { icon: <Music />, title: "Media Integrity", desc: "Protect artists and celebrities from AI-generated unauthorised voice usage." }
                        ].map((item, idx) => (
                            <motion.div 
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="p-8 rounded-3xl bg-black border border-white/5 hover:border-purple-500/40 transition-all"
                            >
                                <div className="w-12 h-12 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-400 mb-6">
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
                <div className="max-w-4xl mx-auto rounded-[3rem] bg-gradient-to-br from-purple-600 to-pink-500 p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -mr-32 -mt-32" />
                    <h2 className="text-4xl md:text-5xl font-black mb-8">Stop Voice Fraud Today</h2>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link href="/dashboard">
                            <button className="h-14 px-10 rounded-full bg-white text-purple-600 font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 group mx-auto">
                                Secure Your Platform
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
