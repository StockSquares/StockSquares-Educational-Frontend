import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";

import Partners from "./Partners";
import Benefits from "./Benefits";
import FutureTasks from "./FutureTasks";
import MarketingLink from "./MarketingLink";
import ProbabilityEmployees from "./ProbabilityEmployees";
import CurrentEmployees from "./CurrentEmployees";
import SideBar from "../../components/general/SideBar/SideBar";

function Employees() {
  const links = [
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
      name: " مهمات مستقبليه",

      path: "/Employees/FutureTasks",
    },
    {
      name: " الرابط التسويقي ",

      path: "/Employees/MarketingLink",
    },
  ];

  return (
    <SideBar menuItems={links}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="ProbabilityEmployees" element={<ProbabilityEmployees />} />
        <Route path="CurrentEmployees" element={<CurrentEmployees />} />
        <Route path="Partners" element={<Partners />} />
        <Route path="Benefits" element={<Benefits />} />
        <Route path="FutureTasks" element={<FutureTasks />} />
        <Route path="MarketingLink" element={<MarketingLink />} />
      </Routes>
    </SideBar>
  );
}

export default Employees;
