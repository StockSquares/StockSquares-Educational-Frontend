import React, { useEffect, useState } from 'react';

// Internal Imports (components, Assets and Styles)
// import Style from './VIPInvestorServicesSection.module.css';
import { Button, SectionCard } from '../../';
import TestimonialsSection from '../../testimonials-section/TestimonialsSection/TestimonialsSection'
// External libraries
import { useTranslation } from 'react-i18next';

function VipInvestorServicesSection() {
    const { t } = useTranslation();
    // Dynamic investment amount (retrieved from API or admin settings)
    const minInvestment = "50.000";



    useEffect(() => {

    }, []);

    return <>
        <SectionCard heading={t('sections.vipServices.title')}>
            <p className='text-xl font-semibold leading-tight mb-2'>{t('sections.vipServices.content_1')}<br />{t('sections.vipServices.content_2')}</p>
            <div className='row items-baseline'>
                <Button btnText={t('sections.vipServices.btn')} btnClassName='me-3' textColor='black' bgColor='accent' />
                <div className='text-xs mt-2 md:mt-0'>
                    <span className='me-1.5'>{t('sections.vipServices.note', { minInvestment })}</span>
                </div>
            </div>
        </SectionCard>
        {/* <TestimonialsSection/> */}
    </>
}

export default VipInvestorServicesSection