import React from "react";
import { NavBarMenu } from "../mockData/data";
import Logo from "./SecuriSense_Logo.svg?react"; // vite-plugin-svgr

const NavBar = () => {
  return (
    <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-12 py-3">
      {/* Logo */}
      <div className="flex items-center gap-2 sm:gap-4">
        <Logo width={45} height={45} className="text-indigo-600" />
        <span className="text-lg sm:text-xl font-bold text-white">
          SecuriSense
        </span>
      </div>

      {/* Menu */}
      <ul className="hidden md:flex items-center gap-4 sm:gap-6 lg:gap-10 text-white font-medium">
        {NavBarMenu.map((item, index) => (
          <li key={index}>
            {item.button ? (
              item.button === "primary" ? (
                <button
                  onClick={() => console.log(item.label)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
                >
                  {item.label}
                </button>
              ) : (
                <button
                  onClick={() => console.log(item.label)}
                  className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition duration-200"
                >
                  {item.label}
                </button>
              )
            ) : (
              <a
                href={item.href}
                className="hover:text-indigo-500 transition-colors duration-200"
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
