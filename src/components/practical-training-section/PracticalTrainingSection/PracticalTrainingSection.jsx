import React, { useEffect, useState } from 'react';

// Internal Imports (components, Assets and Styles)
import Style from './PracticalTrainingSection.module.css';
import { SectionCard, PracticalTrainingCard } from '../..';

// External libraries
import { useTranslation } from 'react-i18next';

function PracticalTrainingSection() {
    const { t } = useTranslation();



    useEffect(() => {
        
    }, []);

    return <>
        <SectionCard heading={t('sections.PracticalTraining.title')} headingBtn={t('sections.PracticalTraining.btn')} p6={false}>
            <div className='row'>
                <div className='w-full md:w-1/2 lg:w-1/4 md:border-e-2 md:border-primary'><PracticalTrainingCard /></div>
                <div className='w-full md:w-1/2 lg:w-1/4 hidden md:block lg:border-e-2 lg:border-primary'><PracticalTrainingCard /></div>
                <div className='w-full md:w-1/2 lg:w-1/4 hidden lg:block lg:border-e-2 lg:border-primary'><PracticalTrainingCard /></div>
                <div className='w-full md:w-1/2 lg:w-1/4 hidden lg:block'><PracticalTrainingCard /></div>
            </div>
        </SectionCard>
    </>
}

export default PracticalTrainingSection