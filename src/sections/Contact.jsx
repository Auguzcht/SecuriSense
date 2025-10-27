import React, { useState, useCallback } from "react";
import AnimatedContent from "../components/AnimatedComponents";
import { motion, AnimatePresence } from "framer-motion";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PrivacyPolicyModal from "../components/PrivacyPolicyModal";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    agree: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handlePrivacyPolicyClick = useCallback((e) => {
    e.preventDefault();
    setPrivacyModalOpen(true);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formDataForSubmission = new FormData();
      formDataForSubmission.append(
        "access_key", 
        import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
      );

      formDataForSubmission.append("name", `${formData.firstName} ${formData.lastName}`);
      formDataForSubmission.append("email", formData.email);
      formDataForSubmission.append("phone", formData.phone || "Not provided");
      formDataForSubmission.append("message", formData.message);
      formDataForSubmission.append("subject", "New Contact Form Submission - SecuriSense");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataForSubmission
      });

      const data = await response.json();
      
      if (data.success) {
        setShowSuccess(true);
      
        setTimeout(() => {
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message: "",
            agree: false,
          });
          setShowSuccess(false);
        }, 3000);
      } else {
        setErrorMessage(data.message || "Something went wrong. Please try again.");
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 5000);
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  return (
    <section className="pt-10 pb-32 px-4 flex flex-col items-center justify-center md:px-8 w-full" id="contact">
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
        <h2 className="text-5xl md:text-6xl font-bold text-[#042046] mb-16 text-center">
          Contact Us
        </h2>
      </AnimatedContent>

      <AnimatedContent
        distance={150}
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
        <div className="flex flex-col md:flex-row justify-center items-start gap-8 w-full max-w-[1150px] mx-auto bg-white rounded-3xl shadow-lg p-8">
          <div className="bg-white rounded-3xl p-8 w-full md:w-1/2 relative">
            <p className="text-gray-500 mb-6 text-center">
              Don't be a stranger and leave us a message. Our friendly team would love to hear from you!
            </p>
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-white/95 rounded-3xl z-20 flex flex-col items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircleOutlineIcon 
                      sx={{ fontSize: 80, color: "#f97316" }}
                      className="mb-4"
                    />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold text-[#042046]"
                  >
                    Message Sent!
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600 text-center mt-2"
                  >
                    Thank you for reaching out. We'll get back to you shortly.
                  </motion.p>
                </motion.div>
              )}

              {showError && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-20 left-0 right-0 mx-auto w-5/6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow-lg z-20 flex items-center"
                >
                  <ErrorOutlineIcon className="mr-2" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">First name *</label>
                  <input
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="border-2 border-gray-200 rounded-xl px-3 py-2 w-full transition-all duration-300 text-sm
                      focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 
                      hover:border-gray-300 bg-gradient-to-br from-gray-50/80 to-gray-100/50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Last name *</label>
                  <input
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="border-2 border-gray-200 rounded-xl px-3 py-2 w-full transition-all duration-300 text-sm
                      focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 
                      hover:border-gray-300 bg-gradient-to-br from-gray-50/80 to-gray-100/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-2 border-gray-200 rounded-xl px-3 py-2 w-full transition-all duration-300 text-sm
                    focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 
                    hover:border-gray-300 bg-gradient-to-br from-gray-50/80 to-gray-100/50"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Phone number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+1 (000) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border-2 border-gray-200 rounded-xl px-3 py-2 w-full transition-all duration-300 text-sm
                    focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 
                    hover:border-gray-300 bg-gradient-to-br from-gray-50/80 to-gray-100/50"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Message *</label>
                <textarea
                  name="message"
                  placeholder="Leave us a message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="border-2 border-gray-200 rounded-xl px-3 py-2 w-full transition-all duration-300 resize-none text-sm
                    focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 
                    hover:border-gray-300 bg-gradient-to-br from-gray-50/80 to-gray-100/50"
                />
              </div>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="agree"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  required
                  className="mt-1 rounded text-[#f97316] focus:ring-[#f97316] focus:ring-2 transition-all duration-200"
                />
                <label htmlFor="agree" className="text-sm text-gray-500">
                  You agree to our friendly{" "}
                  <a 
                    href="#" 
                    className="text-[#f97316] hover:text-[#ef4444] underline transition-colors duration-200"
                    onClick={handlePrivacyPolicyClick}
                  >
                    privacy policy
                  </a>
                  .
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-xl transform transition-all duration-300 hover:translate-y-[-3px] hover:shadow-[0_8px_20px_rgba(239,68,68,0.3)] active:translate-y-0 font-medium relative overflow-hidden
                    ${isSubmitting ? 'cursor-not-allowed opacity-80' : ''}`}
                >
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-[#f97316] to-[#ef4444] to-[#f97316] bg-[length:200%_100%] transition-all duration-300"
                    style={{ 
                      backgroundPosition: isSubmitting ? "100% center" : "0% center",
                      animation: isSubmitting ? "gradient-shift 1.5s infinite" : "none" 
                    }}
                  />
                  <span className="relative z-10 text-white font-semibold">
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : "Send message"}
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* Google Map */}
          <div className="w-full md:w-1/2 h-[550px] rounded-2xl overflow-hidden shadow-lg mt-3">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.541121341201!2d125.5934283749502!3d7.0630770166580925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f96d630de05087%3A0x4676cfbea16633c2!2sMap%C3%BAa%20Malayan%20Colleges%20Mindanao!5e0!3m2!1sen!2sjp!4v1760547617316!5m2!1sen!2sjp"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </AnimatedContent>

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal 
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />

      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% center; }
          50% { background-position: 100% center; }
          100% { background-position: 0% center; }
        }
      `}</style>
    </section>
  );
}

