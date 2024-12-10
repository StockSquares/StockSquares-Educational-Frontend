import React, { useContext } from "react";

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

function Topbar({
  userLogin,
  logoutFn,
  ref_md,
  translateY_topbar,
  isBelowMdBreakpoint,
  isAboveMdBreakpoint,
}) {
  const { t } = useTranslation();
  

  const renderMobileMenu = (isLoggedIn = false) => (
    <div
      className={`block md:hidden px-6 dark:bg-dark bg-white dark:bg-black shadow-md transition-transform transDuration-500 ${
        translateY_topbar ? "transform -translate-y-full" : ""
      }`}
    >
      <div className="flex-y-center dark:text-dark justify-between py-4">
        <div className="w-24 me-6">
          <Link to="/">
            <img
              className="w-full"
              src={companyLogo}
              alt="logo-stock-squares"
            />
          </Link>
        </div>
        
        <div className="me-auto flex">
          {!isLoggedIn && (
            <>
              <Link className="px-2">
                <p>{t("auth.login")}</p>
              </Link>
              <Link className="px-2">
                <p>{t("navbar.investorPersonalitySurvey")}</p>
              </Link>
            </>
          )}
        </div>
        
        <div className="ms-auto flex items-center">
          <div className="mr-2">
            <ThemeToggleButton />
          </div>
          
          <button
            type="button"
            aria-label="Open Main Menu"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100"
          >
            <FontAwesomeIcon
              icon={bars}
              className="text-xl hover:scale-110 transDuration-300"
            />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isBelowMdBreakpoint && renderMobileMenu()}
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
            
            <div className="me-auto  flex-center">
              <Link to="/login" className="px-2">
                <p>{t("auth.login")}</p>
              </Link>

              <Link className="border-2 rounded border-primary-800  px-3 py-2 hover:bg-primary-800 hover:text-white transDuration-300">
                <p>{t("navbar.investorPersonalitySurvey")}</p>
              </Link>
            </div>
            
            <div className="ms-auto flex items-center">
              <ThemeToggleButton />
              <Button
                linkTo=""
                btnText={t("navbar.chatAI")}
                btnClassName="rounded-full px-3 py-2 mx-3"
                bgColor="primary"
              />
              <Button
                linkTo="try-trading-for-free"
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