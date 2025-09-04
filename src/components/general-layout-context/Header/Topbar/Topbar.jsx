import React, { useContext, useState } from "react";

// Internal Imports (components, Assets and Styles)
import Style from "./Topbar.module.css";
import { Button } from "../../..";
import { ellipsis } from "../../../../assets";

import { angleDown, bars, companyLogo, xMark } from "./../../../../assets";

// External libraries
import { Link, NavLink, useNavigate } from "react-router-dom";
import i18n from "../../../../utilities/i18n";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "../../../../Context/ThemeContext";
import { ROUTES } from "../../../../routes";
import Login from "./../../../../pages/Login/Login";
import { useAuth } from "../../../../Context/AuthContext";
import {
  faArrowRightFromBracket,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
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

function SideNavigation({ isOpen, onClose, isLoggedIn }) {
  const { t } = useTranslation();
  const { isDarkMode } = useContext(ThemeContext);

  const { userData, revokeTokens } = useAuth();

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
          ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}
          transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
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
        <nav className="p-4 ">
          {/* REPEATED CONTENT: Identical to mobile menu links */}
          {!isLoggedIn && (
            <div className="h-auto">
              <Link
                to="/login"
                className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                onClick={onClose}
              >
                {!userData ? (
                  <p> {t("auth.login")} </p>
                ) : (
                  <div className="flex justify-between items-center">
                    {" "}
                    <p>
                      {
                        userData[
                          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
                        ]
                      }
                    </p>
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      className="mx-2 rotate-180 "
                      title="تسجيل الخروج"
                      onClick={revokeTokens}
                    />
                  </div>
                )}
              </Link>
              <Link
                to="/investorSurvey"
                className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                onClick={onClose}
              >
                {t("navbar.investorPersonalitySurvey")}
              </Link>
              <ul className="text-sm font-medium flex flex-col  border-t pt-4  ">
                <li className="px-1.5 lg:px-3">
                  <NavLink
                    to={ROUTES.TRAINING_AND_EDUCATION}
                    className="inline-block pb-2"
                    onClick={onClose}
                  >
                    {t("navbar.trainingAndEducation")}
                  </NavLink>
                </li>
                <li className="px-1.5 lg:px-3">
                  <NavLink
                    to={ROUTES.RECORDED_COURSES}
                    className="inline-block py-2"
                    onClick={onClose}
                  >
                    {t("navbar.recordedCourses")}
                  </NavLink>
                </li>
                <li className="px-1.5 lg:px-3">
                  <NavLink
                    to={ROUTES.BOOKSTORE}
                    className="inline-block py-2"
                    onClick={onClose}
                  >
                    {t("navbar.financeAndBusinessLibrary")}
                  </NavLink>
                </li>
                <li className="px-1.5 lg:px-3">
                  <NavLink
                    to={ROUTES.BLOG}
                    className="inline-block py-2"
                    onClick={onClose}
                  >
                    {t("navbar.educationalBlog")}
                  </NavLink>
                </li>

                <li className="px-1.5 lg:px-3  lg:block">
                  <NavLink
                    to={ROUTES.PARTNER_APPLICATION}
                    className="inline-block py-2"
                    onClick={onClose}
                  >
                    {t("navbar.partnerApplication")}
                  </NavLink>
                </li>
                <li className="px-1.5 lg:px-3 lg:hidden">
                  {/* btn-dropdown-toggle */}
                  <button
                    id="dropdownButton"
                    data-dropdown-toggle="dropdownMenu"
                    type="button"
                  >
                    <span className="sr-only">Open main menu</span>
                    <FontAwesomeIcon icon={ellipsis} />
                  </button>
                </li>
              </ul>
            </div>
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
  const { userData, revokeTokens } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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
            <div className="me-auto gap-3  flex-center">
              {!userData ? (
                <Link to="/login" className="px-2">
                  <p>{t("auth.login")}</p>
                </Link>
              ) : (
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="text-4xl text-primary-950 hover:cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                  />
                  {isOpen && (
                    <motion.ul
                      initial={{ y: -10, x: 60, opacity: 0 }}
                      animate={{ y: 0, x: 60, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="bg-gray-50  w-[10rem] mt-2 rounded-lg shadow-md text-end absolute   z-20"
                    >
                      <li className="border-b-2 rounded-lg rounded-b-none p-3 hover:bg-gray-100 hover:transition-all cursor-pointer">
                        {
                          userData[
                            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
                          ]
                        }
                      </li>
                      <li
                        className="p-3 hover:bg-gray-100 hover:transition-all cursor-pointer"
                        onClick={() => {
                          revokeTokens;
                          navigate(ROUTES.LOGIN);
                        }}
                      >
                        <button type="reset">
                          <FontAwesomeIcon
                            icon={faArrowRightFromBracket}
                            className="mx-2  "
                          />{" "}
                          تسجيل الخروج{" "}
                        </button>
                      </li>
                    </motion.ul>
                  )}
                </div>
              )}

              <Link
                to="/investorSurvey"
                className="border-2 rounded border-primary-800  px-3 py-2 hover:bg-primary-800 hover:text-white transDuration-300"
              >
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
