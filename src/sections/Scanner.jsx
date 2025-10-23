import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Trash2, Mail } from 'lucide-react';
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
import Analytics from '../components/Analytics';
import PatternDetection from '../components/PatternDetection';
import ScanHistory from '../components/ScanHistory';

// API configuration - Update to use dedicated endpoint
const HF_ENDPOINT_URL = import.meta.env.VITE_HUGGINGFACE_ENDPOINT_URL;
const HF_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;

// Retry configuration for scale-to-zero cold starts
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 5000; // 5 seconds
const MAX_WAIT_TIME = 60000; // 60 seconds total

// Function to call Hugging Face Dedicated Endpoint with retry logic
const analyzeTextWithModel = async (text, onStatusUpdate = null) => {
  let retries = 0;
  let delay = INITIAL_RETRY_DELAY;
  const startTime = Date.now();

  while (retries < MAX_RETRIES) {
    try {
      if (onStatusUpdate) {
        if (retries === 0) {
          onStatusUpdate("Connecting to AI model...");
        } else {
          onStatusUpdate(`Model is warming up... (Attempt ${retries + 1}/${MAX_RETRIES})`);
        }
      }

      console.log(`Calling Hugging Face Endpoint (Attempt ${retries + 1}/${MAX_RETRIES})`);
      
      const response = await fetch(HF_ENDPOINT_URL, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          inputs: text,
          parameters: {
            max_length: 512,
            truncation: true
          }
        }),
      });

      console.log("Endpoint Response Status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Endpoint response data:", data);
        
        if (onStatusUpdate) {
          onStatusUpdate("Analysis complete!");
        }
        
        return data;
      }

      if (response.status === 503) {
        const errorData = await response.json().catch(() => ({}));
        console.log("503 Response:", errorData);

        if (errorData.error?.includes("loading") || errorData.error?.includes("currently loading")) {
          const estimatedTime = errorData.estimated_time || delay / 1000;
          
          if (onStatusUpdate) {
            onStatusUpdate(`Model is loading... (~${Math.ceil(estimatedTime)}s remaining)`);
          }

          if (Date.now() - startTime > MAX_WAIT_TIME) {
            throw new Error("Model loading timeout exceeded (60s). Please try again later.");
          }

          const waitTime = estimatedTime ? estimatedTime * 1000 : delay;
          console.log(`Waiting ${waitTime}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          
          retries++;
          delay *= 1.5;
          continue;
        }
      }

      const errorData = await response.json().catch(() => ({}));
      console.error("Endpoint error:", errorData);
      
      return { 
        error: errorData.error || `Request failed with status: ${response.status}` 
      };

    } catch (error) {
      console.error(`Error on attempt ${retries + 1}:`, error);
      
      if (retries === MAX_RETRIES - 1) {
        return { 
          error: `Failed after ${MAX_RETRIES} attempts: ${error.message}` 
        };
      }

      if (onStatusUpdate) {
        onStatusUpdate(`Connection error. Retrying in ${delay/1000}s...`);
      }
      await new Promise(resolve => setTimeout(resolve, delay));
      
      retries++;
      delay *= 1.5;
    }
  }

  return { error: "Maximum retry attempts exceeded" };
};

// Function to extract key patterns from text using regex
const extractPatterns = (text) => {
  const patterns = [];
  
  const urgencyWords = /urgent|immediate|alert|warning|limited time|act now|expires?|verify|confirm|suspended|disabled|blocked/gi;
  const suspiciousLinks = /http[s]?:\/\/(?!www\.(?:google|facebook|twitter|linkedin|microsoft|apple|amazon)\.com)[^\s]+/gi;
  const personalInfoRequests = /password|username|login|social security|ssn|credit card|bank account|pin|security question/gi;
  const unusualFormatting = /[A-Z]{5,}|[!]{2,}|\$[A-Z]+\$|\*\*[^*]+\*\*/g;
  const grammarIssues = /we is|you is|they is|he are|she are|it are|kindly? do the needful|revert back|please\s+(?:to\s+)?(?:do|make|send)|we appreciate you to/gi;

  const urgencyMatches = text.match(urgencyWords) || [];
  if (urgencyMatches.length > 0) {
    patterns.push({ 
      type: 'Urgency Language', 
      severity: urgencyMatches.length > 5 ? 'high' : 'medium', 
      icon: <BoltOutlinedIcon />, 
      count: urgencyMatches.length,
      matches: [...new Set(urgencyMatches)]
    });
  }

  const linkMatches = text.match(suspiciousLinks) || [];
  if (linkMatches.length > 0) {
    patterns.push({ 
      type: 'Suspicious Link', 
      severity: 'high', 
      icon: <LinkOutlinedIcon />, 
      count: linkMatches.length,
      matches: [...new Set(linkMatches)]
    });
  }

  const personalInfoMatches = text.match(personalInfoRequests) || [];
  if (personalInfoMatches.length > 0) {
    patterns.push({ 
      type: 'Personal Info Request', 
      severity: 'high', 
      icon: <LockOutlinedIcon />, 
      count: personalInfoMatches.length,
      matches: [...new Set(personalInfoMatches)]
    });
  }

  const formattingMatches = text.match(unusualFormatting) || [];
  if (formattingMatches.length > 0) {
    patterns.push({ 
      type: 'Unusual Formatting', 
      severity: 'low', 
      icon: <AutoFixHighOutlinedIcon />, 
      count: formattingMatches.length,
      matches: [...new Set(formattingMatches)]
    });
  }

  const grammarMatches = text.match(grammarIssues) || [];
  if (grammarMatches.length > 0) {
    patterns.push({ 
      type: 'Grammar Issues', 
      severity: 'medium', 
      icon: <EditNoteOutlinedIcon />, 
      count: grammarMatches.length,
      matches: [...new Set(grammarMatches)]
    });
  }

  return patterns;
};

function InputSection({ inputText, setInputText, isAnalyzing, handleAnalyze, handleFileUpload, handleClear, uploadedFile, fileInputRef, loadingStatus }) {
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
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Analyzing...</span>
              </div>
              {loadingStatus && (
                <span className="text-xs text-blue-100">{loadingStatus}</span>
              )}
            </div>
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

function PatternDetailModal({ pattern, onClose, inputText }) {
  if (!pattern) return null;

  const getThreateningSections = () => {
    if (!pattern.matches || pattern.matches.length === 0) {
      return [];
    }

    return pattern.matches.map((match, index) => {
      const position = inputText.indexOf(match);
      const start = Math.max(0, position - 20);
      const end = Math.min(inputText.length, position + match.length + 20);
      
      let context = inputText.substring(start, end);
      if (start > 0) context = '...' + context;
      if (end < inputText.length) context = context + '...';
      
      const highlightedContext = context.replace(
        new RegExp(`(${match})`, 'gi'),
        '<span class="font-bold text-red-700">$1</span>'
      );
      
      return { 
        text: highlightedContext, 
        position: `Character position ${position}` 
      };
    });
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
                      <p className="text-sm font-medium text-red-900 mb-1" dangerouslySetInnerHTML={{ __html: section.text }}></p>
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
    const pattern = new RegExp(`(${indicator})`, 'gi');
    highlighted = highlighted.replace(
      pattern,
      (match) => `<mark class="bg-yellow-200 text-red-700 font-semibold px-1 rounded">${match}</mark>`
    );
  });
  
  return <div dangerouslySetInnerHTML={{ __html: highlighted }} />;
}

export default function PhishingDetector() {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('');
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
  const [apiError, setApiError] = useState(null);
  const fileInputRef = useRef(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    setApiError(null);
    setLoadingStatus('Initializing...');

    try {
      const extractedPatterns = extractPatterns(inputText);
      const indicators = extractedPatterns.flatMap(pattern => pattern.matches || []);
      
      const mlResponse = await analyzeTextWithModel(inputText, (status) => {
        setLoadingStatus(status);
      });
      
      if (mlResponse.error) {
        setApiError(mlResponse.error);
        throw new Error(mlResponse.error);
      }
      
      console.log("ML Endpoint Response:", mlResponse);
      
      let isPhishing = false;
      let modelConfidence = 0.5;
      
      if (Array.isArray(mlResponse) && mlResponse.length > 0) {
        if (mlResponse[0].label && mlResponse[0].score !== undefined) {
          const result = mlResponse[0];
          isPhishing = result.label.toLowerCase().includes('phishing') || 
                      result.label === 'LABEL_1';
          modelConfidence = result.score;
        }
      } else if (mlResponse.label && mlResponse.score !== undefined) {
        isPhishing = mlResponse.label.toLowerCase().includes('phishing') || 
                    mlResponse.label === 'LABEL_1';
        modelConfidence = mlResponse.score;
      }
      
      let legitimacyScore;
      if (isPhishing) {
        legitimacyScore = Math.max(0, Math.min(100, Math.round((1 - modelConfidence) * 100)));
      } else {
        legitimacyScore = Math.max(0, Math.min(100, Math.round(modelConfidence * 100)));
      }
      
      const finalResult = {
        legitimacyScore: legitimacyScore,
        indicators: indicators,
        patterns: extractedPatterns,
        accuracy: Math.round(modelConfidence * 100),
        confidence: Math.round(modelConfidence * 100),
        isModelResult: true,
        modelResponse: mlResponse
      };
      
      setResult(finalResult);
      setLoadingStatus('');
      
      const newEntry = {
        timestamp: new Date(),
        tokens: indicators.map((i) => ({
          value: i,
          type: 'Indicator'
        }))
      };
      setScanHistory((prev) => [newEntry, ...prev]);
      
    } catch (error) {
      console.error("Error during analysis:", error);
      setLoadingStatus('');
      
      if (!apiError) {
        setApiError("Failed to analyze with ML model. Using fallback analysis.");
      }
      
      const extractedPatterns = extractPatterns(inputText);
      const indicators = extractedPatterns.flatMap(pattern => pattern.matches || []);
      
      const fallbackResult = {
        legitimacyScore: 50,
        indicators: indicators,
        patterns: extractedPatterns,
        accuracy: 70,
        confidence: 60,
        isModelFallback: true
      };
      
      setResult(fallbackResult);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file.name);
      const reader = new FileReader();
      
      reader.onload = (event) => {
        setInputText(event.target.result);
      };
      
      if (file.type.includes('image')) {
        setApiError("OCR for images is not yet supported. Please upload a text file.");
        return;
      }
      
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
    setApiError(null);
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
            <h2 className="text-5xl md:text-6xl font-bold text-[#042046] mb-2">
              Phishing Detector
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI-powered detector analyzes text to identify phishing attempts and security threats.
            </p>
            {apiError && (
              <div className="mt-4 px-4 py-3 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg max-w-2xl mx-auto">
                <p className="text-sm">{apiError} <span className="text-xs">(Using local analysis instead)</span></p>
              </div>
            )}
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
            loadingStatus={loadingStatus}
          />
        </AnimatedContent>

        {(result.legitimacyScore > 0 || result.indicators.length > 0) && (
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
        )}

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
            <Analytics result={result} scanHistory={scanHistory} />
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
            <PatternDetection 
              patterns={result.patterns} 
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