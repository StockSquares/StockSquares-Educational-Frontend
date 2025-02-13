import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Style from './Admin.module.css';
import {
    faHouse,
    faPaperPlane,
    faClapperboard,
    faPeopleGroup,
    faGraduationCap,
    faMoneyBillTrendUp,
    faWandMagicSparkles,
    faUserTie,

} from '@fortawesome/free-solid-svg-icons';

import Home from './multipages/Home';
import EducationJourney from './multipages/EducationJourney';
import Recourses from './multipages/Recourses';
import Petraining from './multipages/Petraining';
import Certificate from './multipages/Certificate';
import DemoTrading from './multipages/DemoTrading';
import Airecommed from './multipages/Airecommed';
import AskExpert from './multipages/AskExpert';

function Client() {
    const location = useLocation(); 
    const [isHovered, setIsHovered] = useState(false);

    const menuItems = [
        { name: 'الرئيسية', icon: faHouse, path: '/client' },
        { name: 'رحلة التعليم', icon: faPaperPlane, path: '/client/educationjourney' },
        { name: 'الدورات المسجلة', icon:  faClapperboard, path: '/client/recourses' },
        { name: 'التدريب الشخصي', icon: faPeopleGroup, path: '/client/petraining' },
        { name: 'الشهادات', icon:faGraduationCap, path: '/client/certificate' },
        { name: 'التداول التجريبي', icon: faMoneyBillTrendUp, path: '/client/demotrading' },
        { name: 'توصيات بصير AI', icon: faWandMagicSparkles, path: '/client/airecommed' },
        { name: 'اسأل خبير', icon: faUserTie, path: '/client/askexpert' },
    ];

    return (
        <div className={Style.container}>
            <div 
                className={`${Style.sidebar} ${isHovered ? Style.expanded : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <ul>
                    {menuItems.map((item) => (
                        <li key={item.name} className={location.pathname === item.path ? Style.active : ''}>
                            <Link to={item.path} className={Style.link}>
                                <FontAwesomeIcon icon={item.icon} className={Style.icon} />
                                {isHovered && <span className={Style.menuText}>{item.name}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={Style.mainContent}>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path='educationjourney' element={<EducationJourney />} />
                    <Route path='recourses' element={<Recourses />} />
                    <Route path='petraining' element={<Petraining />} />
                    <Route path='certificate' element={<Certificate />} />
                    <Route path='demotrading' element={<DemoTrading />} />
                    <Route path='airecommed' element={<Airecommed />} />
                    <Route path='askexpert' element={<AskExpert />} />
                </Routes>
            </div>
        </div>
    );
}

export default Client;
