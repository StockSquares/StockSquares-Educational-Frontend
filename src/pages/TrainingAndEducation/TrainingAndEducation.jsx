import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import line from "/src/assets/imgs/line.png";
import arrow from "/src/assets/imgs/Arrow.png";
import styles from "./TrainingAndEducation.module.css";
import entryLevel from "/src/assets/imgs/Consulting-bro.png";
import { ROUTES } from "../../routes";

const TrainingPlanCard = ({ plan }) => (
  <div className="">
    <div className={`${styles.planCard}`}>
      <h2 className={styles.title}>{plan.title}</h2>
      <p className={styles.EgpPrice}>{plan.EgpPrice}</p>
      <p className={styles.usdPrice}>{plan.usdPrice}</p>
      <p className={styles.duration}>{plan.duration}</p>
      <ul className={styles.featuresList}>
        {plan.features.map((feature, idx) => (
          <li key={idx}>
            <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
            {feature}
          </li>
        ))}
      </ul>
      <Link to={ROUTES.RESERVATION} className={styles.button}>
        احجز الآن
      </Link>
    </div>
  </div>
);

function TrainingAndEducation() {
  const { t } = useTranslation();

  const trainingPlans = [
    {
      title: "المبتدئ",
      EgpPrice: "3000 ج.م",
      usdPrice: "500$",
      duration: "8 ساعات - 4 محاضرات",
      features: [
        "معرفة أسواق المال وأنواعها",
        "أساسيات التحليل النفسي",
        "أساسيات التحليل المالي",
        "قواعد إدارة رأس المال",
        "التدريب على منصة التداول",
      ],
    },
    {
      title: "المتقدم",
      EgpPrice: "5000 ج.م",
      usdPrice: "1000$",
      duration: "16 ساعة - 6 محاضرات",
      features: [
        "معرفة أسواق المال وأنواعها",
        "أساسيات التحليل النفسي",
        "أساسيات التحليل المالي",
        "قواعد إدارة رأس المال",
        "التدريب على منصة التداول",
      ],
    },
    {
      title: "الاحترافي",
      EgpPrice: "7000 ج.م",
      usdPrice: "1500$",
      duration: "18 ساعة - 9 محاضرات",
      features: [
        "معرفة أسواق المال وأنواعها",
        "أساسيات التحليل النفسي",
        "أساسيات التحليل المالي",
        "قواعد إدارة رأس المال",
        "التدريب على منصة التداول",
      ],
    },
  ];

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center px-4 md:px-8 py-8 md:py-1 ">
        <div className="w-full lg:w-2/3 flex flex-col items-start space-y-5 lg:pr-6 ">
          <p className="text-2xl mt-5 lg:text-3xl font-bold text-center lg:text-right ">
            اكتسب مهارة التداول وانضم إلى المستثمرين{" "}
            <div className="inline-block items-end">
              {" "}
              <span className="text-green-500 text-4xl "> الناجحين </span>{" "}
              <img className="w-[110px] mt-2" src={line} />{" "}
            </div>
          </p>

          <div>
            <ul className={`${styles.featuresList} space-y-2  `}>
              <li className="dark:text-dark-text">
                <div className=" relative py-4 flex flex-col gap-1">
                  <div className="flex flex-col gap-3">
                    <p style={{ letterSpacing: "1.5px" }}>
                      <FontAwesomeIcon icon={faCheck} className={styles.icon} />
                      تعلم التداول عبر الإنترنت مع
                      <span
                        style={{
                          color: "var(--primary-color-light)",
                          fontWeight: "bold",
                          padding: "0 2px",
                          letterSpacing: "5px",
                        }}
                      >
                        {" "}
                        مدرب شخصي
                      </span>
                    </p>
                    <p>
                      {" "}
                      <FontAwesomeIcon icon={faCheck} className={styles.icon} />
                      تدريب تفاعلي متابعة دورية مستمرة في التداول
                    </p>

                    <p>
                      <FontAwesomeIcon icon={faCheck} className={styles.icon} />
                      أفضل مدربين التداول المعتمدين في الوطن العربي
                    </p>
                  </div>

                  <div className="  w-full  flex gap-3 items-center  sm:space-y-0 sm:space-x-4 mt-10">
                    <Link
                      to={ROUTES.LEVELEXAM}
                      className={`${styles.buttonTrial} font-semibold   text-black  rounded-lg shadow-lg hover:bg-accent-800 `}
                    >
                      اختبار تحديد المستوي
                    </Link>
                    <Link
                      to={ROUTES.RESERVATION}
                      className={`${styles.buttonTrial}  font-semibold  bg-primary-900 text-white  rounded-lg shadow-lg hover:bg-primary-800 `}
                    >
                      احجز مدربك الشخصي
                    </Link>
                  </div>
                  <img
                    src={arrow}
                    className="absolute hidden sm:block w-[210px] left-[-110px] top-[10px] rotate-[30deg]"
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

      <hr className="h-[3px] w-[30%] bg-primary-950 mb-2 rounded-lg transition-all animate-bounce" />

      <div className={`${styles.pageContainer}`}>
        <div className={`${styles.row}`}>
          {trainingPlans.map((plan, index) => (
            <div key={index} className="col-md-4">
              <TrainingPlanCard plan={plan} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TrainingAndEducation;
