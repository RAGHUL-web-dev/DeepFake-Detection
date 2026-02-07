'use client';

import { motion, useAnimation } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const ImageComparisonSlider = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef(null);
    const isDragging = useRef(false);

    // Fallback images since generation failed
    // Using a reliable placeholder service or a local asset would be better, 
    // but for now we will simulate the effect with CSS if we don't have images,
    // OR we can use a solid color/gradient div to represent the images if needed.
    // However, I will try to use a standard placeholder URL for demonstration.
    // Ideally, I would have valid image paths here.
    const image1 = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop";
    const image2 = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"; // Same image for now, will apply filter

    const handleMouseDown = () => {
        isDragging.current = true;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;

        setSliderPosition(percentage);
    };

    // Touch support
    const handleTouchMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;
        setSliderPosition(percentage);
    };

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-[4/3] rounded-xl overflow-hidden cursor-ew-resize select-none shadow-2xl border border-white/10"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
        >
            {/* Background Image (Deepfake / Heatmap) */}
            <div className="absolute inset-0">
                {/* We apply a filter to simulate the heatmap/deepfake analysis visualization */}
                <img
                    src={image2}
                    alt="Deepfake Analysis Heatmap"
                    className="w-full h-full object-cover filter contrast-125 brightness-75 sepia-[.5] hue-rotate-[-50deg] saturate-200"
                    draggable="false"
                />
                <div className="absolute inset-0 bg-red-900/20 mix-blend-overlay" />

                {/* Label */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-red-500 text-xs font-bold px-3 py-1.5 rounded-full border border-red-500/30 uppercase tracking-widest">
                    Deepfake Detected
                </div>
            </div>

            {/* Foreground Image (Original) - Clipped */}
            <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%`, borderRight: '2px solid white' }}
            >
                <img
                    src={image1}
                    alt="Original Footage"
                    className="absolute top-0 left-0 h-full w-full max-w-none object-cover" // max-w-none is critical here to prevent squishing
                    style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }} // Ensure inner image matches container width
                    draggable="false"
                />
                {/* Label */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-500/30 uppercase tracking-widest">
                    Original Footage
                </div>
            </div>

            {/* Slider Handlers/Divider */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8L22 12L18 16" />
                        <path d="M6 8L2 12L6 16" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default ImageComparisonSlider;
