// Use the base URL from Vite to handle both development and production paths
const LogoSvg = `${import.meta.env.BASE_URL}SecuriSense_Logo.svg`;

export default function Footer() {
  return (
    <footer className="py-10 bg-gray-50 sm:pt-16 lg:pt-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-8 lg:gap-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center">
              <img src={LogoSvg} alt="SecuriSense" width={60} height={60} />
              <h4 className="text-2xl font-semibold text-gray-900">SecuriSense</h4>
            </div>
            <p className="text-base leading-relaxed text-gray-600 mt-5">
              SecuriSense is an AI-driven security platform that detects potential
              threats in real time. Whether it's suspicious code, unsafe links, or
              hidden vulnerabilities, our intelligent detector helps you stay one
              step ahead of cyber risks.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Quick Links</p>
            <ul className="mt-6 space-y-4">
              <li><a href="#home" className="text-base text-black hover:text-blue-600">Home</a></li>
              <li><a href="#detector" className="text-base text-black hover:text-blue-600">Detector</a></li>
              <li><a href="#about" className="text-base text-black hover:text-blue-600">About</a></li>
              <li><a href="#contact" className="text-base text-black hover:text-blue-600">Contact</a></li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Connect With Us</p>
            <ul className="mt-6 space-y-4">
              <li>
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="flex items-center text-base text-black hover:text-blue-600">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"></path>
                  </svg>
                  GitHub
                </a>
              </li>
              <li>
                <a href="mailto:contact@securisense.com" className="flex items-center text-base text-black hover:text-blue-600">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  Email Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="mt-16 mb-10 border-gray-200" />
        <p className="text-sm text-center text-gray-600">
          © {new Date().getFullYear()} SecuriSense. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

