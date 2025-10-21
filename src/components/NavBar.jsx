import React, { useState, useEffect } from "react";
import { NavBarMenu } from "../mockData/data.js";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";

const LogoSvg = `${import.meta.env.BASE_URL}SecuriSense_Logo.svg`;

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    // Check if user is on mobile device
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileDevice = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      setIsMobile(isMobileDevice || window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
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
      setMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 w-full px-6 lg:px-12 py-2 flex items-center justify-between transition-all duration-300 ${
        scrolled ? "bg-blue-100/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center gap-2 sm:gap-4"
      >
        <motion.img
          src={LogoSvg}
          alt="SecuriSense Logo"
          width={70}
          height={70}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        />
        <motion.span
          className="text-xl sm:text-2xl font-bold text-[#042046]"
          animate={{
            color: scrolled ? "#042046" : ["#042046", "#4079ff", "#042046"]
          }}
          transition={{
            duration: 4,
            repeat: scrolled ? 0 : Infinity,
            ease: "easeInOut"
          }}
        >
          SecuriSense
        </motion.span>
      </motion.div>

      <motion.ul
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, staggerChildren: 0.1, delayChildren: 0.3 }}
        className="hidden md:flex items-center gap-6 lg:gap-10 text-[#042046] font-semibold"
      >
        {NavBarMenu.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <motion.a
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              className={`relative ${
                item.button
                  ? `px-4 py-2 rounded-md transition duration-200 ${
                      item.button === "primary"
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                    }`
                  : "hover:text-[#4079ff] text-lg transition-colors duration-200"
              }`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {item.label}
              <motion.span
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4079ff]"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </motion.li>
        ))}
      </motion.ul>

      {/* Mobile menu button - only shown on mobile devices */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <IconButton
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
            aria-label="Menu"
            sx={{ color: "#042046" }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CloseIcon fontSize="large" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <MenuIcon fontSize="large" />
                </motion.div>
              )}
            </AnimatePresence>
          </IconButton>
        </motion.div>
      )}

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-blue-100/95 backdrop-blur-sm shadow-md flex flex-col items-center py-4 gap-4 text-[#042046] font-semibold md:hidden z-40"
          >
            {NavBarMenu.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, x: 5 }}
              >
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
                      : "hover:text-[#4079ff] text-lg transition-colors duration-200"
                  }`}
                >
                  {item.label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavBar;





