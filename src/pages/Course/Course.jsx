import React, { useEffect, useState } from 'react';

// Internal Imports (components, Assets and Styles)
import { SecondaryInfo, Sidebar } from '../../components';
import { ROUTES } from '../../routes';

// External libraries
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Dropdown } from 'flowbite-react';

function Course() {
    const { t } = useTranslation();



    useEffect(() => {
        
    }, []);

    return <>
        <div className="bg-gray-50 pb-8">
            <div className='bg-primary-50 h-[50vh] flex-center p-4 mb-6'>
                <div className='w-full md:w-2/3 lg:w-1/2'>
                    <div className="flex-center flex-col">
                        <h2>Course Title</h2>
                        <h2>Course topic/category</h2>
                        <p>Course Writer</p>
                        <p>Course episodes number</p>
                        <p>Course duration</p>
                        <SecondaryInfo />
                    </div>
                </div>
            </div>
            <div className='flex-center pb-4'>
                {/* <!-- Breadcrumb --> */}
                <nav className="breadcrumb flex justify-between" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center mb-3 sm:mb-0">
                        <li>
                            <Link to={ROUTES.HOME}>{t('navbar.home')}</Link>
                        </li>
                        <span className="mx-2 text-gray-400">/</span>
                        <li>
                        <Dropdown label={t('navbar.recordedCourses')} inline>
                            <Dropdown.Item>Category-1</Dropdown.Item>
                            <Dropdown.Item>Category-2</Dropdown.Item>
                            <Dropdown.Item>Category-3</Dropdown.Item>
                            <Dropdown.Item>Category-4</Dropdown.Item>
                        </Dropdown>
                        </li>
                        <span className="mx-2 text-gray-400">/</span>
                        <li>
                            <span>Course title with dots bec...</span>
                        </li>
                    </ol>
                </nav>
            </div>
            <div className='container'>
                <div className='flex-x-between items-start'>
                    <div className='w-full md:w-9/12 lg:w-3/4 lg:pe-5'>
                        <div className='p-4 border'>
                            <div> {/* course description */}
                                <div className='pb-4' id='content'>course description</div>
                            </div>
                            <div className='flex-x-between border-t py-8'> {/* article writer */}
                                <div className='md:w-1/4 flex-center'>
                                    <div className='bg-primary-300 w-16 h-16 md:w-28 md:h-28 rounded-full outline outline-offset-4 outline-primary-300'><img src="" alt="writer-picture" /></div>
                                </div>
                                <div className='md:w-3/4 px-4 me-auto'>
                                    <h4>writer</h4>
                                    <p>writer description</p>
                                    <div>
                                        social contacts
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='p-4'>
                            course videos
                        </div>
                    </div>
                    <div className='w-full md:w-3/12 lg:w-1/4 px-4 sticky top-28'>
                        <div className='border-s-2 mb-8 shadow-sm py-4'>
                            <h4 className='font-semibold ps-4'>subscribe</h4>
                        </div>
                        <Sidebar recentTitle='Also learn' />
                    </div>
                </div>
                <div className='my-8 bg-primary-100 p-4'>
                    <div>
                        <h4>Related Articles</h4>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Course