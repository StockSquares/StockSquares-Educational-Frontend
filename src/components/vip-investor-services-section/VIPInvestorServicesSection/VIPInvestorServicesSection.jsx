import React from "react";

// Internal Imports (components, Assets and Styles)
import { Button, SectionCard } from "../../";
// External libraries
import { useTranslation } from "react-i18next";
import RequestConsultation from "./../../../pages/RequestConsultation/RequestConsultation";
import { ROUTES } from "./../../../routes";

function VipInvestorServicesSection() {
  const { t } = useTranslation();

  // Dynamic investment amount (retrieved from API or admin settings)
  const minInvestment = "50.000";

  return (
  
      <SectionCard heading={t("sections.vipServices.title")}>
      <div className="flex justify-between items-center">
      <div className="flex flex-col gap-5">
        <p className="text-4xl font-semibold  leading-[1.5]">
          {t("sections.vipServices.content_1")}
          <br />
          {t("sections.vipServices.content_2")}
        </p>
        <div className="row items-baseline">
          <Button
            btnText={t("sections.vipServices.btn")}
            btnClassName="me-3"
            textColor="black"
            bgColor="accent"
            linkTo={ROUTES.REQUESTCONSULTATION}
          />
          <div className="text-xs mt-2 md:mt-0">
            <span className="me-1.5">
              {t("sections.vipServices.note", { minInvestment })}
            </span>
          </div>
        </div>
        </div>
        <div className="imgContainer w-[30%] hidden sm:hidden md:flex lg:flex">
          <img
            src="/src/assets/imgs/Course app-bro.png"
            className="w-full h-full object-cover"
            alt="imgHere"
          ></img>
        </div></div>
      </SectionCard>
  );
}

export default VipInvestorServicesSection;
