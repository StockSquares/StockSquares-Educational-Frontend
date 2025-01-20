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
      <div className="grid grid-cols-1 md:grid-cols-5 mb-5  gap-6 text-sm font-semibold text-center w-full">
        {/* Feature 1 */}
        <div className="w-full px-1 mb-6 md:mb-0 hover:scale-105 transDuration-300">
          <FontAwesomeIcon
            className="text-primary text-4xl"
            icon={handHoldingDollar}
          />
          <p className="mb-0 mt-1 md:mt-4">{t("sections.about.feature_1")}</p>
        </div>

        {/* Feature 2 */}
        <div className="w-full px-1 mb-6 md:mb-0 hover:scale-105 transDuration-300">
          <FontAwesomeIcon
            className="text-primary text-4xl"
            icon={chalkboardUser}
          />
          <p className="mb-0 mt-1 md:mt-4">{t("sections.about.feature_2")}</p>
        </div>

        {/* Feature 3 */}
        <div className="w-full px-1 hover:scale-105 transDuration-300">
          <FontAwesomeIcon
            className="text-primary text-4xl"
            icon={certificate}
          />
          <p className="mb-0 mt-1 md:mt-4">{t("sections.about.feature_3")}</p>
        </div>
        {/* Feature 4 */}
        <div className="w-full px-1 hover:scale-105 transDuration-300 ">
          <FontAwesomeIcon
            icon={faLightbulb}
            className="text-4xl"
            color="green"
          />
          <p className="mb-0 mt-1 md:mt-4">{t("sections.about.feature_4")}</p>
        </div>
        {/* Feature 5 */}
        <div className="w-full  px-1 hover:scale-105 transDuration-300 ">
          <FontAwesomeIcon
            icon={faFaceGrinStars}
            color="green"
            className="text-4xl"
          />
          <p className="mb-0 mt-1 md:mt-4">{t("sections.about.feature_5")}</p>
        </div>
      </div>
    </SectionCard>
  );
}

export default AboutSection;
