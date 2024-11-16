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
            <div className='bg-lightgray h-[60vh] flex-center'>
                <form className='w-full md:w-2/3 lg:w-1/2'>
                    <div className='flex justify-between'>
                        <TextInput id="emailToSubscibe" type="email" icon={search} className='input-parent grow me-4' placeholder="Search" />
                        <Button btnText='Search'bgColor='primary' px='px-8' />
                    </div>
                </form>
            </div>
            <div className="container">
                <div className='flex justify-between items-start'>
                    <div className='md:w-3/5 lg:w-3/4 p-4'>
                        <Tabs aria-label="Pills" variant="pills" className='flex-center' onActiveTabChange={handleAisle}>
                            <Tabs.Item active title="Popular">
                            <div className='rounded-lg bg-whitegrid flex-y-center justify-between'>
                                <div className='w-full md:w-1/2'><FlexibleCard isHorizontal={false} btnLinkTo={ROUTES.COURSE} /></div>
                                <div className='w-full md:w-1/2'><FlexibleCard isHorizontal={false} btnLinkTo={ROUTES.COURSE} /></div>
                                <div className='w-full md:w-1/2'><FlexibleCard isHorizontal={false} btnLinkTo={ROUTES.COURSE} /></div>
                                <div className='w-full md:w-1/2'><FlexibleCard isHorizontal={false} btnLinkTo={ROUTES.COURSE} /></div>
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
                    <div className='md:w-2/5 lg:w-1/4 px-4 py-8'>
                        <Sidebar popularTitle='Popular Courses' recentTitle='Recent Courses' />
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default RecordedCourses