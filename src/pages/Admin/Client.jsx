import React, { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Style from "./multipages/clientPages/Admin.module.css";
import Home from "./multipages/clientPages/Home";
import EducationJourney from "./multipages/clientPages/EducationJourney";
import Certificate from "./multipages/clientPages/Certificate.jsx";
import AskExpert from "./multipages/clientPages/AskExpert";

import {
  FaHome,
  FaBook,
  FaPlayCircle,
  FaUserGraduate,
  FaChartLine,
  FaRobot,
  FaUserTie,
} from "react-icons/fa";
import SideBar from "../../components/general/SideBar/SideBar";

function Client() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Start with sidebar closed
  const location = useLocation();

  const menuItems = [
    { name: "الرئيسية", path: "/client", icon: <FaHome /> },
    {
      name: "رحلة التعليم",
      path: "/client/educationjourney",
      icon: <FaBook />,
    },
    {
      name: "الدورات المسجلة",
      path: "/recorded-courses",
      icon: <FaPlayCircle />,
    },
    {
      name: "التدريب الشخصي",
      path: "/training-and-education",
      icon: <FaUserGraduate />,
    },
    { name: "الشهادات", path: "/client/certificate", icon: <FaChartLine /> },
    {
      name: "التداول التجريبي",
      path: "/try-trading-for-free",
      icon: <FaChartLine />,
    },
    { name: "توصيات بصير AI", path: "/chatAi", icon: <FaRobot /> },
    { name: "اسأل خبير", path: "/client/askexpert", icon: <FaUserTie /> },
  ];

  return (
    <SideBar menuItems={menuItems}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="educationjourney" element={<EducationJourney />} />
        <Route path="certificate" element={<Certificate />} />
        <Route path="askexpert" element={<AskExpert />} />
      </Routes>
    </SideBar>
  );
}

export default Client;
