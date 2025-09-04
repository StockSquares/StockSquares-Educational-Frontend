import { ThemeContext } from "../../../../Context/ThemeContext";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

function LanguageToggleButton() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const toggleLanguage = () => {
    const newLang = currentLang === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center justify-center px-[0.40rem] mx-2 py-1 rounded-full border-2 border-primary-800 bg-primary-800 text-white hover:bg-primary-700 transition-all duration-300"
      aria-label="Toggle Language"
    >
      {currentLang === "en" ? "AR" : "EN"}
    </button>
  );
}
function ThemeToggleButton() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={`
            p-2 
            rounded-full 
            flex 
            items-center 
            justify-center
            ${
              isDarkMode
                ? "bg-gray-700 text-yellow-300"
                : "bg-gray-200 text-yellow-500"
            }
          `}
    >
      {isDarkMode ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}

function DashNavbar() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className="w-full px-8 h-[10vh] bg-gray-100 shadow-md flex justify-end items-center">
      <div className=" flex gap-3 ">
        <LanguageToggleButton />
        <ThemeToggleButton />
      </div>
    </div>
  );
}
export default DashNavbar;
