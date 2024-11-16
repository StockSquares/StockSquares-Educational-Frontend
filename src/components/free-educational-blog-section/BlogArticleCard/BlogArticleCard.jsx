import React, { useContext, useEffect, useState } from 'react';

// Internal Imports (components, Assets and Styles)
import Style from './BlogArticleCard.module.css';
import { bookBG, bookFront, bookBack, arrowRight } from './../../../assets'
import { ConfigContext } from '../../../Context';

// External libraries
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function BlogArticleCard() {
    const [counter, setCounter] = useState(0);
    const { isRtl } = useContext(ConfigContext); // not a good solution, i should do it with the lang changer


    useEffect(() => {
        
    }, []);

    return <>
        <div className="lg:w-1/2 p-4 self-stretch">
            <div className=' flex flex-col bg-white rounded-lg shadow h-full overflow-hidden transDuration-500 hover:scale-105 hover:shadow-sm hover:shadow-primary-light dark:bg-gray-800 dark:border-gray-700 group'>
                <Link to="#">
                    <div className='rounded-t-md'><img className='img-cover group-hover:scale-110 transDuration-500' src={bookBG} alt="" /></div>
                </Link>
                <div className="p-5 grow flex flex-col">
                    <Link to="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy tecs 2021</h5>
                    </Link>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here ar of 2021 so far, in reverse chronological order.</p>
                    <Link to="#" className="mt-auto w-fit inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-primary-light focus:ring-4 focus:outline-none focus:ring-lime-300 dark:bg-primary-light dark:hover:bg-primary dark:focus:ring-primary-light">
                    Read more
                        <svg className={`${isRtl ? 'rotate-180' : 'rotate-0'} w-3.5 h-3.5 ms-2`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                        {/* <FontAwesomeIcon className='ms-2 font-bolder' icon={arrowRight} flip="horizontal" /> */}
                    </Link>
                </div>
            </div>
        </div>
    </>
}

export default BlogArticleCard