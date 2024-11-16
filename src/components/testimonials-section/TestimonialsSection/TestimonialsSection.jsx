import React, { useEffect, useState, useRef } from 'react';

// Internal Imports (components, Assets and Styles)
import Style from './TestimonialsSection.module.css';
import { SectionCard } from '../../';
import { imgReview1, imgReview2, imgReview3 } from '../../../assets';

// External libraries
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function TestimonialsSection() {
    const { t } = useTranslation();

    const images = [
        {
            id: 1,
            src: imgReview1,
            title: 'testimonial'
        },
        {
            id: 2,
            src: imgReview2,
            title: 'testimonial'
        },
        {
            id: 3,
            src: imgReview3,
            title: 'testimonial'
        }
    ];

    // Slick Slides
    const sliderRef = useRef(null);
    const next = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };
    const previous = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };
<<<<<<< HEAD

    // Slider settings with responsive options
=======
>>>>>>> e7a6e37efe506aed563c657e6842d7b197940692
    const settings = {
        dots: false,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
<<<<<<< HEAD
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024, // For screens larger than 1024px (desktop, etc.)
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768, // For medium screens (tablets)
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480, // For small screens (mobile)
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    useEffect(() => {
        // Any additional logic here
    }, []);

    return (
        <SectionCard heading={t('sections.testimonials.title')} wrapperClass='wrapperClass-sectionCard' headingSpan={t('sections.testimonials.note')}>
            <div className='rounded-xl w-full px-6 relative after:content-[""] after:absolute after:border after:border-primary after:border-4 after:rounded-xl after:top-0 after:start-6 after:end-6 after:bottom-8 after:z-3'>
                {/* Slider */}
                <Slider ref={sliderRef} {...settings}>
                    {images.map((img) => (
                        <div key={img.id}>
                            <img className="w-full h-auto object-cover" src={img.src} alt={img.title} />
                        </div>
                    ))}
                </Slider>
                <div className='flex justify-center items-center gap-4 mt-4'>
                    <button className="w-4 h-2 bg-slate-300 rounded hover:bg-slate-400" onClick={previous}></button>
                    <button className="w-4 h-2 bg-slate-300 rounded hover:bg-slate-400" onClick={next}></button>
                </div>
            </div>
        </SectionCard>
    );
}

export default TestimonialsSection;
=======
        cssEase: "linear"
    };


    useEffect(() => {
        
    }, []);

    return <>
        <SectionCard heading={t('sections.testimonials.title')} wrapperClass='wrapperClass-sectionCard' headingSpan={t('sections.testimonials.note')}>
                <div className='rounded-xl w-full px-6 relative after:content-[""] after:absolute after:border after:border-primary after:border-4 after:rounded-xl after:top-0 after:start-6 after:end-6 after:bottom-8 after:z-3'>
                    {/* Slider */}
                    <Slider ref={sliderRef} {...settings}>
                        {images.map((img) => <div key={img.id} className=''><img className='w-full' src={img.src} alt={img.title} /></div>)}
                    </Slider>
                    <div className='flex justify-center items-center gap-4 mt-4'>
                        <button className="w-4 h-2 bg-slate-300 rounded hover:bg-slate-400" onClick={previous}></button>
                        <button className="w-4 h-2 bg-slate-300 rounded hover:bg-slate-400" onClick={next}></button>
                    </div>
                </div>
        </SectionCard>
    </>
}

export default TestimonialsSection
>>>>>>> e7a6e37efe506aed563c657e6842d7b197940692
