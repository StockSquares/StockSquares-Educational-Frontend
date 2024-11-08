import React, { useContext, useEffect, useState } from 'react';

// Internal Imports (components, Assets and Styles)
import Style from './Sidebar.module.css';
import { AisleCard, AisleNav } from '../..';
import { AisleContext } from '../../../Context';

// External libraries

function Sidebar({popularTitle='Popular', recentTitle='Recent'}) {
    const {isPopular, isRecent} = useContext(AisleContext);

    useEffect(() => {

    }, []);

    return <>
        {/* <div className='md:w-2/5 lg:w-1/4 px-4 py-8 self-start'> */}
            {!isPopular &&                       
            <AisleNav title={popularTitle}>
                <li>
                    <AisleCard />
                </li>
                <li>
                    <AisleCard />
                </li>
                <li>
                    <AisleCard />
                </li>
            </AisleNav>}

            {!isRecent && 
            <AisleNav title={recentTitle}>
                <li>
                    <AisleCard />
                </li>
                <li>
                    <AisleCard />
                </li>
                <li>
                    <AisleCard />
                </li>
            </AisleNav>}

            <div className='shadow-md p-4 rounded-lg bg-primary-300 text-center'>
                Ads
            </div>
        {/* </div> */}
    </>
}

export default Sidebar