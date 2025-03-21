import React, { useEffect, useState, useRef } from "react";

// Internal Imports (components, Assets and Styles)
import Style from "./TestimonialsSection.module.css";
import { SectionCard } from "../../";
import { imgReview2, imgReview3 } from "../../../assets";
import review1 from "../../../assets/imgs/review1.jpeg";

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
      text: "حاولت تعلم التداول بنفردي ولكن نتائجى لم تكن ناجحة، وعندما رشح لي صديقي ستوك سكويرز وتعلمت مع مدرب متخصص أصبحت أدائي منضبط وناجح.",
      name: "محمد سمير",
      position: "مدير سلسل توريد"
    },
    {
      id: 2,
      src: review1,
      text: "حاولت تعلم التداول بنفردي ولكن نتائجى لم تكن ناجحة، وعندما رشح لي صديقي ستوك سكويرز وتعلمت مع مدرب متخصص أصبحت أدائي منضبط وناجح.",
      name: "محمد سمير",
      position: "مدير سلسل توريد"
    },
    {
      id: 3,
      src: review1,
      text: "حاولت تعلم التداول بنفردي ولكن نتائجى لم تكن ناجحة، وعندما رشح لي صديقي ستوك سكويرز وتعلمت مع مدرب متخصص أصبحت أدائي منضبط وناجح.",
      name: "محمد سمير",
      position: "مدير سلسل توريد"
    },
  ];

  // Slick Slides
  const sliderRef = useRef(null);
  const next = () => sliderRef.current && sliderRef.current.slickNext();
  const previous = () => sliderRef.current && sliderRef.current.slickPrev();

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
  };

  return (
    <SectionCard
      heading={t("sections.testimonials.title")}
      wrapperClass="wrapperClass-sectionCard"
      headingSpan={t("sections.testimonials.note")}
    >
      <div className="rounded-xl w-full px-6 relative">
        <Slider ref={sliderRef} {...settings}>
          {testimonials.map((item) => (
            <div key={item.id} className="p-6 flex flex-col items-center justify-center bg-gray-100 rounded-xl shadow-lg">
              <img className="w-[5rem] h-[5rem] pr-1 object-fill rounded-full pt-1 mb-4 border-4 border-primary float-right ml-4" src={item.src} alt="testimonial" />
              <p className="text-right text-gray-800 mb-2">"{item.text}"</p>
              <div className="flex flex-row-reverse justify-end gap-1">
              <img className="w-[30px]" src="/src/assets/imgs/flag.png"/>
              <span className="text-gray-600 font-semibold">{item.name}</span>
              <span className="text-gray-500 text-sm">{item.position}</span>
              </div>
            </div>
          ))}
        </Slider>
        <div className="flex justify-center items-center gap-4 mt-4">
          <button className="w-4 h-2 bg-primary-400 rounded hover:bg-primary-500" onClick={previous}></button>
          <button className="w-4 h-2 bg-primary-400 rounded hover:bg-primary-500" onClick={next}></button>
        </div>
      </div>
    </SectionCard>
  );
}

export default TestimonialsSection;
