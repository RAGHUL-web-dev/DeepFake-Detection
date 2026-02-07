'use client';

import { motion } from 'framer-motion';
import { Shield, Fingerprint, Lock, CheckCircle2 } from 'lucide-react';

const TrustSection = () => {
    const features = [
        {
            icon: <Shield className="w-8 h-8 text-[#5C45FD]" />,
            title: "Military-Grade Security",
            description: "End-to-end encryption for all processed media."
        },
        {
            icon: <Fingerprint className="w-8 h-8 text-[#5C45FD]" />,
            title: "Biometric Precision",
            description: "99.9% accuracy in facial feature mapping."
        },
        {
            icon: <Lock className="w-8 h-8 text-[#5C45FD]" />,
            title: "Zero-Knowledge Proof",
            description: "Your data remains private, always."
        }
    ];

    const stats = [
        { value: "99.9%", label: "Detection Accuracy" },
        { value: "1M+", label: "Analyses Conducted" },
        { value: "50+", label: "Enterprise Partners" },
        { value: "24/7", label: "Real-time Monitoring" }
    ];

    return (
        <section className="w-full min-h-screen bg-[#161616] relative flex flex-col items-center justify-center py-24 px-6 md:px-20 overflow-hidden">

            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#5C45FD]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#4A36CA]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl w-full relative z-10 space-y-24">

                {/* Header */}
                <div className="text-center space-y-6 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#5C45FD]/30 bg-[#5C45FD]/10 text-[#A89BFF] text-xs font-bold uppercase tracking-widest"
                    >
                        <Shield size={14} />
                        <span>Uncompromising Trust</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-4xl md:text-6xl font-light text-[#F5F5F5] leading-tight"
                    >
                        Verified by Science. <br />
                        <span className="font-semibold text-[#5C45FD]">Secured by Design.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-[#969799] text-lg leading-relaxed"
                    >
                        We built DeepShield on a foundation of rigorous forensic methodology and enterprise-grade infrastructure.
                        When you see our verification seal, you know it's the truth.
                    </motion.p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 + (idx * 0.1) }}
                            className="bg-[#1F1F1F] p-8 rounded-2xl border border-[#5C45FD]/10 hover:border-[#5C45FD]/30 transition-colors group"
                        >
                            <div className="w-16 h-16 bg-[#161616] rounded-xl flex items-center justify-center mb-6 border border-[#5C45FD]/20 group-hover:scale-105 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-[#F5F5F5] mb-3">{feature.title}</h3>
                            <p className="text-[#969799] leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-[#5C45FD]/20 pt-16">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 + (idx * 0.1) }}
                            className="text-center space-y-2"
                        >
                            <div className="text-4xl md:text-5xl font-bold text-[#F5F5F5]">{stat.value}</div>
                            <div className="text-sm font-medium text-[#5C45FD] uppercase tracking-wider">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default TrustSection;
