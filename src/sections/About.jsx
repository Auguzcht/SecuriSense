import React from "react";
import ScannerIcon from "@mui/icons-material/Scanner";
import AnimatedContent from "../components/AnimatedComponents";
import MemoryIcon from '@mui/icons-material/Memory';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SettingsIcon from '@mui/icons-material/Settings';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

// Animated Counter Component
const AnimatedCounter = ({ value, inView }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const [displayValue, setDisplayValue] = React.useState('0');

  useEffect(() => {
    if (inView) {
      // Parse the value (handle percentages and special characters)
      if (value === '24/7') {
        motionValue.set(24);
      } else {
        const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
        motionValue.set(numericValue);
      }
    } else {
      motionValue.set(0);
    }
  }, [inView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      // Format based on the original value format
      if (value.includes('%')) {
        setDisplayValue(`${latest.toFixed(2)}%`);
      } else if (value.includes('ms')) {
        setDisplayValue(`<${Math.round(latest)}ms`);
      } else if (value === '24/7') {
        setDisplayValue(`${Math.round(latest)}/7`);
      } else {
        setDisplayValue(latest.toFixed(0));
      }
    });

    return () => unsubscribe();
  }, [springValue, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
    </span>
  );
};

const About = () => {
  const features = [
    {
      icon: <ScannerIcon fontSize="large" />,
      title: "Multi-Modal Threat Detection",
      description: "Analyzes text, images, and audio simultaneously to identify phishing and social engineering attempts across different communication channels.",
      iconGradient: "from-blue-500 to-cyan-500",
      borderColors: "border-blue-200 group-hover:border-blue-400",
    },
    {
      icon: <MemoryIcon fontSize="large" />,
      title: "AI-Powered Natural Language Processing",
      description: "Detects manipulative or impersonation-based language using transformer-based natural language models.",
      iconGradient: "from-purple-500 to-pink-500",
      borderColors: "border-purple-200 group-hover:border-purple-400",
    },
    {
      icon: <TextSnippetIcon fontSize="large" />,
      title: "Advanced NLP Detection",
      description: "Leverages BERT transformer models achieving 99.53% accuracy in identifying phishing attempts through contextual language analysis.",
      iconGradient: "from-green-500 to-emerald-500",
      borderColors: "border-green-200 group-hover:border-green-400",
    },
    {
      icon: <RemoveRedEyeIcon fontSize="large" />,
      title: "Visual Content Analysis",
      description: "Uses OCR and image recognition to detect phishing attempts hidden in screenshots and website images.",
      iconGradient: "from-orange-500 to-amber-500",
      borderColors: "border-orange-200 group-hover:border-orange-400",
    },
    {
      icon: <RecordVoiceOverIcon fontSize="large" />,
      title: "Context-Aware Analysis",
      description: "Understands sender-receiver relationships, writing tone, and digital signatures to assess credibility beyond surface-level keywords.",
      iconGradient: "from-red-500 to-rose-500",
      borderColors: "border-red-200 group-hover:border-red-400",
    },
    {
      icon: <FilterAltIcon fontSize="large" />,
      title: "Multi-Stage Verification",
      description: "Cross-verifies content using multiple independent models to minimize false positives and ensure decision reliability.",
      iconGradient: "from-indigo-500 to-violet-500",
      borderColors: "border-indigo-200 group-hover:border-indigo-400",
    }
  ];

  return (
    <section className="py-32 px-4 flex justify-center items-center" id="about">
      <div className="max-w-6xl w-full">
        {/* Section Title */}
        <div className="text-center mb-16">
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
            <h2 className="text-5xl md:text-6xl font-bold text-[#042046] mb-4">
              About SecuriSense
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Advanced AI-powered security platform protecting you from digital threats
            </p>
          </AnimatedContent>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {features.map((feature, index) => (
            <AnimatedContent 
              key={index}
              direction="horizontal" 
              reverse={true} 
              duration={1.2} 
              ease="power3.out" 
              initialOpacity={0.1} 
              animateOpacity 
              scale={1.1} 
              threshold={0.2} 
              delay={0.10 + index * 0.05}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="relative h-full group"
              >
                {/* Card Container */}
                <div className={`relative bg-white/90 backdrop-blur-lg rounded-3xl p-6 border-2 ${feature.borderColors} shadow-lg h-full flex flex-col overflow-hidden transition-all duration-500 group-hover:shadow-xl`}>
                  
                  {/* Subtle gradient overlay on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/0 to-purple-50/0 group-hover:from-blue-50/30 group-hover:via-purple-50/20 group-hover:to-blue-50/30 transition-all duration-700 pointer-events-none"
                  />

                  {/* Minimal corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-100 to-transparent rounded-bl-[100px]" />
                  </div>

                  {/* Icon Container */}
                  <div className="relative mb-5 z-10">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.iconGradient} flex items-center justify-center shadow-md relative overflow-hidden group-hover:shadow-lg transition-shadow duration-300`}
                    >
                      <div className="relative text-white z-10">
                        {feature.icon}
                      </div>

                      {/* Subtle pulse on hover */}
                      <motion.div
                        className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex-1 flex flex-col">
                    <h3 className="text-lg text-left font-bold mb-3 text-gray-800 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm text-justify leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Subtle outer glow on hover */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                  style={{
                    boxShadow: '0 0 40px rgba(59, 130, 246, 0.15)',
                  }}
                />
              </motion.div>
            </AnimatedContent>
          ))}
        </div>

        {/* Technical Capability Section */}
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -4 }}
            className="mt-12 relative group"
          >
            <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 border-2 border-gray-200 shadow-lg overflow-hidden transition-all duration-500 group-hover:border-blue-300 group-hover:shadow-xl">
              
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, #042046 1px, transparent 0)',
                  backgroundSize: '40px 40px'
                }} />
              </div>

              {/* Subtle gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-purple-50/0 to-blue-50/0 group-hover:from-blue-50/20 group-hover:via-purple-50/10 group-hover:to-blue-50/20 transition-all duration-700"
              />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md relative overflow-hidden"
                  >
                    <div className="relative text-white z-10">
                      <SettingsIcon fontSize="large" />
                    </div>

                    {/* Subtle pulse on hover */}
                    <motion.div
                      className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    />
                  </motion.div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-[#042046] transition-colors duration-300">
                    Technical Capability
                  </h2>
                </div>

                <p className="text-gray-700 text-base text-justify leading-relaxed mb-8">
                  SecuriSense integrates advanced{' '}
                  <span className="font-semibold text-blue-600">Natural Language Processing (NLP)</span>
                  {' '}and{' '}
                  <span className="font-semibold text-purple-600">machine learning frameworks</span>
                  {' '}to analyze linguistic structures, contextual semantics, and deceptive language patterns. This hybrid approach enables the system to accurately identify and classify phishing attempts across diverse communication channels in real time.
                </p>

                {/* Tech stats */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: '99.53%', label: 'Accuracy', gradient: 'from-green-500 to-emerald-500', borderColors: 'border-green-200 hover:border-green-400' },
                    { value: '<100ms', label: 'Response Time', gradient: 'from-blue-500 to-cyan-500', borderColors: 'border-blue-200 hover:border-blue-400' },
                    { value: '24/7', label: 'Uptime & Protection', gradient: 'from-purple-500 to-pink-500', borderColors: 'border-purple-200 hover:border-purple-400' }
                  ].map((stat, idx) => {
                    const statRef = useRef(null);
                    const isInView = useInView(statRef, { once: true, margin: "-100px" });

                    return (
                      <motion.div
                        key={idx}
                        ref={statRef}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                        whileHover={{ y: -3 }}
                        className={`relative bg-white rounded-2xl p-5 text-center border-2 ${stat.borderColors} transition-all duration-300 hover:shadow-md overflow-hidden group/stat`}
                      >
                        {/* Subtle gradient on hover */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover/stat:opacity-5 transition-opacity duration-300`}
                        />

                        {/* Shining effect from left to right */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover/stat:opacity-40"
                          initial={{ x: '-100%' }}
                          whileHover={{
                            x: '100%',
                            transition: {
                              duration: 0.6,
                              ease: 'easeInOut'
                            }
                          }}
                        />
                        
                        <div className="relative z-10">
                          <motion.p 
                            className="text-3xl font-bold text-gray-800 mb-1"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                            transition={{ 
                              duration: 0.5, 
                              delay: 0.6 + idx * 0.1,
                              type: "spring",
                              stiffness: 200,
                              damping: 15
                            }}
                          >
                            <AnimatedCounter value={stat.value} inView={isInView} />
                          </motion.p>
                          <motion.p 
                            className="text-xs text-gray-600 font-medium"
                            initial={{ y: 10, opacity: 0 }}
                            animate={isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
                            transition={{ 
                              duration: 0.4, 
                              delay: 0.8 + idx * 0.1 
                            }}
                          >
                            {stat.label}
                          </motion.p>
                        </div>

                        {/* Bottom accent */}
                        <motion.div
                          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300`}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom accent line */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>
          </motion.div>
        </AnimatedContent>
      </div>
    </section>
  );
};

export default About;



