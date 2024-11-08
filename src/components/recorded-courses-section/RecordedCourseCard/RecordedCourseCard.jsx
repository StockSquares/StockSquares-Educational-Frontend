import React, { useEffect, useState } from 'react';

// Internal Imports (components, Assets and Styles)
import Style from './RecordedCourseCard.module.css';
import { Button } from './../..';
import { circleUser, clock, companyLogo, instructorPhoto } from './../../../assets';

// External libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

function RecordedCourseCard() {
    const { t } = useTranslation();



    useEffect(() => {
        
    }, []);

    return <>
        <div className='bg-neutral-200 text-sm font-bold rounded-sm p-4 row justify-between'>
            <div className='w-full md:w-1/2'>
                <div className='mb-6'>
                    <div className='w-20'><img className='w-full' src={companyLogo} alt="logo-stock-squares" /></div>
                </div>
                <span className='bg-primary text-white px-3'>أبدأ بناء مستقبل مالي قوي</span>
                <p className='pt-2'>تعلم تداول الأسهم والعملات والذهب</p>
                <div className='mt-12'>
                    <h4>أ/طارق الليثي</h4>
                    <div className='flex flex-col w-fit py-1.5 border-b-2 border-primary'>
                        <span className='text-xs'>مستشار استثمار ومدرب معتمد</span>
                        <span className='text-xs'>استشاري تطوير الأعمال في عدة شركات مالية</span>
                    </div>
                </div>
            </div>
            <div className='w-full md:w-1/2 flex-center translate-y-4 md:relative'>
            
                <div className='md:absolute bottom-0'>
                    <div className='relative overflow-hidden before:content[""] before:absolute before:bg-primary-light before:opacity-20 before:w-[80%] before:h-[80%] before:rounded-full before:-z-10 before:end-0 before:-bottom-5 after:content[""] after:absolute after:bg-neutral-300 after:w-[60%] after:h-[60%] after:rounded-full after:-z-10 after:start-0 after:-bottom-3'>
                        <img className='h-auto w-auto object-contain' src={instructorPhoto} alt="personal-img" /> 
                        {/* the img's size = 250 * 250 */}
                    </div>
                </div>
            </div>
        </div>

        <div className='flex-y-center justify-between mt-6'>
            <div>
                <h3 className='mb-3'>أساسيات الاستثمار والتداول في الأسواق المالية</h3>
                <ul className='row'>
                    <li className='flex-y-center pe-10'>
                        <FontAwesomeIcon className='px-2' icon={circleUser} />
                        <span>أ/طارق الليثي</span>
                    </li>
                    <li className='flex-y-center'>
                        <FontAwesomeIcon className='px-2' icon={clock} />
                        <span>55 دقيقة</span>
                    </li>
                </ul>
            </div>
            <div className='mt-3 sm:mt-0 mx-auto md:me-0'><Button btnText={t('sections.recordedCourses.courseSection.courseCard.btn')} textColor='black' bgColor='accent' px='px-6 md:px-8' /></div>
        </div>
    </>
}

export default RecordedCourseCard