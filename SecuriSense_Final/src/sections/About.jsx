import React from "react";
import ScannerIcon from "@mui/icons-material/Scanner";
import AnimatedContent from "../components/AnimatedComponents";

const About = () => {
  return (
    <section className="flex justify-center items-center min-h-screen" id="about">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
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
                    About SecuriSense
                  </h2>
          </AnimatedContent>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatedContent  direction="horizontal"
                reverse={true}
                duration={1.2}
                ease="power3.out"
                initialOpacity={0.1}
                animateOpacity
                scale={1.1}
                threshold={0.2}
                delay={0.10}>
            <div className="bg-white rounded-xl p-6 hover:scale-105 transition-transform duration-300 shadow-lg">
              <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <ScannerIcon className="text-white" fontSize="large" />
              </div>
              <h3 className="text-xl text-left font-semibold mb-2 text-gray-700">
                Multi-Modal Threat Detection
              </h3>
              <p className="text-gray-600 text-sm text-justify">
                Analyzes text, images, and audio simultaneously to identify
                phishing and social engineering attempts across different
                communication channels.
              </p>
            </div>
          </AnimatedContent>
          
          <AnimatedContent direction="horizontal"
                reverse={true}
                duration={1.2}
                ease="power3.out"
                initialOpacity={0.1}
                animateOpacity
                scale={1.1}
                threshold={0.2}
                delay={0.10}>
            <div className="bg-white rounded-xl p-6 hover:scale-105 transition-transform duration-300 shadow-lg">
              <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <ScannerIcon className="text-white" fontSize="large" />
              </div>
              <h3 className="text-xl text-left font-semibold mb-2 text-gray-800">
                AI-Powered Natural Language Processing
              </h3>
              <p className="text-gray-600 text-sm text-justify">
                Detects manipulative or impersonation-based language using
                transformer-based natural language models.
              </p>
            </div>
          </AnimatedContent>

          <AnimatedContent  direction="horizontal"
                reverse={true}
                duration={1.2}
                ease="power3.out"
                initialOpacity={0.1}
                animateOpacity
                scale={1.1}
                threshold={0.2}
                delay={0.10}>
            <div className="bg-white rounded-xl p-6 hover:scale-105 transition-transform duration-300 shadow-lg">
              <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <ScannerIcon className="text-white" fontSize="large" />
              </div>
              <h3 className="text-xl text-left font-semibold mb-2 text-gray-700">
                Multi-Modal Threat Detection
              </h3>
              <p className="text-gray-600 text-sm text-justify">
                Analyzes text, images, and audio simultaneously to identify
                phishing and social engineering attempts across different
                communication channels.
              </p>
            </div>
          </AnimatedContent>

          <AnimatedContent direction="horizontal"
                reverse={true}
                duration={1.2}
                ease="power3.out"
                initialOpacity={0.1}
                animateOpacity
                scale={1.1}
                threshold={0.2}
                delay={0.10}>
            <div className="bg-white rounded-xl p-6 hover:scale-105 transition-transform duration-300 shadow-lg">
              <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <ScannerIcon className="text-white" fontSize="large" />
              </div>
              <h3 className="text-xl text-left font-semibold mb-2 text-gray-800">
                Visual Content Analysis
              </h3>
              <p className="text-gray-600 text-sm text-justify">
                Uses OCR and image recognition to detect phishing attempts hidden
                in screenshots and website images.
              </p>
            </div>
          </AnimatedContent>
          
          <AnimatedContent direction="horizontal"
                reverse={true}
                duration={1.2}
                ease="power3.out"
                initialOpacity={0.1}
                animateOpacity
                scale={1.1}
                threshold={0.2}
                delay={0.10}>
            <div className="bg-white rounded-xl p-6 hover:scale-105 transition-transform duration-300 shadow-lg">
              <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <ScannerIcon className="text-white" fontSize="large" />
              </div>
              <h3 className="text-xl text-left font-semibold mb-2 text-gray-800">
                Visual Content Analysis
              </h3>
              <p className="text-gray-600 text-sm text-justify">
                Uses OCR and image recognition to detect phishing attempts hidden
                in screenshots and website images.
              </p>
            </div>
          </AnimatedContent>

           <AnimatedContent direction="horizontal"
                reverse={true}
                duration={1.2}
                ease="power3.out"
                initialOpacity={0.1}
                animateOpacity
                scale={1.1}
                threshold={0.2}
                delay={0.10}>
            <div className="bg-white rounded-xl p-6 hover:scale-105 transition-transform duration-300 shadow-lg">
              <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <ScannerIcon className="text-white" fontSize="large" />
              </div>
              <h3 className="text-xl text-left font-semibold mb-2 text-gray-800">
                Visual Content Analysis
              </h3>
              <p className="text-gray-600 text-sm text-justify">
                Uses OCR and image recognition to detect phishing attempts hidden
                in screenshots and website images.
              </p>
            </div>
          </AnimatedContent>
        </div>

        <AnimatedContent direction="horizontal"
                reverse={true}
                duration={1.2}
                ease="power3.out"
                initialOpacity={0.1}
                animateOpacity
                scale={1.1}
                threshold={0.2}
                delay={0.10}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <div className="bg-white rounded-xl p-6 hover:scale-105 transition-transform duration-300 shadow-lg col-span-1 sm:col-span-2 lg:col-span-3">
            <h2 className="text-4xl font-bold text-left mb-4 text-[#042046]">
              Technical Capability
            </h2>
            <p className="text-gray-700 text-base text-justify leading-relaxed">
              SecuriSense integrates advanced Natural Language Processing (NLP) and machine learning frameworks to analyze linguistic structures, contextual semantics, and deceptive language patterns. This hybrid approach enables the system to accurately identify and classify phishing attempts across diverse communication channels in real time.
            </p>
          </div>
        </div>
        </AnimatedContent>
      </div>
    </section>
  );
};

export default About;


