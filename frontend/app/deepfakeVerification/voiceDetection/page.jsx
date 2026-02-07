'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mic, Upload, Link as LinkIcon, Search, AlertTriangle,
    CheckCircle, Play, Pause, Shield, X, Loader2,
    Globe, Music, Activity, BarChart, Download,
    Share2, Volume2, Waveform
} from 'lucide-react';
import DetectionNav from '../DetectionNav';

const VoiceDetection = () => {
    const [inputUrl, setInputUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [analysisState, setAnalysisState] = useState('idle'); // idle, analyzing, result
    const [resultData, setResultData] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioUrl, setAudioUrl] = useState('');
    const audioRef = useRef(null);

    // Update audio URL when file or input changes
    useEffect(() => {
        if (selectedFile) {
            const url = URL.createObjectURL(selectedFile);
            setAudioUrl(url);
            return () => URL.revokeObjectURL(url);
        } else if (inputUrl) {
            setAudioUrl(inputUrl);
        } else {
            setAudioUrl('');
        }
    }, [selectedFile, inputUrl]);

    // Mock audio visualizer data
    const [visualizerData, setVisualizerData] = useState(Array.from({ length: 40 }, () => Math.random() * 100));

    useEffect(() => {
        if (analysisState === 'analyzing' || isPlaying) {
            const interval = setInterval(() => {
                setVisualizerData(Array.from({ length: 40 }, () => Math.random() * 100));
            }, 100);
            return () => clearInterval(interval);
        }
    }, [analysisState, isPlaying]);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('audio/')) {
            setSelectedFile(file);
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const startAnalysis = () => {
        setAnalysisState('analyzing');
        if (audioRef.current && audioUrl) {
            audioRef.current.play().catch(err => console.error("Audio playback failed:", err));
        }
        setTimeout(() => {
            finalizeAnalysis();
        }, 4000); // 4 second "spectral scan"
    };

    const finalizeAnalysis = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setResultData({
            score: 96,
            verdict: 'Synthetic Voice Detected',
            type: 'AI-Cloned Speech',
            confidence: 'High',
            metadata: {
                samplingRate: '48.0 kHz',
                bitDepth: '24-bit',
                channels: 'Mono',
                model: 'Neural TTS Engine'
            },
            anomalies: [
                { title: 'Harmonic Flattening', desc: 'Lack of natural resonant peaks in high frequencies.' },
                { title: 'Phase Discontinuity', desc: 'Subtle timing errors at phoneme transitions.' },
                { title: 'Static Noise Profile', desc: 'Predictable noise distribution typical of GAN generators.' }
            ]
        });
        setAnalysisState('result');
    };

    const reset = () => {
        setAnalysisState('idle');
        setResultData(null);
        setSelectedFile(null);
        setInputUrl('');
    };

    return (
        <div className="min-h-screen bg-[#161616] text-white pt-24 pb-12 px-4 md:px-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Header */}
                <div className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5C45FD]/10 border border-[#5C45FD]/20 text-[#5C45FD] text-xs font-bold uppercase tracking-widest"
                    >
                        <Shield size={14} />
                        <span>Acoustic Fingerprinting</span>
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Voice Authentication Lab</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Identify cloned voices and deepfake audio using our proprietary neural harmonic analysis.
                        Detect synthesis artifacts invisible to the human ear.
                    </p>
                </div>

                {/* Navigation Tabs */}
                <DetectionNav />

                {/* Hidden Audio Element */}
                <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} />

                {/* Workflow Area */}
                <div className="grid lg:grid-cols-12 gap-8">

                    {/* Left Panel: Inputs */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* URL Input */}
                        <div className="bg-[#1F1F1F] p-6 rounded-2xl border border-white/5 space-y-4 shadow-xl">
                            <h3 className="font-semibold flex items-center gap-2 text-lg">
                                <Globe size={20} className="text-[#5C45FD]" />
                                Audio Fetcher
                            </h3>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Enter Source URL (Podcast, Cloud Storage)..."
                                    className="w-full bg-[#161616] border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#5C45FD] transition-colors text-sm"
                                    value={inputUrl}
                                    onChange={(e) => setInputUrl(e.target.value)}
                                />
                                <LinkIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            </div>
                        </div>

                        {/* File Upload */}
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`
                                relative border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center text-center transition-all cursor-pointer min-h-[300px]
                                ${isDragging ? 'border-[#5C45FD] bg-[#5C45FD]/5' : 'border-white/10 hover:border-[#5C45FD]/50 hover:bg-white/5'}
                                ${selectedFile ? 'border-[#5C45FD] bg-[#1F1F1F]' : 'bg-[#1F1F1F]'}
                            `}
                        >
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileSelect} accept="audio/*" />

                            {selectedFile ? (
                                <div className="space-y-6">
                                    <div className="relative mx-auto w-20 h-20">
                                        <div className="absolute inset-0 bg-[#5C45FD]/20 blur-xl rounded-full animate-pulse" />
                                        <div className="relative w-full h-full bg-[#5C45FD]/20 border-2 border-[#5C45FD] rounded-2xl flex items-center justify-center text-[#5C45FD]">
                                            <Music size={40} />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg text-white break-all">{selectedFile.name}</p>
                                        <p className="text-sm text-[#5C45FD] font-mono mt-1 uppercase tracking-tighter">Ready for Spectral Mapping</p>
                                    </div>
                                    <button onClick={(e) => { e.preventDefault(); setSelectedFile(null); }} className="text-xs text-red-500 hover:text-red-400 font-bold uppercase tracking-widest">Discard Sample</button>
                                </div>
                            ) : (
                                <div className="space-y-6 pointer-events-none">
                                    <div className="mx-auto w-20 h-20 bg-[#161616] rounded-2xl flex items-center justify-center text-gray-600 border border-white/5 shadow-inner">
                                        <Upload size={40} />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="font-bold text-white text-lg">Deploy Audio Evidence</p>
                                        <p className="text-sm text-gray-500 max-w-[200px] mx-auto leading-relaxed">WAV, MP3, FLAC supported for forensic extraction</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={startAnalysis}
                            disabled={!selectedFile || analysisState !== 'idle'}
                            className="w-full py-5 bg-[#5C45FD] hover:bg-[#4A36CA] disabled:bg-[#1F1F1F] disabled:text-gray-600 text-white rounded-2xl font-black text-xl shadow-lg hover:shadow-[#5C45FD]/30 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                        >
                            {analysisState === 'analyzing' ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    Scrutinizing Harmonics...
                                </>
                            ) : (
                                <>
                                    <Mic size={24} />
                                    Run Acoustic Audit
                                </>
                            )}
                        </button>
                    </div>

                    {/* Right Panel: Visualization & Dashboard */}
                    <div className="lg:col-span-8 bg-[#1F1F1F] rounded-[2.5rem] border border-white/5 overflow-hidden min-h-[600px] flex flex-col relative shadow-2xl">

                        {/* 1. Preview / Analyzer State */}
                        {analysisState !== 'result' && (
                            <div className="flex-1 flex flex-col items-center justify-center p-12 bg-gradient-to-b from-transparent to-[#161616]/50">

                                {/* Visualizer Display */}
                                <div className="w-full max-w-2xl h-48 bg-[#161616] rounded-3xl border border-white/10 relative flex items-center justify-center gap-1.5 p-8 overflow-hidden">
                                    {visualizerData.map((val, i) => (
                                        <motion.div
                                            key={i}
                                            className={`w-2 rounded-full ${analysisState === 'analyzing' ? (i % 2 === 0 ? 'bg-[#5C45FD]' : 'bg-cyan-500') : 'bg-gray-800'}`}
                                            animate={{ height: `${val}%` }}
                                            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                                        />
                                    ))}

                                    {analysisState !== 'analyzing' && !selectedFile && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 gap-4">
                                            <div className="w-16 h-16 bg-[#1F1F1F] rounded-full flex items-center justify-center border border-white/5">
                                                <Activity size={32} />
                                            </div>
                                            <p className="text-sm font-mono tracking-widest uppercase">Input Signal Off-line</p>
                                        </div>
                                    )}

                                    {analysisState === 'analyzing' && (
                                        <div className="absolute top-4 left-4 flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                            <span className="text-[10px] font-mono text-red-500 font-bold uppercase tracking-widest leading-none">Scanning Phase Consistency</span>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-12 text-center max-w-md">
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        {analysisState === 'analyzing' ? 'Harmonic Scrutiny' : 'Evidence Receiver'}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        {analysisState === 'analyzing'
                                            ? 'Searching for predictable text-to-speech rhythm patterns and unnatural phase alignment across frequency bands.'
                                            : 'Upload a voice recording or drop an audio segment to begin spectral fingerprinting.'}
                                    </p>
                                </div>

                                {analysisState === 'analyzing' && (
                                    <div className="mt-8 flex gap-3">
                                        {['FFT', 'Mel-Cepstral', 'Pitch Variance'].map((tag) => (
                                            <span key={tag} className="text-[9px] font-bold text-[#5C45FD] px-3 py-1.5 bg-[#5C45FD]/10 border border-[#5C45FD]/20 rounded-full uppercase tracking-widest">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 2. Result State */}
                        {analysisState === 'result' && resultData && (
                            <div className="flex-1 flex flex-col h-full bg-[#161616]">

                                {/* Result Header */}
                                <div className="p-10 border-b border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="w-24 h-24 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center">
                                            <div className="text-center">
                                                <span className="block text-3xl font-black text-red-500">{resultData.score}%</span>
                                                <span className="text-[9px] font-bold text-red-400 uppercase tracking-widest">Synthetic</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-black text-white">{resultData.verdict}</h2>
                                            <div className="flex gap-4 mt-2">
                                                <span className="text-xs text-gray-400 flex items-center gap-1.5 uppercase font-bold tracking-wider">
                                                    <Shield size={12} className="text-[#5C45FD]" />
                                                    {resultData.type}
                                                </span>
                                                <span className="text-xs text-gray-400 flex items-center gap-1.5 uppercase font-bold tracking-wider">
                                                    <Activity size={12} className="text-[#5C45FD]" />
                                                    CONFIDENCE: {resultData.confidence}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => {
                                                if (isPlaying) {
                                                    audioRef.current?.pause();
                                                } else {
                                                    audioRef.current?.play();
                                                }
                                                setIsPlaying(!isPlaying);
                                            }}
                                            className={`px-5 py-2.5 rounded-xl transition-all border flex items-center gap-2 text-sm font-bold ${isPlaying ? 'bg-[#5C45FD]/20 border-[#5C45FD] text-[#5C45FD]' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                                        >
                                            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                                            {isPlaying ? 'Stop' : 'Replay Sample'}
                                        </button>
                                        <button className="px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10 flex items-center gap-2 text-sm font-bold">
                                            <Download size={16} />
                                            Report
                                        </button>
                                        <button onClick={reset} className="p-2.5 bg-[#5C45FD] hover:bg-[#4A36CA] rounded-xl transition-all shadow-lg text-white">
                                            <X size={20} />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1 p-10 grid md:grid-cols-2 gap-10 overflow-y-auto">

                                    {/* Anomalies List */}
                                    <div className="space-y-6">
                                        <h4 className="text-sm font-black uppercase tracking-[0.2em] text-[#5C45FD] flex items-center gap-2">
                                            <BarChart size={16} />
                                            Acoustic Anomalies
                                        </h4>
                                        <div className="space-y-4">
                                            {resultData.anomalies.map((a, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className="bg-[#1F1F1F] p-5 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all group"
                                                >
                                                    <p className="font-bold text-red-400 text-sm mb-1 uppercase tracking-tight group-hover:text-red-500 transition-colors">{a.title}</p>
                                                    <p className="text-xs text-gray-400 leading-relaxed">{a.desc}</p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Spectral Signature (Mock data) */}
                                    <div className="space-y-6">
                                        <h4 className="text-sm font-black uppercase tracking-[0.2em] text-[#5C45FD] flex items-center gap-2">
                                            <Activity size={16} />
                                            Spectral Blueprint
                                        </h4>
                                        <div className="bg-[#1F1F1F] p-8 rounded-3xl border border-white/5 space-y-8">
                                            {/* Frequency Distribution simulation */}
                                            <div className="h-40 flex items-end justify-between gap-1">
                                                {visualizerData.slice(0, 20).map((v, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex-1 rounded-t-sm transition-all duration-500"
                                                        style={{ height: `${v}%`, backgroundColor: i > 12 ? '#ef4444' : '#5C45FD' }}
                                                    />
                                                ))}
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                {Object.entries(resultData.metadata).map(([k, v]) => (
                                                    <div key={k} className="bg-[#161616] p-3 rounded-xl border border-white/5">
                                                        <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest leading-none mb-1.5">{k.replace(/([A-Z])/g, ' $1')}</p>
                                                        <p className="text-xs font-bold text-white tracking-tight">{v}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* Bottom Action bar */}
                                <div className="px-10 py-6 bg-[#1F1F1F] border-t border-white/5 flex items-center justify-between">
                                    <div className="flex gap-4">
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                                            <Share2 size={12} />
                                            Evidence Hash: 8E29...3F1
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 font-mono text-[10px] text-[#5C45FD] bg-[#5C45FD]/5 px-3 py-1 rounded-full border border-[#5C45FD]/10">
                                        ANALYZED BY DEEPSHIELD AUDIO ENGINE v2.4
                                    </div>
                                </div>

                            </div>
                        )}

                    </div>

                </div>
            </div>
        </div>
    );
};

export default VoiceDetection;