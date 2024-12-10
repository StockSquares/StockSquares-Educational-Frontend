import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

<<<<<<< HEAD
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
=======
// Internal Imports
import Style from './PracticalTrainingCard.module.css';
import { Button } from './../..';
import { chalkboardUser, circleUser, clock, handHoldingDollar } from '../../../assets';
import { ROUTES } from '../../../routes';

function PracticalTrainingCard() {
    const { t } = useTranslation();

    return (
        <div className="h-full p-2">
            <div className="h-48 bg-gray m-2">
                {/* aspect ratio for img */}
                <div className=""></div>
>>>>>>> b5a70da58cd6df67927d6f2467ce93c18ea77d0d
            </div>
            <div className="bg-darkgray text-white p-2 relative">
                <ul>
                    <li className="flex-y-center">
                        <FontAwesomeIcon className="p-1.5" icon={chalkboardUser} />
                        <span>دورة البوصة المصرية-مبتدئ</span>
                    </li>
                    <li className="flex-y-center">
                        <FontAwesomeIcon className="p-1.5" icon={clock} />
                        <span>21 ساعة</span>
                    </li>
                    <li className="flex-y-center">
                        <FontAwesomeIcon className="p-1.5" icon={handHoldingDollar} />
                        <span>4500 جنيه</span>
                    </li>
                </ul>
<<<<<<< HEAD
                <Button btnText={t('sections.PracticalTraining.trainingCard.btn')} btnClassName='absolute end-4 bottom-5' textColor='black' bgColor='accent' px='px-2' />
<<<<<<< HEAD
                
=======
>>>>>>> 4b237b7 (Your commit message)
=======
                <Link 
                    to={ROUTES.TRAINING_AND_EDUCATION} 
                    className="absolute end-4 bottom-5 px-2 bg-accent text-black"
                >
                    {t('sections.PracticalTraining.trainingCard.btn')}
                </Link>
>>>>>>> b5a70da58cd6df67927d6f2467ce93c18ea77d0d
            </div>
        </div>
    );
}

export default PracticalTrainingCard;