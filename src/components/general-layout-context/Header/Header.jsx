import React, { useContext, useEffect, useState } from 'react';

// Internal Imports (components, Assets and Styles)
import Style from './Header.module.css';
import { Navbar, Topbar } from '../..';
import { UserContext, ConfigContext } from '../../../Context';

// External libraries
import { useTranslation } from 'react-i18next';
import { useMeasure, useWindowSize } from '@uidotdev/usehooks';
import useDetectScroll from '@smakss/react-scroll-direction';

function Header({children}) {
    const { t } = useTranslation();
    const [ref_md, { height: height_md }] = useMeasure();
    const [ref_ul, { width: width_ul }] = useMeasure();
    const { scrollDir, scrollPosition } = useDetectScroll();
    const size = useWindowSize();
    const { breakpoints } = useContext(ConfigContext);
    //auto
    const {userLogin, setUserLogin} = useContext(UserContext);

    const isBelowMdBreakpoint = size.width < breakpoints.md.minWidth;
    const isAboveMdBreakpoint = size.width >= breakpoints.md.minWidth;
    const translateY_bar = scrollDir == 'down' && scrollPosition.top >= 500;
    const translateX_bar = (scrollDir == 'down' || scrollDir == 'up') && scrollPosition.top >= 500;
    
    function logout() {
        localStorage.removeItem('UserToken');
        setUserLogin(null);
        navigate('/');
    }

    useEffect(() => {
        
    }, []);

    return <>
        <header className={`sticky top-0 z-40`}>
            <Topbar userLogin={userLogin} logoutFn={logout} ref_md={ref_md} translateY_topbar={translateY_bar} isBelowMdBreakpoint={isBelowMdBreakpoint} isAboveMdBreakpoint={isAboveMdBreakpoint} />
            <Navbar ref_ul={ref_ul} width_ul={width_ul} height_md={height_md} translateY_navbar={translateY_bar} translateX_navbar={translateX_bar} isAboveMdBreakpoint={isAboveMdBreakpoint} />
        </header>
    </>
}

export default Header;