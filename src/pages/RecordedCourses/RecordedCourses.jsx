import React, { useContext, useEffect, useState } from 'react';

// Internal Imports (components, Assets and Styles)
import Style from './RecordedCourses.module.css';
import { search } from '../../assets';
import { AisleArticleLink, BlogArticleCard, Button, FlexibleCard, Sidebar } from '../../components';
import { AisleContext } from '../../Context';
import { ROUTES } from '../../routes';

// External libraries
import { Tabs, TextInput } from 'flowbite-react';

function RecordedCourses() {
    const {handleAisle} = useContext(AisleContext);



    useEffect(() => {
        
    }, []);

    return <>
        {/* <div className="min-h-screen"> */}
        <div className=''>
<<<<<<< HEAD
            <div className='bg-lightgray h-[60vh] flex-center'>
                <form className='w-full md:w-2/3 lg:w-1/2'>
                    <div className='flex justify-between'>
                        <TextInput id="emailToSubscibe" type="email" icon={search} className='input-parent grow me-4' placeholder="Search" />
                        <Button btnText='Search'bgColor='primary' px='px-8' />
                    </div>
                </form>
=======
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

>>>>>>> e7a6e37efe506aed563c657e6842d7b197940692
            </div>
            <div className="container">
                <div className='flex justify-between items-start'>
                    <div className='md:w-3/5 lg:w-3/4 p-4'>
                        <Tabs aria-label="Pills" variant="pills" className='flex-center' onActiveTabChange={handleAisle}>
                            <Tabs.Item active title="Popular">
<<<<<<< HEAD
                            <div className='rounded-lg bg-whitegrid flex-y-center justify-between'>
                                <div className='w-full md:w-1/2'><FlexibleCard isHorizontal={false} btnLinkTo={ROUTES.COURSE} /></div>
                                <div className='w-full md:w-1/2'><FlexibleCard isHorizontal={false} btnLinkTo={ROUTES.COURSE} /></div>
                                <div className='w-full md:w-1/2'><FlexibleCard isHorizontal={false} btnLinkTo={ROUTES.COURSE} /></div>
                                <div className='w-full md:w-1/2'><FlexibleCard isHorizontal={false} btnLinkTo={ROUTES.COURSE} /></div>
                            </div>
=======
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rounded-lg bg-white p-4">
                                     <div className="w-full"><FlexibleCard isHorizontal={false} btnLinkTo={ROUTES.COURSE} /></div>
                                        <div className="w-full"><FlexibleCard isHorizontal={false} btnLinkTo={ROUTES.COURSE} /></div>
                                         <div className="w-full"><FlexibleCard isHorizontal={false} btnLinkTo={ROUTES.COURSE} /></div>
                                        <div className="w-full"><FlexibleCard isHorizontal={false} btnLinkTo={ROUTES.COURSE} /></div>
                                     </div>

>>>>>>> e7a6e37efe506aed563c657e6842d7b197940692
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
<<<<<<< HEAD
                    <div className='md:w-2/5 lg:w-1/4 px-4 py-8'>
                        <Sidebar popularTitle='Popular Courses' recentTitle='Recent Courses' />
                    </div>
=======
                    <div className="hidden md:block md:w-2/5 lg:w-1/4 px-4 py-8">
                             <Sidebar popularTitle="Popular Courses" recentTitle="Recent Courses" />
                       </div>

>>>>>>> e7a6e37efe506aed563c657e6842d7b197940692
                </div>
            </div>
        </div>
    </>
}

export default RecordedCourses