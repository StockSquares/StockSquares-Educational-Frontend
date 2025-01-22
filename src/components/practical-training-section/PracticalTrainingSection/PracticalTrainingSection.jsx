import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { EgyptFlag, globalEconomy, entryLevel, advancedLevel } from "../../../assets";

// Internal Imports (components, Assets, and Styles)
import Style from "./PracticalTrainingSection.module.css";
import { SectionCard, PracticalTrainingCard } from "../..";
import { ROUTES } from "../../../routes";

function PracticalTrainingSection() {
  const { t } = useTranslation();

  return (
    <SectionCard
      heading={t("sections.PracticalTraining.title")}
      headingBtn={
        <Link to={ROUTES.TRAINING_AND_EDUCATION}>
          {t("sections.PracticalTraining.btn")}
        </Link>
      }
      p6={false}
    >
      <div className="row">
        {/* Card 1 */}
        <div className="w-full md:w-1/2 lg:w-1/4 md:border-e-2 md:border-primary">
          <PracticalTrainingCard
            cardImg={entryLevel}
            title={<> دورة البورصة المصرية - <span className="text-green-400 font-bold shadow-xl">مبتدئ</span></>}
            hours="٨ "
            price="٣٥٠٠"
            img={EgyptFlag}

          />
        </div>

        {/* Card 2 */}
        <div className="w-full md:w-1/2 lg:w-1/4 hidden lg:block lg:border-e-2 lg:border-primary">
          <PracticalTrainingCard
            cardImg={entryLevel}
            title={<> دورة البورصة العالميه - <span className="text-green-400 font-bold shadow-xl">مبتدئ</span></>}
            hours="٨ "
            price="٣٥٠٠"
            img={globalEconomy}
          />
        </div>

        {/* Card 3 */}

        <div className="w-full md:w-1/2 lg:w-1/4 hidden md:block lg:border-e-2 lg:border-primary">
          <PracticalTrainingCard
            cardImg={advancedLevel}
            title={<> دورة البورصة المصريه - <span className="text-amber-400 font-bold shadow-xl">متقدم</span></>}
            hours="١٦"
            price="٥٥٠٠"
            img={EgyptFlag}
          />
        </div>

        {/* Card 4 */}
        <div className="w-full md:w-1/2 lg:w-1/4 hidden lg:block">
          <PracticalTrainingCard
            cardImg={advancedLevel}
            title={<> دورة البورصة العالميه - <span className="text-amber-400 font-bold shadow-xl">متقدم</span></>}
            hours="١٦"
            price="٥٥٠٠"
            img={globalEconomy}
          />
        </div>
      </div>
    </SectionCard>
  );
}

export default PracticalTrainingSection;
