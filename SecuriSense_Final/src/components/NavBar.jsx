import React, { useState, useEffect } from "react";
import { NavBarMenu } from "../mockData/data.js";
import Logo from "./SecuriSense_Logo.svg?react";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 max-w-8xl mx-auto flex items-center justify-between px-8 sm:px-6 lg:px-12 py-2 transition-colors duration-300 ${
        scrolled ? "bg-blue-200/40 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 sm:gap-4">
        <Logo width={80} height={80} className="text-indigo-600" />
        <span className="text-1xl sm:text-2xl font-bold text-[#042046]">
          SecuriSense
        </span>
      </div>

      {/* Menu */}
      <ul className="hidden md:flex items-center gap-4 sm:gap-6 lg:gap-20 text-[#042046] font-bold">
        {NavBarMenu.map((item, index) => (
          <li key={index}>
            {item.button ? (
              <a
                href={item.href}
                className={`px-4 py-2 rounded-md transition duration-200 ${
                  item.button === "primary"
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                }`}
              >
                {item.label}
              </a>
            ) : (
              <a
                href={item.href}
                className="hover:text-indigo-500 text-xl transition-colors duration-200"
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;


