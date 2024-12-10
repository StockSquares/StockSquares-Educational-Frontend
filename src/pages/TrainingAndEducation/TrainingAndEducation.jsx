import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import styles from "./TrainingAndEducation.module.css";
import logoSS from "../../assets/imgs/logo-SS - Copy.png";
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
      EgpPrice: "2000 ج.م",
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
      EgpPrice: "3000 ج.م",
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
      EgpPrice: "5000 ج.م",
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
      <div className="flex flex-col lg:flex-row items-center px-4 md:px-8 py-8 md:py-16">
        <div className="w-full lg:w-2/3 flex flex-col items-start space-y-6 lg:pr-8">
          <p className="text-2xl lg:text-3xl font-bold text-center lg:text-left">
            اكتسب مهارة التداول وانضم إلى المستثمرين الناجحين
          </p>
          <ul className={`${styles.featuresList} space-y-2`}>
            <li>
              <FontAwesomeIcon icon={faCheck} className={styles.icon} />
              تعلم التداول عبر الإنترنت مع
              <span
                style={{
                  color: "var(--primary-color-light)",
                  fontWeight: "bold",
                  padding: "0 2px",
                }}>
                مدرب شخصي
              </span>
            </li>
            <li>
              <FontAwesomeIcon icon={faCheck} className={styles.icon} />
              أفضل مدربين التداول المعتمدين في الوطن العربي
            </li>
            <li>
              <FontAwesomeIcon icon={faCheck} className={styles.icon} />
              تدريب تفاعلي متابعة دورية مستمرة في التداول
            </li>
          </ul>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
            <button
              className={`${styles.buttonPersonal} font-semibold px-6 py-3 mx-2 rounded-lg shadow-lg`}>
              احجز محاضرة تجريبية
            </button>
            <button
              className={`${styles.buttonTrial} font-semibold px-6 py-3 mx-2 rounded-lg shadow-lg`}>
              احجز مدرب شخصي
            </button>
          </div>
        </div>

        <div
          className={`${styles.card} w-full lg:w-1/3 flex justify-center items-center mt-8 lg:mt-0 card`}>
          <img src={logoSS} alt="Logo" className={`${styles.rotatingLogo}`} />
        </div>
      </div>

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
