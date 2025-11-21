import React from "react";

// Internal Imports (components, Assets and Styles)
import { Button, SectionCard } from "../../";
// External libraries
import { useTranslation } from "react-i18next";
import { ROUTES } from "./../../../routes";
import image from "../../../assets/imgs/Vip.png";
function VipInvestorServicesSection() {
  const { t } = useTranslation();

  // Dynamic investment amount (retrieved from API or admin settings)
  const minInvestment = "100.000";

  return (
    <SectionCard heading={t("sections.vipServices.title")} p6={false}>
      <div className="flex justify-between items-center  bg-lightgray dark:bg-dark-background dark:dark-text p-[12px]">
        <div className="flex flex-col gap-2 md:gap-9">
          <p className=" text-[15px] md:text-2xl font-bold md:font-semibold  leading-[1.5]">
            {t("sections.vipServices.content_1")}
            <br />
            {t("sections.vipServices.content_2")}
          </p>
          <div className="row items-baseline">
            <Button
              btnText={t("sections.vipServices.btn")}
              btnClassName="me-3 hover:bg-yellow-300"
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
        <div className="imgContainer w-[70%] md:w-[40%]   md:flex lg:flex">
          <img
            src={image}
            className="w-full h-full object-cover"
            alt="imgHere"
          ></img>
        </div>
      </div>
    </SectionCard>
  );
}

export default VipInvestorServicesSection;
