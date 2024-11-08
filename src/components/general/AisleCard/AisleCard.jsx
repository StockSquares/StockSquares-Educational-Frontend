import React, { useEffect, useState } from 'react';

// Assets and styles
import Style from './AisleCard.module.css';
import { bookBG } from './../../../assets';

// External libraries
import { Link } from 'react-router-dom';
import { SecondaryInfo } from '../..';

// Assets

// External libraries

function AisleCard({title='article title', date='Date'}) {
    const [counter, setCounter] = useState(0);



    useEffect(() => {
        
    }, []);

    return <>
        <Link to="" className="flex-y-center px-4 hover:bg-primary-50">
            <div className='w-1/3 rounded-md overflow-hidden'><img className='img-cover' src={bookBG} alt="" /></div>
            <div className='w-2/3 p-2'>
                <h5 className='text-md'>{title}</h5>
                <SecondaryInfo infoText={date} />
            </div>
        </Link>
    </>
}

export default AisleCard