'use client';

import Link from 'next/link';
import { useState } from 'react';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [ isLoginOpen, setIsLoginOpen] = useState(false);
    const [ isRegisterOpen, setIsRegisterOpen] = useState(false);

    const navLinks = [
        { name: 'Product', href: '/product' },
        { name: 'Solutions', href: '/solutions' },
        { name: 'Resources', href: '/resources' },
        { name: 'Pricing', href: '/pricing' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-300"></div>
                            <svg className="w-8 h-8 relative" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="32" height="32" rx="6" fill="url(#logo-gradient)" />
                                <path d="M16 8L24 16L16 24L8 16L16 8Z" fill="white" fillOpacity="0.95" />
                                <defs>
                                    <linearGradient id="logo-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#5C45FD" />
                                        <stop offset="1" stopColor="#A89BFF" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <span className="text-lg font-semibold text-white tracking-tight">
                            DeepShield
                        </span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 relative group"
                            >
                                {link.name}
                                <span className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-primary to-primary-light opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden lg:flex items-center gap-3">
                        <Link
                            href="../auth/login" onClick={() => setIsLoginOpen(true)}
                            className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors duration-200"
                        >
                            Sign in
                        </Link>
                        <Link
                            href="../auth/register" onClick={() => setIsRegisterOpen(true)}
                            className="relative px-5 py-2 text-sm font-medium text-white rounded-lg overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light transition-transform duration-200 group-hover:scale-105"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light opacity-0 group-hover:opacity-100 blur transition-opacity duration-200"></div>
                            <span className="relative">Get Started</span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 -mr-2 text-white/70 hover:text-white transition-colors duration-200"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-white/5">
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-2">
                                <Link
                                    href="/login"
                                    className="px-4 py-2.5 text-sm font-medium text-center text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sign in
                                </Link>
                                <Link
                                    href="/signup"
                                    className="relative px-4 py-2.5 text-sm font-medium text-center text-white rounded-lg overflow-hidden"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light"></div>
                                    <span className="relative">Get Started</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;