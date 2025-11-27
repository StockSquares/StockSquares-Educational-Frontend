import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import vantage from "../../../assets/imgs/vantage.jpg";
import mainImg from "../../../assets/imgs/1.webp";
import additionalLogo from "../../../assets/imgs/additionalLogo.png";
import cardImg from "/src/assets/imgs/1.webp";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// import style from "./Ad.module.css";

function Ad({ adLocation }) {
  const [ads, setAds] = useState([]);
  const [mainAds, setMainAds] = useState([]);
  const [courseAds, setCourseAds] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(
        "https://stocksquare1.runasp.net/api/Advertisement/GetAll"
      );

      if (response.ok) {
        const data = await response.json();
        console.log("row data", data);
        console.log(data);
        setAds(data);
        const filteredToMain = data.filter((item) => item.locationId === 6);
        const filteredToCourse = data.filter((item) => item.locationId === 7);
        setMainAds(filteredToMain);
        setCourseAds(filteredToCourse);
      } else {
        const errorText = await response.text();
        console.error("Fetch failed:", errorText);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const sliderRef = useRef(null);

  const next = () => sliderRef.current && sliderRef.current.slickNext();
  const previous = () => sliderRef.current && sliderRef.current.slickPrev();

  // إعدادات السلايدر
  const settings = {
    dots: false,
    // لو الكورسات أقل من 5 (يعني 1، 2، 3، 4) مفيش حركة لا نهائية
    infinite: adLocation === "course" ? courseAds.length >= 5 : true,
    speed: 1000,
    // عرض 4 إعلانات في الشاشات الكبيرة (كل واحد ياخد 25%)
    slidesToShow: adLocation === "course" ? 4 : 1,
    slidesToScroll: 1,
    // التشغيل التلقائي فقط لو فيه 5 إعلانات أو أكتر
    autoplay: adLocation === "course" ? courseAds.length >= 5 : true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    // تفعيل الـ RTL للكورسات عشان تبدأ من اليمين
    rtl: adLocation === "course",
    arrows: adLocation === "course" ? false : true,
    responsive: [
      {
        breakpoint: 1030,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          rtl: false // في الموبايل العرض عادي
        },
      }
    ]
  };

  const { t } = useTranslation();
  useEffect(() => { }, []);


  return (
    <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-start py-5">
      {adLocation === "course" ? (
        <div className="w-full">
          {/* العنوان - فوق كل حاجة */}
          <h2 className="font-semibold text-lg text-center whitespace-nowrap mb-2">{t("ad.ad")}</h2>

          {/* الإعلانات وزر البروكر - جنب بعض */}
          <div className="w-full flex flex-col lg:flex-row lg:items-center gap-3">
            {/* الإعلانات - تاخد باقي المساحة - على اليمين */}
            {/* استخدام flex-1 عشان ياخد المساحة المتبقية */}
            <div className="flex-1 w-full lg:min-w-0">
              {courseAds.length > 0 ? (
                courseAds.length >= 5 ? (
                  // حالة السلايدر: 5 إعلانات أو أكثر
                  <Slider ref={sliderRef} {...settings}>
                    {courseAds.map((ad) => (
                      <div key={ad.id} className="px-2" dir="rtl">
                        <a href={ad.link} className="block h-[100px] lg:h-[100px] rounded-lg overflow-hidden">
                          <img
                            src={`data:image/*;base64,${ad.image}`}
                            alt={ad.title}
                            className="w-full h-full object-cover"
                          />
                        </a>
                        <p className="text-sm text-gray-700 text-center">{ad.title}</p>
                      </div>
                    ))}
                  </Slider>
                ) : (
                  // حالة الثبات: من 1 إلى 4 إعلانات
                  // نستخدم فليكس عادي مع اتجاه RTL عشان يبدأ من اليمين
                  <div className="w-full flex" dir="rtl">
                    {courseAds.map((ad) => (
                      <div key={ad.id} className="w-1/4 px-2 flex-shrink-0">
                        <a href={ad.link} className="block h-[100px] lg:h-[100px] rounded-lg overflow-hidden">
                          <img
                            src={`data:image/*;base64,${ad.image}`}
                            alt={ad.title}
                            className="w-full h-full object-cover"
                          />
                        </a>
                        <p className="text-sm text-gray-700 text-center">{ad.title}</p>
                      </div>
                    ))}
                    {/* مساحة فاضية لو الإعلانات أقل من 4 عشان يحافظوا على حجمهم */}
                    {/* بما أننا محددين العرض 25%، المساحة الفاضية هتتساب تلقائي على الشمال في الـ RTL */}
                  </div>
                )
              ) : null}
            </div>

            {/* زر بروكر - عرض ثابت - على الشمال */}
            <div className="w-full lg:w-[200px] flex justify-center lg:items-center flex-shrink-0 self-center">
              <Link
                to="/join-broker"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition text-lg font-semibold block text-center whitespace-nowrap"
              >
                بروكر؟انطلق معنا
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full overflow-hidden">
          <div className="max-w-[100%] h-[200px]">
            <Slider ref={sliderRef} {...settings}>
              {mainAds.map((ad) => (
                <div
                  key={ad.id}
                  className="ad w-full h-[200px] px-1 rounded-lg overflow-hidden"
                >
                  <Link to={ad.link}>
                    <img
                      src={`data:image/*;base64,${ad.image}`}
                      alt={ad.title}
                      className="object-cover w-full h-full rounded-lg block"
                    />
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ad