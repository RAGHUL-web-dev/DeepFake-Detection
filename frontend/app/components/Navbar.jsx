'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Dropdown, Avatar, Space } from 'antd';
import { User, LayoutDashboard, LogOut, ChevronDown, ChevronRight } from 'lucide-react';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuthStore();

    const products = [
        { id: 'image', name: 'Image Detection', href: '/products/image-detection', description: 'Advanced neural networks to identify AI-generated or manipulated images with pixel-perfect precision.' },
        { id: 'video', name: 'Video Analysis', href: '/products/video-analysis', description: 'Real-time deepfake detection in video streams using temporal consistency checks and facial landmark analysis.' },
        { id: 'voice', name: 'Voice Cloning', href: '/products/voice-cloning', description: 'Identify synthetic speech and voice clones using acoustic feature extraction and pattern recognition.' },
        { id: 'text', name: 'Text Forensics', href: '/products/text-analysis', description: 'Detect AI-generated text, plagiarism, and misinformation using sophisticated linguistic modeling.' },
        { id: 'audio', name: 'Audio Authentication', href: '/products/audio-forensics', description: 'Verify the authenticity of audio recordings by analyzing digital signatures and background noise consistency.' },
    ];

    const [hoveredProduct, setHoveredProduct] = useState(products[0]);

    const navLinks = [
        { name: 'Solutions', href: '/solutions' },
        { name: 'Resources', href: '/resources' },
        { name: 'Pricing', href: '/pricing' },
    ];

    const productDropdownRender = () => (
        <div className="fixed top-16 left-0 right-0 w-full bg-dark/95 backdrop-blur-2xl border-b border-white/5 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 flex h-[450px]">
                {/* Left side: Links */}
                <div className="w-1/3 border-r border-white/5 pr-8 flex flex-col gap-1 overflow-y-auto">
                    {products.map((product) => (
                        <Link
                            key={product.id}
                            href={product.href}
                            onMouseEnter={() => setHoveredProduct(product)}
                            className={`px-5 py-4 rounded-xl transition-all duration-300 flex items-center justify-between group ${hoveredProduct?.id === product.id
                                ? 'bg-white/[0.05] text-white'
                                : 'text-white/40 hover:text-white/70'
                                }`}
                        >
                            <span className="text-xl font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                                {product.name}
                            </span>
                            <ChevronRight className={`w-5 h-5 transition-all duration-300 ${hoveredProduct?.id === product.id
                                ? 'translate-x-0 opacity-100'
                                : '-translate-x-2 opacity-0'
                                }`} />
                        </Link>
                    ))}
                </div>

                {/* Right side: Dynamic Description */}
                <div className="flex-1 pl-16 flex flex-col justify-center max-w-3xl">
                    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500" key={hoveredProduct?.id}>
                        <div className="space-y-2">
                            <span className="text-primary font-bold text-xs uppercase tracking-[0.2em]">Technology</span>
                            <h3 className="text-4xl font-bold text-white tracking-tight">
                                {hoveredProduct?.name}
                            </h3>
                        </div>

                        <p className="text-xl text-white/50 leading-relaxed font-light">
                            {hoveredProduct?.description}
                        </p>

                        <div className="pt-8 flex items-center gap-8">
                            <Link
                                href={hoveredProduct?.href || '#'}
                                className="inline-flex items-center gap-2.5 text-white font-semibold group bg-primary/20 hover:bg-primary/30 px-6 py-3 rounded-full border border-primary/20 transition-all"
                            >
                                Start Detection
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/docs"
                                className="text-white/40 hover:text-white transition-colors text-sm font-medium underline underline-offset-8"
                            >
                                View Documentation
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const authItems = [
        {
            key: 'profile',
            label: (
                <Link href="/profile" className="flex items-center gap-2 px-1 py-1">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                </Link>
            ),
        },
        {
            key: 'dashboard',
            label: (
                <Link href="/dashboard" className="flex items-center gap-2 px-1 py-1">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                </Link>
            ),
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: (
                <div onClick={logout} className="flex items-center gap-2 px-1 py-1 text-red-500">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                </div>
            ),
        },
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
                        {/* Mega Product Dropdown */}
                        <Dropdown
                            dropdownRender={productDropdownRender}
                            placement="bottomLeft"
                            trigger={['click']}
                        >
                            <button className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-1 group">
                                Product
                                <ChevronDown className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                                <span className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-primary to-primary-light opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                            </button>
                        </Dropdown>

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

                    {/* Auth Section */}
                    <div className="hidden lg:flex items-center gap-3">
                        {isAuthenticated ? (
                            <Dropdown menu={{ items: authItems }} placement="bottomRight" arrow trigger={['click']}>
                                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-all group">
                                    <Avatar
                                        size="small"
                                        className="bg-primary text-white text-[10px]"
                                        src={user?.avatar?.url}
                                    >
                                        {user?.name?.charAt(0)}
                                    </Avatar>
                                    <span className="text-sm font-medium text-white/90">{user?.name}</span>
                                    <ChevronDown className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
                                </button>
                            </Dropdown>
                        ) : (
                            <>
                                <Link
                                    href="/auth/login"
                                    className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors duration-200"
                                >
                                    Sign in
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="relative px-5 py-2 text-sm font-medium text-white rounded-lg overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light transition-transform duration-200 group-hover:scale-105"></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light opacity-0 group-hover:opacity-100 blur transition-opacity duration-200"></div>
                                    <span className="relative">Get Started</span>
                                </Link>
                            </>
                        )}
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
                            {/* Mobile Product Items */}
                            <div className="px-4 py-2">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Products</span>
                                <div className="mt-4 grid grid-cols-1 gap-2">
                                    {products.map((product) => (
                                        <Link
                                            key={product.id}
                                            href={product.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all"
                                        >
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm font-semibold text-white">{product.name}</span>
                                                <span className="text-[11px] text-white/40 line-clamp-1">{product.description}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="h-px bg-white/5 my-2 mx-4" />

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
                                {isAuthenticated ? (
                                    <>
                                        <div className="px-4 py-2 flex items-center gap-3 mb-2">
                                            <Avatar className="bg-primary">{user?.name?.charAt(0)}</Avatar>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-white">{user?.name}</span>
                                                <span className="text-xs text-white/40">{user?.email}</span>
                                            </div>
                                        </div>
                                        <Link
                                            href="/profile"
                                            className="px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <User className="w-4 h-4" /> Profile
                                        </Link>
                                        <Link
                                            href="/dashboard"
                                            className="px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <LayoutDashboard className="w-4 h-4" /> Dashboard
                                        </Link>
                                        <button
                                            onClick={() => { logout(); setIsMenuOpen(false); }}
                                            className="px-4 py-2.5 text-sm font-medium text-red-400 hover:text-red-500 hover:bg-white/5 rounded-lg flex items-center gap-2 text-left"
                                        >
                                            <LogOut className="w-4 h-4" /> Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/auth/login"
                                            className="px-4 py-2.5 text-sm font-medium text-center text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Sign in
                                        </Link>
                                        <Link
                                            href="/auth/register"
                                            className="relative px-5 py-2.5 text-sm font-medium text-center text-white rounded-lg overflow-hidden"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light"></div>
                                            <span className="relative">Get Started</span>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
