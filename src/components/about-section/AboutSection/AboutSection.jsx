import React, { useEffect } from "react";

// Internal Imports (components, Assets, and Styles)
import Style from "./AboutSection.module.css";
import { SectionCard } from "../../";
import {
  certificate,
  chalkboardUser,
  handHoldingDollar,
} from "../../../assets";

import { faLightbulb, faFaceGrinStars } from "@fortawesome/free-regular-svg-icons";

// External libraries
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AboutSection() {
  const { t } = useTranslation();

  useEffect(() => {
    // Add side effects here if needed
  }, []);

  return (
    <SectionCard
      heading={t("sections.about.title")}
      wrapperClass="wrapperClass-sectionCard"
    >
      <div className="flex items-center mb-5 gap-6 text-sm font-semibold text-center w-full dark:text-black">
        {/* Feature 1 */}
        <div className="w-full px-1  md:mb-0 hover:scale-105 transDuration-300">
          <FontAwesomeIcon
            className="text-primary text-4xl"
            icon={handHoldingDollar}
          />
          <p className="mt-6">{t("sections.about.feature_1")}</p>
        </div>

        {/* Feature 2 */}
        <div className="w-full px-1 max-md:mt-4  hover:scale-105 transDuration-300">
          <FontAwesomeIcon
            className="text-primary text-4xl"
            icon={chalkboardUser}
          />
          <p className="mt-6">{t("sections.about.feature_2")}</p>
        </div>

        {/* Feature 3 */}
        <div className="w-full px-1 hover:scale-105 transDuration-300">
          <FontAwesomeIcon
            className="text-primary text-4xl"
            icon={certificate}
          />
          <p className="mt-6">{t("sections.about.feature_3")}</p>
        </div>
        {/* Feature 4 */}
        <div className="w-full px-1 hover:scale-105 transDuration-300 ">
          <FontAwesomeIcon
            icon={faLightbulb}
            className="text-4xl"
            color="green"
          />
          <p className="mt-6">{t("sections.about.feature_4")}</p>
        </div>
        {/* Feature 5 */}
        <div className="w-full  px-1 hover:scale-105 transDuration-300 ">
          <FontAwesomeIcon
            icon={faFaceGrinStars}
            color="green"
            className="text-4xl"
          />
          <p className="mt-6">{t("sections.about.feature_5")}</p>
        </div>
      </div>
    </SectionCard>
  );
}

export default AboutSection;
