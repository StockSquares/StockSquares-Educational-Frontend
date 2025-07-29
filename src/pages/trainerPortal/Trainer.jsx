import Home from "./trainerPages/Home";
import EducationalSubjects from "./trainerPages/EducationalSubjects";
import FinancialTransactions from "./trainerPages/FinancialTransactions";
import Lectures from "./trainerPages/Lectures";
import PerformanceReports from "./trainerPages/PerformanceReports";
import PromotionalLink from "./trainerPages/PromotionalLink";
import TraineesQuestions from "./trainerPages/TraineesQuestions";
import TrainingOrders from "./trainerPages/TrainingOrders";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import Style from "../Admin/Admin.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import SideBar from "../../components/general/SideBar/SideBar";

function Trainer() {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  const links = [
    { name: "الرئيسية", path: "/Trainer" },
    {
      name: " المحاضرات ",

      path: "/Trainer/Lectures",
    },
    {
      name: "  طلبات التدريب",

      path: "/Trainer/TrainingOrders",
    },
    { name: " المواد التعليميه", path: "/Trainer/EducationalSubjects" },
    {
      name: " تقارير الاداء ",

      path: "/Trainer/PerformanceReports",
    },
    {
      name: " المعاملات الماليه ",

      path: "/Trainer/FinancialTransactions",
    },
    {
      name: " الرابط الترويجي ",

      path: "/Trainer/PromotionalLink",
    },
    {
      name: " اسئله المتدربين  ",

      path: "/Trainer/TraineesQuestions",
    },
  ];

  return (
    <SideBar menuItems={links}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="EducationalSubjects" element={<EducationalSubjects />} />
        <Route
          path="FinancialTransactions"
          element={<FinancialTransactions />}
        />
        <Route path="Lectures" element={<Lectures />} />
        <Route path="PerformanceReports" element={<PerformanceReports />} />
        <Route path="PromotionalLink" element={<PromotionalLink />} />
        <Route path="TraineesQuestions" element={<TraineesQuestions />} />
        <Route path="TrainingOrders" element={<TrainingOrders />} />
      </Routes>
    </SideBar>
  );
}
export default Trainer;
