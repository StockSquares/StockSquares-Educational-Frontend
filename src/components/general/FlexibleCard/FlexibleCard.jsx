import React, { useEffect, useState } from 'react';

// Internal Imports (components, Assets and Styles)
import Style from './FlexibleCard.module.css';
import { Button, SecondaryInfo } from '../..';
import { arrowRight, bookBG, chartBar, circleUser, clock, eye } from './../../../assets';

// External libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function FlexibleCard({isHorizontal=true, isCourse=false, btnLinkTo=''}) {
    const [counter, setCounter] = useState(0);



    useEffect(() => {
        
    }, []);

    return <>
        <div className={`${isHorizontal ? 'mb-4' : 'p-3'}`}>
            <div className={`${isHorizontal ? 'flex-center' : 'flex flex-col'} bg-white rounded-lg overflow-hidden shadow-md transDuration-500 hover:shadow-primary-400 hover:scale-105 dark:bg-gray-800 group`}>
                <Link to='' className={`${isHorizontal ? 'w-full md:w-1/3' : ''} self-stretch md:flex`}>
                    <div className='w-full overflow-hidden'><img className='img-cover transDuration-500 group-hover:scale-110' src={bookBG} alt="" /></div>
                </Link>
                <div className={`${isHorizontal ? 'w-full md:w-2/3' : ''} p-4 flex flex-col justify-between`}>
                    <div className='flex-y-center justify-between text-sm text-gray-400'>
                        <SecondaryInfo infoText='Category' icon={chartBar} flip='vertical' />
                        <SecondaryInfo infoText='Date' />
                    </div>
                    <div>
                        <Link to=''><h5 className='hover:text-primary-800'>article-title</h5></Link>
                        <p className='mb-2'>popular Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo quae consequatur error.</p>
                    </div>
                    <div className='flex-y-center justify-between'>
                        <div className='text-sm text-gray-400 grow'>
                            <SecondaryInfo infoText='Writer' icon={circleUser} />
                            <div className='flex-y-center justify-between pe-10'>
                                <SecondaryInfo infoText={isCourse ? 'duration' : 'views'} icon={isCourse ? eye : clock} />
                                <SecondaryInfo infoText='Date' />
                            </div>
                        </div>
                        <Button btnText={isCourse ? 'Join' : 'Read more'} linkTo={btnLinkTo}>
                            <FontAwesomeIcon className='ms-2 font-bolder' icon={arrowRight} flip="horizontal" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default FlexibleCard