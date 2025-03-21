import React, { useEffect } from "react";

// Internal Imports (components, Assets and Styles)
import { Button } from "./../..";
import { circleUser, clock, companyLogo } from "./../../../assets";
import instructorPhoto from "/src/assets/imgs/instructorImg.png";
// External libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { SectionCard } from "../..";

function RecordedCourseCard() {
  const { t } = useTranslation();

  useEffect(() => {}, []);

  return (
    <SectionCard heading={" الدورات المسجله "} >
      <div className="bg-neutral-200   text-xs font-semibold rounded-sm px-6 py-2 row justify-between">
        {/* المعلومات الأساسية */}
        <div className="w-full md:w-1/2">
          <div className="mb-5">
            <div className="w-16">
              <img
                className="w-full"
                src={companyLogo}
                alt="logo-stock-squares"
              />
            </div>
          </div>
          <span className="bg-primary text-white px-2 py-1 rounded ">
            ابدأ بناء مستقبل مالي قوي
          </span>
          <p className="pt-1 text-sm mt-3">تعلم تداول الأسهم والعملات والذهب</p>

          <div className="mt-8">
            <h4 className="text-sm font-bold">أ/طارق الليثي</h4>
            <div className="flex flex-col w-fit py-1 border-b-2 border-primary">
              <span className="text-xs">مستشار استثمار ومدرب معتمد</span>
              <span className="text-xs">
                استشاري تطوير الأعمال في عدة شركات مالية
              </span>
            </div>
          </div>
        </div>

        {/* صورة المدرب */}
        <div className="w-full  md:w-1/2 flex-center md:translate-y-4 md:relative">
          <div className="md:absolute bottom-0 ">
            <div className=' relative overflow-hidden before:content[""] before:absolute before:bg-primary-light before:opacity-20 before:w-[100%] before:h-[95%] before:rounded-full before:-z-10 before:end-0 before:-bottom-4 '>
              <img
                className="h-auto w-auto object-contain "
                src={instructorPhoto}
                alt="personal-img"
              />
              {/* the img's size = 250 * 250 */}
            </div>
          </div>
        </div>
      </div>

      {/* تفاصيل الدورة */}
      <div className="flex-y-center justify-between mt-4">
        <div>
          <h3 className="mb-2 text-base font-semibold">
            أساسيات الاستثمار والتداول في الأسواق المالية
          </h3>
          <ul className="row">
            <li className="flex-y-center pe-6">
              <FontAwesomeIcon className="px-1" icon={circleUser} />
              <span>أ/طارق الليثي</span>
            </li>
            <li className="flex-y-center">
              <FontAwesomeIcon className="px-1" icon={clock} />
              <span>55 دقيقة</span>
            </li>
          </ul>
        </div>
        <div className="mt-2 sm:mt-0 mx-auto md:me-0">
          <Button
            btnText={t("sections.recordedCourses.courseSection.courseCard.btn")}
            textColor="black"
            bgColor="accent"
            px="px-4 md:px-6"
          />
        </div>

        {/* عروض الشركات */}
        <div className="mt-4 flex flex-col justify-center items-center w-full p-1">
          <hr className="text-lg bg-gray-400 h-0.5 w-52 mb-2" />
          <h2 className="font-bold text-base mb-3">عروض شركات التداول</h2>
          <div className="flex justify-between w-full gap-2 text-center font-bold">
            <div className="w-1/3 rounded-lg p-2 shadow-md bg-gray-100">
              إعلان
            </div>
            <div className="w-1/3 rounded-lg p-2 shadow-md bg-gray-100">
              إعلان
            </div>
            <div className="w-1/3 rounded-lg p-2 shadow-md bg-gray-100">
              إعلان
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

export default RecordedCourseCard;
