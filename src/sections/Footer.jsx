import React from 'react';
import { motion } from 'framer-motion';

const LogoSvg = `${import.meta.env.BASE_URL}SecuriSense_Logo.svg`;

export default function Footer() {
  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    const nav = document.querySelector("nav");

    if (targetElement && nav) {
      const navHeight = nav.getBoundingClientRect().height; 
      const elementPosition =
        targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight - 10; 

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  
  return (
    <footer className="relative overflow-hidden py-10 sm:pt-16 lg:pt-24 bg-white">
      <div className="absolute top-0 left-0 right-0">
        <motion.div 
          className="h-[2px] bg-gradient-to-r from-transparent via-[#4079ff] to-transparent"
          initial={{ opacity: 0.3 }}
          animate={{ 
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.02, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Secondary glow effect */}
        <motion.div 
          className="h-[1px] bg-gradient-to-r from-transparent via-[#f97316] to-transparent blur-sm"
          initial={{ opacity: 0.1 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2
          }}
        />
      </div>

      <div className="relative z-10 px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-8 lg:gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center">
              <motion.img 
                src={LogoSvg} 
                alt="SecuriSense" 
                width={60} 
                height={60}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }} 
              />
              <motion.h4 
                className="text-2xl font-semibold text-gray-900"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <motion.span
                  animate={{ 
                    color: ["#042046", "#4079ff", "#042046"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  SecuriSense
                </motion.span>
              </motion.h4>
            </div>
            <motion.p 
              className="text-base leading-relaxed text-gray-600 mt-5"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              SecuriSense is an AI-driven security platform that detects potential
              threats in real time. Whether it's suspicious code, unsafe links, or
              hidden vulnerabilities, our intelligent detector helps you stay one
              step ahead of cyber risks.
            </motion.p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Quick Links</p>
            <ul className="mt-6 space-y-4">
              {['home', 'detector', 'about', 'team', 'contact'].map((link, index) => (
                <motion.li 
                  key={link}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a 
                    href={`#${link}`} 
                    onClick={(e) => handleSmoothScroll(e, `#${link}`)} 
                    className="text-base text-black hover:text-[#4079ff] transition-colors flex items-center gap-2 group"
                  >
                    <motion.span 
                      className="h-px w-0 bg-[#4079ff]/50 group-hover:w-4 transition-all" 
                      whileHover={{ width: "16px" }}
                    />
                    {link.charAt(0).toUpperCase() + link.slice(1)}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Connect With Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Connect With Us</p>
            <ul className="mt-6 space-y-4">
              <motion.li
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ x: 5 }}
              >
                <a 
                  href="https://github.com/HSatsss/SecuriSense" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center text-base text-black hover:text-[#4079ff] transition-all group"
                >
                  <motion.svg 
                    className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    whileHover={{ rotate: 10 }}
                  >
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.762-1.604-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"></path>
                  </motion.svg>
                  GitHub
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 5 }}
              >
                <a 
                  href="mailto:alfredndado@gmail.com" 
                  className="flex items-center text-base text-black hover:text-[#4079ff] transition-all group"
                >
                  <motion.svg 
                    className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    whileHover={{ rotate: 10 }}
                  >
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </motion.svg>
                  Email Us
                </a>
              </motion.li>
            </ul>
          </motion.div>
        </div>
        
        <motion.hr 
          className="mt-16 mb-10 border-gray-200"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />
        
        <motion.p 
          className="text-sm text-center text-gray-600"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          © {new Date().getFullYear()} SecuriSense. All Rights Reserved.
        </motion.p>
      </div>
      
      {/* Subtle animated background particles - more transparent for white background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-[#4079ff]/5 to-[#f97316]/5"
            initial={{ 
              x: Math.random() * 100 - 50 + '%', 
              y: Math.random() * 100 + '%',
              scale: Math.random() * 0.6 + 0.2,
              opacity: Math.random() * 0.2 + 0.05
            }}
            animate={{ 
              x: [null, Math.random() * 100 - 50 + '%', Math.random() * 100 - 50 + '%'],
              y: [null, Math.random() * 100 + '%', Math.random() * 100 + '%'],
              opacity: [null, Math.random() * 0.1 + 0.05, Math.random() * 0.1 + 0.05]
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              filter: 'blur(40px)'
            }}
          />
        ))}
      </div>
    </footer>
  );
}

