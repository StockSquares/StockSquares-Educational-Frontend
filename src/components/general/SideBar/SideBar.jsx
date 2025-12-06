import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faBars } from "@fortawesome/free-solid-svg-icons";

function SideBar({ menuItems = [], children }) {
  const location = useLocation();
  const [isopened, setisopened] = useState(true);

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-gray-50 dark:bg-dark-background" dir="rtl">
      {/* Mobile Backdrop */}
      {isopened && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setisopened(false)}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`bg-white dark:bg-dark-background shadow-xl z-50 transition-all duration-300 ease-in-out flex flex-col border-l border-gray-200 dark:border-gray-700 fixed h-screen right-0 top-0 md:relative md:h-auto md:right-auto md:top-auto md:z-20 ${isopened ? "w-64 min-w-[16rem]" : "w-16 min-w-[4rem]"
          }`}
      >
        {/* Toggle Button */}
        <div className={`flex items-center p-4 ${isopened ? "justify-between" : "justify-center"}`}>
          {isopened && <span className="font-bold text-lg text-primary-dark dark:text-white">القائمة</span>}
          <button
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors"
            onClick={() => setisopened(!isopened)}
          >
            <FontAwesomeIcon icon={isopened ? faArrowRight : faBars} size="lg" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="flex flex-col gap-2 px-2">
            {menuItems.map((item) => (
              <Link to={item.path} key={item.name}>
                <li
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 cursor-pointer ${location.pathname === item.path
                    ? "bg-green-600 text-white shadow-md"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  title={!isopened ? item.name : ""}
                >
                  <div className="w-6 flex justify-center">
                    <FontAwesomeIcon icon={item.icon} size="lg" />
                  </div>
                  <span
                    className={`whitespace-nowrap transition-all duration-300 ${isopened ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 hidden"
                      }`}
                  >
                    {item.name}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden mr-16 md:mr-0">
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          {children}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
