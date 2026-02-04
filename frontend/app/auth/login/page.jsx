'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function AuthLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate auth delay
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <main className="min-h-screen bg-[#0C0C0C] flex flex-col items-center justify-center p-6 selection:bg-[var(--color-primary)]/30">
            {/* Background Decor - Minimalist */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-primary)]/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--color-primary-light)]/5 blur-[120px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[400px] relative z-10"
            >
                {/* Brand Link */}
                <Link href="/" className="inline-flex items-center ml-[7rem] gap-2 mb-12 group">
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center transition-transform group-hover:scale-105">
                        <Shield className="text-white w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">
                        DeepShield
                    </span>
                </Link>

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-center text-3xl font-bold text-white tracking-tight mb-3">Welcome back.</h1>
                    <p className="text-center text-white/50 font-medium">
                        Enter your credentials to access the forensic portal.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">
                            Email Address
                        </label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[var(--color-primary-light)] transition-colors" />
                            <input
                                id="email"
                                type="email"
                                placeholder="name@company.com"
                                required
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-[var(--color-primary)]/50 focus:bg-white/[0.05] transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between ml-1">
                            <label htmlFor="pass" className="text-xs font-bold uppercase tracking-widest text-white/40">
                                Password
                            </label>
                            <Link href="#" className="text-xs font-semibold text-[var(--color-primary-light)] hover:text-white transition-colors">
                                Forgot password?
                            </Link>
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[var(--color-primary-light)] transition-colors" />
                            <input
                                id="pass"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••••••"
                                required
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3.5 pl-11 pr-12 text-white placeholder:text-white/10 focus:outline-none focus:border-[var(--color-primary)]/50 focus:bg-white/[0.05] transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <button
                        disabled={isLoading}
                        className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group mt-8 shadow-lg shadow-black/20"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                Sign In
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                            </>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <p className="mt-10 text-center text-sm text-white/40">
                    New to DeepShield?{' '}
                    <Link href="/auth/register" className="text-white font-bold hover:text-[var(--color-primary-light)] transition-colors">
                        Request an account
                    </Link>
                </p>
            </motion.div>

            {/* Corporate Compliance */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 text-[10px] font-bold tracking-widest text-white/10 uppercase">
                <span>© 2026 DeepShield Inc.</span>
                <div className="w-1 h-1 bg-white/10 rounded-full" />
                <Link href="#" className="hover:text-white/30 transition-colors">Security protocol</Link>
                <div className="w-1 h-1 bg-white/10 rounded-full" />
                <Link href="#" className="hover:text-white/30 transition-colors">Terms of service</Link>
            </div>
        </main>
    );
}