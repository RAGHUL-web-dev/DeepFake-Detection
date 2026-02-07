'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Image, Video, Mic } from 'lucide-react';

const DetectionNav = () => {
    const pathname = usePathname();

    const tabs = [
        { name: 'Image', href: '/deepfakeVerification/imageDetection', icon: <Image size={18} /> },
        { name: 'Video', href: '/deepfakeVerification/videoDetection', icon: <Video size={18} /> },
        { name: 'Voice', href: '/deepfakeVerification/voiceDetection', icon: <Mic size={18} /> },
    ];

    return (
        <div className="flex items-center justify-center gap-4 py-1">
            {tabs.map((tab) => {
                const isActive = pathname === tab.href;
                return (
                    <Link key={tab.name} href={tab.href}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`
                                flex items-center gap-2 px-6 py-2.5 rounded-full border
                                ${isActive
                                    ? 'bg-[#5C45FD] border-[#5C45FD] text-white'
                                    : 'bg-[#1F1F1F] border-white/10 text-gray-400'}
                            `}
                        >
                            {tab.icon}
                            <span className="font-bold text-sm tracking-wide">{tab.name}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-white/20 rounded-full -z-10"
                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </motion.div>
                    </Link>
                );
            })}
        </div>
    );
};

export default DetectionNav;
