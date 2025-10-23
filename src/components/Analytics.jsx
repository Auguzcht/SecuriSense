import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, TrendingUp, PieChart as PieChartIcon, BarChart as BarChartIcon, Activity } from 'lucide-react';
import { Gauge } from '@mui/x-charts/Gauge';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Analytics({ result, scanHistory }) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Activity size={16} />, color: 'from-blue-400 to-blue-600', glowColor: 'rgba(59, 130, 246, 0.5)' },
    { id: 'performance', label: 'Performance', icon: <TrendingUp size={16} />, color: 'from-green-400 to-green-600', glowColor: 'rgba(34, 197, 94, 0.5)' },
    { id: 'breakdown', label: 'Breakdown', icon: <PieChartIcon size={16} />, color: 'from-purple-400 to-purple-600', glowColor: 'rgba(168, 85, 247, 0.5)' },
    { id: 'trends', label: 'Trends', icon: <BarChartIcon size={16} />, color: 'from-orange-400 to-orange-600', glowColor: 'rgba(251, 146, 60, 0.5)' }
  ];

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 border-2 border-gray-200 shadow-lg h-[500px] flex flex-col">
      <div className="flex items-center mb-4 gap-2">
        <Clock className="text-blue-500" size={20} />
        <h3 className="text-lg font-semibold text-gray-800">Analytics</h3>
      </div>

      {/* Liquid Glass Tab Navigation */}
      <div className="relative mb-4">
        {/* Glass container */}
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-3 p-2 bg-gradient-to-br from-gray-50/80 to-gray-100/60 backdrop-blur-xl rounded-2xl border border-white/40 shadow-inner">
          
          {/* Active tab glass indicator */}
          <motion.div
            className="absolute inset-y-2 bg-white/40 backdrop-blur-md rounded-xl border border-white/60 shadow-lg overflow-hidden"
            style={{
              boxShadow: `0 8px 32px ${tabs.find(t => t.id === activeTab)?.glowColor}, inset 0 1px 0 rgba(255,255,255,0.8)`,
            }}
            animate={{
              left: `${(tabs.findIndex(t => t.id === activeTab) % (window.innerWidth >= 768 ? 4 : 2)) * (100 / (window.innerWidth >= 768 ? 4 : 2))}%`,
              width: `calc(${100 / (window.innerWidth >= 768 ? 4 : 2)}% - 12px)`,
              marginLeft: '6px',
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
          >
            {/* Shimmer effect - now inside the glass indicator */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
                width: '50%',
              }}
              animate={{
                x: ['-100%', '300%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 0
              }}
            />
          </motion.div>

          {/* Tab buttons */}
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex flex-col items-center justify-center gap-1 px-3 py-2.5 text-xs font-semibold rounded-xl min-h-[65px] z-10 transition-all duration-300
                  ${isActive ? 'text-gray-800' : 'text-gray-600 hover:text-gray-800'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Glow effect on active */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, ${tab.glowColor} 0%, transparent 70%)`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Icon with float animation */}
                <motion.div
                  className="relative z-10"
                  animate={isActive ? {
                    y: [0, -3, 0],
                    rotate: [0, 5, -5, 0],
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div
                    animate={isActive ? {
                      filter: [
                        'drop-shadow(0 0 2px rgba(59, 130, 246, 0.3))',
                        'drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))',
                        'drop-shadow(0 0 2px rgba(59, 130, 246, 0.3))',
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {tab.icon}
                  </motion.div>
                </motion.div>
                
                {/* Text with gradient on active */}
                <motion.span
                  className={`text-center leading-tight text-[10px] font-semibold relative z-10 ${
                    isActive ? `bg-gradient-to-r ${tab.color} bg-clip-text text-transparent` : ''
                  }`}
                  animate={{
                    opacity: isActive ? 1 : 0.7
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {tab.label}
                </motion.span>

                {/* Ripple effect on click */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 pointer-events-none"
                    style={{
                      borderColor: tab.glowColor,
                    }}
                    initial={{ scale: 0.8, opacity: 0.6 }}
                    animate={{ scale: 1.2, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Tab content with enhanced transitions */}
      <div className="flex-grow overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
            transition={{ 
              duration: 0.35,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
          >
            {activeTab === 'overview' && <OverviewTab result={result} />}
            {activeTab === 'performance' && <PerformanceTab result={result} />}
            {activeTab === 'breakdown' && <ThreatBreakdownTab result={result} scanHistory={scanHistory} />}
            {activeTab === 'trends' && <HistoricalTrendsTab scanHistory={scanHistory} result={result} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ result }) {
  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, staggerChildren: 0.1 }}
    >
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Legitimacy', value: `${result.legitimacyScore}%`, color: 'blue', gradient: 'from-blue-50 to-blue-100' },
          { label: 'Patterns', value: result.patterns.length, color: 'purple', gradient: 'from-purple-50 to-purple-100' },
          { label: 'Accuracy', value: `${result.accuracy}%`, color: 'green', gradient: 'from-green-50 to-green-100' },
          { label: 'Confidence', value: `${result.confidence}%`, color: 'orange', gradient: 'from-orange-50 to-orange-100' }
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className={`bg-gradient-to-br ${item.gradient} rounded-xl p-4 shadow-sm transition-shadow duration-300 hover:shadow-md`}
            whileHover={{ y: -2 }}
          >
            <p className="text-xs text-gray-600 mb-1 font-medium">{item.label}</p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className={`text-2xl font-bold text-${item.color}-600`}
            >
              {item.value}
            </motion.p>
          </motion.div>
        ))}
      </div>

      {result.patterns.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-50 rounded-xl p-4 shadow-sm"
        >
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              📊
            </motion.span>
            Quick Summary
          </h4>
          <div className="space-y-2">
            {result.patterns.slice(0, 3).map((pattern, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between text-xs group hover:bg-white p-2 rounded-lg transition-colors duration-200"
              >
                <span className="text-gray-700 font-medium">{pattern.type}</span>
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className={`px-2 py-0.5 rounded-full ${
                    pattern.severity === 'high' ? 'bg-red-100 text-red-700' :
                    pattern.severity === 'medium' ? 'bg-orange-100 text-orange-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {pattern.count} found
                </motion.span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// Performance Tab Component
function PerformanceTab({ result }) {
  const gauges = [
    { label: 'Accuracy', value: result.accuracy, color: '#10b981', gradient: 'from-green-400 to-green-600' },
    { label: 'Confidence', value: result.confidence, color: '#3b82f6', gradient: 'from-blue-400 to-blue-600' },
    { label: 'Speed', value: result.confidence, color: '#f59e0b', gradient: 'from-orange-400 to-orange-600' }
  ];

  return (
    <motion.div 
      className="flex flex-col items-center space-y-6 py-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {gauges.map((gauge, index) => (
        <motion.div
          key={gauge.label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          className="w-full flex flex-col items-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.1, duration: 0.2 }}
            className="text-sm text-gray-700 mb-2 font-semibold"
          >
            {gauge.label}
          </motion.p>
          
          {/* Gauge without hover animation to prevent layout shifts */}
          <div className="w-[200px] flex justify-center">
            <Gauge width={200} height={180} value={gauge.value} valueMin={0} valueMax={100} />
          </div>
          
          {/* Progress bar container with fixed width */}
          <div className="w-[200px] h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${gauge.value}%` }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.6, ease: "easeOut" }}
              className={`h-full bg-gradient-to-r ${gauge.gradient} rounded-full`}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Threat Breakdown Tab Component
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
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {severityData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎯
            </motion.span>
            Severity Distribution
          </h4>
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
                animationBegin={0}
                animationDuration={800}
              >
                {severityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {threatTypeData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⚠️
            </motion.span>
            Threat Types
          </h4>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={threatTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={9} />
              <YAxis fontSize={9} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" animationDuration={800} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {timelineData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              📈
            </motion.span>
            Detection Timeline
          </h4>
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="scan" fontSize={9} />
              <YAxis fontSize={9} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="threats" 
                stroke="#3b82f6" 
                strokeWidth={2}
                animationDuration={800}
                dot={{ r: 4, fill: '#3b82f6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {result.patterns.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="h-full flex flex-col items-center justify-center text-gray-400 py-12"
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
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-full p-6">
              <PieChartIcon size={48} className="opacity-40" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <span className="text-sm font-semibold text-gray-600 block mb-1">
              No threat data available
            </span>
            <span className="text-xs text-gray-500 max-w-[200px] block">
              Run a scan to see threat breakdowns
            </span>
          </motion.div>

          {/* Decorative elements */}
          <div className="mt-6 flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
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
    </motion.div>
  );
}

// Historical Trends Tab Component
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
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {comparisonData.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="bg-blue-50 rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <p className="text-xs text-gray-600 mb-0.5">Current</p>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-xl font-bold text-blue-600"
              >
                {currentThreats}
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="bg-gray-50 rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <p className="text-xs text-gray-600 mb-0.5">Average</p>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.25, type: "spring" }}
                className="text-xl font-bold text-gray-700"
              >
                {avgThreats}
              </motion.p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`p-3 rounded-lg ${
              trend === 'increasing' ? 'bg-red-50' : trend === 'decreasing' ? 'bg-green-50' : 'bg-gray-50'
            }`}
          >
            <p className="text-xs font-semibold text-gray-700 mb-0.5">Trend</p>
            <motion.p
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`text-xs flex items-center gap-1 ${
                trend === 'increasing' ? 'text-red-600' : trend === 'decreasing' ? 'text-green-600' : 'text-gray-600'
              }`}
            >
              <motion.span
                animate={trend === 'increasing' ? { y: [-2, 0] } : trend === 'decreasing' ? { y: [2, 0] } : {}}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              >
                {trend === 'increasing' && '↑'}
                {trend === 'decreasing' && '↓'}
                {trend === 'neutral' && '→'}
              </motion.span>
              {trend === 'increasing' && 'Increasing'}
              {trend === 'decreasing' && 'Decreasing'}
              {trend === 'neutral' && 'No comparison'}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📊
              </motion.span>
              History
            </h4>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="scan" fontSize={9} />
                <YAxis fontSize={9} />
                <Tooltip />
                <Bar dataKey="threats" fill="#3b82f6" animationDuration={800}>
                  {comparisonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.isCurrent ? '#ef4444' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="h-full flex flex-col items-center justify-center text-gray-400 py-12"
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
              className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-red-400 opacity-20 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-full p-6">
              <TrendingUp size={48} className="opacity-40" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <span className="text-sm font-semibold text-gray-600 block mb-1">
              No historical data
            </span>
            <span className="text-xs text-gray-500 max-w-[200px] block">
              Scan history will be displayed here
            </span>
          </motion.div>

          {/* Decorative elements */}
          <div className="mt-6 flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-red-400"
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
    </motion.div>
  );
}