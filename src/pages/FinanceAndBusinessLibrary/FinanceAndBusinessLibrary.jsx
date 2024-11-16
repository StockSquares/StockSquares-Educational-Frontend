import React, { useContext, useEffect, useState } from 'react';

// Assets and styles
import Style from './FinanceAndBusinessLibrary.module.css';

// External libraries
import { AisleCard, AisleNav, FlexibleCard, Sidebar, Button } from '../../components';
import { Tabs, TextInput } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiMail, HiSearch, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { AisleContext } from '../../Context/AisleContext';
import { useTranslation } from 'react-i18next';

function FinanceAndBusinessLibrary() {
    const { t } = useTranslation();
    const {handleAisle} = useContext(AisleContext);

    useEffect(() => {

    }, []);

    return <>
        <h1>Bookstore - buy educational books</h1>
    </>
}

export default FinanceAndBusinessLibrary
