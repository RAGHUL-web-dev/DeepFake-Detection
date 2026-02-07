'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload, Link as LinkIcon, Search, AlertTriangle,
    CheckCircle, Play, Pause, Maximize2, Shield,
    X, Loader2, Globe, Video, Activity, Clock,
    Share2, Download, BarChart3
} from 'lucide-react';
import DetectionNav from '../DetectionNav';

const VideoDetection = () => {
    const [inputUrl, setInputUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [analysisState, setAnalysisState] = useState('idle'); // idle, analyzing, result
    const [resultData, setResultData] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const videoRef = useRef(null);
    const [scanFrame, setScanFrame] = useState(0);

    // Mock timeline data for the authenticity bar
    const timelineData = Array.from({ length: 50 }, (_, i) => ({
        time: i,
        score: Math.max(20, Math.min(95, 60 + Math.sin(i * 0.4) * 30 + (Math.random() * 10)))
    }));

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
        if (file && file.type.startsWith('video/')) {
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
        // Simulate frame-by-frame scanning animation
        let frame = 0;
        const interval = setInterval(() => {
            frame += 1;
            setScanFrame(frame);
            if (frame >= 100) {
                clearInterval(interval);
                finalizeAnalysis();
            }
        }, 50);
    };

    const finalizeAnalysis = () => {
        setResultData({
            overallScore: 92,
            verdict: 'Manipulated Content',
            duration: '00:12',
            resolution: '1920x1080',
            fps: '30.0',
            detectedArtifacts: [
                { type: 'Lip-Sync Inconsistency', time: '00:04', confidence: 94 },
                { type: 'Biological Pulse Lack', time: '00:07', confidence: 88 },
                { type: 'Frame Coherence Error', time: '00:02', confidence: 91 }
            ]
        });
        setAnalysisState('result');
    };

    const reset = () => {
        setAnalysisState('idle');
        setResultData(null);
        setSelectedFile(null);
        setInputUrl('');
        setScanFrame(0);
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
                        <span>Temporal Bio-Metrics</span>
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Video Forensic Dashboard</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Verify video integrity through multi-modal temporal analysis. We detect frame inconsistencies,
                        lack of biological signals, and synthesis artifacts in real-time.
                    </p>
                </div>

                {/* Navigation Tabs */}
                <DetectionNav />

                {/* Workflow Area */}
                <div className="grid lg:grid-cols-12 gap-8">

                    {/* Left Panel: Inputs */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* URL Input */}
                        <div className="bg-[#1F1F1F] p-6 rounded-2xl border border-white/5 space-y-4 transition-all hover:border-[#5C45FD]/20">
                            <h3 className="font-semibold flex items-center gap-2 text-lg">
                                <Globe size={20} className="text-[#5C45FD]" />
                                Scene Fetcher
                            </h3>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Source Video URL..."
                                    className="w-full bg-[#161616] border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-[#5C45FD] transition-colors"
                                    value={inputUrl}
                                    onChange={(e) => setInputUrl(e.target.value)}
                                />
                                <LinkIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            </div>
                        </div>

                        {/* File Upload */}
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`
                                relative border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-all cursor-pointer min-h-[250px]
                                ${isDragging ? 'border-[#5C45FD] bg-[#5C45FD]/5' : 'border-white/10 hover:border-[#5C45FD]/50 hover:bg-white/5'}
                                ${selectedFile ? 'border-[#5C45FD] bg-[#1F1F1F]' : 'bg-[#1F1F1F]'}
                            `}
                        >
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileSelect} accept="video/*" />

                            {selectedFile ? (
                                <div className="space-y-4">
                                    <div className="mx-auto w-16 h-16 bg-[#5C45FD]/20 rounded-2xl flex items-center justify-center text-[#5C45FD]">
                                        <Video size={32} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white break-all">{selectedFile.name}</p>
                                        <p className="text-sm text-gray-400">Ready for temporal scan</p>
                                    </div>
                                    <button onClick={(e) => { e.preventDefault(); setSelectedFile(null); }} className="text-xs text-red-400 underline">Switch Video</button>
                                </div>
                            ) : (
                                <div className="space-y-4 pointer-events-none">
                                    <div className="mx-auto w-16 h-16 bg-[#161616] rounded-2xl flex items-center justify-center text-gray-500 border border-white/10">
                                        <Upload size={32} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white">Upload Investigation Media</p>
                                        <p className="text-sm text-gray-500 mt-1">MP4, MOV, AVI (Max 50MB)</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={startAnalysis}
                            disabled={!selectedFile || analysisState !== 'idle'}
                            className="w-full py-4 bg-[#5C45FD] hover:bg-[#4A36CA] disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-[#5C45FD]/25 transition-all flex items-center justify-center gap-2"
                        >
                            {analysisState === 'analyzing' ? (
                                <>
                                    <Activity className="animate-pulse" />
                                    Analyzing Frames...
                                </>
                            ) : (
                                <>
                                    <Search size={22} />
                                    Start Deep Analysis
                                </>
                            )}
                        </button>
                    </div>

                    {/* Right Panel: Player & Results */}
                    <div className="lg:col-span-8 bg-[#1F1F1F] rounded-[2rem] border border-white/5 overflow-hidden min-h-[600px] flex flex-col relative shadow-2xl">

                        {/* 1. Preview/Idle State */}
                        {analysisState === 'idle' && (
                            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-gray-500 space-y-6">
                                <div className="w-24 h-24 bg-[#161616] rounded-full flex items-center justify-center border border-white/5 shadow-inner">
                                    <Video size={40} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold text-white">Investigation Vault</h3>
                                    <p className="max-w-xs mx-auto">Upload a video or provide a URL to begin the frame-by-frame deepfake detection sequence.</p>
                                </div>
                            </div>
                        )}

                        {/* 2. Analyzing / Temporal Scan State */}
                        {analysisState === 'analyzing' && (
                            <div className="flex-1 flex flex-col items-center justify-center bg-[#161616] p-4 relative overflow-hidden">
                                <div className="w-full max-w-2xl space-y-8 relative z-10 p-8">

                                    {/* Scanning Simulation */}
                                    <div className="aspect-video bg-black rounded-xl overflow-hidden relative border-4 border-[#5C45FD]/20 group">
                                        {/* Simulated scanning beam */}
                                        <motion.div
                                            className="absolute left-0 right-0 h-1 bg-[#5C45FD] shadow-[0_0_15px_#5C45FD] z-20"
                                            animate={{ top: ['0%', '100%', '0%'] }}
                                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="grid grid-cols-4 grid-rows-4 gap-2 w-full h-full p-4 opacity-40">
                                                {[...Array(16)].map((_, i) => (
                                                    <div key={i} className={`border border-[#5C45FD]/20 ${scanFrame % 16 === i ? 'bg-[#5C45FD]/40' : ''}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="absolute bottom-4 left-4 font-mono text-xs text-[#5C45FD]">
                                            BUFF_OFF: 0x{scanFrame.toString(16).toUpperCase()}FF2A
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end">
                                            <div className="space-y-1">
                                                <h4 className="text-lg font-bold">Temporal Scan in Progress</h4>
                                                <p className="text-sm text-gray-500">Processing Frame {scanFrame}/100 • Biological Signal Check</p>
                                            </div>
                                            <span className="text-2xl font-mono text-[#5C45FD] font-bold">{scanFrame}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-[#5C45FD]"
                                                style={{ width: `${scanFrame}%` }}
                                            />
                                        </div>
                                        <div className="grid grid-cols-3 gap-4 pt-2">
                                            {['Eye Tracking', 'Pulse Map', 'Noise Profile'].map((tag, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-[10px] text-gray-400 px-3 py-1.5 bg-[#1F1F1F] rounded-lg border border-white/5">
                                                    <Loader2 size={12} className="animate-spin text-[#5C45FD]" />
                                                    {tag}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 3. Result State */}
                        {analysisState === 'result' && resultData && (
                            <div className="flex-1 flex flex-col h-full overflow-hidden">

                                {/* Full Video Output */}
                                <div className="relative aspect-video bg-black overflow-hidden group">
                                    {/* Bounding Box Simulation (Targeted areas) */}
                                    {isPlaying && (
                                        <AnimatePresence>
                                            <motion.div
                                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                                className="absolute top-1/4 left-1/3 w-1/4 h-1/3 border-2 border-red-500 rounded-lg z-10"
                                            >
                                                <span className="absolute -top-6 left-0 bg-red-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase">MANIPULATED: 94%</span>
                                                <div className="absolute inset-0 bg-red-500/10 animate-pulse" />
                                            </motion.div>
                                        </AnimatePresence>
                                    )}

                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40">
                                        <Video size={48} className="text-white/20" />
                                        <p className="absolute text-white/40 text-sm font-mono bottom-20">INVESTIGATION FEED: #V-SCAN-091</p>
                                    </div>

                                    {/* Controls Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4">
                                                <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                                                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                                                </button>
                                                <div className="flex-1 h-1.5 bg-white/20 rounded-full cursor-pointer relative overflow-hidden">
                                                    <div className="h-full bg-[#5C45FD] w-1/3" />
                                                </div>
                                                <span className="text-xs font-mono">00:04 / {resultData.duration}</span>
                                                <Maximize2 size={18} className="text-gray-400 cursor-pointer hover:text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Results Dashboard Footer */}
                                <div className="flex-1 p-8 grid grid-cols-12 gap-8 bg-[#1F1F1F]">

                                    {/* Stats & Verdict */}
                                    <div className="col-span-12 md:col-span-5 space-y-6">
                                        <div className="bg-[#161616] p-6 rounded-2xl border border-red-500/20 space-y-4">
                                            <div className="flex justify-between items-start">
                                                <div className="p-3 bg-red-500/10 rounded-xl text-red-500">
                                                    <AlertTriangle size={24} />
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-3xl font-bold">{resultData.overallScore}%</span>
                                                    <p className="text-[10px] text-gray-500 font-bold uppercase">Confidence</p>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-red-500 leading-tight">{resultData.verdict}</h4>
                                                <p className="text-xs text-gray-400 mt-1">Confirmed artifacts in 3 distinct temporal zones.</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-[#161616] p-4 rounded-xl border border-white/5">
                                                <Clock size={16} className="text-gray-500 mb-2" />
                                                <p className="text-[10px] text-gray-500 font-bold uppercase">Duration</p>
                                                <p className="font-mono text-lg">{resultData.duration}</p>
                                            </div>
                                            <div className="bg-[#161616] p-4 rounded-xl border border-white/5">
                                                <BarChart3 size={16} className="text-gray-500 mb-2" />
                                                <p className="text-[10px] text-gray-500 font-bold uppercase">Frame Data</p>
                                                <p className="font-mono text-lg">{resultData.fps} fps</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Authenticity Timeline & Actions */}
                                    <div className="col-span-12 md:col-span-7 space-y-6">
                                        <div className="bg-[#161616] p-6 rounded-2xl border border-white/5 space-y-6 flex flex-col h-full">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-sm font-bold uppercase tracking-widest text-[#5C45FD] flex items-center gap-2">
                                                    <Activity size={16} />
                                                    Authenticity Timeline
                                                </h4>
                                                <div className="flex gap-2">
                                                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5">
                                                        <Share2 size={16} />
                                                    </button>
                                                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5">
                                                        <Download size={16} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Bar Chart Simulation */}
                                            <div className="flex-1 flex items-end gap-1 min-h-[100px] bg-[#1F1F1F]/30 p-4 rounded-xl border border-white/5">
                                                {timelineData.map((d, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className={`flex-1 rounded-t-sm ${d.score > 80 ? 'bg-red-500' : 'bg-[#5C45FD]/50'}`}
                                                        initial={{ height: 0 }}
                                                        animate={{ height: `${d.score}%` }}
                                                        transition={{ delay: i * 0.01 }}
                                                    />
                                                ))}
                                            </div>

                                            <button onClick={reset} className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold border border-white/10 transition-all">
                                                Investigation Complete • Reset Engine
                                            </button>
                                        </div>
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

export default VideoDetection;