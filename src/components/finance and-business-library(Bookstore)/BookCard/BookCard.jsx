import React, { useEffect, useState } from 'react';

// Internal Imports (components, Assets and Styles)
import Style from './BookCard.module.css';
import { Button } from '../..';
<<<<<<< HEAD
import { bookBG, bookFront, bookBack } from './../../../assets'

// External libraries
import { useTranslation } from 'react-i18next';
=======
import { bookBG, bookFront, bookBack, free_delivery_black_1, free_delivery_black_2_with_parcel, free_delivery_green_1, free_delivery_green_2, free_shipping_text_green, free_shipping_text_red } from './../../../assets'

// External libraries
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
>>>>>>> 4b237b7 (Your commit message)

function BookCard() {
    const { t } = useTranslation();



    useEffect(() => {
        
    }, []);

    return <>
        <div className='h-full p-2'>
            <div className='h-48 bg-book-background bg-cover bg-center flex-center'>
                {/* aspect ratio for img */}
                <div className='relative mx-6'>
                    <div className='relative z-20 end-3 top-3'><img className='aspect-auto' src={bookFront} alt="book-front-cover" /></div>
                    <div className='w-full absolute z-10 start-3 bottom-3'><img className='aspect-auto' src={bookBack} alt="book-back-cover" /></div> 
                </div> 
            </div>
            <div className='text-center'>
                <p>علم المال</p>
                <p className='mb-2'>200 جنيه</p>
<<<<<<< HEAD
                <Button btnText={t('sections.bookstore.bookCard.btn')}  textColor='black' bgColor='accent' />
=======
                <Button btnText=''  textColor='black' bgColor='accent' btnClassName='w-full text-start group relative'>
                    {/* <FontAwesomeIcon icon={faTruckFast} className='ps-2 transDuration-500 -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100' /> */}
                    {/* <span className='small text-primary'>free <br />shipping</span> */}
                    <span className='transDuration-500 group-hover:opacity-0'>{t('sections.bookstore.bookCard.btn')}</span>
                    <div className='w-1/3 absolute end-0 -translate-x-1/5 transDuration-500 group-hover:scale-110 z-20'><img className='w-full' src={free_shipping_text_red} alt="free_delivery_black_1" /></div>
                    <div className='ps-1 w-1/3 absolute transDuration-500 -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100'>
                        <img className='w-full' src={free_delivery_black_2_with_parcel} alt="free_delivery_black_1" />
                    </div>
                </Button>
>>>>>>> 4b237b7 (Your commit message)
            </div>
        </div>
    </>
}

export default BookCard