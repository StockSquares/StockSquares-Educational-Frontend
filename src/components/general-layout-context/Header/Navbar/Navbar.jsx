import React, { useContext, useEffect, useState } from 'react';

// Internal Imports (components, Assets and Styles)
import Style from './Navbar.module.css';
import { ellipsis } from '../../../../assets';
import { ROUTES } from './../../../../routes';

// External libraries
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Navbar({ ref_ul, width_ul, height_md, translateY_navbar, translateX_navbar, isAboveMdBreakpoint }) {
    const { t } = useTranslation();

    useEffect(() => {
        
    }, []);

    return (
        <>
        {/* tablet and laptop */}
        {isAboveMdBreakpoint && <>
        {/* 'hidden md:block' class is good if we don't target security, otherwise we use (window.innerwidth or resize event) logic */}
        {/* <nav className={`nav-main md:block bg-primary text-white shadow-md transform transition-transform transDuration-500`} */}
        <nav className={`nav-main md:block bg-white shadow text-primary py-2 transform transition-transform transDuration-500`}
            style={{ // Tailwind doesn't apply parameters values as arbitrary values dynamically
                transform: translateY_navbar
                    ? `translateY(-${height_md}px)` 
                    : `translateY(0)`,
            }}
        >
            <div className="">
                <div className="flex-x-between items-baseline relative">
                    {/* <Link ref={ref_ul} to='' className={`flex-y-center space-x-1 sm:space-x-3 rtl:space-x-reverse text-xl sm:text-2xl lg:me-10 transform transition-transform transDuration-500 absolute ${translateX_navbar  ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}> */}
<<<<<<< HEAD
                    <Link ref={ref_ul} to='' className={`text-xl sm:text-2xl transform transition-transform transDuration-500 absolute ${translateX_navbar  ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                        <h1 className="text-xl font-semibold whitespace-nowrap">{t('logo')}</h1>
                    </Link>
                    <div className={`mx-auto transDuration-500`} style={{ // Tailwind doesn't apply parameters values as arbitrary values dynamically
=======
                    <Link ref={ref_ul} to='' className={`text-xl sm:text-2xl ps-24 transform transition-transform transDuration-500 absolute ${translateX_navbar  ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                        <h1 className="text-xl font-semibold whitespace-nowrap">{t('logo')}</h1>
                    </Link>
                    <div className={`mx-auto transDuration-500`}
                        style={{ // Tailwind doesn't apply parameters values as arbitrary values dynamically
>>>>>>> 4b237b7 (Your commit message)
                            transform: translateX_navbar
                                ? `translatex(-${width_ul}px)` 
                                : `translatex(0)`,
                        }}
                    >
                        <ul className='text-sm font-medium flex-center'>
                            <li className='px-1.5 lg:px-3'>
                                <NavLink to={ROUTES.TRAINING_AND_EDUCATION} className="inline-block py-2">{t('navbar.trainingAndEducation')}</NavLink>
                            </li>
                            <li className='px-1.5 lg:px-3'>
                            <NavLink to={ROUTES.RECORDED_COURSES} className="inline-block py-2">{t('navbar.recordedCourses')}</NavLink>
                            </li>
                            <li className='px-1.5 lg:px-3'>
                            <NavLink to={ROUTES.BOOKSTORE} className="inline-block py-2">{t('navbar.financeAndBusinessLibrary')}</NavLink>
                            </li>
                            <li className='px-1.5 lg:px-3'>
                            <NavLink to={ROUTES.BLOG} className="inline-block py-2">{t('navbar.educationalBlog')}</NavLink>
                            </li>
                            {/* <li className='px-1.5 lg:px-3 hidden lg:block'>
                            <NavLink to={ROUTES.OPPORTUNITIES_AND_RECOMMENDATIONS} className="inline-block py-2">{t('navbar.opportunitiesAndRecommendations')}</NavLink>
                            </li> */}
                            <li className='px-1.5 lg:px-3 hidden lg:block'>
                                <NavLink to={ROUTES.PARTNER_APPLICATION} className="inline-block py-2">{t('navbar.partnerApplication')}</NavLink>
                            </li>
                            <li className='px-1.5 lg:px-3 lg:hidden'>
                            {/* btn-dropdown-toggle */}
                            <button id="dropdownButton" data-dropdown-toggle="dropdownMenu" type="button" className="">
                                    <span className="sr-only">Open main menu</span>
                                    <FontAwesomeIcon icon={ellipsis} />
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* dropdown */}
                <div id="dropdownMenu" className="z-20 hidden font-semibold text-black bg-white divide-y divide-gray-100 rounded-sm shadow-lg w-44 translate-x-2/4 dark:text-white dark:bg-gray-700 relative before:absolute before:content[''] before:-top-0 before:start-1/2 before:-translate-y-full before:translate-x-1/2 before:border-l-[10px] before:border-l-transparent before:border-b-[15px] before:border-b-white before:border-r-[10px] before:border-r-transparent">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownButton">
                        <li>
                            <NavLink to={ROUTES.OPPORTUNITIES_AND_RECOMMENDATIONS} className="block px-4 py-2 hover:text-primary hover:bg-lightgray hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{t('navbar.opportunitiesAndRecommendations')}</NavLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.PARTNER_APPLICATION} className="block px-4 py-2 hover:text-primary hover:bg-lightgray hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{t('navbar.partnerApplication')}</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        </>}
        </>
    );
}

export default Navbar;
