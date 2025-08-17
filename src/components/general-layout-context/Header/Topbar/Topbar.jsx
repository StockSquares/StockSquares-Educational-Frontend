import React, { useContext, useState } from "react";

// Internal Imports (components, Assets and Styles)
import Style from "./Topbar.module.css";
import { Button } from "../../..";
import { angleDown, bars, companyLogo, xMark } from "./../../../../assets";

// External libraries
import { Link, NavLink } from "react-router-dom";
import i18n from "../../../../utilities/i18n";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "../../../../Context/ThemeContext";
import { ROUTES } from "../../../../routes";
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
        ${isDarkMode 
            ? 'bg-gray-700 text-yellow-300' 
            : 'bg-gray-200 text-yellow-500'
        }
      `}
    >
      {isDarkMode ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}

function SideNavigation({ isOpen, onClose, isLoggedIn }) {
  const { t } = useTranslation();
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Side Navigation */}
      <div 
        className={`
          fixed top-0 left-0 h-full w-64 
          ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}
          transform transition-transform duration-300 z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          shadow-lg
        `}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <div className="w-24">
            <Link to="/" onClick={onClose}>
              <img
                className="w-full"
                src={companyLogo}
                alt="logo-stock-squares"
              />
            </Link>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-600 hover:text-gray-900"
            aria-label="Close menu"
          >
            <FontAwesomeIcon icon={xMark} className="text-xl" />
          </button>
        </div>
        
        {/* Navigation Links */}
        <nav className="p-4 space-y-4">
          {/* REPEATED CONTENT: Identical to mobile menu links */}
          {!isLoggedIn && (
            <>
              <Link 
                to="/login" 
                className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                onClick={onClose}
              >
                {t("auth.login")}
              </Link>
              <Link 
                to="/investorSurvey" 
                className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                onClick={onClose}
              >
                {t("navbar.investorPersonalitySurvey")}
              </Link>
            </>
          )}
          
          <div className="border-t pt-4">
            {/* REPEATED CONTENT: Identical to desktop menu buttons */}
            <Button
              linkTo="chatAi"
              btnText={t("navbar.chatAI")}
              btnClassName="w-full rounded-full px-3 py-2 mb-2"
              bgColor="primary"
              onClick={onClose}
            />
            <Button
              linkTo="try-trading-for-free"
              btnText={t("navbar.tryTradingForFree")}
              btnClassName="w-full rounded-full px-3 py-2"
              textColor="black"
              bgColor="accent"
              onClick={onClose}
            />
          </div>
          
          <div className=" flex gap-3 mt-4 ">
          <LanguageToggleButton />
            <ThemeToggleButton />
          </div>
        </nav>
      </div>
    </>
  );
}

function Topbar({
  userLogin,
  logoutFn,
  ref_md,
  translateY_topbar,
  isBelowMdBreakpoint,
  isAboveMdBreakpoint,
}) {
  const { t } = useTranslation();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const renderMobileMenu = (isLoggedIn = false) => (
    <div
      className={`block md:hidden px-6 dark:bg-dark bg-white dark:bg-black shadow-md transition-transform transDuration-500 ${
        translateY_topbar ? "transform -translate-y-full" : ""
      }`}
    >
      <div className="flex-y-center dark:text-dark justify-between py-4">
        {/* REPEATED CONTENT: Logo section is identical in both mobile renders */}
        <div className="w-24 me-6">
          <Link to="/">
            <img
              className="w-full"
              src={companyLogo}
              alt="logo-stock-squares"
            />
          </Link>
        </div>
        
        {/* REDUNDANT navigation links - should be consolidated */}
        
        
        <div className="ms-auto flex items-center">
          <div className=" flex  mr-2 ">
          <LanguageToggleButton />
            <ThemeToggleButton />
          </div>
          
          {/* Mobile menu toggle button */}
          <button
            type="button"
            aria-label="Open Main Menu"
            onClick={() => setIsSideNavOpen(true)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100"
          >
            <FontAwesomeIcon
              icon={bars}
              className="text-xl hover:scale-110 transDuration-300"
            />
          </button>
        </div>
      </div>

      {/* Side navigation component */}
      <SideNavigation 
        isOpen={isSideNavOpen} 
        onClose={() => setIsSideNavOpen(false)}
        isLoggedIn={false}
      />
    </div>
  );

  return (
    <>
      {/* REDUNDANT mobile menu renders - can be simplified */}
      {isBelowMdBreakpoint && renderMobileMenu(true)}

      {isAboveMdBreakpoint && (
        <div
          ref={ref_md}
          className={`hidden md:block px-6 bg-white dark:bg-black transition-transform transDuration-500 ${
            translateY_topbar ? "transform -translate-y-full" : ""
          }`}
        >
          <div className="flex-y-center  justify-between py-3 border-b">
            <div className="w-24 lg:w-40 me-3">
              <Link to="/">
                <img
                  className="w-full"
                  src={companyLogo}
                  alt="logo-stock-squares"
                />
              </Link>
            </div>
            
            {/* Desktop navigation links */}
            <div className="me-auto  flex-center">
              <Link to="/login" className="px-2">
                <p>{t("auth.login")}</p>
              </Link>

              <Link to="/investorSurvey" className="border-2 rounded border-primary-800  px-3 py-2 hover:bg-primary-800 hover:text-white transDuration-300">
                <p>{t("navbar.investorPersonalitySurvey")}</p>
              </Link>
            </div>
            
            {/* Desktop action buttons */}
            <div className="ms-auto flex items-center">
            <LanguageToggleButton />
              <ThemeToggleButton />
              <Button
                linkTo={ROUTES.CHATAI}
                btnText={t("navbar.chatAI")}
                btnClassName="rounded-full px-3 py-2 mx-3"
                bgColor="primary"
              />
              <Button
                linkTo="/try-trading-for-free"
                btnText={t("navbar.tryTradingForFree")}
                btnClassName="rounded-full px-3 py-2 mx-1"
                textColor="black"
                bgColor="accent"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Topbar;