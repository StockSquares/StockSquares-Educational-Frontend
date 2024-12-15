import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Internal Imports
import Style from './PracticalTrainingCard.module.css';
import { Button } from './../..';
import { chalkboardUser, clock, handHoldingDollar } from '../../../assets';
import { ROUTES } from '../../../routes';

function PracticalTrainingCard({ category = 'Stock Market' }) {
    const { t } = useTranslation();

    return (
        <div className="h-full p-2">
            {/* Top Section */}
            <div className="h-48 bg-primary-100 m-2 flex-center">
                <div className="font-bold text-primary">{category}</div>
            </div>

            {/* Details Section */}
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

                {/* Button or Link */}
                <Link 
                    to={ROUTES.TRAINING_AND_EDUCATION}
                    className="absolute end-4 bottom-5 px-2 bg-accent text-black"
                >
                    {t('sections.PracticalTraining.trainingCard.btn')}
                </Link>
            </div>
        </div>
    );
}

export default PracticalTrainingCard;
