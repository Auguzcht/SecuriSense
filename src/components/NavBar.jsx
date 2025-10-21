import React, { useState, useEffect } from "react";
import { NavBarMenu } from "../mockData/data.js";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const LogoSvg = `${import.meta.env.BASE_URL}SecuriSense_Logo.svg`;

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
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

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setMenuOpen(false); // ✅ Close menu on click
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full px-6 lg:px-12 py-2 flex items-center justify-between transition duration-300 ${
        scrolled ? "bg-blue-100/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="flex items-center gap-2 sm:gap-4">
        <img src={LogoSvg} alt="SecuriSense Logo" width={70} height={70} />
        <span className="text-xl sm:text-2xl font-bold text-[#042046]">
          SecuriSense
        </span>
      </div>

      <ul className="hidden md:flex items-center gap-6 lg:gap-10 text-[#042046] font-semibold">
        {NavBarMenu.map((item, index) => (
          <li key={index}>
            <a
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              className={`${
                item.button
                  ? `px-4 py-2 rounded-md transition duration-200 ${
                      item.button === "primary"
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                    }`
                  : "hover:text-indigo-600 text-lg transition-colors duration-200"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <IconButton
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden"
        aria-label="Menu"
        sx={{ color: "#042046" }}
      >
        {menuOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
      </IconButton>

      {menuOpen && (
        <ul className="absolute top-full left-0 w-full bg-blue-100/95 backdrop-blur-sm shadow-md flex flex-col items-center py-4 gap-4 text-[#042046] font-semibold md:hidden">
          {NavBarMenu.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className={`${
                  item.button
                    ? `px-4 py-2 rounded-md transition duration-200 ${
                        item.button === "primary"
                          ? "bg-indigo-600 text-white hover:bg-indigo-700"
                          : "border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                      }`
                    : "hover:text-indigo-600 text-lg transition-colors duration-200"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default NavBar;





