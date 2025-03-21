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
      <div className="h-48 bg-primary-100 m-2 flex-center">
        <img src={cardImg} />
      </div>

      {/* Details Section */}
      <div className="bg-darkgray text-white p-2 relative  ">
        <div className="font-semibold flex flex-col">
          <div className="flex-y-center">
            <img src={img} className="w-[13%] me-1 p-1.5" />
            <span>{title}</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between">
          <div>
            <div className="flex-y-center">
              <FontAwesomeIcon className="p-1.5 me-1" icon={clock} />
              <span>{hours}</span>
            </div>
            <div className="flex-y-center">
              <FontAwesomeIcon icon={faSackDollar} className="p-1.5 me-1" />
              <span>
                {price}
                &nbsp; جنيه
              </span>
            </div>
          </div>

          {/* Button or Link */}
          <Link
            to={ROUTES.BOOK_YOUR_TRAINER}
            className=" px-2 py-1 self-center me-2  rounded-md bg-accent text-black hover:scale-105 transition-all"
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
