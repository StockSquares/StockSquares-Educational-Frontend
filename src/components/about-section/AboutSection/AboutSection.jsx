import React, { useEffect } from 'react';

// Internal Imports (components, Assets, and Styles)
import Style from './AboutSection.module.css';
import { SectionCard } from '../../';
import { certificate, chalkboardUser, handHoldingDollar } from '../../../assets';

// External libraries
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AboutSection() {
    const { t } = useTranslation();

    useEffect(() => {
        // Add side effects here if needed
    }, []);

    return (
        <SectionCard heading={t('sections.about.title')} wrapperClass="wrapperClass-sectionCard">
            <div className="flex-y-center justify-between text-sm font-semibold text-center">
                {/* Feature 1 */}
                <div className="w-full md:w-1/3 px-1 mb-6 md:mb-0 hover:scale-105 transDuration-300">
                    <FontAwesomeIcon className="text-primary text-4xl" icon={handHoldingDollar} />
                    <p className="mb-0 mt-1 md:mt-4">
                        {t('sections.about.feature_1')}
                    </p>
                </div>

                {/* Feature 2 */}
                <div className="w-full md:w-1/3 px-1 mb-6 md:mb-0 hover:scale-105 transDuration-300">
                    <FontAwesomeIcon className="text-primary text-4xl" icon={chalkboardUser} />
                    <p className="mb-0 mt-1 md:mt-4">
                        {t('sections.about.feature_2')}
                    </p>
                </div>

                {/* Feature 3 */}
                <div className="w-full md:w-1/3 px-1 hover:scale-105 transDuration-300">
                    <FontAwesomeIcon className="text-primary text-4xl" icon={certificate} />
                    <p className="mb-0 mt-1 md:mt-4">
                        {t('sections.about.feature_3')}
                    </p>
                </div>
            </div>
        </SectionCard>
    );
}

export default AboutSection;
