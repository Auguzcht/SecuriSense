import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Trash2, Mail, Image, FileIcon, Loader2, X, CheckCircle2, AlertCircle } from 'lucide-react';
import Tesseract from 'tesseract.js';

export default function EnhancedInputSection({ 
  inputText, 
  setInputText, 
  isAnalyzing, 
  handleAnalyze, 
  handleClear, 
  loadingStatus 
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStatus, setProcessingStatus] = useState('');
  const [uploadError, setUploadError] = useState(null);

  // File type validation
  const isValidFile = (file) => {
    const validTypes = [
      'text/plain',
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/gif',
      'image/webp',
      'message/rfc822', // .eml
    ];
    
    const validExtensions = ['.txt', '.eml', '.msg', '.pdf', '.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    return validTypes.includes(file.type) || validExtensions.includes(fileExtension);
  };

  // Extract text from PDF
  const extractTextFromPDF = async (file) => {
    try {
      setProcessingStatus('PDF processing requires additional setup');
      throw new Error('PDF processing not yet implemented');
    } catch (error) {
      throw new Error(`PDF extraction failed: ${error.message}`);
    }
  };

  // Extract text from image using Tesseract.js
  const extractTextFromImage = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        try {
          setProcessingStatus('Preparing image...');
          
          const result = await Tesseract.recognize(
            event.target.result,
            'eng',
            {
              logger: (m) => {
                if (m.status === 'recognizing text') {
                  setProcessingProgress(Math.round(m.progress * 100));
                  setProcessingStatus(`Extracting text... ${Math.round(m.progress * 100)}%`);
                }
              }
            }
          );
          
          if (!result.data.text || result.data.text.trim().length === 0) {
            throw new Error('No text found in image');
          }
          
          resolve(result.data.text);
        } catch (error) {
          reject(new Error(`OCR failed: ${error.message}`));
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.readAsDataURL(file);
    });
  };

  // Process uploaded file
  const processFile = async (file) => {
    setIsProcessing(true);
    setUploadError(null);
    setProcessingProgress(0);
    setUploadedFile(file);

    try {
      let extractedText = '';

      if (file.type.startsWith('image/') || ['.jpg', '.jpeg', '.png', '.gif', '.webp'].some(ext => file.name.toLowerCase().endsWith(ext))) {
        // Image file - use OCR
        extractedText = await extractTextFromImage(file);
        setProcessingStatus('Text extracted successfully!');
      } else if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        // PDF file
        extractedText = await extractTextFromPDF(file);
      } else {
        // Text file (.txt, .eml, .msg)
        setProcessingStatus('Reading text file...');
        extractedText = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = () => reject(new Error('Failed to read file'));
          reader.readAsText(file);
        });
      }

      if (extractedText && extractedText.trim().length > 0) {
        setInputText(extractedText);
        setProcessingStatus('Complete!');
        setTimeout(() => {
          setProcessingStatus('');
          setIsProcessing(false);
        }, 2000);
      } else {
        throw new Error('No text content found in file');
      }
    } catch (error) {
      console.error('File processing error:', error);
      setUploadError(error.message);
      setIsProcessing(false);
      setProcessingStatus('');
    }
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!isValidFile(file)) {
        setUploadError('Invalid file type. Please upload TXT, EML, PDF, or image files.');
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setUploadError('File too large. Maximum size is 10MB.');
        return;
      }
      processFile(file);
    }
  };

  // Drag and drop handlers
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set isDragging to false if we're leaving the container
    if (e.currentTarget === e.target) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      if (!isValidFile(file)) {
        setUploadError('Invalid file type. Please upload TXT, EML, PDF, or image files.');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setUploadError('File too large. Maximum size is 10MB.');
        return;
      }
      processFile(file);
    }
  }, []);

  const removeFile = () => {
    setUploadedFile(null);
    setUploadError(null);
    setProcessingStatus('');
    setProcessingProgress(0);
    setInputText(''); // Clear the input text as well
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-6 border-2 border-gray-200 shadow-lg overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #3b82f6 0%, transparent 50%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Header */}
      <div className="relative flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-2 shadow-lg"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Mail className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Message Content</h2>
            <p className="text-xs text-gray-500">Paste text or upload a file</p>
          </div>
        </div>
        
        <motion.button
          onClick={handleClear}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 hover:bg-red-50 rounded-xl transition-all duration-300 group border-2 border-transparent hover:border-red-200"
          title="Clear"
        >
          <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
        </motion.button>
      </div>

      {/* Textarea with drag-and-drop - Fixed container height */}
      <div className="relative mb-4 h-64">
        <style>
          {`
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
              height: 8px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-track {
              background: rgba(243, 244, 246, 0.5);
              border-radius: 10px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: linear-gradient(to bottom, #60a5fa, #3b82f6);
              border-radius: 10px;
              transition: background 0.3s ease;
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(to bottom, #3b82f6, #2563eb);
            }
            
            .custom-scrollbar::-webkit-scrollbar-corner {
              background: transparent;
            }
          `}
        </style>
        
        <motion.textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          placeholder={isDragging ? "Drop file here..." : "Paste email content here, or drag & drop a file..."}
          disabled={isProcessing}
          className={`w-full h-full bg-gradient-to-br from-gray-50/80 to-gray-100/50 text-gray-800 rounded-2xl p-6 transition-all duration-300 resize-none text-sm backdrop-blur-sm custom-scrollbar border-2 border-gray-200
            ${isDragging ? 'border-blue-400' : 'focus:border-blue-400'}
            focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder:text-gray-400
            disabled:opacity-50 disabled:cursor-not-allowed`}
        />

        {/* Drag overlay with shade effect - matching textarea exactly */}
        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-0 left-0 right-0 bottom-0 rounded-2xl pointer-events-none"
            >
              {/* Blue shade overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-blue-300/15 to-blue-500/20 rounded-2xl backdrop-blur-[2px]" />
              
              {/* Animated glow border */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  boxShadow: '0 0 0 2px #60a5fa inset, 0 0 30px rgba(96, 165, 250, 0.3)',
                }}
                animate={{
                  boxShadow: [
                    '0 0 0 2px #60a5fa inset, 0 0 30px rgba(96, 165, 250, 0.3)',
                    '0 0 0 2px #3b82f6 inset, 0 0 40px rgba(59, 130, 246, 0.5)',
                    '0 0 0 2px #60a5fa inset, 0 0 30px rgba(96, 165, 250, 0.3)',
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Center drop icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                  className="flex flex-col items-center gap-3"
                >
                  {/* Upload icon with pulse */}
                  <motion.div
                    animate={{ 
                      y: [0, -8, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative"
                  >
                    {/* Glow circle behind icon */}
                    <motion.div
                      className="absolute bg-blue-400/30 rounded-full blur-xl"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.5, 0.3]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      style={{ width: '80px', height: '80px', left: '-15px', top: '-15px' }}
                    />
                    
                    {/* Icon container */}
                    <div className="relative bg-white rounded-2xl p-4 shadow-lg border-2 border-blue-400">
                      <Upload className="w-12 h-12 text-blue-500" strokeWidth={2.5} />
                    </div>
                  </motion.div>

                  {/* Text */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-center"
                  >
                    <p className="text-blue-600 font-bold text-lg mb-1">Drop file here</p>
                    <p className="text-blue-500 text-sm font-medium">TXT, EML, PDF, or Image</p>
                  </motion.div>

                  {/* Decorative dots */}
                  <div className="flex gap-2 mt-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-blue-500"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* File info and processing status */}
      <AnimatePresence mode="wait">
        {uploadedFile && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4"
          >
            <div className={`flex items-center gap-3 p-3 rounded-xl border-2 ${
              uploadError 
                ? 'bg-red-50 border-red-200' 
                : isProcessing 
                ? 'bg-blue-50 border-blue-200' 
                : 'bg-green-50 border-green-200'
            }`}>
              {/* File icon */}
              <div className={`p-2 rounded-lg ${
                uploadError ? 'bg-red-100' : isProcessing ? 'bg-blue-100' : 'bg-green-100'
              }`}>
                {isProcessing ? (
                  <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                ) : uploadError ? (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                ) : uploadedFile.type.startsWith('image/') ? (
                  <Image className="w-5 h-5 text-green-600" />
                ) : (
                  <FileText className="w-5 h-5 text-green-600" />
                )}
              </div>

              {/* File details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {uploadedFile.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">
                    {(uploadedFile.size / 1024).toFixed(1)} KB
                  </span>
                  {isProcessing && processingStatus && (
                    <>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-blue-600 font-medium">
                        {processingStatus}
                      </span>
                    </>
                  )}
                  {uploadError && (
                    <>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-red-600 font-medium">
                        {uploadError}
                      </span>
                    </>
                  )}
                </div>

                {/* Progress bar */}
                {isProcessing && processingProgress > 0 && (
                  <div className="mt-2 h-1.5 bg-blue-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${processingProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}
              </div>

              {/* Remove button */}
              {!isProcessing && (
                <motion.button
                  onClick={removeFile}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1.5 hover:bg-white/50 rounded-lg transition-colors z-10"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </motion.button>
              )}

              {/* Success checkmark */}
              {!isProcessing && !uploadError && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Character count and stats */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-3 text-xs">
          <span className={`font-medium ${
            inputText.length > 15000 ? 'text-red-600' : 'text-gray-500'
          }`}>
            {inputText.length.toLocaleString()} / 15,000
          </span>
          {inputText.length > 0 && (
            <>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500">
                {inputText.split(/\s+/).filter(w => w.length > 0).length} words
              </span>
            </>
          )}
        </div>

        {uploadedFile && !uploadError && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 rounded-lg border border-blue-200"
          >
            {uploadedFile.type.startsWith('image/') ? (
              <Image className="w-3.5 h-3.5 text-blue-600" />
            ) : (
              <FileText className="w-3.5 h-3.5 text-blue-600" />
            )}
            <span className="text-xs font-medium text-blue-600">
              From file
            </span>
          </motion.div>
        )}
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Analyze button */}
        <motion.button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !inputText.trim() || isProcessing}
          whileHover={!isAnalyzing && inputText.trim() && !isProcessing ? { 
            scale: 1.02,
            y: -3 
          } : {}}
          whileTap={!isAnalyzing && inputText.trim() && !isProcessing ? { 
            scale: 0.98,
            y: 0 
          } : {}}
          className={`relative overflow-hidden text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2
            ${(isAnalyzing || !inputText.trim() || isProcessing) 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:shadow-[0_8px_20px_rgba(239,68,68,0.3)]'
            }`}
          style={{
            background: 'linear-gradient(90deg, #f97316, #ef4444, #f97316)',
            backgroundSize: '200% 100%',
            backgroundPosition: '0% center',
          }}
          onMouseEnter={(e) => {
            if (!isAnalyzing && inputText.trim() && !isProcessing) {
              e.currentTarget.style.backgroundPosition = '100% center';
            }
          }}
          onMouseLeave={(e) => {
            if (!isAnalyzing && inputText.trim() && !isProcessing) {
              e.currentTarget.style.backgroundPosition = '0% center';
            }
          }}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="font-semibold tracking-wide text-base">Analyzing...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="font-semibold tracking-wide text-base">Detect Phishing</span>
            </>
          )}
        </motion.button>

        {/* Upload button */}
        <motion.label
          whileHover={{ scale: 1.02, y: -3 }}
          whileTap={{ scale: 0.98, y: 0 }}
          className="relative overflow-hidden bg-white border-2 border-blue-500 hover:border-blue-600 text-blue-600 font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[0_8px_20px_rgba(64,121,255,0.15)] hover:bg-blue-50/50 flex items-center justify-center gap-3 group cursor-pointer"
        >
          <input
            type="file"
            accept=".txt,.eml,.msg,.pdf,image/*"
            onChange={handleFileSelect}
            disabled={isProcessing}
            className="hidden"
          />
          
          <motion.div
            animate={isProcessing ? { rotate: 360 } : {}}
            transition={{ duration: 1, repeat: isProcessing ? Infinity : 0, ease: "linear" }}
          >
            {isProcessing ? (
              <Loader2 className="w-5 h-5 text-blue-500" />
            ) : (
              <Upload className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
            )}
          </motion.div>
          <span className="tracking-wide text-base">{isProcessing ? 'Processing...' : 'Upload File'}</span>
        </motion.label>
      </div>

      {/* Supported formats hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400"
      >
        <FileIcon className="w-3.5 h-3.5" />
        <span>Supports: TXT, EML, MSG, PDF, JPG, PNG</span>
      </motion.div>
    </motion.div>
  );
}