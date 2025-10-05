import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import vantage from "../../../assets/imgs/vantage.jpg";
import additionalLogo from "../../../assets/imgs/additionalLogo.png";
import cardImg from "/src/assets/imgs/1.webp";
import { Link } from "react-router-dom";
// import style from "./Ad.module.css";

function Ad({ adLocation }) {
  const [ads, setAds] = useState([]);
  const [mainAds, setMainAds] = useState([]);
  const [courseAds, setCourseAds] = useState([
    {
      id: 1,
      link: "https://www.google.com/",
      image: vantage,
      title: "Vantage",
    },
    {
      id: 2,
      link: "www.google.com",
      image: additionalLogo,
      title: "additional",
    },
    {
      id: 3,
      link: "www.google.com",
      image: additionalLogo,
      title: "additional",
    },
    {
      id: 4,
      link: "www.google.com",
      image: additionalLogo,
      title: "additional",
    },
    {
      id: 5,
      link: "www.google.com",
      image: additionalLogo,
      title: "additional",
    },
  ]);

  const getData = async () => {
    try {
      const response = await fetch(
        "https://stocksquare1.runasp.net/api/Advertisement/GetAll"
      );

      if (response.ok) {
        const data = await response.json();
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
        breakpoint: 1030,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full ">
      {adLocation === "course" ? (
        <div className="w-full   p-3">
          <h2 className="font-semibold text-lg mb-2">
            {" "}
            عروض شركات الاستثمار والتداول{" "}
          </h2>
          <Slider ref={sliderRef} {...settings} dir="rtl">
            {courseAds.map((ad) => (
              <div
                key={ad.id}
                className="ad w-1/3  h-[100px] p-1 rounded-lg overflow-hidden"
              >
                <a href={ad.link}>
                  <img
                    // src={`data:image/*;base64,${ad.image}`}
                    src={ad.image}
                    className="object-fill px-2 w-full h-[60px] rounded-lg"
                    alt={ad.title}
                  />
                </a>
                <p>desc</p>
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
    </div>
  );
}

export default Ad;
