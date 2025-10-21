import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Trash2, Mail, Clock, TrendingUp, PieChart as PieChartIcon, BarChart as BarChartIcon, Activity } from 'lucide-react';
import { Gauge } from '@mui/x-charts/Gauge';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import "./style.css";
import AnimatedContent from '../components/AnimatedComponents';


function InputSection({ inputText, setInputText, isAnalyzing, handleAnalyze, handleFileUpload, handleClear, uploadedFile, fileInputRef }) {
  return (
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <span><SearchOutlinedIcon/></span>
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
  );
}

function ResultsPanel({ result, inputText }) {
  const getGaugeColor = (score) => {
    if (score >= 70) return { color: '#10b981', label: 'Legitimate', icon: <CheckCircleIcon/> };
    if (score >= 40) return { color: '#f59e0b', label: 'Suspicious', icon: <WarningIcon/> };
    return { color: '#ef4444', label: 'Likely Phishing', icon: <DangerousIcon className='color-[#ef4444]'/> };
  };

  const gaugeInfo = getGaugeColor(result.legitimacyScore);

  return (
    <div className="mt-10 bg-white/90 backdrop-blur-lg rounded-3xl p-8 border-2 border-gray-200 shadow-lg text-center">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Analysis Results</h3>

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
  );
}

function AnalyticsPanel({ result, scanHistory }) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Activity size={14} /> },
    { id: 'performance', label: 'Performance', icon: <TrendingUp size={14} /> },
    { id: 'breakdown', label: 'Threat Breakdown', icon: <PieChartIcon size={14} /> },
    { id: 'trends', label: 'Historical Trends', icon: <BarChartIcon size={14} /> }
  ];

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 border-2 border-gray-200 shadow-lg h-[500px] flex flex-col">
      <div className="flex items-center mb-3 gap-2">
        <Clock className="text-blue-500" size={20} />
        <h3 className="text-lg font-semibold text-gray-800">Analytics</h3>
      </div>

      <div className="flex flex-wrap md:flex-nowrap gap-1 mb-4 bg-gray-100 rounded-lg p-1 overflow-x-auto scrollbar-custom scroll-smooth">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all duration-200 rounded-md
              ${activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
              }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-grow overflow-hidden">
        <div className="h-full overflow-y-auto pr-2">
          {activeTab === 'overview' && <OverviewTab result={result} />}
          {activeTab === 'performance' && <PerformanceTab result={result} />}
          {activeTab === 'breakdown' && <ThreatBreakdownTab result={result} scanHistory={scanHistory} />}
          {activeTab === 'trends' && <HistoricalTrendsTab scanHistory={scanHistory} result={result} />}
        </div>
      </div>
    </div>
  );
}


function OverviewTab({ result }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
          <p className="text-xs text-gray-600 mb-1">Legitimacy</p>
          <p className="text-2xl font-bold text-blue-600">{result.legitimacyScore}%</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
          <p className="text-xs text-gray-600 mb-1">Patterns</p>
          <p className="text-2xl font-bold text-purple-600">{result.patterns.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
          <p className="text-xs text-gray-600 mb-1">Accuracy</p>
          <p className="text-2xl font-bold text-green-600">{result.accuracy}%</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
          <p className="text-xs text-gray-600 mb-1">Confidence</p>
          <p className="text-2xl font-bold text-orange-600">{result.confidence}%</p>
        </div>
      </div>

      {result.patterns.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Summary</h4>
          <div className="space-y-2">
            {result.patterns.slice(0, 3).map((pattern, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <span className="text-gray-700">{pattern.type}</span>
                <span className={`px-2 py-0.5 rounded-full ${
                  pattern.severity === 'high' ? 'bg-red-100 text-red-700' :
                  pattern.severity === 'medium' ? 'bg-orange-100 text-orange-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {pattern.count} found
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PerformanceTab({ result }) {
  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="w-full flex flex-col items-center">
        <p className="text-sm text-gray-700 mb-2 font-semibold">Accuracy</p>
        <Gauge width={200} height={180} value={result.accuracy} valueMin={0} valueMax={100} />
      </div>

      <div className="w-full flex flex-col items-center">
        <p className="text-sm text-gray-700 mb-2 font-semibold">Confidence</p>
        <Gauge width={200} height={180} value={result.confidence} valueMin={0} valueMax={100} />
      </div>

      <div className="w-full flex flex-col items-center">
        <p className="text-sm text-gray-700 mb-2 font-semibold">Speed</p>
        <Gauge width={200} height={180} value={result.confidence} valueMin={0} valueMax={100} />
      </div>
    </div>
  );
}

function ThreatBreakdownTab({ result, scanHistory }) {
  const severityData = [
    { name: 'High', value: result.patterns.filter(p => p.severity === 'high').length, color: '#ef4444' },
    { name: 'Medium', value: result.patterns.filter(p => p.severity === 'medium').length, color: '#f59e0b' },
    { name: 'Low', value: result.patterns.filter(p => p.severity === 'low').length, color: '#eab308' }
  ].filter(d => d.value > 0);

  const threatTypeData = result.patterns.map(p => ({
    name: p.type.split(' ')[0],
    count: p.count
  }));

  const timelineData = scanHistory.slice(0, 8).reverse().map((entry, index) => ({
    scan: `#${index + 1}`,
    threats: entry.tokens.length
  }));

  return (
    <div className="space-y-4">
      {severityData.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-gray-700 mb-2">Severity Distribution</h4>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={severityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={50}
                fill="#8884d8"
                dataKey="value"
              >
                {severityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {threatTypeData.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-gray-700 mb-2">Threat Types</h4>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={threatTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={9} />
              <YAxis fontSize={9} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {timelineData.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-gray-700 mb-2">Detection Timeline</h4>
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="scan" fontSize={9} />
              <YAxis fontSize={9} />
              <Tooltip />
              <Line type="monotone" dataKey="threats" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {result.patterns.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <PieChartIcon size={40} className="mb-2 opacity-30" />
          <span className="text-xs">No threat data available</span>
        </div>
      )}
    </div>
  );
}

function HistoricalTrendsTab({ scanHistory, result }) {
  const comparisonData = scanHistory.slice(0, 8).reverse().map((entry, index) => ({
    scan: `#${index + 1}`,
    threats: entry.tokens.length,
    isCurrent: index === scanHistory.slice(0, 8).length - 1
  }));

  const avgThreats = comparisonData.length > 0 
    ? (comparisonData.reduce((sum, d) => sum + d.threats, 0) / comparisonData.length).toFixed(1)
    : 0;

  const currentThreats = result.indicators.length;
  const trend = comparisonData.length > 1 
    ? currentThreats > comparisonData[comparisonData.length - 2]?.threats 
      ? 'increasing' 
      : 'decreasing'
    : 'neutral';

  return (
    <div className="space-y-4">
      {comparisonData.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-xs text-gray-600 mb-0.5">Current</p>
              <p className="text-xl font-bold text-blue-600">{currentThreats}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-600 mb-0.5">Average</p>
              <p className="text-xl font-bold text-gray-700">{avgThreats}</p>
            </div>
          </div>

          <div className={`p-3 rounded-lg ${
            trend === 'increasing' ? 'bg-red-50' : trend === 'decreasing' ? 'bg-green-50' : 'bg-gray-50'
          }`}>
            <p className="text-xs font-semibold text-gray-700 mb-0.5">Trend</p>
            <p className={`text-xs ${
              trend === 'increasing' ? 'text-red-600' : trend === 'decreasing' ? 'text-green-600' : 'text-gray-600'
            }`}>
              {trend === 'increasing' && '↑ Increasing'}
              {trend === 'decreasing' && '↓ Decreasing'}
              {trend === 'neutral' && '→ No comparison'}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-700 mb-2">History</h4>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="scan" fontSize={9} />
                <YAxis fontSize={9} />
                <Tooltip />
                <Bar dataKey="threats" fill="#3b82f6">
                  {comparisonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.isCurrent ? '#ef4444' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <TrendingUp size={40} className="mb-2 opacity-30" />
          <span className="text-xs">No historical data</span>
        </div>
      )}
    </div>
  );
}

function PatternDetectionPanel({ indicators, onPatternClick }) {
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
      className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 border-2 border-gray-200 shadow-lg h-[500px] flex flex-col"
    >
      <div className="flex items-center mb-4 gap-2">
        <SearchOutlinedIcon className="text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-800">Pattern Detection</h3>
        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
          {indicators.length}
        </span>
      </div>

      <div className="flex-grow overflow-hidden">
        <AnimatePresence mode="popLayout">
          {indicators.length > 0 ? (
            <motion.div
              className="h-full space-y-3 overflow-y-auto pr-2"
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
                    onClick={() => onPatternClick(pattern)}
                    className="bg-gray-50 rounded-xl p-4 transition-all duration-300 hover:bg-gray-100 cursor-pointer border border-gray-200 hover:border-blue-300 relative overflow-hidden"
                  >
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
              className="h-full flex flex-col items-center justify-center text-gray-400"
            >
              <SearchOutlinedIcon sx={{ fontSize: 64, opacity: 0.3 }} className="mb-3" />
              <span className="text-sm font-medium mb-1">No patterns detected</span>
              <span className="text-xs text-center text-gray-500">
                Analyze an email to see detected phishing patterns
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
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
      className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 border-2 border-gray-200 shadow-lg h-[500px] flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-800">Scan History</h3>
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
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex-grow overflow-hidden">
        <AnimatePresence mode="popLayout">
          {scanHistory.length > 0 ? (
            <motion.div
              className="h-full space-y-3 overflow-y-auto pr-2"
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
              className="h-full flex flex-col items-center justify-center text-gray-400"
            >
              <Clock size={48} className="mb-3 opacity-30" />
              <span className="text-sm mb-1">No history yet</span>
              <span className="text-xs">Your recent scans will appear here</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function PatternDetailModal({ pattern, onClose, inputText }) {
  if (!pattern) return null;

  const getThreateningSections = () => {
    const sections = [];
    if (pattern.type === 'Urgency Language') {
      sections.push({ text: 'URGENT: Your account will be suspended', position: 'Beginning of email' });
      sections.push({ text: 'Act now before it\'s too late', position: 'Middle section' });
      sections.push({ text: 'Immediate action required', position: 'Call to action' });
    } else if (pattern.type === 'Suspicious Link') {
      sections.push({ text: 'http://fake-bank-login.suspicious.com', position: 'Link section' });
      sections.push({ text: 'Click here to verify', position: 'Footer area' });
    } else if (pattern.type === 'Personal Info Request') {
      sections.push({ text: 'Please confirm your SSN and password', position: 'Form section' });
    }
    return sections;
  };

  const sections = getThreateningSections();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              {pattern.icon}
              {pattern.type}
            </h3>
            <span className={`inline-block mt-2 text-xs px-3 py-1 rounded-full ${
              pattern.severity === 'high' ? 'bg-red-100 text-red-700' :
              pattern.severity === 'medium' ? 'bg-orange-100 text-orange-700' :
              'bg-yellow-100 text-yellow-700'
            }`}>
              {pattern.severity.toUpperCase()} SEVERITY
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Description</h4>
            <p className="text-sm text-gray-600">
              {pattern.type === 'Urgency Language' && 'This pattern detects language designed to create a false sense of urgency, pressuring recipients to act quickly without thinking.'}
              {pattern.type === 'Suspicious Link' && 'This pattern identifies URLs that appear suspicious, potentially leading to phishing sites or malware.'}
              {pattern.type === 'Personal Info Request' && 'This pattern flags requests for sensitive personal information that legitimate organizations would never ask for via email.'}
              {pattern.type === 'Unusual Formatting' && 'This pattern detects irregular formatting that may be used to hide malicious content or impersonate legitimate sources.'}
              {pattern.type === 'Grammar Issues' && 'This pattern identifies grammatical errors and spelling mistakes common in phishing attempts.'}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Detected Instances ({sections.length})
            </h4>
            <div className="space-y-3">
              {sections.map((section, index) => (
                <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-900 mb-1">{section.text}</p>
                      <p className="text-xs text-red-600">Location: {section.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Recommendations</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Do not click on any links or download attachments from this email</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Verify the sender's identity through official channels</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Report this email to your IT security team</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

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
  const [scanHistory, setScanHistory] = useState([]);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const fileInputRef = useRef(null);

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      const mockResult = {
        legitimacyScore: Math.floor(Math.random() * 40) + 30,
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
        accuracy: Math.floor(Math.random() * 20) + 80,
        confidence: Math.floor(Math.random() * 30) + 65,
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
      setScanHistory((prev) => [newEntry, ...prev]);
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

  const clearHistory = () => setScanHistory([]);

  const handlePatternClick = (pattern) => {
    setSelectedPattern(pattern);
  };

  return (
    <div className="py-20 px-4" id="detector">
      <div className="max-w-[1150px] mx-auto">

        <AnimatedContent
                    direction="horizontal"
                    reverse={true}
                    duration={1.2}
                    ease="power3.out"
                    initialOpacity={0.1}
                    animateOpacity
                    scale={1.1}
                    threshold={0.2}
                    delay={0.10}
                  >
                    <div className="text-center overflow-hidden mb-12">
                      <h2 className="text-5xl md:text-6xl font-bold text-[#042046]">
                        Phishing Detector
                      </h2>
                    </div>
                  </AnimatedContent>

        <AnimatedContent
                    direction="horizontal"
                    reverse={true}
                    duration={1.2}
                    ease="power3.out"
                    initialOpacity={0.1}
                    animateOpacity
                    scale={1.1}
                    threshold={0.2}
                    delay={0.10}
                  >
                    <InputSection
                      inputText={inputText}
                      setInputText={setInputText}
                      isAnalyzing={isAnalyzing}
                      handleAnalyze={handleAnalyze}
                      handleFileUpload={handleFileUpload}
                      handleClear={handleClear}
                      uploadedFile={uploadedFile}
                      fileInputRef={fileInputRef}
                    />
                  </AnimatedContent>

        <AnimatedContent
                    direction="horizontal"
                    reverse={true}
                    duration={1.2}
                    ease="power3.out"
                    initialOpacity={0.1}
                    animateOpacity
                    scale={1.1}
                    threshold={0.2}
                    delay={0.10}
                  >
                    <ResultsPanel result={result} inputText={inputText} />
                  </AnimatedContent>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatedContent
                    direction="horizontal"
                    reverse={true}
                    duration={1.2}
                    ease="power3.out"
                    initialOpacity={0.1}
                    animateOpacity
                    scale={1.1}
                    threshold={0.2}
                    delay={0.10}
                  >
                    <AnalyticsPanel result={result} scanHistory={scanHistory} />
                  </AnimatedContent>

          <AnimatedContent
                    direction="horizontal"
                    reverse={true}
                    duration={1.2}
                    ease="power3.out"
                    initialOpacity={0.1}
                    animateOpacity
                    scale={1.1}
                    threshold={0.2}
                    delay={0.10}
                  >
                    <PatternDetectionPanel 
                      indicators={result.patterns} 
                      onPatternClick={handlePatternClick}
                    />
                  </AnimatedContent>

          <AnimatedContent
                    direction="horizontal"
                    reverse={true}
                    duration={1.2}
                    ease="power3.out"
                    initialOpacity={0.1}
                    animateOpacity
                    scale={1.1}
                    threshold={0.2}
                    delay={0.10}
                  >
                    <ScanHistory scanHistory={scanHistory} clearHistory={clearHistory} />
                  </AnimatedContent>
        </div>
      </div>

      <AnimatePresence>
        {selectedPattern && (
          <PatternDetailModal
            pattern={selectedPattern}
            onClose={() => setSelectedPattern(null)}
            inputText={inputText}
          />
        )}
      </AnimatePresence>
    </div>
  );
}