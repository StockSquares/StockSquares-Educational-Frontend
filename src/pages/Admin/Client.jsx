import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Style from './multipages/clientPages/Admin.module.css';
import Home from './multipages/clientPages/Home';
import EducationJourney from './multipages/clientPages/EducationJourney';
import Recourses from './multipages/clientPages/Recourses';
import Certificate from './multipages/clientPages/Certificate.jsx';
import AskExpert from './multipages/clientPages/AskExpert';

import { FaHome, FaBook, FaPlayCircle, FaUserGraduate, FaChartLine, FaRobot, FaUserTie } from 'react-icons/fa';

function Client() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Start with sidebar closed
    const location = useLocation();

    const menuItems = [
        { name: 'الرئيسية', path: '/client', icon: <FaHome /> },
        { name: 'رحلة التعليم', path: '/client/educationjourney', icon: <FaBook /> },
        { name: 'الدورات المسجلة', path: '/client/recourses', icon: <FaPlayCircle /> },
        { name: 'التدريب الشخصي', path: '/training-and-education', icon: <FaUserGraduate /> },
        { name: 'الشهادات', path: '/client/certificate', icon: <FaChartLine /> },
        { name: 'التداول التجريبي', path: '/try-trading-for-free', icon: <FaChartLine /> },
        { name: 'توصيات بصير AI', path: '/chatAi', icon: <FaRobot /> },
        { name: 'اسأل خبير', path: '/client/askexpert', icon: <FaUserTie /> },
    ];

    return (
        <div className={Style.container}>
            <div className={Style.sidebarWrapper}>
                <button
                    className={Style.toggleButton}
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    ≡
                </button>

                <div className={`${Style.sidebar} ${isSidebarOpen ? Style.open : Style.closed}`}>
                    <ul>
                        {menuItems.map((item) => (
                            <li key={item.name} className={location.pathname === item.path ? Style.activeItem : ''}>
                                <Link to={item.path} className={Style.linkText}>
                                    <span className={Style.icon}>{item.icon}</span>
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className={Style.mainContent}>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="educationjourney" element={<EducationJourney />} />
                    <Route path="recourses" element={<Recourses />} />
                    <Route path="certificate" element={<Certificate />} />
                    <Route path="askexpert" element={<AskExpert />} />
                </Routes>
            </div>
        </div>
    );
}

export default Client;