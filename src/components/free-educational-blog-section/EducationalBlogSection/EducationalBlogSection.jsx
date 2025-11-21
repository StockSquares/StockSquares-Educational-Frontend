import React, { useEffect, useState, useRef } from 'react';

// Internal Imports (components, Assets and Styles)
import Style from './EducationalBlogSection.module.css';
import { SectionCard } from '../..';
import { chartBar, circleUser } from '../../../assets';

// External libraries
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from 'react-slick/lib/slider';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function EducationalBlogSection() {
    const { t } = useTranslation();


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
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplaySpeed: 3000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };


    useEffect(() => {
        
    }, []);

    return <>
        <SectionCard heading={t('sections.blog.title')} p6={false}>
            <div className='row'>
            <div className='px-2 pt-6 w-full lg:w-1/2'>
                <div className='h-48 bg-gray'></div>
                <ul className='row justify-between py-4'>
                    <li className='flex-y-center'>
                        <FontAwesomeIcon className='p-2' icon={circleUser} />
                        <span>اسم الكاتب</span>
                    </li>
                    <li className='flex-y-center'>
                        <FontAwesomeIcon className='p-2' icon={chartBar} flip='vertical' />
                        <span>التصنيف</span>
                    </li>
                </ul>
            </div>
            <div className='px-2 pt-6 w-full lg:w-1/2 hidden lg:block'>
                <div className='h-48 bg-gray'></div>
                <ul className='row justify-between py-4'>
                    <li className='flex-y-center'>
                        <FontAwesomeIcon className='p-2' icon={circleUser} />
                        <span>اسم الكاتب</span>
                    </li>
                    <li className='flex-y-center'>
                        <FontAwesomeIcon className='p-2' icon={chartBar} flip='vertical' />
                        <span>التصنيف</span>
                    </li>
                </ul>
            </div>
            </div>
        </SectionCard>
        <div className='py-2'>
            {/* Slider */}
            <Slider ref={sliderRef} {...settings}>
                <div className='w-1/3 px-1'><div className='h-36 bg-gray'>1</div></div>
                <div className='w-1/3 px-1'><div className='h-36 bg-gray'>2</div></div>
                <div className='w-1/3 px-1'><div className='h-36 bg-gray'>3</div></div>
                <div className='w-1/3 px-1'><div className='h-36 bg-gray'>4</div></div>
                <div className='w-1/3 px-1'><div className='h-36 bg-gray'>5</div></div>
            </Slider>
        </div>
    </>
}

export default EducationalBlogSection



// making the sliders in not out
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, transform: "translate(-40px, -50%)", zIndex: '20' }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, transform: "translate( 40px, -50%)", zIndex: '20' }}
            onClick={onClick}
        />
    );
}