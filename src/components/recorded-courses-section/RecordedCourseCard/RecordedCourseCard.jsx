import React, { useEffect } from "react";

// Internal Imports (components, Assets and Styles)
import { Ad, Button } from "./../..";
import { circleUser, clock, companyLogo } from "./../../../assets";
import instructorPhoto from "/src/assets/imgs/instructorImg2.png";
// External libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { SectionCard } from "../..";
import { ROUTES } from "../../../routes";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";

function RecordedCourseCard() {
  const { t } = useTranslation();

  useEffect(() => {}, []);

  return (
    <SectionCard
      heading={" الدورات المسجله "}
      p6={false}
      LinkTo={ROUTES.RECORDED_COURSES}
    >
      <div className="p-2 ">
        <div className="bg-gradient-to-t from-primary-400 to-primary-100 dark:to-primary-800 dark:text-black text-xs font-semibold rounded-sm  py-[2px] flex">
          <div className="content  w-full text-[10px] px-1 py-8 ">
            <span className="bg-primary text-white px-4 py-0.5 rounded lg:text-[16px]  ">
              ابدأ بناء مستقبل مالي قوي
            </span>
            <p className="pt-1  mt-3  text-[10px] md:text-[15px]">
              تعلم تداول الأسهم والعملات والذهب
            </p>

            <div className="mt-5">
              <h4 className="text-sm font-bold mb-1">أ/طارق الليثي</h4>
              <div className="flex flex-col w-fit py-1 gap-1 pb-1 border-b-2 border-primary ">
                <span className="text-[13px]">مستشار استثمار ومدرب معتمد</span>
                <span className="text-[13px]">
                  استشاري تطوير الأعمال في عدة شركات مالية
                </span>
              </div>
            </div>
          </div>
          <div className="image w-full relative p-1  overflow-hidden flex justify-center">
            {/* <div className="circle w-[170px] aspect-[1] md:w-[230px] h-full bg-primary-300 rounded-full  absolute"></div> */}
            <div className="photo absolute h-full  ">
              <img
                src={instructorPhoto}
                className="w-[250px] h-[260px] md:h-full lg:h-[240px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* تفاصيل الدورة */}
        <div className="flex-y-center justify-between mt-4 ">
          <div className="w-full flex flex-col items-center">
            <h3 className="mb-2 text-lg font-semibold">
              أساسيات الاستثمار والتداول في الأسواق المالية
            </h3>
            <ul className="row w-full flex justify-around">
              <li className="flex-y-center pe-6">
                <FontAwesomeIcon className="px-1" icon={circleUser} />
                <span>أ/طارق الليثي</span>
              </li>
              <li className="flex-y-center pe-6">
                <FontAwesomeIcon className="px-1" icon={clock} />
                <span>55 دقيقة</span>
              </li>
              <li className="flex-y-center">
                <FontAwesomeIcon className="px-1" icon={faCertificate} />
                <span> شهاده </span>
              </li>
            </ul>
          </div>

          {/* عروض الشركات */}
          {/* <div className="mt-2 flex flex-col justify-center items-center w-full p-1">
            <hr className="text-lg bg-gray-400 h-[0.2px] w-full mb-1" />
            <h2 className="font-bold text-base mb-1 mt-3">
              عروض شركات الاستثمار و التداول
            </h2>
            
          </div> */}
        </div>
        <div className="mt-3 flex justify-center">
          <Button
            btnText={"ابدأ بدون اشتراك"}
            textColor="black"
            bgColor="accent"
            px="px-4 py-1 md:px-7"
            linkTo={ROUTES.RECORDED_COURSES}
          />
        </div>
      </div>
    </SectionCard>
  );
}

export default RecordedCourseCard;
