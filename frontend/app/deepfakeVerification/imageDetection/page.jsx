'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Link as LinkIcon, Search, AlertTriangle, CheckCircle, Smartphone, Globe, Shield, X, Loader2 } from 'lucide-react';
import ImageComparisonSlider from '../../solutions/solutionPreview/ImageComparisonSlider';
import CNNVisualization from './CNNVisualization';
import DetectionNav from '../DetectionNav';
// Reuse if possible, or build similar

const ImageDetection = () => {
    const [inputUrl, setInputUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [analysisState, setAnalysisState] = useState('idle'); // idle, scanning, analyzing, result
    const [resultData, setResultData] = useState(null);

    // Mock data for "found images" from a URL
    const [foundImages, setFoundImages] = useState([]);

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
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            setFoundImages([]); // Clear URL images if file dropped
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setFoundImages([]);
        }
    };

    const handleUrlSubmit = (e) => {
        e.preventDefault();
        if (!inputUrl) return;

        setAnalysisState('scanning');
        // Simulate scanning a URL
        setTimeout(() => {
            setFoundImages([
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop"
            ]);
            setAnalysisState('idle');
            setSelectedFile(null);
        }, 1500);
    };

    const startAnalysis = () => {
        setAnalysisState('analyzing');
        // Logic moved to CNNVisualization onComplete callback
    };

    const reset = () => {
        setAnalysisState('idle');
        setResultData(null);
        setInputUrl('');
        setSelectedFile(null);
        setFoundImages([]);
    };

    return (
        <div className="min-h-screen bg-[#161616] text-white pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Header */}
                <div className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5C45FD]/10 border border-[#5C45FD]/20 text-[#5C45FD] text-xs font-bold uppercase tracking-widest"
                    >
                        <Shield size={14} />
                        <span>Forensic V2.0</span>
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F5]">AI Forensic Analyst</h1>
                    <p className="text-[#969799] max-w-2xl mx-auto">
                        Identify biological inconsistencies and digital artifacts using our advanced CNN-driven analysis engine.
                        Trusted by industry leaders for sub-pixel accuracy.
                    </p>
                </div>

                {/* Navigation Tabs */}
                <DetectionNav />

                {/* Main Workflow Area */}
                <div className="grid lg:grid-cols-12 gap-8">

                    {/* Left Panel: Input & Controls */}
                    <div className="lg:col-span-5 space-y-6">

                        {/* 1. URL Input */}
                        <div className="bg-[#1F1F1F] p-6 rounded-2xl border border-white/5 space-y-4">
                            <h3 className="font-semibold flex items-center gap-2 text-lg">
                                <Globe size={20} className="text-[#5C45FD]" />
                                Analyze from Web
                            </h3>
                            <form onSubmit={handleUrlSubmit} className="relative">
                                <input
                                    type="text"
                                    placeholder="Paste image URL or page link..."
                                    value={inputUrl}
                                    onChange={(e) => setInputUrl(e.target.value)}
                                    className="w-full bg-[#161616] border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-[#5C45FD] transition-colors"
                                />
                                <LinkIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                <button
                                    type="submit"
                                    disabled={!inputUrl || analysisState === 'scanning'}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#5C45FD] hover:bg-[#4A36CA] text-white p-1.5 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {analysisState === 'scanning' ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                                </button>
                            </form>
                        </div>

                        <div className="flex items-center gap-4 text-gray-500 text-sm">
                            <div className="h-[1px] bg-white/10 flex-1"></div>
                            <span>OR</span>
                            <div className="h-[1px] bg-white/10 flex-1"></div>
                        </div>

                        {/* 2. File Upload */}
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`
                                relative border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer group
                                ${isDragging ? 'border-[#5C45FD] bg-[#5C45FD]/5' : 'border-white/10 hover:border-[#5C45FD]/50 hover:bg-white/5'}
                                ${selectedFile ? 'border-[#5C45FD] bg-transparent' : ''}
                            `}
                        >
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileSelect} accept="image/*" />

                            {selectedFile ? (
                                <div className="space-y-4">
                                    <div className="mx-auto w-16 h-16 bg-[#5C45FD]/20 rounded-xl flex items-center justify-center text-[#5C45FD]">
                                        <CheckCircle size={32} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-white break-all">{selectedFile.name}</p>
                                        <p className="text-sm text-gray-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                    <button
                                        onClick={(e) => { e.preventDefault(); setSelectedFile(null); }}
                                        className="text-xs text-red-400 hover:text-red-300 underline z-10 relative"
                                    >
                                        Remove File
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4 pointer-events-none">
                                    <div className="mx-auto w-16 h-16 bg-[#161616] rounded-xl flex items-center justify-center text-gray-400 group-hover:text-[#5C45FD] transition-colors border border-white/10">
                                        <Upload size={32} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">Click or drag image to upload</p>
                                        <p className="text-sm text-gray-400 mt-1">Supports JPG, PNG, WEBP (Max 10MB)</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Button */}
                        <button
                            onClick={startAnalysis}
                            disabled={(!selectedFile && foundImages.length === 0) || analysisState === 'analyzing' || analysisState === 'result'}
                            className="w-full py-4 bg-[#5C45FD] hover:bg-[#4A36CA] disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-[#5C45FD]/25 transition-all flex items-center justify-center gap-2"
                        >
                            {analysisState === 'analyzing' ? (
                                <>
                                    <Loader2 size={24} className="animate-spin" />
                                    Analyzing Media...
                                </>
                            ) : (
                                <>
                                    <Search size={24} />
                                    Start Forensic Analysis
                                </>
                            )}
                        </button>

                    </div>

                    {/* Right Panel: Preview & Results */}
                    <div className="lg:col-span-7 bg-[#1F1F1F] rounded-3xl border border-white/5 overflow-hidden min-h-[600px] relative flex flex-col">

                        {/* State: Idle / Preview */}
                        {analysisState !== 'result' && (
                            <div className="flex-1 p-8">
                                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                                    <Smartphone size={20} className="text-[#5C45FD]" />
                                    Media Preview
                                </h3>

                                {foundImages.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-4">
                                        {foundImages.map((src, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => setFoundImages([src])} // Select one
                                                className={`aspect-video rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${foundImages.length === 1 ? 'border-[#5C45FD] ring-4 ring-[#5C45FD]/20' : 'border-transparent hover:border-white/20'}`}
                                            >
                                                <img src={src} alt="Found" className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                ) : selectedFile ? (
                                    <div className="w-full h-full bg-[#161616] rounded-xl flex items-center justify-center overflow-hidden border border-white/10">
                                        <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="max-h-[400px] max-w-full object-contain" />
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                                        <div className="w-20 h-20 bg-[#161616] rounded-full flex items-center justify-center">
                                            <Search size={32} />
                                        </div>
                                        <p>No media selected for analysis</p>
                                    </div>
                                )}

                                {/* Scanning Overlay */}
                                {analysisState === 'analyzing' && (
                                    <div className="absolute inset-0 bg-[#161616]/90 backdrop-blur-md z-20 flex flex-col items-center justify-center">
                                        <CNNVisualization
                                            imageSrc={selectedFile ? URL.createObjectURL(selectedFile) : foundImages[0]}
                                            onComplete={() => {
                                                setResultData({
                                                    score: 88,
                                                    verdict: 'Deepfake Detected',
                                                    metadata: {
                                                        compression: 'Abnormal (GAN artifacts)',
                                                        lighting: 'Inconsistent directional shadows',
                                                        noise: 'Pattern repetition detected',
                                                        source: 'Unknown Generation Model'
                                                    }
                                                });
                                                setAnalysisState('result');
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* State: Result */}
                        {analysisState === 'result' && resultData && (
                            <div className="flex-1 flex flex-col h-full">
                                {/* Result Header */}
                                <div className="bg-[#161616] p-6 border-b border-white/5 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">Analysis Complete</h3>
                                        <p className="text-sm text-gray-400">ID: #8X29-Q92M</p>
                                    </div>
                                    <button onClick={reset} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors border border-white/10">
                                        New Analysis
                                    </button>
                                </div>

                                <div className="flex-1 p-8 overflow-y-auto">

                                    {/* Verdict Banner */}
                                    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mb-8 flex items-center gap-6">
                                        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center text-red-500 shrink-0">
                                            <AlertTriangle size={32} />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-bold text-red-500 mb-1">{resultData.verdict}</h2>
                                            <p className="text-red-400/80">High probability of synthetic manipulation detected.</p>
                                        </div>
                                        <div className="ml-auto text-right">
                                            <span className="block text-4xl font-bold text-white">{resultData.score}%</span>
                                            <span className="text-sm text-gray-400">Confidence</span>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        {/* Visualization */}
                                        <div className="space-y-4">
                                            <h4 className="font-semibold text-gray-300">Heatmap Analysis</h4>
                                            <div className="aspect-video bg-[#161616] rounded-xl overflow-hidden relative border border-white/10 group">
                                                <img
                                                    src={selectedFile ? URL.createObjectURL(selectedFile) : foundImages[0]}
                                                    alt="Analyzed"
                                                    className="w-full h-full object-cover filter contrast-125 brightness-75 sepia-[.5] hue-rotate-[-50deg] saturate-200"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                                                    <p className="text-xs font-mono text-red-400">
                                                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                                                        ANOMALY CLUSTER DETECTED
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Metadata */}
                                        <div className="space-y-4">
                                            <h4 className="font-semibold text-gray-300">Forensic Metadata</h4>
                                            <div className="space-y-3">
                                                {Object.entries(resultData.metadata).map(([key, value]) => (
                                                    <div key={key} className="flex items-center justify-between p-3 bg-[#161616] rounded-lg border border-white/5">
                                                        <span className="text-sm text-gray-500 capitalize">{key}</span>
                                                        <span className="text-sm text-white font-medium">{value}</span>
                                                    </div>
                                                ))}
                                            </div>
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

export default ImageDetection;