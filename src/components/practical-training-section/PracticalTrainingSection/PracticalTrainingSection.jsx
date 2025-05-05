import { Link } from "react-router-dom";
import React, { useRef } from "react";

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
import { SectionCard, PracticalTrainingCard } from "../..";
import { ROUTES } from "../../../routes";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Clients from "./../../../pages/Admin/adminPages/Clients/Clients";

function PracticalTrainingSection() {
  const { t } = useTranslation();
  const sliderRef = useRef(null);

  const next = () => sliderRef.current && sliderRef.current.slickNext();
  const previous = () => sliderRef.current && sliderRef.current.slickPrev();

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    rtl: false,
    responsive: [
      {
        breakpoint: 1030,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rtl: false,
        },
      },
    ],
  };

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
      <div className={``}>
        <Slider ref={sliderRef} {...settings} dir="rtl">
          {/* Card 1 */}
          <div className={`flex-none ${style.card} w-[100%] lg:w-[50%]`}>
            <PracticalTrainingCard
              cardImg={entryLevel}
              title={
                <>
                  {t("practicalTraining.egyptianStock")}-{" "}
                  <span className="shadow-xl text-green-400 font-bold">
                    {t("practicalTraining.beginner")}
                  </span>
                </>
              }
              hours={t("practicalTraining.hours")}
              price={t("practicalTraining.juniorPrice")}
              img={EgyptFlag}
            />
          </div>
          {/* Card 2 */}
          <div className={`flex-none ${style.card} w-[100%] lg:w-[50%]`}>
            <PracticalTrainingCard
              cardImg={advancedLevel}
              title={
                <>
                  {t("practicalTraining.egyptianStock")}-{" "}
                  <span className="shadow-xl text-amber-400 font-bold">
                    {t("practicalTraining.advanced")}
                  </span>
                </>
              }
              hours={t("practicalTraining.advancedHours")}
              price={t("practicalTraining.advancedPrice")}
              img={EgyptFlag}
            />
          </div>
          {/* Card 3 */}
          <div className={`flex-none ${style.card} w-[100%] lg:w-[50%]`}>
            <PracticalTrainingCard
              cardImg={professionalLevel}
              title={
                <>
                  {t("practicalTraining.egyptianStock")}-{" "}
                  <span className="shadow-xl text-red-600 font-bold">
                    {t("practicalTraining.proLevel")}
                  </span>
                </>
              }
              hours={t("practicalTraining.proHours")}
              price={t("practicalTraining.proPrice")}
              img={EgyptFlag}
            />
          </div>

          {/* ------------------- saudia ---------------------------- */}

          {/* Card 1 */}

          <div className={`flex-none ${style.card} w-[45%] lg:w-[50%]`}>
            <PracticalTrainingCard
              cardImg={entryLevel}
              title={
                <>
                  {t("practicalTraining.saudiStock")}-{" "}
                  <span className="shadow-xl text-green-400 font-bold">
                    {t("practicalTraining.beginner")}
                  </span>
                </>
              }
              hours={t("practicalTraining.hours")}
              price={t("practicalTraining.juniorPrice")}
              img={saudi}
            />
          </div>
          {/* Card 2 */}
          <div className={`flex-none ${style.card} w-[45%] lg:w-[50%]`}>
            <PracticalTrainingCard
              cardImg={advancedLevel}
              title={
                <>
                  {t("practicalTraining.saudiStock")}-{" "}
                  <span className="shadow-xl text-amber-400 font-bold">
                    {t("practicalTraining.advanced")}
                  </span>
                </>
              }
              hours={t("practicalTraining.advancedHours")}
              price={t("practicalTraining.advancedPrice")}
              img={saudi}
            />
          </div>

          {/* Card 3 */}
          <div className={`flex-none ${style.card} w-[45%] lg:w-[50%]`}>
            <PracticalTrainingCard
              cardImg={professionalLevel}
              title={
                <>
                  {t("practicalTraining.saudiStock")}-{" "}
                  <span className="shadow-xl text-red-600 font-bold">
                    {t("practicalTraining.proLevel")}
                  </span>
                </>
              }
              hours={t("practicalTraining.proHours")}
              price={t("practicalTraining.proPrice")}
              img={saudi}
            />
          </div>
          {/* --------------- global ---------- */}

          {/* Card 1 */}
          <div className={`flex-none ${style.card} w-[45%] lg:w-[50%]`}>
            <PracticalTrainingCard
              cardImg={entryLevel}
              title={
                <>
                  {t("practicalTraining.globalStock")} -{" "}
                  <span className="shadow-xl text-green-400 font-bold">
                    {t("practicalTraining.beginner")}
                  </span>
                </>
              }
              hours={t("practicalTraining.hours")}
              price={t("practicalTraining.juniorPrice")}
              img={globalEconomy}
            />
          </div>
          {/* card 2 */}
          <div className={`flex-none ${style.card} w-[45%] lg:w-[50%]`}>
            <PracticalTrainingCard
              cardImg={advancedLevel}
              title={
                <>
                  {t("practicalTraining.globalStock")} -{" "}
                  <span className="shadow-xl text-amber-400 font-bold">
                    {t("practicalTraining.advanced")}
                  </span>
                </>
              }
              hours={t("practicalTraining.advancedHours")}
              price={t("practicalTraining.advancedPrice")}
              img={globalEconomy}
            />
          </div>
          {/* card 3 */}

          <div className={`flex-none ${style.card} w-[45%] lg:w-[50%]`}>
            <PracticalTrainingCard
              cardImg={professionalLevel}
              title={
                <>
                  {t("practicalTraining.globalStock")} -{" "}
                  <span className="shadow-xl text-red-600 font-bold">
                    {t("practicalTraining.proLevel")}
                  </span>
                </>
              }
              hours={t("practicalTraining.proHours")}
              price={t("practicalTraining.proPrice")}
              img={globalEconomy}
            />
          </div>
          {/* --------------- bitcoin --------------------- */}

          {/* Card 1 */}
          <div className={`flex-none ${style.card} w-[45%] lg:w-[50%]`}>
            <PracticalTrainingCard
              cardImg={entryLevel}
              title={
                <>
                  {t("practicalTraining.bitCoinStock")}-{" "}
                  <span className="shadow-xl text-green-400 font-bold">
                    {t("practicalTraining.beginner")}
                  </span>
                </>
              }
              hours={t("practicalTraining.hours")}
              price={t("practicalTraining.juniorPrice")}
              img={bitcoinicon}
            />
          </div>
          {/* Card 2 */}
          <div className={`flex-none ${style.card} w-[45%] lg:w-[50%]`}>
            <PracticalTrainingCard
              cardImg={advancedLevel}
              title={
                <>
                  {t("practicalTraining.bitCoinStock")}-{" "}
                  <span className="shadow-xl text-amber-400 font-bold">
                    {t("practicalTraining.advanced")}
                  </span>
                </>
              }
              hours={t("practicalTraining.advancedHours")}
              price={t("practicalTraining.advancedPrice")}
              img={bitcoinicon}
            />
          </div>
          {/* Card 3 */}
          <div className={`flex-none ${style.card} w-[45%] lg:w-[50%]`}>
            <PracticalTrainingCard
              cardImg={professionalLevel}
              title={
                <>
                  {t("practicalTraining.bitCoinStock")}-{" "}
                  <span className="shadow-xl text-red-600 font-bold">
                    {t("practicalTraining.proLevel")}
                  </span>
                </>
              }
              hours={t("practicalTraining.proHours")}
              price={t("practicalTraining.proPrice")}
              img={bitcoinicon}
            />
          </div>
        </Slider>
      </div>
    </SectionCard>
  );
}

export default PracticalTrainingSection;
