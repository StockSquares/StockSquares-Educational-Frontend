import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  EgyptFlag,
  globalEconomy,
  entryLevel,
  advancedLevel,
  saudi,
  professionalLevel,
  bitcoin,
  bitcoinicon,
} from "../../../assets";
import style from "./PracticalTrainingSection.module.css";
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
        <Link to={ROUTES.JOIN_AS_TRAINER}>
          {t("sections.PracticalTraining.btn")}
        </Link>
      }
      p6={false}
    >
      <div className={`${style.slider} flex gap-4 `}>
        {/* Card 1 */}
        <div className={`flex-none ${style.card} w-[45%] lg:w-[50%]`}>
          <PracticalTrainingCard
            cardImg={entryLevel}
            title={
              <>
                دورة البورصة المصرية -{" "}
                <span className="shadow-xl text-green-400 font-bold">مبتدئ</span>
              </>
            }
            hours="٨ ساعات"
            price="٣٥٠٠"
            img={EgyptFlag}
          />
        </div>

        {/* Card 2 */}
        <div className={`flex-none ${style.card} w-[45%] lg:w-[50%]`}>
          <PracticalTrainingCard
            cardImg={advancedLevel}
            title={
              <>
                دورة البورصة السعودية -{" "}
                <span className="shadow-xl text-amber-400 font-bold">متقدم</span>
              </>
            }
            hours="١٢ ساعة"
            price="٥٥٠٠"
            img={saudi}
          />
        </div>

        {/* Card 3 */}
        <div className={`flex-none ${style.card} w-[45%] lg:w-[50%]`}>
          <PracticalTrainingCard
            cardImg={professionalLevel}
            title={
              <>
                دورة البورصة العالمية -{" "}
                <span className="shadow-xl text-red-600 font-bold">محترف</span>
              </>
            }
            hours="١٦ ساعة"
            price="٧٥٠٠"
            img={globalEconomy}
          />
        </div>

        {/* Card 4 */}
        <div className={`flex-none ${style.card} w-[45%] lg:w-[50%]`}>
          <PracticalTrainingCard
            cardImg={entryLevel}
            title={
              <>
                دورة العملات المشفرة -{" "}
                <span className="shadow-xl text-green-400 font-bold">مبتدئ</span>
              </>
            }
            hours="٨ ساعات"
            price="٣٥٠٠"
            img={bitcoinicon}
          />
        </div>
    
      </div>
    </SectionCard>
  );
}

export default PracticalTrainingSection;
