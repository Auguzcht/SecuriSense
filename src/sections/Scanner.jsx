import { useState, useRef } from 'react';
import { Upload, FileText, AlertTriangle, Shield, Mail, Trash2 } from 'lucide-react';
import AnimatedContent from "../components/AnimatedComponents";
import ScrollReveal from "../components/ScrollReveal";

import "../mockData/result.js"

export default function PhishingDetector() {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      
      const mockResult = {
        legitimacyScore: 65, 
        indicators: [
          'Urgency language detected',
          'Suspicious link found',
          'Request for sensitive information'
        ]
      };
      setResult(mockResult);
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setInputText(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleClear = () => {
    setInputText('');
    setResult(null);
    setUploadedFile(null);
  };

  const getGaugeColor = (score) => {
    if (score >= 70) return { color: '#10b981', label: 'Legitimate', icon: '✓', bg: 'from-green-50 to-green-100' };
    if (score >= 40) return { color: '#f59e0b', label: 'Suspicious', icon: '⚠', bg: 'from-yellow-50 to-yellow-100' };
    return { color: '#ef4444', label: 'Likely Phishing', icon: '✕', bg: 'from-red-50 to-red-100' };
  };

  const gaugeInfo = result ? getGaugeColor(result.legitimacyScore) : null;

  return (
    <div className="py-10 px-4" id="detector">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 animate-fade-in overflow-hidden"> 
          <AnimatedContent  direction="horizontal"
                reverse={true}
                duration={1.2}
                ease="power3.out"
                initialOpacity={0.1}
                animateOpacity
                scale={1.1}
                threshold={0.2}
                delay={0.10}>
                  <h2 className="text-5xl md:text-6xl font-bold text-[#042046] mb-12 text-center">
                    Phishing Detector
                  </h2>
        </AnimatedContent>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 animate-slide-up">
          {/* Input Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Mail className="w-6 h-6 text-blue-500" />
                Email Content
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

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !inputText.trim()}
              className={`bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-blue-300/50 flex items-center justify-center gap-3 group hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
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
                  <Shield className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Detect Phishing</span>
                </>
              )}
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-white border-2 border-gray-300 hover:border-blue-400 text-gray-700 font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-blue-200/50 flex items-center justify-center gap-3 group hover:scale-[1.02] active:scale-95"
            >
              <Upload className="w-5 h-5 group-hover:scale-110 transition-transform text-blue-500" />
              <span>Upload File</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.eml,.msg,image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* Results Section */}
          {result && (
            <div className="animate-fade-in">
              {/* Gauge Meter */}
              <div className={`bg-gradient-to-br ${gaugeInfo.bg} rounded-2xl p-8 mb-6 border-2 border-gray-200`}>
                <h3 className="text-lg font-bold text-gray-800 mb-6 text-center">
                  Legitimacy Assessment
                </h3>
                
                {/* Circular Gauge */}
                <div className="relative w-64 h-64 mx-auto mb-6">
                  <svg className="transform -rotate-90 w-64 h-64">
                    {/* Background circle */}
                    <circle
                      cx="128"
                      cy="128"
                      r="100"
                      stroke="#e5e7eb"
                      strokeWidth="20"
                      fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="128"
                      cy="128"
                      r="100"
                      stroke={gaugeInfo.color}
                      strokeWidth="20"
                      fill="none"
                      strokeDasharray={`${(result.legitimacyScore / 100) * 628} 628`}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                      style={{
                        filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.2))'
                      }}
                    />
                  </svg>
                  
                  {/* Center content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-6xl mb-2">{gaugeInfo.icon}</div>
                    <div className="text-5xl font-bold" style={{ color: gaugeInfo.color }}>
                      {result.legitimacyScore}%
                    </div>
                    <div className="text-sm text-gray-600 font-semibold mt-2">
                      {gaugeInfo.label}
                    </div>
                  </div>
                </div>

                {/* Linear gauge alternative */}
                <div className="mt-8">
                  <div className="flex justify-between text-xs text-gray-600 mb-2 font-semibold">
                    <span>Phishing</span>
                    <span>Suspicious</span>
                    <span>Legitimate</span>
                  </div>
                  <div className="w-full h-6 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full relative overflow-hidden shadow-inner">
                    <div 
                      className="absolute top-0 h-full w-1 bg-white shadow-lg transition-all duration-1000 ease-out"
                      style={{ left: `${result.legitimacyScore}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-lg shadow-lg">
                        <div className="text-xs font-bold text-gray-800">{result.legitimacyScore}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Warning Indicators */}
              {result.indicators && result.indicators.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    Detected Indicators
                  </h3>
                  <div className="space-y-3">
                    {result.indicators.map((indicator, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-xl animate-slide-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-sm text-gray-700 flex-1">{indicator}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.4s ease-out;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
