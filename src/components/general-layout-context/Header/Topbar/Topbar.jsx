import React, { useContext, useState } from "react";

// Internal Imports (components, Assets and Styles)
import Style from "./Topbar.module.css";
import { Button } from "../../..";
import { angleDown, bars, companyLogo, xMark } from "./../../../../assets";

// External libraries
<<<<<<< HEAD
import { Link, NavLink } from 'react-router-dom';
import i18n from '../../../../utilities/i18n';  // if I delete this, the file's static text will turn into the keys text not the values'
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Topbar({ userLogin, logoutFn, ref_md, translateY_topbar, isBelowMdBreakpoint, isAboveMdBreakpoint }) {
    const { t } = useTranslation();

    useEffect(() => {

    }, []);

    return <>
        {/* mobile - not login */}
        {isBelowMdBreakpoint && <>
<<<<<<< HEAD
            <div className={`block md:hidden px-6 bg-white shadow-md transition-transform transDuration-500 ${translateY_topbar ? 'transform -translate-y-full' : ''}`}>
                <div className="flex-y-center justify-bwteen py-4">
                    <div className='w-24 me-6'><Link to='/'><img className='w-full' src={companyLogo} alt="logo-stock-squares" /></Link></div>
                    <div className='me-auto flex'>
                        <Link className='px-2'>
                            <p>{t('auth.login')}</p>
                        </Link>
                        <Link className='px-2'>
                            <p>{t('navbar.investorPersonalitySurvey')}</p>
                        </Link>
                    </div>
                    <div className='ms-auto'>
                        {/* btn-start-navbar */}
                        <button type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 ring-primary-light focus:outline-none focus:ring-2 focus:ring-gray-200" data-drawer-target="drawer-start-navbar" data-drawer-toggle="drawer-start-navbar" aria-controls="drawer-start-navbar" data-drawer-body-scrolling="true" data-drawer-backdrop="true" data-drawer-placement="right"> {/* this should be changed from right to left according to the language */}
=======
        <div className={`block md:hidden px-6 bg-white shadow-md transition-transform transDuration-500 ${translateY_topbar ? 'transform -translate-y-full' : ''}`}>
            <div className="py-4">
                <div className='flex-y-center justify-between'>
                    <div className='w-24 me-6'><Link to='/'><img className='w-full' src={companyLogo} alt="logo-stock-squares" /></Link></div>
                    <div className='me-auto flex-y-center'>
                        <Link className='px-2'>
                            <p>{t('auth.login')}</p>
                        </Link>
                        {/* <Button linkTo='' btnText={t('navbar.chatAI')} btnClassName='rounded-full px-4 py-2 mx-3' bgColor='primary'/>
                        <Button linkTo='try-trading-for-free' btnText={t('navbar.tryTradingForFree')} btnClassName='rounded-full py-2 mx-1' textColor='black' bgColor='accent'/> */}
                    </div>
                    <div className='ms-auto'>
                        {/* btn-start-navbar */}
                        <button id="dropdownNotLogin" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 ring-primary-light focus:outline-none focus:ring-2 focus:ring-gray-200" 
                        data-drawer-target="drawer-start-navbar" 
                        data-drawer-toggle="drawer-start-navbar" 
                        aria-controls="drawer-start-navbar" 
                        data-drawer-body-scrolling="true" 
                        data-drawer-backdrop="true"
                        data-drawer-placement="right"
                        data-dropdown-trigger="hover"> {/* this should be changed from right to left according to the language */}
>>>>>>> 4b237b7 (Your commit message)
                            <FontAwesomeIcon icon={bars} className='text-xl hover:scale-110 transDuration-300' />
                            <span className="sr-only">Open main menu</span>
                        </button>
                    </div>
                </div>
<<<<<<< HEAD
                {/* drawer-start-navbar */}
                <div id="drawer-start-navbar" className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform transDuration-500 translate-x-full bg-white w-2/3 shadow-2xl dark:bg-gray-800" tabIndex="-1" aria-labelledby="drawer-right-navbar-label">
                    <button type="button" data-drawer-hide="drawer-start-navbar" aria-controls="drawer-start-navbar" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <FontAwesomeIcon icon={xMark} className='text-xl hover:scale-110 transDuration-300' />
                        <span className="sr-only">Close menu</span>
                    </button>
                    <Link to='' className="space-x-1 sm:space-x-3 rtl:space-x-reverse">
                        <h1 className="self-center text-xl font-semibold whitespace-nowrap mb-2">{t('logo')}</h1>
                    </Link>
                    <ul className="text-sm font-medium flex flex-col">
                        <li className='p-2 hover:bg-lightgray'>
                            <NavLink to='training-and-education' className="">{t('navbar.investorPersonalitySurvey')}</NavLink>
                        </li>
                        <li className='p-2 hover:bg-lightgray'>
                            <NavLink to='training-and-education' className="">{t('navbar.chatAI')}</NavLink>
                        </li>
                        <li className='p-2 hover:bg-lightgray'>
                            <NavLink to='recorded-courses' className="">{t('navbar.tryTradingForFree')}</NavLink>
                        </li>
                        <li className='p-2 hover:bg-lightgray'>
                            <NavLink to='training-and-education' className="">{t('navbar.trainingAndEducation')}</NavLink>
                        </li>
                        <li className='p-2 hover:bg-lightgray'>
                            <NavLink to='recorded-courses' className="">{t('navbar.recordedCourses')}</NavLink>
                        </li>
                        <li className='p-2 hover:bg-lightgray'>
                            <NavLink to='bookstore' className="">{t('navbar.financeAndBusinessLibrary')}</NavLink>
                        </li>
                        <li className='p-2 hover:bg-lightgray'>
                            <NavLink to='educational-blog' className="">{t('navbar.educationalBlog')}</NavLink>
                        </li>
                        {/* <li className='p-2 hover:bg-lightgray'>
                        <NavLink to='opportunities-and-recommendations' className="">{t('navbar.opportunitiesAndRecommendations')}</NavLink>
                    </li> */}
                        <li className='p-2 hover:bg-lightgray'>
                            <NavLink to='partner-application' className="">{t('navbar.partnerApplication')}</NavLink>
                        </li>
                        <li className='p-2 hover:bg-lightgray'>
                            <NavLink to='partner-application' className="">{t('auth.login')}</NavLink>
                        </li>
                        <li className='p-2 hover:bg-lightgray'>
                            <NavLink to='partner-application' className="">{t('auth.signup')}</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </>}

        {/* {userLogin !== null && isBelowMdBreakpoint && <> */}
        {isBelowMdBreakpoint && <>
            {/* mobile - login */}
            <div className={`block md:hidden px-6 shadow-md transition-transform transDuration-500 ${translateY_topbar ? 'transform -translate-y-full' : ''}`}>
                <div className="flex-y-center justify-bwteen py-4">
                    {/* btn-end-navbar */}
                    <button id="dropdownDefaultButton" className="text-white focus:outline-none focus:ring-0 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-lightgray dark:hover:bg-lightgray dark:focus:ring-lightgray" type="button" data-drawer-target="drawer-end-navbar" data-drawer-toggle="drawer-end-navbar" aria-controls="drawer-end-navbar" data-drawer-body-scrolling="true" data-drawer-backdrop="true" data-drawer-placement="left">
                        <div className='w-24 me-6'><Link to='/'><img className='w-full' src={companyLogo} alt="logo-stock-squares" /></Link></div>
                        <FontAwesomeIcon icon={angleDown} className='text-primary ms-2' />
                        <span className="sr-only">Open main menu</span>
                    </button>
                    <div className='me-auto flex'>
                        <Link className='px-2'>
                            <p>{t('navbar.tryTradingForFree')}</p>
                        </Link>
                    </div>
                    <div className='ms-auto'>
                        {/* btn-start-user-settings */}
                        <div className='w-10 h-10 bg-primary opacity-50 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"' data-drawer-target="drawer-start-user-settings" data-drawer-toggle="drawer-start-user-settings" aria-controls="drawer-start-user-settings" data-drawer-body-scrolling="true" data-drawer-backdrop="true" data-drawer-placement="right"></div>
                    </div>
                </div>
                {/* drawer-end-navbar */}
                <div id="drawer-end-navbar" className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-2/3 shadow-2xl dark:bg-gray-800" tabIndex="-1" aria-labelledby="drawer-right-navbar-label">
                    <button type="button" data-drawer-hide="drawer-end-navbar" aria-controls="drawer-end-navbar" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <FontAwesomeIcon icon={xMark} className='text-xl hover:scale-110 transDuration-300' />
                        <span className="sr-only">Close menu</span>
                    </button>
                    <Link to='' className="space-x-1 sm:space-x-3 rtl:space-x-reverse">
                        <h1 className="self-center text-xl font-semibold whitespace-nowrap mb-2">{t('logo')}</h1>
                    </Link>
                    <ul className="text-sm font-medium flex flex-col">
                        <li className='p-2 hover:bg-lightgray'>
                            <NavLink to='training-and-education' className="">{t('navbar.investorPersonalitySurvey')}</NavLink>
                        </li>
                        <li className='p-2 hover:bg-lightgray'>
                            <NavLink to='training-and-education' className="">{t('navbar.chatAI')}</NavLink>
                        </li>
                        <li className='p-2 hover:bg-lightgray'>
                            <NavLink to='recorded-courses' className="">{t('navbar.tryTradingForFree')}</NavLink>
                        </li>
                        <li className='p-2 hover:bg-lightgray'>
                            <NavLink to='training-and-education' className="">{t('navbar.trainingAndEducation')}</NavLink>
                        </li>
                        <li className='p-2 hover:bg-lightgray'>
                            <NavLink to='recorded-courses' className="">{t('navbar.recordedCourses')}</NavLink>
                        </li>
                        <li className='p-2 hover:bg-lightgray'>
                            <NavLink to='finance-and-business-library' className="">{t('navbar.financeAndBusinessLibrary')}</NavLink>
                        </li>
                        {/* <li className='p-2 hover:bg-lightgray'>
                        <NavLink to='opportunities-and-recommendations' className="">{t('navbar.opportunitiesAndRecommendations')}</NavLink>
                    </li> */}
                        <li className='p-2 hover:bg-lightgray'>
                            <NavLink to='partner-application' className="">{t('navbar.partnerApplication')}</NavLink>
                        </li>
                    </ul>
                </div>
                {/* drawer-start-user-settings */}
                <div id="drawer-start-user-settings" className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-2/3 shadow-2xl dark:bg-gray-800" tabIndex="-1" aria-labelledby="drawer-right-navbar-label">
                    <button type="button" data-drawer-hide="drawer-start-user-settings" aria-controls="drawer-start-user-settings" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <FontAwesomeIcon icon={xMark} className='text-xl hover:scale-110 transDuration-300' />
                        <span className="sr-only">Close menu</span>
                    </button>
                    <Link to='' className="space-x-1 sm:space-x-3 rtl:space-x-reverse">
                        <h1 className="self-center text-xl font-semibold whitespace-nowrap mb-2">{t('logo')}</h1>
                    </Link>
                    <ul className="text-sm font-medium flex flex-col">
                        <li onClick={logoutFn} className='p-2 hover:bg-lightgray'>
                            <NavLink to='training-and-education' className="">{t('auth.signout')}</NavLink>
                        </li>
                    </ul>
                </div>
=======
                <div className='flex-x-between mt-2'>
                    <Button linkTo='' btnText={t('navbar.chatAI')} btnClassName='rounded-full px-4 py-2 mx-3' bgColor='primary'/>
                    <Button linkTo='try-trading-for-free' btnText={t('navbar.tryTradingForFree')} btnClassName='rounded-full py-2 mx-1' textColor='black' bgColor='accent'/>
                </div>
            </div>
        </div>
            {/* drawer-start-navbar */}
            <div id="drawer-start-navbar" className="fixed top-0 right-0 z-50 h-screen p-4 overflow-y-auto transition-transform transDuration-500 translate-x-full bg-white w-2/3 shadow-2xl dark:bg-gray-800" tabIndex="-1" aria-labelledby="dropdownNotLogin">
                <button type="button" data-drawer-hide="drawer-start-navbar" aria-controls="drawer-start-navbar" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <FontAwesomeIcon icon={xMark} className='text-xl hover:scale-110 transDuration-300'/>
                    <span className="sr-only">Close menu</span>
                </button>
                <Link to='' className="space-x-1 sm:space-x-3 rtl:space-x-reverse">
                    <h1 className="self-center text-xl font-semibold whitespace-nowrap mb-2">{t('logo')}</h1>
                </Link>
                <ul className="text-sm font-medium flex flex-col">
                    <li className='p-2 hover:bg-lightgray'>
                        <NavLink to='training-and-education' className="">{t('navbar.investorPersonalitySurvey')}</NavLink>
                    </li>
                    <li className='p-2 hover:bg-lightgray'>
                        <NavLink to='training-and-education' className="">{t('navbar.chatAI')}</NavLink>
                    </li>
                    <li className='p-2 hover:bg-lightgray'>
                        <NavLink to='recorded-courses' className="">{t('navbar.tryTradingForFree')}</NavLink>
                    </li>
                    <li className='p-2 hover:bg-lightgray'>
                        <NavLink to='training-and-education' className="">{t('navbar.trainingAndEducation')}</NavLink>
                    </li>
                    <li className='p-2 hover:bg-lightgray'>
                        <NavLink to='recorded-courses' className="">{t('navbar.recordedCourses')}</NavLink>
                    </li>
                    <li className='p-2 hover:bg-lightgray'>
                        <NavLink to='bookstore' className="">{t('navbar.financeAndBusinessLibrary')}</NavLink>
                    </li>
                    <li className='p-2 hover:bg-lightgray'>
                        <NavLink to='educational-blog' className="">{t('navbar.educationalBlog')}</NavLink>
                    </li>
                    {/* <li className='p-2 hover:bg-lightgray'>
                        <NavLink to='opportunities-and-recommendations' className="">{t('navbar.opportunitiesAndRecommendations')}</NavLink>
                    </li> */}
                    <li className='p-2 hover:bg-lightgray'>
                        <NavLink to='partner-application' className="">{t('navbar.partnerApplication')}</NavLink>
                    </li>
                    <li className='p-2 hover:bg-lightgray'>
                        <NavLink to='partner-application' className="">{t('auth.login')}</NavLink>
                    </li>
                    <li className='p-2 hover:bg-lightgray'>
                        <NavLink to='partner-application' className="">{t('auth.signup')}</NavLink>
                    </li>
                </ul>
            </div>
        </>}

        {userLogin !== null && isBelowMdBreakpoint && <>
            {/* {isBelowMdBreakpoint && <> */}
        {/* mobile - login */}
        <div className={`block md:hidden bg-white px-6 shadow-md transition-transform transDuration-500 ${translateY_topbar ? 'transform -translate-y-full' : ''}`}>
            <div className="py-4">
                <div className="flex-y-center justify-bwteen">
                    {/* btn-end-navbar */}
                    <button id="dropdownEndLogged" className="text-white focus:outline-none focus:ring-0 font-medium rounded-lg text-sm pe-5 py-2.5 text-center inline-flex items-center dark:bg-lightgray dark:hover:bg-lightgray dark:focus:ring-lightgray" type="button"
                    data-drawer-target="drawer-end-navbar" 
                    data-drawer-toggle="drawer-end-navbar" 
                    aria-controls="drawer-end-navbar" 
                    data-drawer-body-scrolling="true" 
                    data-drawer-backdrop="true"
                    data-drawer-placement="left"
                    data-dropdown-trigger="hover">
                        <div className='w-24 me-6'>
                            <Link><img className='w-full' src={companyLogo} alt="logo-stock-squares" /></Link>
                        </div>
                        <FontAwesomeIcon icon={angleDown} className='text-primary' />
                        <span className="sr-only">Open main menu</span>
                    </button>
                    <div className='ms-auto'>
                        {/* btn-start-user-settings */}
                        <div id="dropdownStartUserSettings" className='w-10 h-10 bg-primary opacity-50 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"'
                        data-drawer-target="drawer-start-user-settings" 
                        data-drawer-toggle="drawer-start-user-settings" 
                        aria-controls="drawer-start-user-settings" 
                        data-drawer-body-scrolling="true" 
                        data-drawer-backdrop="true"
                        data-drawer-placement="right"
                        data-dropdown-trigger="hover"></div>
                    </div>
                </div>
                <div>
                    <div className='flex-x-between mt-2'>
                        <Link className='border-2 rounded border-primary-800 px-3 py-2 hover:bg-primary-800 hover:text-white transDuration-300'>
                            <p>{t('navbar.investorPersonalitySurvey')}</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
            {/* drawer-end-navbar */}
            <div id="drawer-end-navbar" className="fixed top-0 left-0 z-50 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-2/3 shadow-2xl dark:bg-gray-800" tabIndex="-1" aria-labelledby="dropdownEndLogged">
                <button type="button" data-drawer-hide="drawer-end-navbar" aria-controls="drawer-end-navbar" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <FontAwesomeIcon icon={xMark} className='text-xl hover:scale-110 transDuration-300'/>
                    <span className="sr-only">Close menu</span>
                </button>
                <Link to='' className="space-x-1 sm:space-x-3 rtl:space-x-reverse">
                    <h1 className="self-center text-xl font-semibold whitespace-nowrap mb-2">{t('logo')}</h1>
                </Link>
                <ul className="text-sm font-medium flex flex-col">
                    <li className='p-2 hover:bg-lightgray'>
                        <NavLink to='training-and-education' className="">{t('navbar.investorPersonalitySurvey')}</NavLink>
                    </li>
                    <li className='p-2 hover:bg-lightgray'>
                        <NavLink to='training-and-education' className="">{t('navbar.chatAI')}</NavLink>
                    </li>
                    <li className='p-2 hover:bg-lightgray'>
                        <NavLink to='recorded-courses' className="">{t('navbar.tryTradingForFree')}</NavLink>
                    </li>
                    <li className='p-2 hover:bg-lightgray'>
                        <NavLink to='training-and-education' className="">{t('navbar.trainingAndEducation')}</NavLink>
                    </li>
                    <li className='p-2 hover:bg-lightgray'>
                        <NavLink to='recorded-courses' className="">{t('navbar.recordedCourses')}</NavLink>
                    </li>
                    <li className='p-2 hover:bg-lightgray'>
                        <NavLink to='finance-and-business-library' className="">{t('navbar.financeAndBusinessLibrary')}</NavLink>
                    </li>
                    {/* <li className='p-2 hover:bg-lightgray'>
                        <NavLink to='opportunities-and-recommendations' className="">{t('navbar.opportunitiesAndRecommendations')}</NavLink>
                    </li> */}
                    <li className='p-2 hover:bg-lightgray'>
                        <NavLink to='partner-application' className="">{t('navbar.partnerApplication')}</NavLink>
                    </li>
                </ul>
            </div>
            {/* drawer-start-user-settings */}
            <div id="drawer-start-user-settings" className="fixed top-0 right-0 z-50 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-2/3 shadow-2xl dark:bg-gray-800" tabIndex="-1" aria-labelledby="dropdownStartUserSettings">
                <button type="button" data-drawer-hide="drawer-start-user-settings" aria-controls="drawer-start-user-settings" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <FontAwesomeIcon icon={xMark} className='text-xl hover:scale-110 transDuration-300'/>
                    <span className="sr-only">Close menu</span>
                </button>
                <Link to='' className="space-x-1 sm:space-x-3 rtl:space-x-reverse">
                    <h1 className="self-center text-xl font-semibold whitespace-nowrap mb-2">{t('logo')}</h1>
                </Link>
                <ul className="text-sm font-medium flex flex-col">
                    <li onClick={logoutFn} className='p-2 hover:bg-lightgray'>
                        <NavLink to='training-and-education' className="">{t('auth.signout')}</NavLink>
                    </li>
                </ul>
>>>>>>> 4b237b7 (Your commit message)
            </div>
        </>}

        {/* tablet and laptop */}
        {isAboveMdBreakpoint && <>
<<<<<<< HEAD
            <div ref={ref_md} className={`hidden md:block px-6 bg-white transition-transform transDuration-500 ${translateY_topbar ? 'transform -translate-y-full' : ''}`}>
                <div className='flex-y-center justify-between py-3 border-b'>
                    <div className='w-24 lg:w-40 me-3'><Link to='/'><img className='w-full' src={companyLogo} alt="logo-stock-squares" /></Link></div>
                    <div className='me-auto flex-center'>
                        <Link to="/login" className="px-2">
                            <p>{t('auth.login')}</p>
                        </Link>

                        <Link className='border-2 rounded border-primary-800 px-3 py-2 hover:bg-primary-800 hover:text-white transDuration-300'>
                            <p>{t('navbar.investorPersonalitySurvey')}</p>
                        </Link>
                    </div>
                    <div className='ms-auto'>
                        {/* <Link className='btn-bg-primary-full px-4 me-3' role='button' >{t('navbar.investorPersonalitySurvey')}</Link> */}
                        <Button linkTo='' btnText={t('navbar.chatAI')} btnClassName='rounded-full px-3 py-2 mx-3' bgColor='primary' />
                        {/* <Link to='try-trading-for-free' className='btn-bg-accent-full px-4' role='button' >{t('navbar.tryTradingForFree')}</Link> */}
                        <Button linkTo='try-trading-for-free' btnText={t('navbar.tryTradingForFree')} btnClassName='rounded-full px-3 py-2 mx-1' textColor='black' bgColor='accent' />
                    </div>
                    {userLogin !== null && <>
                        <div className='ms-6'>
                            <div className='w-12 h-12 bg-primary opacity-50 rounded-full'></div>
                        </div>
                    </>}
                </div>
            </div>
=======
        <div ref={ref_md} className={`hidden md:block px-6 bg-white transition-transform transDuration-500 ${translateY_topbar ? 'transform -translate-y-full' : ''}`}>
            <div className='flex-y-center justify-between py-3 border-b'>
                <div className='w-24 lg:w-40 me-3'><Link to='/'><img className='w-full' src={companyLogo} alt="logo-stock-squares" /></Link></div>
                <div className='me-auto flex-center'>
                    <Link className='px-2'>
                        <p>{t('auth.login')}</p>
                    </Link>
                    <Link className='border-2 rounded border-primary-800 px-3 py-2 hover:bg-primary-800 hover:text-white transDuration-300'>
                        <p>{t('navbar.investorPersonalitySurvey')}</p>
                    </Link>
                </div>
                <div className='ms-auto'>
                    {/* <Link className='btn-bg-primary-full px-4 me-3' role='button' >{t('navbar.investorPersonalitySurvey')}</Link> */}
                    <Button linkTo='' btnText={t('navbar.chatAI')} btnClassName='rounded-full px-4 py-4 mx-3' bgColor='primary'/>
                    {/* <Link to='try-trading-for-free' className='btn-bg-accent-full px-4' role='button' >{t('navbar.tryTradingForFree')}</Link> */}
                    <Button linkTo='try-trading-for-free' btnText={t('navbar.tryTradingForFree')} btnClassName='rounded-full px-4 py-4 mx-1' textColor='black' bgColor='accent'/>
                </div>
                {userLogin !== null && <>
                <div className='ms-6'>
                    <div className='w-12 h-12 bg-primary opacity-50 rounded-full'></div>
                </div>
                </>}
            </div>
        </div>
>>>>>>> 4b237b7 (Your commit message)
        </>}
    </>
=======
import { Link, NavLink } from "react-router-dom";
import i18n from "../../../../utilities/i18n";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "../../../../Context/ThemeContext";
function LanguageToggleButton() {
    const { i18n } = useTranslation();
    const currentLang = i18n.language;
  
    const toggleLanguage = () => {
      const newLang = currentLang === "en" ? "ar" : "en";
      i18n.changeLanguage(newLang);
    };
  
    return (
      <button
        onClick={toggleLanguage}
        className="flex items-center justify-center px-4 mx-2 py-2 rounded-lg border-2 border-primary-800 bg-primary-800 text-white hover:bg-primary-700 transition-all duration-300"
        aria-label="Toggle Language"
      >
        {currentLang === "en" ? "AR" : "EN"}
      </button>
    );
  }
function ThemeToggleButton() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button 
      onClick={toggleTheme} 
      aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={`
        p-2 
        rounded-full 
        flex 
        items-center 
        justify-center
        ${isDarkMode 
            ? 'bg-gray-700 text-yellow-300' 
            : 'bg-gray-200 text-yellow-500'
        }
      `}
    >
      {isDarkMode ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
>>>>>>> b5a70da58cd6df67927d6f2467ce93c18ea77d0d
}

function SideNavigation({ isOpen, onClose, isLoggedIn }) {
  const { t } = useTranslation();
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Side Navigation */}
      <div 
        className={`
          fixed top-0 left-0 h-full w-64 
          ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}
          transform transition-transform duration-300 z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          shadow-lg
        `}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <div className="w-24">
            <Link to="/" onClick={onClose}>
              <img
                className="w-full"
                src={companyLogo}
                alt="logo-stock-squares"
              />
            </Link>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-600 hover:text-gray-900"
            aria-label="Close menu"
          >
            <FontAwesomeIcon icon={xMark} className="text-xl" />
          </button>
        </div>
        
        {/* Navigation Links */}
        <nav className="p-4 space-y-4">
          {/* REPEATED CONTENT: Identical to mobile menu links */}
          {!isLoggedIn && (
            <>
              <Link 
                to="/login" 
                className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                onClick={onClose}
              >
                {t("auth.login")}
              </Link>
              <Link 
                to="/survey" 
                className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                onClick={onClose}
              >
                {t("navbar.investorPersonalitySurvey")}
              </Link>
            </>
          )}
          
          <div className="border-t pt-4">
            {/* REPEATED CONTENT: Identical to desktop menu buttons */}
            <Button
              linkTo=""
              btnText={t("navbar.chatAI")}
              btnClassName="w-full rounded-full px-3 py-2 mb-2"
              bgColor="primary"
              onClick={onClose}
            />
            <Button
              linkTo="try-trading-for-free"
              btnText={t("navbar.tryTradingForFree")}
              btnClassName="w-full rounded-full px-3 py-2"
              textColor="black"
              bgColor="accent"
              onClick={onClose}
            />
          </div>
          
          <div className=" flex gap-3 mt-4 ">
          <LanguageToggleButton />
            <ThemeToggleButton />
          </div>
        </nav>
      </div>
    </>
  );
}

function Topbar({
  userLogin,
  logoutFn,
  ref_md,
  translateY_topbar,
  isBelowMdBreakpoint,
  isAboveMdBreakpoint,
}) {
  const { t } = useTranslation();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const renderMobileMenu = (isLoggedIn = false) => (
    <div
      className={`block md:hidden px-6 dark:bg-dark bg-white dark:bg-black shadow-md transition-transform transDuration-500 ${
        translateY_topbar ? "transform -translate-y-full" : ""
      }`}
    >
      <div className="flex-y-center dark:text-dark justify-between py-4">
        {/* REPEATED CONTENT: Logo section is identical in both mobile renders */}
        <div className="w-24 me-6">
          <Link to="/">
            <img
              className="w-full"
              src={companyLogo}
              alt="logo-stock-squares"
            />
          </Link>
        </div>
        
        {/* REDUNDANT navigation links - should be consolidated */}
        
        
        <div className="ms-auto flex items-center">
          <div className=" flex  mr-2 ">
          <LanguageToggleButton />
            <ThemeToggleButton />
          </div>
          
          {/* Mobile menu toggle button */}
          <button
            type="button"
            aria-label="Open Main Menu"
            onClick={() => setIsSideNavOpen(true)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100"
          >
            <FontAwesomeIcon
              icon={bars}
              className="text-xl hover:scale-110 transDuration-300"
            />
          </button>
        </div>
      </div>

      {/* Side navigation component */}
      <SideNavigation 
        isOpen={isSideNavOpen} 
        onClose={() => setIsSideNavOpen(false)}
        isLoggedIn={false}
      />
    </div>
  );

  return (
    <>
      {/* REDUNDANT mobile menu renders - can be simplified */}
      {isBelowMdBreakpoint && renderMobileMenu(true)}

      {isAboveMdBreakpoint && (
        <div
          ref={ref_md}
          className={`hidden md:block px-6 bg-white dark:bg-black transition-transform transDuration-500 ${
            translateY_topbar ? "transform -translate-y-full" : ""
          }`}
        >
          <div className="flex-y-center  justify-between py-3 border-b">
            <div className="w-24 lg:w-40 me-3">
              <Link to="/">
                <img
                  className="w-full"
                  src={companyLogo}
                  alt="logo-stock-squares"
                />
              </Link>
            </div>
            
            {/* Desktop navigation links */}
            <div className="me-auto  flex-center">
              <Link to="/login" className="px-2">
                <p>{t("auth.login")}</p>
              </Link>

              <Link className="border-2 rounded border-primary-800  px-3 py-2 hover:bg-primary-800 hover:text-white transDuration-300">
                <p>{t("navbar.investorPersonalitySurvey")}</p>
              </Link>
            </div>
            
            {/* Desktop action buttons */}
            <div className="ms-auto flex items-center">
            <LanguageToggleButton />
              <ThemeToggleButton />
              <Button
                linkTo=""
                btnText={t("navbar.chatAI")}
                btnClassName="rounded-full px-3 py-2 mx-3"
                bgColor="primary"
              />
              <Button
                linkTo="try-trading-for-free"
                btnText={t("navbar.tryTradingForFree")}
                btnClassName="rounded-full px-3 py-2 mx-1"
                textColor="black"
                bgColor="accent"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Topbar;