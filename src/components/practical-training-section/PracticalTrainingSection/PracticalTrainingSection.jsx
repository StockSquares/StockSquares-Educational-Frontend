import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Internal Imports (components, Assets and Styles)
import Style from './PracticalTrainingSection.module.css';
import { SectionCard, PracticalTrainingCard } from '../..';
import { ROUTES } from '../../../routes';

function PracticalTrainingSection() {
    const { t } = useTranslation();

<<<<<<< HEAD


    useEffect(() => {
        
    }, []);

    return <>
        <SectionCard heading={t('sections.PracticalTraining.title')} headingBtn={t('sections.PracticalTraining.btn')} p6={false}>
            <div className='row'>
                <div className='w-full md:w-1/2 lg:w-1/4 md:border-e-2 md:border-primary'><PracticalTrainingCard /></div>
<<<<<<< HEAD
                <div className='w-full md:w-1/2 lg:w-1/4 hidden md:block lg:border-e-2 lg:border-primary'><PracticalTrainingCard /></div>
                <div className='w-full md:w-1/2 lg:w-1/4 hidden lg:block lg:border-e-2 lg:border-primary'><PracticalTrainingCard /></div>
                <div className='w-full md:w-1/2 lg:w-1/4 hidden lg:block'><PracticalTrainingCard /></div>
=======
                <div className='w-full md:w-1/2 lg:w-1/4 hidden md:block lg:border-e-2 lg:border-primary'><PracticalTrainingCard category='Finance' /></div>
                <div className='w-full md:w-1/2 lg:w-1/4 hidden lg:block lg:border-e-2 lg:border-primary'><PracticalTrainingCard category='Economy' /></div>
                <div className='w-full md:w-1/2 lg:w-1/4 hidden lg:block'><PracticalTrainingCard category='Trading' /></div>
>>>>>>> 4b237b7 (Your commit message)
=======
    return (
        <SectionCard 
            heading={t('sections.PracticalTraining.title')} 
            headingBtn={
                <Link to={ROUTES.TRAINING_AND_EDUCATION}>
                    {t('sections.PracticalTraining.btn')}
                </Link>
            }
            p6={false}
        >
            <div className="row">
                <div className="w-full md:w-1/2 lg:w-1/4 md:border-e-2 md:border-primary">
                    <PracticalTrainingCard />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 hidden md:block lg:border-e-2 lg:border-primary">
                    <PracticalTrainingCard />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 hidden lg:block lg:border-e-2 lg:border-primary">
                    <PracticalTrainingCard />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 hidden lg:block">
                    <PracticalTrainingCard />
                </div>
>>>>>>> b5a70da58cd6df67927d6f2467ce93c18ea77d0d
            </div>
        </SectionCard>
    );
}

export default PracticalTrainingSection;