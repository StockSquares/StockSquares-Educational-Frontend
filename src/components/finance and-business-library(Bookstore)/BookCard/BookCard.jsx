import React, { useEffect } from 'react';

// Internal Imports (components, Assets, and Styles)
import Style from './BookCard.module.css';
import { Button } from '../..';
import { 
    bookFront, 
    bookBack, 
    free_delivery_black_2_with_parcel, 
    free_shipping_text_red 
} from './../../../assets';

// External libraries
import { useTranslation } from 'react-i18next';

function BookCard() {
    const { t } = useTranslation();

    useEffect(() => {
        // Any side-effects can be added here
    }, []);

    return (
        <div className="h-full p-2">
            {/* Book Image */}
            <div className="h-48 bg-book-background bg-cover bg-center flex-center">
                <div className="relative mx-6">
                    <div className="relative z-20 end-3 top-3">
                        <img className="aspect-auto" src={bookFront} alt="book-front-cover" />
                    </div>
                    <div className="w-full absolute z-10 start-3 bottom-3">
                        <img className="aspect-auto" src={bookBack} alt="book-back-cover" />
                    </div>
                </div>
            </div>

            {/* Book Details */}
            <div className="text-center dark:text-dark">
                <p>علم المال</p>
                <p className="mb-2">200 جنيه</p>

                {/* Animated Button */}
                <Button 
                    btnText="" 
                    textColor="black" 
                    bgColor="accent" 
                    btnClassName="w-full text-start  group relative"
                >
                    {/* Hover Animation */}
                    <span className="transDuration-500 text-[11px] sm:text-lg group-hover:opacity-0">
                        {t('sections.bookstore.bookCard.btn')}
                    </span>
                    <div className="w-1/3 absolute end-0 -translate-x-1/5 transDuration-500 group-hover:scale-110 z-20">
                        <img 
                            className="w-full" 
                            src={free_shipping_text_red} 
                            alt="free_shipping_text_red" 
                        />
                    </div>
                    <div className="ps-1 w-1/3 absolute transDuration-500 -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                        <img 
                            className="w-full" 
                            src={free_delivery_black_2_with_parcel} 
                            alt="free_delivery_black_with_parcel" 
                        />
                    </div>
                </Button>
            </div>
        </div>
    );
}

export default BookCard;
