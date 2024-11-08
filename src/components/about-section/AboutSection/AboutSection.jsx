import React, { useEffect, useState } from 'react';

// Internal Imports (components, Assets and Styles)
import Style from './AboutSection.module.css';
import { SectionCard } from '../../';
import { certificate, chalkboardUser, handHoldingDollar } from '../../../assets';

// External libraries
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AboutSection() {
    const { t } = useTranslation();
    // States to make Admin able to change content from their Dashboard

    useEffect(() => {
        
    }, []);

    return <>
        <SectionCard heading={t('sections.about.title')} wrapperClass='wrapperClass-sectionCard'>
            <div className='flex-y-center justify-between text-sm font-semibold text-center '>
                <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0 hover:scale-105 transDuration-300'>
                    {/* <div className='md:px-10'><img src={img} alt="" className='w-full' /></div> */}
                    <FontAwesomeIcon className='text-primary text-4xl' icon={handHoldingDollar} />
                    <p className='inline-block mb-0 mt-1 md:mt-4'>{t('sections.about.feature_1')}</p>
                </div>
                <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0 hover:scale-105 transDuration-300'>
                    {/* <div className='md:px-10'><img src={img} alt="" className='w-full' /></div> */}
                    <FontAwesomeIcon className='text-primary text-4xl' icon={chalkboardUser} />
                    <p className='mb-0 mt-1 md:mt-4'>{t('sections.about.feature_2')}</p>
                </div>
                <div className='w-full md:w-1/3 px-3 hover:scale-105 transDuration-300'>
                    {/* <div className='md:px-10'><img src={img} alt="" className='w-full' /></div> */}
                    <FontAwesomeIcon className='text-primary text-4xl' icon={certificate} />
                    <p className='mb-0 mt-1 md:mt-4'>{t('sections.about.feature_3')}</p>
                </div>
            </div>
        </SectionCard>
    </>
}

export default AboutSection