import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";

export default function PrivacyPolicyModal({ isOpen, onClose }) {
  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] shadow-2xl overflow-hidden relative"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-bold text-[#042046] flex items-center gap-2">
                Privacy Policy
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Close privacy policy"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Content with scroll */}
            <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(85vh-80px)]">
              <div className="prose prose-blue max-w-none">
                <h3 className="text-xl font-semibold text-[#042046] mt-0">1. Introduction</h3>
                <p>
                  Welcome to SecuriSense. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our services.
                </p>

                <h3 className="text-xl font-semibold text-[#042046]">2. Data We Collect</h3>
                <p>
                  We may collect the following types of information:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Personal Information:</strong> Name, email address, phone number, and other information you provide when using our contact form.</li>
                  <li><strong>Usage Data:</strong> Information about how you use our services, including text and content submitted to our detection tools.</li>
                  <li><strong>Technical Data:</strong> IP address, browser type, device information, and cookies to enhance your experience.</li>
                </ul>

                <h3 className="text-xl font-semibold text-[#042046]">3. How We Use Your Data</h3>
                <p>
                  We use your personal information for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To provide and improve our phishing detection services</li>
                  <li>To respond to inquiries and support requests</li>
                  <li>To send important updates about our services</li>
                  <li>To analyze usage patterns and optimize our website</li>
                </ul>

                <h3 className="text-xl font-semibold text-[#042046]">4. Data Security</h3>
                <p>
                  We implement appropriate security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. All data submitted through our phishing detector is processed using advanced encryption and is not permanently stored.
                </p>

                <h3 className="text-xl font-semibold text-[#042046]">5. Your Rights</h3>
                <p>
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal data</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing of your data</li>
                  <li>Request restriction of processing</li>
                  <li>Request transfer of your data</li>
                </ul>

                <h3 className="text-xl font-semibold text-[#042046]">6. Cookies</h3>
                <p>
                  We use cookies to enhance your experience on our website. You can set your browser to refuse cookies, but some parts of our website may not function properly.
                </p>

                <h3 className="text-xl font-semibold text-[#042046]">7. Third-Party Services</h3>
                <p>
                  We may use third-party services such as Web3Forms for processing contact form submissions. These services have their own privacy policies and we encourage you to review them.
                </p>

                <h3 className="text-xl font-semibold text-[#042046]">8. Changes to This Policy</h3>
                <p>
                  We may update our privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
                </p>

                <h3 className="text-xl font-semibold text-[#042046]">9. Contact Us</h3>
                <p>
                  If you have questions about this privacy policy, please contact us at:
                </p>
                <p className="font-medium">
                  Email: alfredndado@gmail.com<br />
                  Address: Mapúa Malayan Colleges Mindanao<br />
                  Phone: +63 (947) 483-7271
                </p>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
              </div>
            </div>

            {/* Footer with accept button - updated to match "Learn More" button from Home.jsx */}
            <div className="p-6 md:p-8 border-t border-gray-200 sticky bottom-0 bg-white z-10 flex justify-center">
              <Button
                variant="outlined"
                onClick={onClose}
                sx={{
                  color: "#4079ff",
                  borderColor: "#4079ff",
                  borderWidth: "2px",
                  px: 4,
                  py: 1.45,
                  borderRadius: "12px",
                  fontWeight: "600",
                  letterSpacing: "0.5px",
                  fontSize: "1rem",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    borderColor: "#4079ff",
                    background: "rgba(64, 121, 255, 0.05)",
                    transform: "translateY(-3px)",
                    boxShadow: "0 8px 20px rgba(64, 121, 255, 0.15)",
                    color: "#4079ff",
                  },
                  "&:active": {
                    transform: "translateY(0px)",
                  }
                }}
              >
                I Understand
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}