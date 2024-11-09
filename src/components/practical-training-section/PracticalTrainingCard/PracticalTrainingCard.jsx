import React, { useEffect, useState } from 'react';

// Internal Imports (components, Assets and Styles)
import Style from './PracticalTrainingCard.module.css';
import { Button } from './../..';
import { chalkboardUser, circleUser, clock, handHoldingDollar } from '../../../assets';

// External libraries
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

<<<<<<< HEAD
function PracticalTrainingCard() {
=======
function PracticalTrainingCard({category = 'Stock Market'}) {
>>>>>>> 4b237b7 (Your commit message)
    const  { t } = useTranslation();



    useEffect(() => {
        
    }, []);

    return <>
        <div className='h-full p-2'>
<<<<<<< HEAD
            <div className='h-48 bg-gray m-2'>
                {/* aspect ratio for img */}
                <div className=''></div> 
=======
            <div className='h-48 bg-primary-100 m-2 flex-center'>
                {/* aspect ratio for img */}
                <div className='font-bold text-primary'>{category}</div> 
>>>>>>> 4b237b7 (Your commit message)
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
<<<<<<< HEAD
                
=======
>>>>>>> 4b237b7 (Your commit message)
            </div>
        </div>
    </>
}

export default PracticalTrainingCard