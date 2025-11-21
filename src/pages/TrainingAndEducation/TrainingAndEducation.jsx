import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faArrowLeft,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import line from "/src/assets/imgs/line.png";
import arrow from "/src/assets/imgs/Arrow.png";
import styles from "./TrainingAndEducation.module.css";
import entryLevel from "/src/assets/imgs/Consulting-bro.png";
import { ROUTES } from "../../routes";

import { useState } from "react";

function TrainingPlanCard({ plan, index }) {
  const [showContent, setShowContent] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col min-h-[50vh] justify-between items-start transition-all hover:shadow-2xl duration-300">
      {/* العنوان */}
      <div className="flex flex-col items-center w-full">
      <h2
        className={`text-2xl font-bold   mb-2 ${
          index === 1
            ? "text-accent-900"
            : index === 2
            ? "text-red-600"
            : "text-primary-700"
        } `}
      >
        {plan.title}
      </h2>
      <p className="text-gray-600  text-sm mb-2 border-b pb-1 ">{plan.brief}</p>
      </div>
      <p className="text-gray-500 text-sm mb-3">{plan.miniContent}</p>

      {/* الأسعار منفصلة */}
      <div className="flex justify-between items-center w-full bg-gray-100 py-3 px-4 rounded-lg mb-4">
        <div>
          <p className="text-lg font-bold text-green-700">{plan.EgpPrice}</p>
        </div>
        <div className="text-sm text-gray-600">
          <span>{plan.duration}</span> | <span>{plan.lectures}</span>
        </div>
      </div>

      {/* زرار عرض المحتوى */}
      <button
        onClick={() => setShowContent(!showContent)}
        className="flex items-center gap-2 text-primary-900 font-semibold hover:text-primary-700 transition-all"
      >
        {showContent
          ? t("TrainingAndEducation.hideContent")
          : t("TrainingAndEducation.showContent")}
        <FontAwesomeIcon icon={showContent ? faChevronUp : faChevronDown} />
      </button>

      {/* المحتوى التدريبي */}
      {showContent && (
        <ul className="mt-4 space-y-2 border-t pt-3 w-full">
          {plan.content.map((item, idx) => (
            <li
              key={idx}
              className="bg-gray-50 p-3 rounded-lg shadow-sm border border-gray-100"
            >
              <p className="font-semibold text-primary-800 flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="text-primary-800"
                />
                {item.title}
              </p>
              <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                {item.content}
              </p>
            </li>
          ))}
        </ul>
      )}

      {/* زرار الحجز */}
      <Link
        to={ROUTES.RESERVATION}
        className="mt-6 w-full text-center bg-primary-900 text-white py-2 rounded-lg font-semibold hover:bg-primary-800 transition-all"
      >
        {t("TrainingAndEducation.bookYourTrainer")}
      </Link>
    </div>
  );
}

function TrainingAndEducation() {
  const { t } = useTranslation();
  const lang = localStorage.getItem("lang");

  const trainingPlans = [
    {
      title: t("TrainingAndEducation.plans.beginner.title"),
      brief: t("TrainingAndEducation.plans.beginner.brief"),
      miniContent: t("TrainingAndEducation.plans.beginner.miniContent"),
      EgpPrice: t("TrainingAndEducation.plans.beginner.EgpPrice"),
      duration: t("TrainingAndEducation.plans.beginner.duration"),
      lectures: t("TrainingAndEducation.plans.beginner.lectures"),
      content: [
        {
          title: t("TrainingAndEducation.plans.beginner.title1"),
          content: t("TrainingAndEducation.plans.beginner.content1"),
        },
        {
          title: t("TrainingAndEducation.plans.beginner.title2"),
          content: t("TrainingAndEducation.plans.beginner.content2"),
        },
        {
          title: t("TrainingAndEducation.plans.beginner.title3"),
          content: t("TrainingAndEducation.plans.beginner.content3"),
        },
        {
          title: t("TrainingAndEducation.plans.beginner.title4"),
          content: t("TrainingAndEducation.plans.beginner.content4"),
        },
        {
          title: t("TrainingAndEducation.plans.beginner.title5"),
          content: t("TrainingAndEducation.plans.beginner.content5"),
        },
        {
          title: t("TrainingAndEducation.plans.beginner.title6"),
          content: t("TrainingAndEducation.plans.beginner.content6"),
        },
      ],
    },

    {
      title: t("TrainingAndEducation.plans.advanced.title"),
      brief: t("TrainingAndEducation.plans.advanced.brief"),
      miniContent: t("TrainingAndEducation.plans.advanced.miniContent"),
      EgpPrice: t("TrainingAndEducation.plans.advanced.EgpPrice"),
      duration: t("TrainingAndEducation.plans.advanced.duration"),
      lectures: t("TrainingAndEducation.plans.advanced.lectures"),
      content: [
        {
          title: t("TrainingAndEducation.plans.advanced.title1"),
          content: t("TrainingAndEducation.plans.advanced.content1"),
        },
        {
          title: t("TrainingAndEducation.plans.advanced.title2"),
          content: t("TrainingAndEducation.plans.advanced.content2"),
        },
        {
          title: t("TrainingAndEducation.plans.advanced.title3"),
          content: t("TrainingAndEducation.plans.advanced.content3"),
        },
        {
          title: t("TrainingAndEducation.plans.advanced.title4"),
          content: t("TrainingAndEducation.plans.advanced.content4"),
        },
        {
          title: t("TrainingAndEducation.plans.advanced.title5"),
          content: t("TrainingAndEducation.plans.advanced.content5"),
        },
        {
          title: t("TrainingAndEducation.plans.advanced.title6"),
          content: t("TrainingAndEducation.plans.advanced.content6"),
        },
      ],
    },
    {
      title: t("TrainingAndEducation.plans.professional.title"),
      brief: t("TrainingAndEducation.plans.professional.brief"),
      miniContent: t("TrainingAndEducation.plans.professional.miniContent"),
      EgpPrice: t("TrainingAndEducation.plans.professional.EgpPrice"),
      duration: t("TrainingAndEducation.plans.professional.duration"),
      lectures: t("TrainingAndEducation.plans.professional.lectures"),
      content: [
        {
          title: t("TrainingAndEducation.plans.professional.title1"),
          content: t("TrainingAndEducation.plans.professional.content1"),
        },
        {
          title: t("TrainingAndEducation.plans.professional.title2"),
          content: t("TrainingAndEducation.plans.professional.content2"),
        },
        {
          title: t("TrainingAndEducation.plans.professional.title3"),
          content: t("TrainingAndEducation.plans.professional.content3"),
        },
        {
          title: t("TrainingAndEducation.plans.professional.title4"),
          content: t("TrainingAndEducation.plans.professional.content4"),
        },
        {
          title: t("TrainingAndEducation.plans.professional.title5"),
          content: t("TrainingAndEducation.plans.professional.content5"),
        },
        {
          title: t("TrainingAndEducation.plans.professional.title6"),
          content: t("TrainingAndEducation.plans.professional.content6"),
        },
      ],
    },
  ];

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center px-4 md:px-4 py-8 md:py-1 ">
        <div className="w-full lg:w-2/3 flex flex-col items-start space-y-5 lg:pr-6 ">
          <p className="text-2xl mt-1 lg:text-3xl font-[650] text-center lg:text-right ">
            {t("TrainingAndEducation.gainSkills")}
            <div className="inline-block items-end">
              {" "}
              <span className="text-green-500 text-4xl ">
                {" "}
                {t("TrainingAndEducation.successful_people")}{" "}
              </span>{" "}
              <img className="w-[110px] mt-2" src={line} />{" "}
            </div>
            {t("TrainingAndEducation.investors")}{" "}
          </p>

          <div>
            <ul className={`${styles.featuresList} space-y-2  `}>
              <li className="dark:text-dark-text">
                <div className=" relative py-2 flex flex-col gap-1">
                  <div className="flex flex-col gap-3">
                    <p style={{ letterSpacing: "1.5px" }}>
                      <FontAwesomeIcon icon={faCheck} className={styles.icon} />
                      {t("TrainingAndEducation.learnTradingVia")}
                      <span
                        style={{
                          color: "var(--primary-color-light)",
                          fontWeight: "bold",
                          padding: "0 2px",
                          letterSpacing: "5px",
                        }}
                      >
                        {" "}
                        {t("TrainingAndEducation.personalTrainer")}
                      </span>
                    </p>
                    <p>
                      {" "}
                      <FontAwesomeIcon icon={faCheck} className={styles.icon} />
                      {t("TrainingAndEducation.interactiveTraining")}
                    </p>

                    <p>
                      <FontAwesomeIcon icon={faCheck} className={styles.icon} />
                      {t("TrainingAndEducation.bestTrainers")}
                    </p>
                  </div>

                  <div className="  w-full  flex gap-3 items-center  sm:space-y-0 sm:space-x-4 mt-10">
                    <Link
                      to={ROUTES.LEVELEXAM}
                      className={`${styles.buttonTrial} font-semibold   text-black  rounded-lg shadow-lg hover:bg-accent-800 `}
                    >
                      {t("TrainingAndEducation.examLevel")}
                    </Link>
                    <Link
                      to={ROUTES.RESERVATION}
                      className={`${styles.buttonTrial}  font-semibold  bg-primary-900 text-white  rounded-lg shadow-lg hover:bg-primary-800 `}
                    >
                      {t("TrainingAndEducation.bookYourTrainer")}
                    </Link>
                  </div>
                  <img
                    src={arrow}
                    className={`absolute hidden sm:block  w-[210px] ${
                      lang === "ar"
                        ? "left-[-110px] top-[10px] rotate-[30deg]"
                        : "right-[-90px] top-[10px] rotate-[-30deg]  scale-x-[-1] "
                    } `}
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`${styles.card} w-full  lg:w-1/3 flex justify-center items-center mt-8 lg:mt-0 card`}
        >
          <img
            src={entryLevel}
            alt="Logo"
            className={`${styles.rotatingLogo} hidden sm:block  object-cover w-full`}
          />
        </div>
      </div>

      <hr className="h-[2px] w-[60%] m-auto bg-gray-100 mb-2 rounded-lg transition-all animate-bounce" />

      <div className={`px-5 py-3`}>
        <h1 className="text-start px-4 text-2xl font-[650] mb-2 ">
          {t("TrainingAndEducation.chooseYourLevel")}
        </h1>
        <div
          className={`grid grid-cols-1 lg:grid-cols-3 gap-5 p-3 justify-items-center`}
        >
          {trainingPlans.map((plan, index) => (
            <div key={index} className="col-md-4">
              <TrainingPlanCard plan={plan} index={index} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TrainingAndEducation;
