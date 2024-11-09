import React, { useEffect, useState } from 'react';

// Internal Imports (components, Assets and Styles)
import Style from './PracticalTrainingCard.module.css';
import { Button } from './../..';
import { chalkboardUser, circleUser, clock, handHoldingDollar } from '../../../assets';

// External libraries
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PracticalTrainingCard() {
    const  { t } = useTranslation();



    useEffect(() => {
        
    }, []);

    return <>
        <div className='h-full p-2'>
            <div className='h-48 bg-gray m-2'>
                {/* aspect ratio for img */}
                <div className=''></div> 
            </div>
            <div className='bg-darkgray text-white p-2 relative'>
                <ul>
                    <li className='flex-y-center'>
                        <FontAwesomeIcon className='p-1.5' icon={chalkboardUser} />
                        <span>دورة البوصة المصرية-مبتدئ</span>
                    </li>
                    {/* <li className='flex-y-center'>
                        <FontAwesomeIcon className='p-1.5' icon={circleUser} />
                        <span>اسم المدرب</span>
                    </li> */}
                    <li className='flex-y-center'>
                        <FontAwesomeIcon className='p-1.5' icon={clock} />
                        <span>21 ساعة</span>
                    </li>
                    <li className='flex-y-center'>
                        <FontAwesomeIcon className='p-1.5' icon={handHoldingDollar} />
                        <span>4500 جنيه</span>
                    </li>
                </ul>
                <Button btnText={t('sections.PracticalTraining.trainingCard.btn')} btnClassName='absolute end-4 bottom-5' textColor='black' bgColor='accent' px='px-2' />
                
            </div>
        </div>
    </>
}

export default PracticalTrainingCard