import React, { useEffect, useState, useRef } from "react";

// Internal Imports (components, Assets and Styles)
import Style from "./TestimonialsSection.module.css";
import { SectionCard } from "../../";
import { imgReview2, imgReview3 } from "../../../assets";
import review1 from "../../../assets/imgs/review1.jpeg";
import review2 from "../../../assets/imgs/client2.jpg";
import egyFlag from "../../../assets/imgs/flag.png";
import phaFlag from "../../../assets/imgs/phalestine.png";
// External libraries
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function TestimonialsSection() {
  const { t } = useTranslation();

  const testimonials = [
    {
      id: 1,
      src: review1,
      text: "حاولت تعلم التداول بمفردي ولكن نتائجى لم تكن ناجحة، وعندما رشح لي صديقي ستوك سكويرز وتعلمت مع مدرب متخصص أصبح أدائي منضبط وناجح.",
      name: "محمد سمير",
      position: "مدير سلاسل توريد",
      flag: egyFlag,
    },
    {
      id: 2,
      src: review2,
      text: " كنت مشتت في بداية تعلمي التداول، لكن بعد التحاقي بستوك سكويرز اكتسبت فهم واضح واستراتيجيات فعالة. التعليم العملي ساعدني أحقق نتائج ملموسة وأصبحت أكثر ثقة في قراراتي.",
      name: " أنس أيوب",
      position: "مدير عمليات ",
      flag: phaFlag,
    },
  ];

  // Slick Slides
  const sliderRef = useRef(null);
  // const next = () => sliderRef.current && sliderRef.current.slickNext();
  // const previous = () => sliderRef.current && sliderRef.current.slickPrev();

  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    arrows: false,
  };

  return (
    <SectionCard
      heading={t("sections.testimonials.title")}
      wrapperClass="wrapperClass-sectionCard"
      headingSpan={t("sections.testimonials.note")}
      p6={false}
    >
      <div className="rounded-xl w-full p-1 lg:px-5 relative">
        <Slider ref={sliderRef} {...settings}>
          {testimonials.map((item) => (
            <div className=" w-full  h-auto relative">
              <img
                className="w-[4rem] md:w-[3.4rem] lg:w-[4rem] absolute top-0 bg-primary-300 border-2 border-black rounded-full left-[10px]"
                src="/src/assets/imgs/quotes.png"
              />
              <div className="w-[90%] m-auto mt-4 p-3 flex items-center h-[160px] border-2 bg-white/95 dark:bg-dark-background  border-gray-500   ">
                <p className="text-right text-[14px] md:text-[16px] lg:text-lg leading-relaxed">
                  {" "}
                  {item.text}{" "}
                </p>
              </div>
              <div className=" w-full flex flex-col items-center">
                <div className="w-[5rem] h-[10vh] mt-[-40px] border-[3px] border-gray-500 rounded-full overflow-hidden m-auto">
                  <img src={item.src} className="w-full h-full  bg-white rounded-full" />
                </div>
                <div className="flex gap-2 items-center">
                <p className="mt-2 "> {item.name} &nbsp; <span className=" font-semibold text-primary-700"> ({item.position})</span>  </p>
                <img src={item.flag} className="w-[30px] h-[30px] object-contain"/>
              </div></div>
            </div>
          ))}
        </Slider>
        {/* <div className="flex justify-center items-center gap-4 mt-8">
          <button
            className="w-4 h-2 bg-primary-400 rounded hover:bg-primary-500"
            onClick={previous}
          ></button>
          <button
            className="w-4 h-2 bg-primary-400 rounded hover:bg-primary-500"
            onClick={next}
          ></button>
        </div> */}
      </div>
    </SectionCard>
  );
}

export default TestimonialsSection;
