import React, { useEffect } from "react";

// Internal Imports (components, Assets and Styles)
import { Ad, Button } from "./../..";
import { circleUser, clock, companyLogo } from "./../../../assets";
import instructorPhoto from "/src/assets/imgs/instructorImg.png";
// External libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { SectionCard } from "../..";
import { ROUTES } from "../../../routes";

function RecordedCourseCard() {
  const { t } = useTranslation();

  useEffect(() => {}, []);

  return (
    <SectionCard heading={" الدورات المسجله "} p6={false} LinkTo={ROUTES.RECORDED_COURSES} >
      <div className="p-2 ">
        <div className="bg-neutral-200 dark:bg-dark-background text-xs font-semibold rounded-sm  py-[2px] flex">
          <div className="content  w-full text-[10px] px-1 py-8 ">
            <span className="bg-primary text-white px-4 py-0.5 rounded lg:text-[15px]  ">
              ابدأ بناء مستقبل مالي قوي
            </span>
            <p className="pt-1  mt-3  text-[10px] md:text-sm">
              تعلم تداول الأسهم والعملات والذهب
            </p>

            <div className="mt-5">
              <h4 className="text-sm font-bold mb-1">أ/طارق الليثي</h4>
              <div className="flex flex-col w-fit py-1 gap-1 border-b-2 border-primary ">
                <span className="text-xs">مستشار استثمار ومدرب معتمد</span>
                <span className="text-xs">
                  استشاري تطوير الأعمال في عدة شركات مالية
                </span>
              </div>
            </div>
          </div>
          <div className="image w-full relative p-1  overflow-hidden flex justify-center">
            <div className="circle w-[170px] aspect-[1] md:w-[230px] h-full bg-primary-300 rounded-full  absolute"></div>
            <div className="photo absolute h-full overflow-hidden ">
              <img
                src={instructorPhoto}
                className="w-[300px] h-full object-fit-contain"
              />
            </div>
          </div>
        </div>

        {/* تفاصيل الدورة */}
        <div className="flex-y-center justify-between mt-4 ">
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
              btnText={t(
                "sections.recordedCourses.courseSection.courseCard.btn"
              )}
              textColor="black"
              bgColor="accent"
              px="px-4 md:px-6"
              linkTo={ROUTES.RECORDED_COURSES}
            />
          </div>

          {/* عروض الشركات */}
          <div className="mt-2 flex flex-col justify-center items-center w-full p-1">
            <hr className="text-lg bg-gray-400 h-[0.2px] w-full mb-1" />
            <h2 className="font-bold text-base mb-1 mt-3">
              عروض شركات الاستثمار و التداول
            </h2>
            <div className=" w-full gap-2 text-center font-bold h-[110px] px-1">
              <Ad adLocation="course" />
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

export default RecordedCourseCard;
