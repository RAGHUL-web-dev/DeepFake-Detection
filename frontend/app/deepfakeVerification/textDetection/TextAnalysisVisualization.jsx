'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Brain, Activity, BarChart3, Hash, Type, Sparkles } from 'lucide-react';

const TextAnalysisVisualization = ({ text, onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [currentFeature, setCurrentFeature] = useState(0);

    const features = [
        { name: 'Tokenizing Text', icon: Type },
        { name: 'Analyzing Perplexity', icon: Activity },
        { name: 'Measuring Burstiness', icon: BarChart3 },
        { name: 'Detecting Patterns', icon: Hash },
        { name: 'Neural Processing', icon: Brain },
        { name: 'Generating Report', icon: Sparkles }
    ];

    useEffect(() => {
        let isMounted = true;
        let progressInterval;

        const performAnalysis = async () => {
            // Start progress animation
            progressInterval = setInterval(() => {
                setProgress(prev => {
                    // Don't go past 90% while waiting for network
                    if (prev >= 90) return 90;
                    return prev + 1;
                });
            }, 50);

            try {
                // Call the new FastAPI backend
                const response = await fetch('http://localhost:8000/predict', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text: text }),
                });

                if (!response.ok) {
                    throw new Error('Analysis failed');
                }

                const data = await response.json();

                if (isMounted) {
                    clearInterval(progressInterval);
                    setProgress(100);

                    // Small delay to let the 100% render before completing
                    setTimeout(() => {
                        onComplete(data);
                    }, 500);
                }

            } catch (error) {
                console.error("Error during text analysis:", error);
                if (isMounted) {
                    clearInterval(progressInterval);
                    // Pass a fallback/error result so the UI doesn't hang
                    onComplete({ error: true, message: error.message });
                }
            }
        };

        performAnalysis();

        const featureInterval = setInterval(() => {
            setCurrentFeature(prev => (prev + 1) % features.length);
        }, 800);

        return () => {
            isMounted = false;
            clearInterval(progressInterval);
            clearInterval(featureInterval);
        };
    }, [text, onComplete, features.length]);

    return (
        <div className="max-w-md w-full mx-auto p-8">
            {/* Animated NLP Visualization */}
            <div className="relative h-48 mb-8 flex items-center justify-center">
                {/* Background circles */}
                <motion.div
                    className="absolute w-32 h-32 rounded-full bg-[#5C45FD]/10"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute w-24 h-24 rounded-full bg-[#5C45FD]/20"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                    }}
                />

                {/* Central icon with rotation */}
                <motion.div
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="relative"
                >
                    <div className="w-20 h-20 bg-[#5C45FD] rounded-2xl flex items-center justify-center">
                        <Brain size={40} className="text-white" />
                    </div>
                </motion.div>

                {/* Floating tokens */}
                {text.split(' ').slice(0, 5).map((word, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-[#1F1F1F] px-3 py-1.5 rounded-lg border border-[#5C45FD]/30 text-xs text-[#5C45FD]"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 1, 0],
                            x: [0, (i % 2 === 0 ? 100 : -100)],
                            y: [0, (i % 3 === 0 ? -50 : 50)]
                        }}
                        transition={{
                            duration: 3,
                            delay: i * 0.3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {word}
                    </motion.div>
                ))}
            </div>

            {/* Progress bar */}
            <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Analyzing Text</span>
                    <span>{progress}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-[#5C45FD]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                    />
                </div>
            </div>

            {/* Current feature */}
            <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                    {features.map((Feature, index) => {
                        const Icon = Feature.icon;
                        return (
                            <motion.div
                                key={index}
                                animate={{
                                    scale: currentFeature === index ? 1.2 : 1,
                                    opacity: currentFeature === index ? 1 : 0.3
                                }}
                                className={`p-2 rounded-lg transition-colors ${currentFeature === index ? 'text-[#5C45FD]' : 'text-gray-600'
                                    }`}
                            >
                                <Icon size={20} />
                            </motion.div>
                        );
                    })}
                </div>
                <motion.p
                    key={currentFeature}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[#5C45FD] font-medium"
                >
                    {features[currentFeature].name}
                </motion.p>
                <p className="text-xs text-gray-500 mt-4">
                    Processing {text.length} characters through neural network...
                </p>
            </div>
        </div>
    );
};

export default TextAnalysisVisualization;