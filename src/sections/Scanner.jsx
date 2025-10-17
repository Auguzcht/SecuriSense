import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Trash2, Mail, Clock } from 'lucide-react';
import { Gauge } from '@mui/x-charts/Gauge';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

export default function PhishingDetector() {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState({
    legitimacyScore: 0,
    indicators: [],
    patterns: [],
    accuracy: 0,
    confidence: 0,
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [scanHistory, setTokenHistory] = useState([]);
  const fileInputRef = useRef(null);

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      const mockResult = {
        legitimacyScore: 65,
        indicators: [
          'Urgency language detected',
          'Suspicious link found',
          'Request for sensitive information',
        ],
        patterns: [
          { type: 'Urgency Language', severity: 'medium', icon: <BoltOutlinedIcon />, color: 'yellow', count: 3 },
          { type: 'Suspicious Link', severity: 'high', icon: <LinkOutlinedIcon />, color: 'red', count: 2 },
          { type: 'Personal Info Request', severity: 'high', icon: <LockOutlinedIcon />, color: 'pink', count: 1 },
          { type: 'Unusual Formatting', severity: 'low', icon: <AutoFixHighOutlinedIcon />, color: 'purple', count: 2 },
          { type: 'Grammar Issues', severity: 'medium', icon: <EditNoteOutlinedIcon />, color: 'orange', count: 1 },
        ],
        accuracy: 88,
        confidence: 74,
      };
      setResult(mockResult);
      setIsAnalyzing(false);

      const newEntry = {
        timestamp: new Date(),
        tokens: mockResult.indicators.map((i) => ({
          value: i,
          type: 'Indicator'
        }))
      };
      setTokenHistory((prev) => [newEntry, ...prev]);
    }, 1500);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file.name);
      const reader = new FileReader();
      reader.onload = (event) => setInputText(event.target.result);
      reader.readAsText(file);
    }
  };

  const handleClear = () => {
    setInputText('');
    setResult({
      legitimacyScore: 0,
      indicators: [],
      patterns: [],
      accuracy: 0,
      confidence: 0,
    });
    setUploadedFile(null);
  };

  const clearHistory = () => setTokenHistory([]);

  const getGaugeColor = (score) => {
    if (score >= 70) return { color: '#10b981', label: 'Legitimate', icon: '✓' };
    if (score >= 40) return { color: '#f59e0b', label: 'Suspicious', icon: '⚠' };
    return { color: '#ef4444', label: 'Likely Phishing', icon: '✕' };
  };

  const gaugeInfo = getGaugeColor(result.legitimacyScore);

  return (
    <div className="py-10 px-4" id="detector">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12 overflow-hidden">
          <h2 className="text-5xl md:text-6xl font-bold text-[#042046] mb-12 text-center">
            Phishing Detector
          </h2>
        </div>

        {/* Input Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Mail className="w-6 h-6 text-blue-500" /> Text
              </h2>
              <button
                onClick={handleClear}
                className="p-2 hover:bg-red-100 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 group"
                title="Clear"
              >
                <Trash2 className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-colors" />
              </button>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your email content here or upload a file..."
              className="w-full h-64 bg-gray-50/80 text-gray-800 rounded-2xl p-6 border-2 border-gray-200 focus:border-blue-400 focus:outline-none resize-none text-sm transition-all duration-300 placeholder:text-gray-400"
            />
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-gray-500 font-medium">
                {inputText.length}/15,000 Characters
              </span>
              {uploadedFile && (
                <span className="text-sm text-blue-600 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {uploadedFile}
                </span>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !inputText.trim()}
              className={`bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-blue-300/50 flex items-center justify-center gap-3 group hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                isAnalyzing ? 'animate-pulse' : ''
              }`}
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <span>🔍</span>
                  <span>Detect Phishing</span>
                </>
              )}
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-white border-2 border-gray-300 hover:border-blue-400 text-gray-700 font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-blue-200/50 flex items-center justify-center gap-3 group hover:scale-[1.02] active:scale-95"
            >
              <Upload className="w-5 h-5 text-blue-500" />
              Upload File
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.eml,.msg,image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Results Panel */}
        <div className="mt-10 bg-white/90 backdrop-blur-lg rounded-3xl p-8 border-2 border-gray-200 shadow-lg text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Analysis Results</h3>

          {/* Gauge */}
          <div className="flex justify-center mb-8">
            <div className="relative w-56 h-56">
              <svg className="transform -rotate-90 w-56 h-56">
                <circle cx="112" cy="112" r="90" stroke="#e5e7eb" strokeWidth="15" fill="none" />
                <circle
                  cx="112"
                  cy="112"
                  r="90"
                  stroke={gaugeInfo.color}
                  strokeWidth="15"
                  fill="none"
                  strokeDasharray={`${(result.legitimacyScore / 100) * 565} 565`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl mb-1">{gaugeInfo.icon}</div>
                <div className="text-4xl font-bold" style={{ color: gaugeInfo.color }}>
                  {result.legitimacyScore}%
                </div>
                <div className="text-sm text-gray-600 font-semibold mt-1">
                  {gaugeInfo.label}
                </div>
              </div>
            </div>
          </div>

          {/* Highlighted Text */}
          <div className="bg-gray-50 text-start rounded-2xl p-6 border border-gray-200 text-sm text-gray-700 max-h-72 overflow-y-auto whitespace-pre-wrap">
            {inputText ? (
              <HighlightedText text={inputText} indicators={result.indicators} />
            ) : (
              <p className="text-gray-400 italic text-center">
                Your analyzed text will appear here with highlighted indicators.
              </p>
            )}
          </div>
        </div>

        {/* Bottom 3-Column Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Analysis Overview */}
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 border-2 border-gray-200 shadow-lg h-[400px] flex flex-col">
            <div className="flex items-center mb-4 gap-2">
              <Clock className="text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-800">Analytics</h3>
            </div>

            {/* Scrollable Gauges */}
            <div className="flex flex-col items-center overflow-y-auto snap-y snap-mandatory scroll-smooth flex-grow">
              <div className="snap-start m-w-[100px] h-[300px] flex flex-col items-start justify-start">
                <p className="text-sm text-gray-700 mb-2 text-start">Accuracy</p>
                <div className="snap-start flex items-center justify-center">
                  <Gauge
                    width={230}
                    height={215}
                    value={result.accuracy}
                    valueMin={0}
                    valueMax={100}
                  />
                </div>
              </div>

              <div className="snap-start m-w-[100px] h-[300px] flex flex-col items-start justify-start">
                <p className="text-sm text-gray-700 mt-2">Confidence</p>
                <Gauge
                  width={230}
                  height={215}
                  value={result.confidence}
                  valueMin={0}
                  valueMax={100}
                />
              </div>

              <div className="snap-start m-w-[100px] h-[300px] flex flex-col items-start justify-start">
                <p className="text-sm text-gray-700 mt-2">Speed</p>
                <Gauge
                  width={230}
                  height={215}
                  value={result.accuracy ? 75 : 0}
                  valueMin={0}
                  valueMax={100}
                />
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              Scroll to view model performance metrics.
            </p>
          </div>

          {/* Pattern Detection Container */}
          <PatternDetectionPanel indicators={result.patterns} />

          {/* Token History */}
          <ScanHistory scanHistory={scanHistory} clearHistory={clearHistory} />
        </div>
      </div>
    </div>
  );
}

/* Pattern Detection Panel */
function PatternDetectionPanel({ indicators }) {
  const getSeverityColor = (severity) => {
    const colorMap = {
      high: { bar: 'bg-red-500', text: 'text-red-400' },
      medium: { bar: 'bg-orange-500', text: 'text-orange-400' },
      low: { bar: 'bg-yellow-500', text: 'text-yellow-400' },
    };
    return colorMap[severity] || colorMap.low;
  };

  const getSeverityLabel = (severity) => {
    const labels = {
      high: 'High Risk',
      medium: 'Caution',
      low: 'Low Risk',
    };
    return labels[severity] || 'Unknown';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 border-2 border-gray-200 shadow-lg min-h-[400px] max-h-[400px] flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center mb-4 gap-2">
        <SearchOutlinedIcon className="text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-800">Pattern Detection</h3>
        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
          {indicators.length}
        </span>
      </div>

      {/* Pattern List */}
      <AnimatePresence mode="popLayout">
        {indicators.length > 0 ? (
          <motion.div
            className="space-y-3 overflow-y-auto pr-2 flex-grow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {indicators.map((pattern, index) => {
              const colors = getSeverityColor(pattern.severity);
              const matchText = pattern.count === 1 ? '1 match' : `${pattern.count} matches`;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-4 transition-all duration-300 hover:bg-gray-100 cursor-pointer border border-gray-200 hover:border-blue-300 relative overflow-hidden"
                >
                  {/* Severity Bar on the right */}
                  <div className="absolute right-0 top-0 bottom-0 w-1">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ 
                        height: pattern.severity === 'high' ? '100%' : 
                               pattern.severity === 'medium' ? '66%' : '33%' 
                      }}
                      transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                      className={`${colors.bar} w-full`}
                      style={{ 
                        background: pattern.severity === 'high' 
                          ? 'linear-gradient(to bottom, #ef4444, #dc2626)' 
                          : pattern.severity === 'medium'
                          ? 'linear-gradient(to bottom, #f59e0b, #d97706)'
                          : 'linear-gradient(to bottom, #eab308, #ca8a04)'
                      }}
                    />
                  </div>

                  {/* Pattern Content */}
                  <div className="flex items-start justify-between pr-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-base mb-1">{pattern.type}</h4>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        {getSeverityLabel(pattern.severity)} • <span className="text-blue-500">{pattern.icon}</span>
                      </p>
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                      {matchText}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center flex-grow text-gray-400"
          >
            <SearchOutlinedIcon sx={{ fontSize: 64, opacity: 0.3 }} className="mb-3" />
            <span className="text-sm font-medium mb-1">No patterns detected</span>
            <span className="text-xs text-center text-gray-500">
              Analyze an email to see detected phishing patterns
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* Highlight Helper */
function HighlightedText({ text, indicators }) {
  if (!indicators.length) return <>{text}</>;
  let highlighted = text;
  indicators.forEach((indicator) => {
    const pattern = new RegExp(indicator.split(' ')[0], 'gi');
    highlighted = highlighted.replace(
      pattern,
      (match) =>
        `<mark class="bg-yellow-200 text-red-700 font-semibold px-1 rounded">${match}</mark>`
    );
  });
  return <div dangerouslySetInnerHTML={{ __html: highlighted }} />;
}


function ScanHistory({ scanHistory, clearHistory }) {
  const formatTime = (date) =>
    new Date(date).toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 border-2 border-gray-200 shadow-lg min-h-[400px] max-h-[400px] flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-800">Scanning History</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
            {scanHistory.length}
          </span>
        </div>
        <button
          onClick={clearHistory}
          disabled={!scanHistory.length}
          className="p-2 rounded-lg hover:bg-red-100 text-gray-500 hover:text-red-600 transition-all duration-300 disabled:opacity-50"
          title="Clear History"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <AnimatePresence mode="popLayout">
        {scanHistory.length > 0 ? (
          <motion.div
            className="space-y-3 overflow-y-auto pr-2 flex-grow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {scanHistory.map((entry) => (
              <motion.div
                key={entry.timestamp.getTime()}
                className="border border-gray-200 rounded-xl p-3 bg-gray-50 hover:bg-blue-50 transition-colors duration-300"
              >
                <div className="text-xs text-gray-500 mb-2">{formatTime(entry.timestamp)}</div>
                <div className="flex flex-wrap gap-2">
                  {entry.tokens.map((token, i) => (
                    <div
                      key={i}
                      className="px-2 py-1 text-xs bg-white border border-gray-200 rounded-lg text-gray-700 shadow-sm"
                    >
                      {token.value}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center flex-grow text-gray-400"
          >
            <span className="text-sm mb-1">No history yet</span>
            <span className="text-xs">Your recent token results will appear here</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}