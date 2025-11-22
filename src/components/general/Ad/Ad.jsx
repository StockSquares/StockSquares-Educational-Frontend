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

  const settings = {
    dots: false,
    infinite: adLocation === "course" ? false : true,
    speed: 1000,

    slidesToShow: adLocation === "course" ? 4 : 1,
    slidesToScroll: 1,
    autoplay: adLocation === "course" ? false : true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    rtl: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1030, // أقل من 1024px
        settings: {
          slidesToShow: 1, // يعرض 1 إعلانات
          slidesToScroll: 1,
        },
      }
    ]
  };

  const { t } = useTranslation();
  useEffect(() => { }, []);


  return (
    <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between  my-8">
      {adLocation === "course" ? (
        <div className="w-full p-3">
          <h2 className="font-semibold text-lg mb-2">{t("ad.ad")}</h2>

          <Slider ref={sliderRef} {...settings} dir="rtl">
            {courseAds.map((ad) => (
              <div key={ad.id} className="w-1/3 p-2">
                <a href={ad.link} className="block h-[100px] rounded-lg overflow-hidden">
                  <img
                    src={`data:image/*;base64,${ad.image}`}
                    alt={ad.title}
                    className="w-full h-[100px] object-fill"
                  />
                </a>
                <p className="mt-2 text-sm text-gray-700">{ad.title}</p>
              </div>
            ))}
          </Slider>
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

      {/* زر بروكر */}
      <Link
        to="/join-broker"
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition text-lg font-semibold min-w-[180px]"
      >
        انطلق معنا!
      </Link>
    </div>
  );
}

export default Ad