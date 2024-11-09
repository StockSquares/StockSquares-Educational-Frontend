import React, { useContext, useEffect, useState } from 'react';

// Internal Imports (components, Assets and Styles)
import Style from './Blog.module.css';
import { adjustments, clipboardList, dashboard, search, userCircle } from '../../assets';
import { FlexibleCard, Sidebar, Button } from '../../components';
import { AisleContext } from '../../Context';
import { ROUTES } from '../../routes';

// External libraries
import { useTranslation } from 'react-i18next';
import { Tabs, TextInput } from "flowbite-react";

function Blog() {
    const { t } = useTranslation();
    const {handleAisle} = useContext(AisleContext);

    useEffect(() => {

    }, []);

    return <>
        {/* <div className="min-h-screen bg-gray-50"> */}
        <div className="bg-gray-50">
            <div className='bg-primary-50 h-[30vh] flex-center p-4 mb-6'>
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
            <div className='container'>
                <div className='flex justify-between items-start'>
                    <div className='md:w-3/5 lg:w-3/4 lg:pe-5'>
                        <Tabs aria-label="Tabs with icons" variant="underline" onActiveTabChange={handleAisle}>
                            <Tabs.Item active title="Popular" icon={userCircle}>
                                <FlexibleCard btnLinkTo={ROUTES.ARTICLE}/>
                                <FlexibleCard btnLinkTo={ROUTES.ARTICLE}/>
                            </Tabs.Item>
                            <Tabs.Item title="Recent" icon={dashboard}>
                                This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</span>.
                                Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                                control the content visibility and styling.
                            </Tabs.Item>
                            <Tabs.Item title="Economy" icon={adjustments}>
                                This is <span className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</span>.
                                Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                                control the content visibility and styling.
                            </Tabs.Item>
                            <Tabs.Item title="Stock Market" icon={clipboardList}>
                                This is <span className="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</span>.
                                Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                                control the content visibility and styling.
                            </Tabs.Item>
                            <Tabs.Item title="Finance">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere architecto officia excepturi distinctio, laborum obcaecati atque, corporis nulla est minus enim dolorem dolorum odit laboriosam blanditiis totam laudantium. Repellat, ex odio. Reiciendis provident quisquam repellendus sapiente, officia, impedit aliquid perspiciatis quod sunt accusantium dolor rerum soluta aliquam fugit veritatis doloremque.
                            </Tabs.Item>
                        </Tabs>
<<<<<<< HEAD
                    
                </div>
                <div className="hidden md:block md:w-2/5 lg:w-1/4 px-4 py-8">
                                 <Sidebar popularTitle="Popular Articles" recentTitle="Recent Articles" />
                           </div>
            </div>
        </div>
        </div>
        
=======
                    </div>
                    <div className='hidden md:block md:w-2/5 lg:w-1/4 px-4 py-8'>
                        <Sidebar popularTitle='Popular Articles' recentTitle='Recent Articles' />
                    </div>
                </div>
            </div>
        </div>
>>>>>>> 4b237b7 (Your commit message)
    </>
}

export default Blog
