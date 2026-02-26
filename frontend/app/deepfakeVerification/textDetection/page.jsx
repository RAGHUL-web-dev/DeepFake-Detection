'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Type, AlertTriangle, CheckCircle, Search, Shield, X, Loader2, Copy, Zap, Brain, Hash, Clock, Globe } from 'lucide-react';
import DetectionNav from '../DetectionNav';
import TextAnalysisVisualization from './TextAnalysisVisualization';

const TextDetection = () => {
    const [inputText, setInputText] = useState('');
    const [analysisState, setAnalysisState] = useState('idle'); // idle, analyzing, result
    const [resultData, setResultData] = useState(null);
    const [copied, setCopied] = useState(false);

    const startAnalysis = () => {
        if (!inputText.trim()) return;

        setAnalysisState('analyzing');
        // Analysis will be handled by TextAnalysisVisualization onComplete
    };

    const reset = () => {
        setAnalysisState('idle');
        setResultData(null);
        setInputText('');
        setCopied(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(inputText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getCharacterCount = () => {
        return inputText.length;
    };

    const getWordCount = () => {
        return inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
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
                        <span>NLP FORENSICS V1.0</span>
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F5]">AI Text Forensic Analyst</h1>
                    <p className="text-[#969799] max-w-2xl mx-auto">
                        Detect AI-generated text, analyze linguistic patterns, and identify synthetic content using advanced NLP models.
                        Built for researchers, journalists, and content moderators.
                    </p>
                </div>

                {/* Navigation Tabs */}
                <DetectionNav />

                {/* Main Workflow Area */}
                <div className="grid lg:grid-cols-12 gap-8">

                    {/* Left Panel: Input & Controls */}
                    <div className="lg:col-span-5 space-y-6">

                        {/* Text Input Area */}
                        <div className="bg-[#1F1F1F] p-6 rounded-2xl border border-white/5 space-y-4">
                            <h3 className="font-semibold flex items-center gap-2 text-lg">
                                <FileText size={20} className="text-[#5C45FD]" />
                                Enter Text for Analysis
                            </h3>

                            <div className="relative">
                                <textarea
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Paste or type text to analyze... (min. 50 characters for accurate results)"
                                    className="w-full h-48 bg-[#161616] border border-white/10 rounded-xl p-4 focus:outline-none focus:border-[#5C45FD] transition-colors resize-none text-sm"
                                    disabled={analysisState === 'analyzing' || analysisState === 'result'}
                                />

                                {/* Character counter */}
                                <div className="absolute bottom-3 right-3 flex items-center gap-3 text-xs text-gray-500 bg-[#161616]/80 px-2 py-1 rounded-lg">
                                    <span className="flex items-center gap-1">
                                        <Type size={12} />
                                        {getCharacterCount()} chars
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Hash size={12} />
                                        {getWordCount()} words
                                    </span>
                                </div>
                            </div>

                            {/* Quick action buttons */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setInputText('')}
                                    disabled={!inputText || analysisState !== 'idle'}
                                    className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                                >
                                    Clear Text
                                </button>
                                <button
                                    onClick={copyToClipboard}
                                    disabled={!inputText}
                                    className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                                >
                                    {copied ? (
                                        <>
                                            <CheckCircle size={12} className="text-green-500" />
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={12} />
                                            Copy Text
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Analysis Settings / Info */}
                        <div className="bg-[#1F1F1F] p-6 rounded-2xl border border-white/5 space-y-4">
                            <h3 className="font-semibold flex items-center gap-2 text-lg">
                                <Brain size={20} className="text-[#5C45FD]" />
                                Analysis Parameters
                            </h3>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-[#161616] rounded-lg border border-white/5">
                                    <span className="text-sm text-gray-400">Model</span>
                                    <span className="text-sm font-medium text-[#5C45FD]">BERT-Large (Fine-tuned)</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-[#161616] rounded-lg border border-white/5">
                                    <span className="text-sm text-gray-400">Detection Threshold</span>
                                    <span className="text-sm font-medium text-white">0.85</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-[#161616] rounded-lg border border-white/5">
                                    <span className="text-sm text-gray-400">Features Analyzed</span>
                                    <span className="text-sm font-medium text-white">Perplexity, Burstiness, Repetition</span>
                                </div>
                            </div>

                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-2">
                                <Zap size={12} className="text-yellow-500" />
                                For best results, provide at least 100-200 words of text
                            </p>
                        </div>

                        {/* Action Button */}
                        <button
                            onClick={startAnalysis}
                            disabled={!inputText.trim() || inputText.length < 50 || analysisState === 'analyzing' || analysisState === 'result'}
                            className="w-full py-4 bg-[#5C45FD] hover:bg-[#4A36CA] disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-[#5C45FD]/25 transition-all flex items-center justify-center gap-2"
                        >
                            {analysisState === 'analyzing' ? (
                                <>
                                    <Loader2 size={24} className="animate-spin" />
                                    Analyzing Text...
                                </>
                            ) : (
                                <>
                                    <Search size={24} />
                                    Start Forensic Analysis
                                </>
                            )}
                        </button>

                    </div>

                    {/* Right Panel: Results */}
                    <div className="lg:col-span-7 bg-[#1F1F1F] rounded-3xl border border-white/5 overflow-hidden min-h-[600px] relative flex flex-col">

                        {/* State: Idle / Preview */}
                        {analysisState !== 'result' && (
                            <div className="flex-1 p-8">
                                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                                    <FileText size={20} className="text-[#5C45FD]" />
                                    Analysis Results
                                </h3>

                                {inputText ? (
                                    <div className="space-y-6">
                                        {/* Text Preview */}
                                        <div className="bg-[#161616] rounded-xl p-6 border border-white/10">
                                            <p className="text-sm text-gray-300 leading-relaxed line-clamp-6">
                                                {inputText}
                                            </p>
                                            {inputText.length > 500 && (
                                                <p className="text-xs text-gray-500 mt-2">
                                                    Showing first 500 characters...
                                                </p>
                                            )}
                                        </div>

                                        {/* Stats Preview */}
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="bg-[#161616] rounded-xl p-4 border border-white/5">
                                                <p className="text-xs text-gray-500 mb-1">Characters</p>
                                                <p className="text-2xl font-bold text-white">{getCharacterCount()}</p>
                                            </div>
                                            <div className="bg-[#161616] rounded-xl p-4 border border-white/5">
                                                <p className="text-xs text-gray-500 mb-1">Words</p>
                                                <p className="text-2xl font-bold text-white">{getWordCount()}</p>
                                            </div>
                                            <div className="bg-[#161616] rounded-xl p-4 border border-white/5">
                                                <p className="text-xs text-gray-500 mb-1">Sentences</p>
                                                <p className="text-2xl font-bold text-white">
                                                    {inputText.split(/[.!?]+/).filter(Boolean).length}
                                                </p>
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-500 text-center">
                                            Click "Start Forensic Analysis" to begin AI detection
                                        </p>
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                                        <div className="w-20 h-20 bg-[#161616] rounded-full flex items-center justify-center">
                                            <FileText size={32} />
                                        </div>
                                        <p>Enter text above to begin analysis</p>
                                    </div>
                                )}

                                {/* Analysis Overlay */}
                                {analysisState === 'analyzing' && (
                                    <div className="absolute inset-0 bg-[#161616]/90 backdrop-blur-md z-20 flex flex-col items-center justify-center">
                                        <TextAnalysisVisualization
                                            text={inputText}
                                            onComplete={() => {
                                                setResultData({
                                                    score: 92,
                                                    verdict: 'AI-Generated Content Detected',
                                                    confidence: 'High',
                                                    metrics: {
                                                        perplexity: '1.2 (Very Low - Typical of AI)',
                                                        burstiness: '0.3 (Uniform - AI Pattern)',
                                                        repetition: '12% (Above Threshold)',
                                                        sentiment: 'Neutral/Flat',
                                                        linguistic_diversity: 'Limited vocabulary range'
                                                    },
                                                    details: {
                                                        model_signature: 'GPT-3.5/4 Architecture Detected',
                                                        probability: '92.3%',
                                                        timestamp: new Date().toISOString(),
                                                        processing_time: '0.8s'
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
                                        <p className="text-sm text-gray-400 flex items-center gap-2">
                                            <Clock size={12} />
                                            {new Date().toLocaleString()}
                                        </p>
                                    </div>
                                    <button onClick={reset} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors border border-white/10">
                                        New Analysis
                                    </button>
                                </div>

                                <div className="flex-1 p-8 overflow-y-auto">

                                    {/* Error State if API failed */}
                                    {resultData.error ? (
                                        <div className="rounded-2xl p-6 mb-8 flex items-center gap-6 bg-red-500/10 border border-red-500/20">
                                            <div className="w-20 h-20 rounded-full flex items-center justify-center shrink-0 bg-red-500/20 text-red-500">
                                                <AlertTriangle size={32} />
                                            </div>
                                            <div>
                                                <h2 className="text-3xl font-bold mb-1 text-red-500">Analysis Failed</h2>
                                                <p className="text-red-400/80">Could not connect to the analysis server. Please ensure the backend is running.</p>
                                                <p className="text-xs text-red-500/60 mt-2">Error: {resultData.message}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Verdict Banner */}
                                            <div className={`rounded-2xl p-6 mb-8 flex items-center gap-6 ${resultData.prediction === 1
                                                    ? 'bg-red-500/10 border border-red-500/20'
                                                    : 'bg-green-500/10 border border-green-500/20'
                                                }`}>
                                                <div className={`w-20 h-20 rounded-full flex items-center justify-center shrink-0 ${resultData.prediction === 1
                                                        ? 'bg-red-500/20 text-red-500'
                                                        : 'bg-green-500/20 text-green-500'
                                                    }`}>
                                                    {resultData.prediction === 1 ? <AlertTriangle size={32} /> : <CheckCircle size={32} />}
                                                </div>
                                                <div>
                                                    <h2 className={`text-3xl font-bold mb-1 ${resultData.prediction === 1 ? 'text-red-500' : 'text-green-500'
                                                        }`}>
                                                        {resultData.result.toUpperCase()} DETECTED
                                                    </h2>
                                                    <p className={resultData.prediction === 1 ? 'text-red-400/80' : 'text-green-400/80'}>
                                                        {resultData.prediction === 1
                                                            ? 'Strong indicators of unsolicited or malicious content.'
                                                            : 'Text appears to be safe and legitimate.'}
                                                    </p>
                                                </div>
                                                <div className="ml-auto text-right">
                                                    {resultData.confidence && (
                                                        <>
                                                            <span className="block text-4xl font-bold text-white">{(resultData.confidence * 100).toFixed(1)}%</span>
                                                            <span className="text-sm text-gray-400">Confidence Score</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-8">
                                                {/* Metrics Visualization */}
                                                <div className="space-y-4">
                                                    <h4 className="font-semibold text-gray-300">Linguistic Analysis</h4>
                                                    <div className="space-y-3">
                                                        <div className="p-3 bg-[#161616] rounded-lg border border-white/5">
                                                            <div className="flex justify-between items-center mb-1">
                                                                <span className="text-sm text-gray-500 capitalize">Suspicious Keywords</span>
                                                                <span className="text-xs font-mono text-[#5C45FD]">{resultData.prediction === 1 ? 'High' : 'Low'}</span>
                                                            </div>
                                                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                                <div className="h-full bg-[#5C45FD] rounded-full" style={{ width: resultData.prediction === 1 ? '85%' : '15%' }} />
                                                            </div>
                                                        </div>
                                                        <div className="p-3 bg-[#161616] rounded-lg border border-white/5">
                                                            <div className="flex justify-between items-center mb-1">
                                                                <span className="text-sm text-gray-500 capitalize">Urgency Tactics</span>
                                                                <span className="text-xs font-mono text-[#5C45FD]">{resultData.prediction === 1 ? 'Detected' : 'None'}</span>
                                                            </div>
                                                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                                <div className="h-full bg-[#5C45FD] rounded-full" style={{ width: resultData.prediction === 1 ? '70%' : '5%' }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Forensic Details */}
                                                <div className="space-y-4">
                                                    <h4 className="font-semibold text-gray-300">Forensic Details</h4>
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between p-3 bg-[#161616] rounded-lg border border-white/5">
                                                            <span className="text-sm text-gray-500">Detected Model</span>
                                                            <span className="text-sm text-white font-medium">Text Naive Bayes Classifier</span>
                                                        </div>
                                                        <div className="flex items-center justify-between p-3 bg-[#161616] rounded-lg border border-white/5">
                                                            <span className="text-sm text-gray-500">Preprocessing</span>
                                                            <span className="text-sm text-white font-medium">Porter Stemming & TF-IDF</span>
                                                        </div>
                                                        <div className="p-4 bg-[#161616] rounded-lg border border-white/5 mt-4">
                                                            <h5 className="text-xs font-semibold text-gray-400 mb-2">Analysis Summary</h5>
                                                            <p className="text-sm text-gray-300">
                                                                {resultData.prediction === 1
                                                                    ? 'Text exhibits patterns commonly found in promotional spam, phishing attempts, and unsolicited messages.'
                                                                    : 'Text demonstrates natural conversation patterns and does not contain significant risk factors.'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {/* Full Text Preview */}
                                    <div className="mt-8 p-4 bg-[#161616] rounded-lg border border-white/5">
                                        <h5 className="text-sm font-semibold text-gray-300 mb-2">Analyzed Text</h5>
                                        <p className="text-xs text-gray-400 line-clamp-3">{inputText}</p>
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

export default TextDetection;