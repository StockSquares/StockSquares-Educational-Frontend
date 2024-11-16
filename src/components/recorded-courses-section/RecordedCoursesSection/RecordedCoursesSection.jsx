import React, { useEffect, useState } from 'react';

// Internal Imports (components, Assets and Styles)
import Style from './RecordedCoursesSection.module.css';
import { RecordedCourseCard, SectionCard } from '../..';

// External libraries
import { useTranslation } from 'react-i18next';

function RecordedCoursesSection() {
    const { t } = useTranslation();



    useEffect(() => {
        
    }, []);

    return <>
        <SectionCard heading={t('sections.recordedCourses.title')}>
            <RecordedCourseCard />
        </SectionCard>
        <div className='bg-lightgray text-center mt-2'>
            <h2 className='font-semibold pt-3'>{t('sections.recordedCourses.stockOffers.title')}</h2>
            <div className='row py-8 px-4'>
                <div className='w-full sm:w-1/2 md:w-1/4 lg:w-1/6 px-1'><div className='border-2 border-gray rounded-2xl min-h-16'></div></div>
                <div className='sm:w-1/2 md:w-1/4 lg:w-1/6 hidden sm:block px-1'><div className='border-2 border-gray rounded-2xl min-h-16'></div></div>
                <div className='sm:w-1/2 md:w-1/4 lg:w-1/6 hidden md:block px-1'><div className='border-2 border-gray rounded-2xl min-h-16'></div></div>
                <div className='sm:w-1/2 md:w-1/4 lg:w-1/6 hidden md:block px-1'><div className='border-2 border-gray rounded-2xl min-h-16'></div></div>
                <div className='sm:w-1/2 md:w-1/4 lg:w-1/6 hidden lg:block px-1'><div className='border-2 border-gray rounded-2xl min-h-16'></div></div>
                <div className='sm:w-1/2 md:w-1/4 lg:w-1/6 hidden lg:block px-1'><div className='border-2 border-gray rounded-2xl min-h-16'></div></div>
            </div>
        </div>
    </>
}

export default RecordedCoursesSection