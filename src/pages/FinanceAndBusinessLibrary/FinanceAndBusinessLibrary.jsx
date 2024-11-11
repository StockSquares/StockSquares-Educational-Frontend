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
<<<<<<< HEAD

function FinanceAndBusinessLibrary() {
    const { t } = useTranslation();
    const {handleAisle} = useContext(AisleContext);

    useEffect(() => {

    }, []);

    return <>
        <h1>Bookstore - buy educational books</h1>
    </>
}

=======
import { ROUTES } from '../../routes';
import { search } from '../../assets';


function FinanceAndBusinessLibrary() {
        const {handleAisle} = useContext(AisleContext);
    
    
    
        useEffect(() => {
            
        }, []);
    
        return <>
            {/* <div className="min-h-screen"> */}
            <div className=''>
                <div className=' bg-lightgray h-[30vh] flex-center'>
                <form className="w-full md:w-2/3 lg:w-1/2">
        <div className="flex flex-col md:flex-row justify-between gap-2">
            <TextInput
                id="emailToSubscibe"
                type="email"
                icon={search}
                className="input-parent grow mb-2 md:mb-0 me-0 md:me-4"
                placeholder="Search"
            />
            <Button btnText="Search" bgColor="primary" px="px-8" />
        </div>
    </form>
    
                </div>
                <div className="container">
                    <div className='flex justify-between items-start'>
                        <div className='md:w-3/5 lg:w-3/4 p-4'>
                            <Tabs aria-label="Pills" variant="pills" className='flex-center' onActiveTabChange={handleAisle}>
                                <Tabs.Item active title="Popular">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rounded-lg bg-white p-4">
                                         <div className="w-full"><FlexibleCard isHorizontal={false} btnLinkTo={ROUTES.BOOKSTORE} /></div>
                                            <div className="w-full"><FlexibleCard isHorizontal={false} btnLinkTo={ROUTES.BOOKSTORE} /></div>
                                             <div className="w-full"><FlexibleCard isHorizontal={false} btnLinkTo={ROUTES.BOOKSTORE} /></div>
                                            <div className="w-full"><FlexibleCard isHorizontal={false} btnLinkTo={ROUTES.BOOKSTORE} /></div>
                                         </div>
    
                                </Tabs.Item>
                                <Tabs.Item title="Recent">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Content 2</p>
                                </Tabs.Item>
                                <Tabs.Item title="Economy">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Content 3</p>
                                </Tabs.Item>
                                <Tabs.Item title="Stock Market">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Content 4</p>
                                </Tabs.Item>
                                <Tabs.Item title="Finance">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Content 5</p>
                                </Tabs.Item>
                            </Tabs>
                        </div>
                        <div className="hidden md:block md:w-2/5 lg:w-1/4 px-4 py-8">
                                 <Sidebar popularTitle="Popular Books" recentTitle="Recent Books" />
                           </div>
    
                    </div>
                </div>
            </div>
        </>
    }
>>>>>>> 4b237b7 (Your commit message)
export default FinanceAndBusinessLibrary
