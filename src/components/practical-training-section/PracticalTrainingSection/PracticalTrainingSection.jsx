import React, { useEffect, useState } from 'react';

// Internal Imports (components, Assets and Styles)
import Style from './PracticalTrainingSection.module.css';
import { SectionCard, PracticalTrainingCard } from '../..';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
// External libraries
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../../routes';
=======

// External libraries
import { useTranslation } from 'react-i18next';
>>>>>>> e7a6e37efe506aed563c657e6842d7b197940692

function PracticalTrainingSection() {
    const { t } = useTranslation();



    useEffect(() => {
<<<<<<< HEAD

    }, []);

    return <>
        <SectionCard heading={t('sections.PracticalTraining.title')} headingBtn={<Link to={ ROUTES.TRAINING_AND_EDUCATION} >
            {t('sections.PracticalTraining.btn')}
        </Link>}
            p6={false}>
=======
        
    }, []);

    return <>
        <SectionCard heading={t('sections.PracticalTraining.title')} headingBtn={t('sections.PracticalTraining.btn')} p6={false}>
>>>>>>> e7a6e37efe506aed563c657e6842d7b197940692
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