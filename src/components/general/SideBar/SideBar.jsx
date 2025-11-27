import { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function SideBar({ menuItems = [], children }) {
  const location = useLocation();
  const [isopened, setisopened] = useState(true);

  return (
    <div className="">
      <div
        className={`sidebar z-30 mt-4 min-h-[50vh] min-w-[150px] absolute right-0 flex justify-between transition-all ${isopened ? "" : "translate-x-[85%]"
          }`}
      >
        <button
          className=" p-[2px] bg-accent-900"
          onClick={() => setisopened(!isopened)}
        >
          {isopened ? (
            <FontAwesomeIcon icon={faArrowRight} size="xl" />
          ) : (
            <FontAwesomeIcon icon={faArrowLeft} size="xl" />
          )}
        </button>
        <div className="bg-white dark:bg-dark-background w-[90%] flex flex-col gap-10 p-2 text-center">
          <nav className="flex flex-col gap-2 ">
            <ul>
              {menuItems.map((item) => (
                <Link to={item.path}>
                  <li
                    key={item.name}
                    className={`px-4 py-2 rounded-md text-[14px] md:text-lg flex items-center gap-2 transition-all  ${location.pathname === item.path
                        ? "bg-primary-dark text-white rounded-xl"
                        : "bg-transparent text-black  dark:text-dark-text rounded-xl hover:bg-gray-100 hover:dark:bg-gray-800"
                      } `}
                  >
                    {item.name}
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="flex flex-col w-full min-h-[60vh] py-[5px] px-2 lg:px-[30px]">
        {children}
      </div>
    </div>
  );
}
export default SideBar;
