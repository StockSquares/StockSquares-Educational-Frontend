import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
=======

>>>>>>> e7a6e37efe506aed563c657e6842d7b197940692
// Internal Imports (components, Assets and Styles)
import Style from './PracticalTrainingCard.module.css';
import { Button } from './../..';
import { chalkboardUser, circleUser, clock, handHoldingDollar } from '../../../assets';
<<<<<<< HEAD
// External libraries
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ROUTES } from '../../../routes';

function PracticalTrainingCard() {
    const { t } = useTranslation();
=======

// External libraries
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PracticalTrainingCard() {
    const  { t } = useTranslation();
>>>>>>> e7a6e37efe506aed563c657e6842d7b197940692



    useEffect(() => {
<<<<<<< HEAD

=======
        
>>>>>>> e7a6e37efe506aed563c657e6842d7b197940692
    }, []);

    return <>
        <div className='h-full p-2'>
            <div className='h-48 bg-gray m-2'>
                {/* aspect ratio for img */}
<<<<<<< HEAD
                <div className=''></div>
=======
                <div className=''></div> 
>>>>>>> e7a6e37efe506aed563c657e6842d7b197940692
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
<<<<<<< HEAD

                <Link to={ ROUTES.TRAINING_AND_EDUCATION} className="absolute end-4 bottom-5 px-2 bg-accent text-black" > {t('sections.PracticalTraining.trainingCard.btn')} 
                </Link>


=======
                <Button btnText={t('sections.PracticalTraining.trainingCard.btn')} btnClassName='absolute end-4 bottom-5' textColor='black' bgColor='accent' px='px-2' />
                
>>>>>>> e7a6e37efe506aed563c657e6842d7b197940692
            </div>
        </div>
    </>
}

export default PracticalTrainingCard