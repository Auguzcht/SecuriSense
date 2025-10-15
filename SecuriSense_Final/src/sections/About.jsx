import React from "react";
import ScannerIcon from "@mui/icons-material/Scanner";
import AnimatedContent from "../components/AnimatedComponents";

const About = () => {
  return (
    <section className="flex justify-center items-center min-h-screen px-12 pt-30" id="about">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 text-[#042046]">
            About SecuriSense
          </h1>
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
          
          <AnimatedContent direction="vertical"
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
                reverse={false}
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

          <AnimatedContent direction="vertical"
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
          
          <AnimatedContent direction="vertical"
                reverse={false}
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
                reverse={false}
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

          <div className="w-280 h-70p bg-white rounded-xl p-8 hover:scale-105 transition-transform duration-300 shadow-lg">
            <h2 className="text-4xl font-bold text-left mb-4 text-[#042046]">
              Technical Capability
            </h2>
            <p className="text-gray-700 text-base text-justify leading-relaxed">
              SecuriSense integrates advanced Natural Language Processing (NLP) and machine learning frameworks to analyze linguistic structures, contextual semantics, and deceptive language patterns. This hybrid approach enables the system to accurately identify and classify phishing attempts across diverse communication channels in real time.
            </p>
        </div>
        </div>
      </div>
    </section>
  );
};

export default About;


