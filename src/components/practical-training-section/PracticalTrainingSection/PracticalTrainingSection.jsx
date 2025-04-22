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
    autoplaySpeed: 4000,
    cssEase: "linear",
    rtl: false,
    responsive: [
      {
        breakpoint: 1300,
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
      p6={true}
    >
      <div className= {`h-[42vh] mt-7`} >
        <Slider ref={sliderRef} {...settings} dir="rtl">
          {/* Card 1 */}
          <div className={`flex-none ${style.card} w-[100%] lg:w-[50%]`}>
            <PracticalTrainingCard
              cardImg={entryLevel}
              title={
                <>
                  دورة البورصة المصرية -{" "}
                  <span className="shadow-xl text-green-400 font-bold">
                    مبتدئ
                  </span>
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
                  <span className="shadow-xl text-amber-400 font-bold">
                    متقدم
                  </span>
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
                  <span className="shadow-xl text-red-600 font-bold">
                    محترف
                  </span>
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
                  <span className="shadow-xl text-green-400 font-bold">
                    مبتدئ
                  </span>
                </>
              }
              hours="٨ ساعات"
              price="٣٥٠٠"
              img={bitcoinicon}
            />
          </div>
        </Slider>
      </div>
    </SectionCard>
  );
}

export default PracticalTrainingSection;
