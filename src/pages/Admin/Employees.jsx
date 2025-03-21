import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Style from "./Admin.module.css";
import { faCircle } from "@fortawesome/free-solid-svg-icons"

import Home from "./multipages/Home";

import Partners from "./multipages/Partners";
import Benefits from "./multipages/Benefits";
import FutureTasks from "./multipages/FutureTasks";
import MarketingLink from "./multipages/MarketingLink";
import ProbabilityEmployees from "./multipages/ProbabilityEmployees";
import CurrentEmployees from "./multipages/CurrentEmployees";

function Employees() {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  const menuItems = [
    { name: "الرئيسية", path: "/Employees" },
    {
      name: " العملاء المحتملين",
      
      path: "/Employees/ProbabilityEmployees",
    },
    {
      name: " العملاء الحالين",
     
      path: "/Employees/CurrentEmployees",
    },
    { name: " الشركاء", path: "/Employees/Partners" },
    {
      name: "الارباح و العمولات",
      
      path: "/Employees/Benefits",
    },
    {
      name: " المهمات المستقبليه",
      
      path: "/Employees/FutureTasks",
    },
    {
      name: " الرابط التسويقي ",
      
      path: "/Employees/MarketingLink",
    },
  ];

  return (
    <div className={Style.container}>
      <div
        className={`${Style.sidebar} ${isHovered ? Style.expanded : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      <FontAwesomeIcon icon={faCircle} size="lg" className="border-2 border-green-600 rounded-xl animate-pulse"/>
        {isHovered && (
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.name}
                className={location.pathname === item.path ? Style.active : ""}
              >
                <Link to={item.path} className={Style.link}>
                  
                  {isHovered && (
                    <span className={Style.menuText}>{item.name}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-col w-full min-h-[100vh] py-[5px] px-[30px]">
        <Routes>
          <Route index element={<Home />} />
          <Route
            path="ProbabilityEmployees"
            element={<ProbabilityEmployees />}
          />
          <Route path="CurrentEmployees" element={<CurrentEmployees />} />
          <Route path="Partners" element={<Partners />} />
          <Route path="Benefits" element={<Benefits />} />
          <Route path="FutureTasks" element={<FutureTasks />} />
          <Route path="MarketingLink" element={<MarketingLink />} />
        </Routes>
      </div>
    </div>
  );
}

export default Employees;
