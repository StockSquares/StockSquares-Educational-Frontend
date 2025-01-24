import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Routes, Route, Link } from 'react-router-dom'; 
import Style from './Admin.module.css';

import {
    faHouse,
    faHandshake,
    faUserTie,
    faBullhorn,
    faNewspaper,
    faBook,
    faGraduationCap,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';

import Home from './multipages/Home';
import Partners from './multipages/Partners';
import Employees from './multipages/Employees';
import Ads from './multipages/ads';
import Articles from './multipages/Articles';

function Admin() {
    const [activeItem, setActiveItem] = useState("الرئيسية");

    const handleActiveItem = (item) => {
        setActiveItem(item);
    };

    const menuItems = [
        { name: 'الرئيسية', icon: faHouse, path: '/admin' },
        { name: 'الشركاء', icon: faHandshake, path: '/admin/partners' },
        { name: 'الموظفين', icon: faUserTie, path: '/admin/employees' },
        { name: 'الإعلانات', icon: faBullhorn, path: '/admin/ads' },
        { name: 'المقالات', icon: faNewspaper, path: '/admin/articles' },
        { name: 'الكورسات', icon: faGraduationCap, path: '/admin/courses' },
        { name: 'الكتب', icon: faBook, path: '/admin/books' },
        { name: 'الإضافات', icon: faPlus, path: '/admin/extensions' },
    ];

    return (
        
        <div className={Style.container}>
            
            <div className={Style.sidebar}>
                <ul>
                    {menuItems.map((item) => (
                        <li
                            key={item.name}
                            className={activeItem === item.name ? Style.active : ''}
                            onClick={() => handleActiveItem(item.name)}
                        >
                            <Link to={item.path} className={Style.link}>
                                <FontAwesomeIcon icon={item.icon} className={Style.icon} />
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={Style.mainContent}>
            <Routes>
                    <Route index element={<Home/>} />
                    <Route path='partners' element={<Partners />} />
                    <Route path='employees' element={<Employees />} />
                    <Route path='ads' element={<Ads />} />
                    <Route path='articles' element={<Articles />} />
            </Routes>
            </div>
        </div>
    );
}

export default Admin;
