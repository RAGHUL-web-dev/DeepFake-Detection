'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
    return (
        <section className="w-full py-32 px-6 md:px-20 bg-[#161616] relative overflow-hidden flex items-center justify-center">

            <div className="max-w-7xl w-full relative z-10 text-center">

                {/* Gradient Card */}
                <div className="relative rounded-[3rem] overflow-hidden p-12 md:p-24 bg-gradient-to-br from-[#4A36CA] to-[#5C45FD] shadow-2xl shadow-[#5C45FD]/30">

                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#A89BFF]/20 rounded-full blur-[80px]" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#161616]/20 rounded-full blur-[80px]" />

                    <div className="relative z-10 space-y-10">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-6xl font-bold text-white tracking-tight"
                        >
                            Ready to secure your digital reality?
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-[#A89BFF] text-xl max-w-2xl mx-auto leading-relaxed"
                        >
                            Join the leading organizations using DeepShield to protect their brand integrity and verify authentic media.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
                        >
                            <Link href="/auth/register" className="group bg-white text-[#5C45FD] px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-[#F5F5F5] transition-all flex items-center justify-center gap-2">
                                Get Started Free
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link href="/solutions" className="px-8 py-4 rounded-xl font-semibold text-white border border-white/20 hover:bg-white/10 transition-all flex items-center justify-center">
                                Schedule Demo
                            </Link>
                        </motion.div>
                    </div>

                    {/* Bottom Disclaimer */}
                    <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-white/40 text-sm">
                        <p>© 2026 DeepShield Inc.</p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
                            <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
                            <span className="hover:text-white transition-colors cursor-pointer">Security</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default CTASection;
