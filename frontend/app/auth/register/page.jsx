'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { Shield, User, Mail, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AuthRegister() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate delay
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <main className="min-h-screen bg-[#0C0C0C] flex flex-col items-center justify-center p-6 selection:bg-[var(--color-primary)]/30">
            {/* Background Decor */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[var(--color-primary)]/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-[var(--color-primary-light)]/5 blur-[120px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[440px] relative z-10"
            >
                {/* Brand Link */}
                <Link href="/" className="inline-flex items-center ml-[8rem] gap-2 mt-5 group ">
                    <div className="text-center w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center transition-transform group-hover:scale-105">
                        <Shield className="text-white w-5 h-5" />
                    </div>
                    <span className="text-center text-xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">
                        DeepShield
                    </span>
                </Link>

                {/* Header */}
                <div className="text-center mt-4 mb-10">
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-3">Create an account.</h1>
                    <p className="text-white/50 font-medium">
                        Join the elite network of forensic media analysts.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">
                            Full Name
                        </label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[var(--color-primary-light)] transition-colors" />
                            <input
                                id="name"
                                type="text"
                                placeholder="Agent Name"
                                required
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-[var(--color-primary)]/50 focus:bg-white/[0.05] transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">
                            Email Address
                        </label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[var(--color-primary-light)] transition-colors" />
                            <input
                                id="email"
                                type="email"
                                placeholder="agent@company.com"
                                required
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-[var(--color-primary)]/50 focus:bg-white/[0.05] transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="pass" className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">
                            Password
                        </label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[var(--color-primary-light)] transition-colors" />
                            <input
                                id="pass"
                                type="password"
                                placeholder="••••••••••••"
                                required
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-[var(--color-primary)]/50 focus:bg-white/[0.05] transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-start gap-3 py-2 px-1">
                        <div className="mt-1">
                            <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)] opacity-40" />
                        </div>
                        <p className="text-[11px] leading-relaxed text-white/40 font-medium">
                            By creating an account, you agree to our <Link href="#" className="text-white/60 hover:text-white underline">Code of Ethics</Link> and <Link href="#" className="text-white/60 hover:text-white underline">Privacy Policy</Link>.
                        </p>
                    </div>

                    <button
                        disabled={isLoading}
                        className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group mt-4 shadow-lg shadow-black/20"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                Create Account
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                            </>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <p className="mt-10 text-center text-sm text-white/40">
                    Already have credentials?{' '}
                    <Link href="/auth/login" className="text-white font-bold hover:text-[var(--color-primary-light)] transition-colors">
                        Sign In
                    </Link>
                </p>
            </motion.div>

            {/* Corporate Compliance */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 text-[10px] font-bold tracking-widest text-white/10 uppercase">
                <span>© 2026 DeepShield Inc.</span>
                <div className="w-1 h-1 bg-white/10 rounded-full" />
                <Link href="#" className="hover:text-white/30 transition-colors">Ethical AI Usage</Link>
                <div className="w-1 h-1 bg-white/10 rounded-full" />
                <Link href="#" className="hover:text-white/30 transition-colors">Global Standards</Link>
            </div>
        </main>
    );
}