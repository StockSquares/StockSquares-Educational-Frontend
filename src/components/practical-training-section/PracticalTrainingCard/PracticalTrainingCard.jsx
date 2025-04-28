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
    <div className="h-full p-2">
      {/* Top Section */}
      <div className="h-64 bg-primary-100 flex-center">
        <img src={cardImg} className="h-auto" />
      </div>

      {/* Details Section */}
      <div className="bg-darkgray text-white p-2 relative mb-[-2%] py-3   min-h-[120px] ">
        <div className="font-semibold flex flex-col">
          <div className="flex justify-end ">
            <span>{title}</span>
            <img src={img} className="w-[13%] p-1.5 h-[30px]" />
          </div>

          <div className="flex flex-col-revere md:flex-row justify-between  ">
            <Link
              to={ROUTES.BOOK_YOUR_TRAINER}
              className=" px-3 py-1 self-center me-2  rounded-md bg-accent text-black hover:scale-105 transition-all"
            >
              {t("sections.PracticalTraining.trainingCard.btn")}
            </Link>
            <div>
              <div className="flex-y-center ms-2">
                <span>{hours}</span>
                <FontAwesomeIcon className="p-1.5 me-1" icon={clock} />
              </div>
              <div className="flex-y-center">
                <span>
                  {price}
                  &nbsp; {t("practicalTraining.pound")}
                </span>
                <FontAwesomeIcon icon={faSackDollar} className="p-1.5 me-1" />
              </div>
            </div>

            {/* Button or Link */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PracticalTrainingCard;
