import React, { useEffect, useState } from 'react';

// Internal Imports (components, Assets and Styles)
import Style from './BookCard.module.css';
import { Button } from '../..';
import { bookBG, bookFront, bookBack } from './../../../assets'

// External libraries
import { useTranslation } from 'react-i18next';

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
                <Button btnText={t('sections.bookstore.bookCard.btn')}  textColor='black' bgColor='accent' />
            </div>
        </div>
    </>
}

export default BookCard