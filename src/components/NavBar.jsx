import React, { useState, useEffect } from "react";
import { NavBarMenu } from "../mockData/data.js";

// Use the base URL from Vite to handle both development and production paths
const LogoSvg = `${import.meta.env.BASE_URL}SecuriSense_Logo.svg`;

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 max-w-8xl mx-auto flex items-center justify-between px-8 sm:px-6 lg:px-12 py-2 transition-colors duration-300 ${
        scrolled ? "bg-blue-200/40 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {/* Make logo and text clickable to home */}
      <a 
        href="#home" 
        onClick={(e) => handleSmoothScroll(e, "#home")}
        className="flex items-center gap-2 sm:gap-4 group"
      >
        <img 
          src={LogoSvg} 
          alt="SecuriSense" 
          width={80} 
          height={80} 
          className="text-[#4079ff] transition-transform duration-300 group-hover:scale-105" 
        />
        <span className="text-1xl sm:text-2xl font-bold text-[#042046] transition-colors duration-300 group-hover:text-[#4079ff]">
          SecuriSense
        </span>
      </a>

      <ul className="hidden md:flex items-center gap-4 sm:gap-6 lg:gap-20 text-[#042046] font-bold">
        {NavBarMenu.map((item, index) => (
          <li key={index}>
            <a
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              className={`${
                item.button
                  ? `px-4 py-2 rounded-md transition duration-200 ${
                      item.button === "primary"
                        ? "bg-[#4079ff] text-white hover:bg-[#164260]"
                        : "border border-[#4079ff] text-[#4079ff] hover:bg-[#4079ff]/10"
                    }`
                  : "hover:text-[#4079ff] text-xl transition-colors duration-200"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;



