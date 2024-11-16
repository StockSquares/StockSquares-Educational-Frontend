import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Internal Imports (components, Assets and Styles)
import Style from './PracticalTrainingCard.module.css';
import { Button } from './../..';
import { chalkboardUser, circleUser, clock, handHoldingDollar } from '../../../assets';
// External libraries
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ROUTES } from '../../../routes';

function PracticalTrainingCard() {
    const { t } = useTranslation();



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

                <Link to={ ROUTES.TRAINING_AND_EDUCATION} className="absolute end-4 bottom-5 px-2 bg-accent text-black" > {t('sections.PracticalTraining.trainingCard.btn')} 
                </Link>


            </div>
        </div>
    </>
}

export default PracticalTrainingCard