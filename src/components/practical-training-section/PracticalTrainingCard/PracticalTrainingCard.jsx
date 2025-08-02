import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";

// Internal Imports
import Style from "./PracticalTrainingCard.module.css";
import { Button } from "./../..";
import { chalkboardUser, clock, handHoldingDollar } from "../../../assets";
import { ROUTES } from "../../../routes";

function PracticalTrainingCard({
  cardImg = "",
  title = "",
  hours = "",
  price = "",
  img = "",
}) {
  const { t } = useTranslation();

  return (
    <div className="h-full p-2" style={{ direction: "rtl" }}>
      {/* الكرت كامل */}
      <div className="flex flex-col  bg-white  rounded overflow-hidden shadow-md">
        {/* الصورة في الأعلى */}
        <div className="h-64 bg-primary-100 dark:bg-dark-primary flex items-center justify-center">
          <img src={cardImg} className="h-auto max-h-full object-contain" />
        </div>

        {/* التفاصيل تحت الصورة */}
        <div className="bg-darkgray text-white px-2 py-5  min-h-[140px]">
          {/* العنوان + صورة صغيرة */}
          <div className="flex gap-1 w-full items-center mb-3">
            <img src={img} className="w-[30px] h-[20px]  object-contain" />
            <span className="font-semibold ">{title}</span>
          </div>

          {/* الوقت والسعر + زرار الحجز */}
          <div className="flex justify-between items-center px-2">
            <div className="flex flex-col gap-1">
              <div className="flex flex-row items-center gap-1 mb-1">
                <FontAwesomeIcon icon={clock} className="text-white" />
                <span>{hours}</span>
              </div>
              <div className="flex flex-row items-center gap-1">
                {" "}
                <FontAwesomeIcon icon={faSackDollar} className="text-white" />
                <span>
                  {price} {t("practicalTraining.pound")}
                </span>
              </div>
            </div>

            <Link
              to={ROUTES.BOOK_YOUR_TRAINER}
              className="px-6 py-1 rounded-md bg-accent text-black hover:scale-105 transition-all"
            >
              {t("sections.PracticalTraining.trainingCard.btn")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PracticalTrainingCard;
