import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import cardImg from "/src/assets/imgs/1.webp";
// import style from "./Ad.module.css";

function Ad({ adLocation }) {
  const [ads, setAds] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(
        "https://stocksquare.runasp.net/api/Advertisement/GetAll"
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setAds(data);
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
    slidesToShow: adLocation === "course" ? 3 : 1,
    slidesToScroll: 1,
    autoplay: adLocation === "course" ? false : true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    rtl: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1030,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className=" rounded-xl ">
        {adLocation === "course" ? (
          <div className="w-full  p-3">
            <Slider ref={sliderRef} {...settings} dir="rtl">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <div
                  key={index}
                  className="ad w-1/3 h-[100px] p-1 rounded-lg overflow-hidden"
                >
                  <img
                    src={cardImg}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <div className="w-full overflow-hidden">
            <Slider ref={sliderRef} {...settings} dir="rtl">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="ad w-full h-[200px] rounded-lg px-1 overflow-hidden"
                >
                  <img src={cardImg} className="object-cover w-full h-full rounded-lg" />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </>
  );
}

export default Ad;
