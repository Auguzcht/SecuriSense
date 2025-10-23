import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { AlertTriangle, ChevronRight } from 'lucide-react';

export default function PatternDetection({ patterns, onPatternClick }) {
  const getSeverityConfig = (severity) => {
    const configs = {
      high: { 
        gradient: 'from-red-500 via-red-400 to-red-300',
        bgGradient: 'from-red-50 to-red-100',
        border: 'border-red-200 hover:border-red-300',
        text: 'text-red-700',
        glow: 'rgba(239, 68, 68, 0.3)',
        icon: '🔴',
        label: 'Critical'
      },
      medium: { 
        gradient: 'from-orange-500 via-orange-400 to-orange-300',
        bgGradient: 'from-orange-50 to-orange-100',
        border: 'border-orange-200 hover:border-orange-300',
        text: 'text-orange-700',
        glow: 'rgba(251, 146, 60, 0.3)',
        icon: '⚠️',
        label: 'Warning'
      },
      low: { 
        gradient: 'from-yellow-500 via-yellow-400 to-yellow-300',
        bgGradient: 'from-yellow-50 to-yellow-100',
        border: 'border-yellow-200 hover:border-yellow-300',
        text: 'text-yellow-700',
        glow: 'rgba(234, 179, 8, 0.3)',
        icon: '⚡',
        label: 'Caution'
      },
    };
    return configs[severity] || configs.low;
  };

  const getTotalMatches = () => {
    return patterns.reduce((sum, pattern) => sum + pattern.count, 0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 border-2 border-gray-200 shadow-lg h-[500px] flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SearchOutlinedIcon className="text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-800">Pattern Detection</h3>
        </div>
        
        {/* Stats Badge */}
        <div className="flex items-center gap-2">
          {patterns.length > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200"
            >
              <span className="text-xs font-semibold text-blue-700">
                {getTotalMatches()} threats
              </span>
            </motion.div>
          )}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200"
          >
            <span className="text-xs font-semibold text-gray-700">
              {patterns.length} {patterns.length === 1 ? 'type' : 'types'}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow overflow-hidden">
        <AnimatePresence mode="popLayout">
          {patterns.length > 0 ? (
            <motion.div
              className="h-full space-y-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {patterns.map((pattern, index) => {
                const config = getSeverityConfig(pattern.severity);
                const matchText = pattern.count === 1 ? '1 match' : `${pattern.count} matches`;
                
                return (
                  <motion.div
                    key={`${pattern.type}-${index}`}
                    initial={{ opacity: 0, x: -20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.9 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 200
                    }}
                    onClick={() => onPatternClick(pattern)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative bg-gradient-to-br ${config.bgGradient} rounded-2xl p-4 cursor-pointer border-2 ${config.border} transition-all duration-300 group overflow-hidden`}
                  >
                    {/* Animated gradient overlay on hover */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                      style={{
                        filter: 'blur(20px)',
                      }}
                    />

                    {/* Glass shimmer effect */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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

                    {/* Severity indicator bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl overflow-hidden">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: '100%' }}
                        transition={{ 
                          duration: 0.6, 
                          delay: index * 0.05 + 0.3,
                          ease: "easeOut"
                        }}
                        className={`w-full bg-gradient-to-b ${config.gradient}`}
                        style={{
                          boxShadow: `0 0 10px ${config.glow}`,
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="relative flex items-start justify-between pl-3">
                      <div className="flex-1 min-w-0">
                        {/* Type and Icon */}
                        <div className="flex items-center gap-2 mb-2">
                          <motion.span
                            animate={{ 
                              scale: [1, 1.2, 1],
                              rotate: [0, -10, 10, 0]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 1
                            }}
                            className="text-lg"
                          >
                            {config.icon}
                          </motion.span>
                          <h4 className="font-bold text-gray-800 text-sm truncate">
                            {pattern.type}
                          </h4>
                        </div>

                        {/* Severity badge and details */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.05 + 0.2 }}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${config.text} bg-white/60 backdrop-blur-sm border border-white/40`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                            {config.label}
                          </motion.span>
                          
                          <span className="text-xs text-gray-600 font-medium flex items-center gap-1">
                            {pattern.icon}
                            <span className="opacity-60">•</span>
                            <span>{matchText}</span>
                          </span>
                        </div>
                      </div>

                      {/* Action indicator */}
                      <motion.div
                        className="flex-shrink-0 ml-3"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <div className={`w-8 h-8 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 flex items-center justify-center ${config.text} group-hover:bg-white/80 transition-colors duration-300`}>
                          <ChevronRight size={16} strokeWidth={2.5} />
                        </div>
                      </motion.div>
                    </div>

                    {/* Pulse effect on hover */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl border-2 ${config.border.split(' ')[0]} opacity-0 group-hover:opacity-100 pointer-events-none`}
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        boxShadow: `0 0 20px ${config.glow}`,
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
                  <SearchOutlinedIcon sx={{ fontSize: 48, opacity: 0.4 }} />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <span className="text-sm font-semibold text-gray-600 block mb-1">
                  No patterns detected
                </span>
                <span className="text-xs text-gray-500 max-w-[200px] block">
                  Analyze an email to discover phishing patterns
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