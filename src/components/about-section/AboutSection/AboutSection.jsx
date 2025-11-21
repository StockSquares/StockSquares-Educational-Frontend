import React, { useEffect } from "react";

// Internal Imports (components, Assets, and Styles)
import Style from "./AboutSection.module.css";
import { SectionCard } from "../../";
import {
  certificate,
  chalkboardUser,
  handHoldingDollar,
} from "../../../assets";

import {
  faLightbulb,
  faFaceGrinStars,
} from "@fortawesome/free-regular-svg-icons";

// External libraries
import { useTranslation } from "react-i18next";
import AboutFeature from "./AboutFeature";

function AboutSection() {
  const { t } = useTranslation();

  return (
    <SectionCard
      heading={t("sections.about.title")}
      wrapperClass="wrapperClass-sectionCard"
    >
      <div className="flex flex-wrap md:flex-nowrap items-center mb-5 gap-6 text-sm font-semibold text-center w-full dark:text-dark">
        <AboutFeature
          Title={t("sections.about.feature_1")}
          Icon={handHoldingDollar}
        />

        <AboutFeature
          Title={t("sections.about.feature_2")}
          Icon={chalkboardUser}
        />

        <AboutFeature
          Title={t("sections.about.feature_3")}
          Icon={certificate}
        />

        <AboutFeature
          Title={t("sections.about.feature_4")}
          Icon={faLightbulb}
        />

        <AboutFeature
          Title={t("sections.about.feature_5")}
          Icon={faFaceGrinStars}
        />
      </div>
    </SectionCard>
  );
}

export default AboutSection;
