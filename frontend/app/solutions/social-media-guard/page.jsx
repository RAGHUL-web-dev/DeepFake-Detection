"use client";

import { motion } from 'framer-motion';
import { Share2, Users, Shield, Zap, ArrowRight, MessageSquare, Twitter, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

export default function SocialMediaGuardPage() {
    return (
        <div className="min-h-screen bg-[#0A0A0B] text-white">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-orange-600/10 to-transparent" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600 blur-[150px] opacity-10 -mr-64 -mt-64" />
                
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-20 h-20 rounded-2xl bg-orange-600/20 flex items-center justify-center mx-auto mb-8 border border-orange-600/30"
                    >
                        <Users className="text-orange-400" size={40} />
                    </motion.div>
                    <motion.h1 
                        {...fadeIn}
                        className="text-6xl md:text-8xl font-black tracking-tighter mb-6"
                    >
                        Social <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Media Guard</span>
                    </motion.h1>
                    <motion.p 
                        {...fadeIn}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
                    >
                        Protect your reputation from coordinated deepfake campaigns. 
                        Stay ahead of misinformation with real-time platform monitoring.
                    </motion.p>
                </div>
            </section>

            {/* Campaign Analysis Section */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="relative lg:order-2"
                        >
                            <div className="absolute inset-0 bg-orange-600 blur-[100px] opacity-20" />
                            <img 
                                src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&fit=crop" 
                                alt="Social media monitoring" 
                                className="relative rounded-3xl border border-white/10 shadow-2xl"
                            />
                        </motion.div>

                        <motion.div {...fadeIn} className="lg:order-1">
                            <h2 className="text-4xl font-bold mb-8">Defending Truth</h2>
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                        <Share2 className="text-orange-400" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Propagation Analysis</h3>
                                        <p className="text-gray-400">Track how deepfake content spreads across multiple platforms to identify origin points and bot networks.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                        <MessageSquare className="text-red-400" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Sentiment Shift Monitoring</h3>
                                        <p className="text-gray-400">Detect sudden shifts in audience sentiment potentially triggered by manipulative synthetic media.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                        <Shield className="text-orange-400" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Authenticated Sourcing</h3>
                                        <p className="text-gray-400">Automatically cross-reference viral content with trusted official sources and C2PA metadata.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Platform Grid */}
            <section className="py-32 bg-orange-500/[0.02]">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold mb-4 text-center">Supported Networks</h2>
                    <p className="text-gray-500 text-center mb-16">Active monitoring for global social ecosystems</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <Twitter />, title: "X (Twitter)", desc: "Detect coordinated bot-network manipulation and deepfake-powered misinfo." },
                            { icon: <Instagram />, title: "Meta Ecosystem", desc: "Protecting Instagram and Facebook from high-fidelity face-swap campaigns." },
                            { icon: <Facebook />, title: "Public Discourse", desc: "Monitoring community groups and public pages for synthetic media threats." }
                        ].map((item, idx) => (
                            <motion.div 
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="p-8 rounded-3xl bg-black border border-white/5 hover:border-orange-500/40 transition-all text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 mb-6 mx-auto">
                                    {item.icon}
                                </div>
                                <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                                <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 px-6">
                <div className="max-w-4xl mx-auto rounded-[3rem] bg-gradient-to-br from-orange-600 to-red-500 p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -mr-32 -mt-32" />
                    <h2 className="text-4xl md:text-5xl font-black mb-8">Protect Your Brand</h2>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link href="/dashboard">
                            <button className="h-14 px-10 rounded-full bg-white text-orange-600 font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 group mx-auto">
                                Activate Guard
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
