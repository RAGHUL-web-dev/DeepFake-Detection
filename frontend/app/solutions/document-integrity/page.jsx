"use client";

import { motion } from 'framer-motion';
import { FileText, FileCheck, Shield, Zap, ArrowRight, Grid3X3, Search, Database } from 'lucide-react';
import Link from 'next/link';

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

export default function DocumentIntegrityPage() {
    return (
        <div className="min-h-screen bg-[#0A0A0B] text-white">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-600/10 to-transparent" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600 blur-[150px] opacity-10 -mr-64 -mt-64" />
                
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-20 h-20 rounded-2xl bg-emerald-600/20 flex items-center justify-center mx-auto mb-8 border border-emerald-600/30"
                    >
                        <FileCheck className="text-emerald-400" size={40} />
                    </motion.div>
                    <motion.h1 
                        {...fadeIn}
                        className="text-6xl md:text-8xl font-black tracking-tighter mb-6"
                    >
                        Document <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Integrity</span>
                    </motion.h1>
                    <motion.p 
                        {...fadeIn}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
                    >
                        Validate digital credentials with blockchain-backed certainty. 
                        Detect pixel-level edits in IDs, passports, and legal documents.
                    </motion.p>
                </div>
            </section>

            {/* Tech Breakdown */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div {...fadeIn}>
                            <h2 className="text-4xl font-bold mb-8">Pixel-Level Forensics</h2>
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                        <Grid3X3 className="text-emerald-400" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Error Level Analysis (ELA)</h3>
                                        <p className="text-gray-400">Identify regions within an image that have different compression levels, indicating a potential digital manipulation.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                        <Search className="text-teal-400" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Clone Detection</h3>
                                        <p className="text-gray-400">Detect "Copy-Move" forgeries where parts of a document have been duplicated to cover original information.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                        <Database className="text-emerald-400" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Blockchain Anchoring</h3>
                                        <p className="text-gray-400">Secure document hashes on a public ledger to provide an immutable "proof of existence" and version control.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-emerald-600 blur-[100px] opacity-20" />
                            <img 
                                src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&fit=crop" 
                                alt="Secure documentation" 
                                className="relative rounded-3xl border border-white/10 shadow-2xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-32 bg-emerald-500/[0.02]">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold mb-16 text-center">Enterprise Use Cases</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "KYC Compliance", desc: "Automate digital ID verification for banking and financial services." },
                            { title: "Legal Evidence", desc: "Verify the authenticity of digital contracts and evidence in legal proceedings." },
                            { title: "Supply Chain", desc: "Validate certificates of origin and shipping documents across international borders." }
                        ].map((item, idx) => (
                            <motion.div 
                                key={idx}
                                whileHover={{ scale: 1.02 }}
                                className="p-10 rounded-[2rem] bg-black border border-white/5 hover:border-emerald-500/40 transition-all flex flex-col items-center text-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-8">
                                    <FileText size={32} />
                                </div>
                                <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
                                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 px-6">
                <div className="max-w-4xl mx-auto rounded-[3rem] bg-gradient-to-br from-emerald-600 to-teal-500 p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-emerald-900/20">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -mr-32 -mt-32" />
                    <h2 className="text-4xl md:text-5xl font-black mb-8">Secure Your Credentials</h2>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link href="/dashboard">
                            <button className="h-14 px-10 rounded-full bg-white text-emerald-600 font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 group mx-auto">
                                Run Verification
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
