import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Trash2, Calendar, AlertCircle } from 'lucide-react';

export default function ScanHistory({ scanHistory, clearHistory }) {
  const formatTime = (date) =>
    new Date(date).toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

  const formatDate = (date) => {
    const today = new Date();
    const scanDate = new Date(date);
    const diffTime = Math.abs(today - scanDate);
    const diffMinutes = Math.ceil(diffTime / (1000 * 60));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return scanDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getSeverityColor = (tokenCount) => {
    if (tokenCount >= 5) return {
      gradient: 'from-red-50 to-red-100',
      border: 'border-red-200',
      icon: '🔴',
      label: 'High Risk',
      textColor: 'text-red-700',
      badgeBg: 'bg-red-100'
    };
    if (tokenCount >= 3) return {
      gradient: 'from-orange-50 to-orange-100',
      border: 'border-orange-200',
      icon: '⚠️',
      label: 'Medium Risk',
      textColor: 'text-orange-700',
      badgeBg: 'bg-orange-100'
    };
    return {
      gradient: 'from-green-50 to-green-100',
      border: 'border-green-200',
      icon: '✅',
      label: 'Low Risk',
      textColor: 'text-green-700',
      badgeBg: 'bg-green-100'
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 border-2 border-gray-200 shadow-lg h-[500px] flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="text-blue-500" size={20} />
          <h3 className="text-lg font-semibold text-gray-800">Scan History</h3>
        </div>
        
        {/* Stats and Clear Button */}
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200"
          >
            <span className="text-xs font-semibold text-gray-700">
              {scanHistory.length} {scanHistory.length === 1 ? 'scan' : 'scans'}
            </span>
          </motion.div>
          
          <motion.button
            onClick={clearHistory}
            disabled={!scanHistory.length}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed border-2 border-transparent hover:border-red-200"
            title="Clear History"
          >
            <Trash2 size={16} />
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow overflow-hidden">
        <AnimatePresence mode="popLayout">
          {scanHistory.length > 0 ? (
            <motion.div
              className="h-full space-y-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {scanHistory.map((entry, entryIndex) => {
                const severity = getSeverityColor(entry.tokens.length);
                
                return (
                  <motion.div
                    key={entry.timestamp.getTime()}
                    initial={{ opacity: 0, x: -20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.9 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: entryIndex * 0.05,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className={`relative bg-gradient-to-br ${severity.gradient} rounded-2xl p-4 border-2 ${severity.border} transition-all duration-300 group overflow-hidden cursor-pointer`}
                  >
                    {/* Glass shimmer effect on hover */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                        width: '50%',
                      }}
                      animate={{
                        x: ['-100%', '300%'],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                        repeatDelay: 0.5
                      }}
                    />

                    {/* Time indicator bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl overflow-hidden">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: '100%' }}
                        transition={{ 
                          duration: 0.6, 
                          delay: entryIndex * 0.05 + 0.2,
                          ease: "easeOut"
                        }}
                        className={`w-full ${severity.gradient}`}
                      />
                    </div>

                    {/* Content */}
                    <div className="relative pl-3">
                      {/* Header with time and risk */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <motion.span
                            animate={{ 
                              scale: [1, 1.1, 1],
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 1
                            }}
                            className="text-base"
                          >
                            {severity.icon}
                          </motion.span>
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold text-gray-700">
                              {formatDate(entry.timestamp)}
                            </span>
                            <span className="text-[10px] text-gray-500">
                              {formatTime(entry.timestamp)}
                            </span>
                          </div>
                        </div>

                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: entryIndex * 0.05 + 0.3 }}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${severity.textColor} ${severity.badgeBg} backdrop-blur-sm border border-white/40 flex items-center gap-1`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                          {severity.label}
                        </motion.div>
                      </div>

                      {/* Threat counter */}
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle size={14} className={severity.textColor} />
                        <span className="text-xs font-semibold text-gray-700">
                          {entry.tokens.length} {entry.tokens.length === 1 ? 'threat' : 'threats'} detected
                        </span>
                      </div>

                      {/* Tokens/Indicators */}
                      <div className="flex flex-wrap gap-2">
                        {entry.tokens.slice(0, 3).map((token, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: entryIndex * 0.05 + 0.4 + i * 0.05 }}
                            className="px-2.5 py-1 text-[10px] bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg text-gray-700 shadow-sm font-medium truncate max-w-[120px] hover:max-w-none hover:z-10 transition-all duration-200"
                            title={token.value}
                          >
                            {token.value}
                          </motion.div>
                        ))}
                        {entry.tokens.length > 3 && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: entryIndex * 0.05 + 0.55 }}
                            className="px-2.5 py-1 text-[10px] bg-gray-200/80 backdrop-blur-sm border border-gray-300 rounded-lg text-gray-600 shadow-sm font-bold"
                          >
                            +{entry.tokens.length - 3} more
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Hover glow effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl border-2 ${severity.border} opacity-0 group-hover:opacity-100 pointer-events-none`}
                      style={{
                        boxShadow: `0 0 20px ${severity.textColor === 'text-red-700' ? 'rgba(239, 68, 68, 0.3)' : severity.textColor === 'text-orange-700' ? 'rgba(251, 146, 60, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`,
                      }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="h-full flex flex-col items-center justify-center text-gray-400"
            >
              {/* Empty state with animation */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative mb-4"
              >
                {/* Glow circle */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-full p-6">
                  <Clock size={48} className="opacity-40" />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <span className="text-sm font-semibold text-gray-600 block mb-1">
                  No scan history
                </span>
                <span className="text-xs text-gray-500 max-w-[200px] block">
                  Your recent scans will appear here
                </span>
              </motion.div>

              {/* Decorative elements */}
              <div className="mt-6 flex gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}