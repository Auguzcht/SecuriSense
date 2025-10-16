import React, { useState } from "react";
import AnimatedContent from "../components/AnimatedComponents";
import ScrollReveal from "../components/ScrollReveal";


export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent!");
  };

  const Button = ({ children, className = "", ...props }) => (
    <button
      className={`px-4 py-2 rounded-lg font-medium bg-purple-600 text-white hover:bg-purple-700 transition w-full ${className}`}
      {...props}
    >
      {children}
    </button>
  );

  const Input = ({ className = "", ...props }) => (
    <input
      className={`border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 ${className}`}
      {...props}
    />
  );

  const Textarea = ({ className = "", ...props }) => (
    <textarea
      className={`border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 ${className}`}
      {...props}
    />
  );

  const Label = ({ children }) => (
    <label className="text-sm font-medium text-gray-700">{children}</label>
  );

  return (
    <section className="min-h-screen flex flex-col items-center justify-center md:px-12" id="contact">
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
                    Contact Us
                  </h2>
        </AnimatedContent>

      <AnimatedContent distance={150}
          direction="horizontal"
          reverse={true}
          duration={1.2}
          ease="power3.out"
          initialOpacity={0.1}
          animateOpacity
          scale={1.1}
          threshold={0.2}
          delay={0.10}>
        <div className="flex flex-col md:flex-row justify-center items-start gap-8 w-full max-w-6xl bg-white rounded-3xl shadow-lg p-8">
        <div className="bg-white rounded-3xl p-8 w-full md:w-1/2">
          <p className="text-gray-500 mb-6 text-center">
            Our friendly team would love to hear from you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>First name *</Label>
                <Input
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Last name *</Label>
                <Input
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label>Email *</Label>
              <Input
                type="email"
                name="email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Phone number</Label>
              <Input
                type="tel"
                name="phone"
                placeholder="+1 (000) 000-0000"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Message *</Label>
              <Textarea
                name="message"
                placeholder="Leave us a message..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                required
                className="mt-1"
              />
              <p className="text-sm text-gray-500">
                You agree to our friendly{" "}
                <a href="#" className="text-blue-600 underline">
                  privacy policy
                </a>
                .
              </p>
            </div>

            <Button type="submit">Send message</Button>
          </form>
        </div>

        {/* Google Map */}
        <div className="w-full md:w-1/2 h-[550px] rounded-2xl overflow-hidden shadow-lg">
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
    </section>
  );
}
