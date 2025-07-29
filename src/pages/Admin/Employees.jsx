import React from "react";
import { Routes, Route} from "react-router-dom";


import Home from "./multipages/Home";

import Partners from "./multipages/Partners";
import Benefits from "./multipages/Benefits";
import FutureTasks from "./multipages/FutureTasks";
import MarketingLink from "./multipages/MarketingLink";
import ProbabilityEmployees from "./multipages/ProbabilityEmployees";
import CurrentEmployees from "./multipages/CurrentEmployees";
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
