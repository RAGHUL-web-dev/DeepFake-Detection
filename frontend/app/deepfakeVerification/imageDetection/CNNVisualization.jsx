'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const CNNVisualization = ({ imageSrc, onComplete }) => {
    const [step, setStep] = useState(0);

    // Orchestrate the animation sequence
    useEffect(() => {
        const sequence = [
            { step: 1, delay: 500 },  // Input Layer
            { step: 2, delay: 1500 }, // Convolution (Explosion)
            { step: 3, delay: 3500 }, // Pooling (Compression)
            { step: 4, delay: 4500 }, // Flattening
            { step: 5, delay: 5500 }, // Fully Connected (Synapses)
            { step: 6, delay: 7000 }, // Output
            { step: 7, delay: 8500 }  // Complete
        ];

        let timeouts = [];

        sequence.forEach(({ step: s, delay }) => {
            const timeout = setTimeout(() => {
                setStep(s);
                if (s === 7 && onComplete) onComplete();
            }, delay);
            timeouts.push(timeout);
        });

        return () => timeouts.forEach(clearTimeout);
    }, [onComplete]);

    // Filters to simulate feature extraction
    const filters = [
        'grayscale(100%) contrast(120%)', // Structure
        'invert(100%)',                   // Edges/Negative
        'sepia(100%) saturate(200%)',     // Color anomalies
        'brightness(1.5) contrast(1.5)'   // High frequency noise
    ];

    return (
        <div className="w-full h-full min-h-[500px] flex items-center justify-center bg-[#0F0F16] overflow-hidden p-8 perspective-1000 font-mono">
            <div className="relative w-full max-w-5xl h-80 flex items-center justify-between preserve-3d transform-style-3d px-12">

                {/* 1. Input Layer */}
                <LayerContainer label="Input" isActive={step === 1} isPassed={step > 1}>
                    <img src={imageSrc} alt="Input" className="w-24 h-24 object-cover rounded-lg border-2 border-white/20 shadow-lg" />
                </LayerContainer>

                <Connection isActive={step > 1} />

                {/* 2. Convolution Layer (Feature Maps Explosion) */}
                <LayerContainer label="Conv2D" isActive={step === 2} isPassed={step > 2}>
                    <div className="relative w-24 h-24 preserve-3d">
                        {filters.map((filter, i) => (
                            <motion.div
                                key={i}
                                className="absolute inset-0 rounded-lg border border-white/10 overflow-hidden bg-black"
                                initial={{ z: 0, opacity: 0 }}
                                animate={{
                                    z: step >= 2 ? (i - 1.5) * 40 : 0, // Spread out on Z axis
                                    opacity: 1,
                                    rotateY: step >= 2 ? -15 : 0
                                }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                            >
                                <img
                                    src={imageSrc}
                                    alt={`Feature Map ${i}`}
                                    className="w-full h-full object-cover opacity-80"
                                    style={{ filter: filter }}
                                />
                            </motion.div>
                        ))}
                    </div>
                </LayerContainer>

                <Connection isActive={step > 2} />

                {/* 3. Pooling Layer */}
                <LayerContainer label="MaxPooling" isActive={step === 3} isPassed={step > 3}>
                    <div className="relative w-12 h-12 preserve-3d">
                        {filters.map((filter, i) => (
                            <motion.div
                                key={i}
                                className="absolute inset-0 rounded border border-white/20 overflow-hidden bg-black"
                                style={{ filter: filter }}
                                animate={{ z: (i - 1.5) * 20 }} // Compressed Z spread
                            >
                                <img src={imageSrc} className="w-full h-full object-cover opacity-60" />
                            </motion.div>
                        ))}
                    </div>
                </LayerContainer>

                <Connection isActive={step > 3} />

                {/* 4. Flattening */}
                <LayerContainer label="Flatten" isActive={step === 4} isPassed={step > 4}>
                    <div className="flex flex-col gap-1 w-4 h-32 bg-gray-800/50 rounded-lg p-1 border border-gray-600 justify-center">
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-full h-1 bg-[#5C45FD]"
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ delay: 0.5 + (i * 0.05) }}
                            />
                        ))}
                    </div>
                </LayerContainer>

                {/* 5. Fully Connected (Synapses) */}
                <div className="relative flex-1 h-32 mx-4 preserve-3d flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                        {/* Synapse Lines */}
                        {[...Array(8)].map((_, i) => ( // From Flatten (8 nodes)
                            [...Array(6)].map((_, j) => ( // To Dense (6 nodes)
                                <motion.line
                                    key={`${i}-${j}`}
                                    x1="0%" y1={`${(i / 7) * 100}%`}
                                    x2="100%" y2={`${(j / 5) * 100}%`}
                                    stroke={step >= 5 ? "#5C45FD" : "#333"}
                                    strokeWidth="1"
                                    strokeOpacity={step >= 5 ? 0.4 : 0.1}
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: step >= 5 ? 1 : 0 }}
                                    transition={{ duration: 0.5, delay: (Math.random() * 0.5) }} // Random firing
                                />
                            ))
                        ))}
                    </svg>
                </div>

                <LayerContainer label="Dense" isActive={step === 5} isPassed={step > 5}>
                    <div className="flex flex-col gap-1 w-4 h-24 justify-between py-1">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className={`w-3 h-3 rounded-full border border-cyan-400 ${step >= 5 ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-transparent'}`} />
                        ))}
                    </div>
                </LayerContainer>

                <Connection isActive={step > 5} />

                {/* 6. Output */}
                <LayerContainer label="Softmax" isActive={step === 6} isPassed={step > 6}>
                    <div className={`w-20 h-20 rounded-xl border-4 flex flex-col items-center justify-center transition-all duration-500 bg-[#161616] ${step === 6 ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)] scale-110' : 'border-gray-700'}`}>
                        <span className={`text-2xl font-bold ${step === 6 ? 'text-red-500' : 'text-gray-600'}`}>
                            {step >= 6 ? '99%' : '0%'}
                        </span>
                        <span className="text-[10px] uppercase text-gray-500 tracking-wider">Fake</span>
                    </div>
                </LayerContainer>

            </div>

            {/* Context Text */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center w-full">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block"
                >
                    <p className="text-[#5C45FD] font-bold text-lg tracking-wider mb-1">
                        {step === 1 && "Start: Preprocessing Input"}
                        {step === 2 && "Conv2D: Extracting Deepfake Artifacts"}
                        {step === 3 && "MaxPooling: Downsampling Features"}
                        {step === 4 && "Flatten: Vectorizing Feature Maps"}
                        {step === 5 && "Dense: Neural Pattern Matching"}
                        {step === 6 && "Output: Calculating Probability"}
                    </p>
                    <p className="text-gray-500 text-xs uppercase tracking-[0.2em]">
                        {step === 2 && "Applying Gabor Filters • Edge Detection • Noise Analysis"}
                        {step === 5 && "Analyzing 1024 Connections • Activation Functions"}
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

// Helper Components
const LayerContainer = ({ children, label, isActive, isPassed }) => (
    <motion.div
        className="flex flex-col items-center gap-4 relative z-10"
        initial={false}
        animate={{
            opacity: isActive ? 1 : isPassed ? 0.5 : 0.2,
            scale: isActive ? 1.05 : 1,
            filter: isActive ? 'brightness(1.2)' : 'grayscale(1)'
        }}
        transition={{ duration: 0.5 }}
    >
        <div className="relative transform-style-3d transition-transform duration-500">
            {children}
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-[#5C45FD]' : 'text-gray-600'}`}>{label}</span>
    </motion.div>
);

const Connection = ({ isActive }) => (
    <div className="w-12 h-[1px] bg-gray-800 mx-1 relative overflow-hidden">
        <motion.div
            className="absolute inset-0 bg-[#5C45FD]"
            initial={{ x: '-100%' }}
            animate={{ x: isActive ? '0%' : '100%' }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        />
    </div>
);

export default CNNVisualization;
