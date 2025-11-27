import { ThemeContext } from "../../../../Context/ThemeContext";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../Context/AuthContext";
import {
  faArrowRightFromBracket,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
            p-1
            px-2 
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
      {isDarkMode ? "🌙" : "☀️"}
      {/* {isDarkMode ? "🌙" : "☀️"} */}
    </button>
  );
}

function DashNavbar() {
  const { userData, revokeTokens } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const logOut = async () => {
    await revokeTokens();
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="w-full px-8 h-[10vh] bg-gray-100 dark:bg-dark-background shadow-md flex justify-end items-center gap-3">
      {!userData ? (
        ""
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
              className="bg-gray-50 dark:text-dark-text dark:bg-darkgray  w-[10rem] mt-2 rounded-lg shadow-md text-end absolute   z-20"
            >
              <li className="border-b-2 rounded-lg rounded-b-none p-3 dark:hover:bg-gray-700 hover:bg-gray-100 hover:transition-all cursor-pointer">
                {
                  userData[
                    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
                  ]
                }
              </li>
              <li
                className="p-3 hover:bg-gray-100 hover:transition-all cursor-pointer dark:hover:bg-gray-700 "
                onClick={logOut}
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
      <div className=" flex gap-3 ">
        <LanguageToggleButton />
        <ThemeToggleButton />
      </div>
    </div>
  );
}
export default DashNavbar;
