import React, { useEffect, useState } from 'react';

// Internal Imports (components, Assets and Styles)
import Style from './AisleNav.module.css';
import { AisleCard } from '../..';

// External libraries

function AisleNav({children, title='Popular'}) {
    const [counter, setCounter] = useState(0);



    useEffect(() => {

    }, []);

    return <>
        <div className='shadow-md py-4 rounded-lg bg-white mb-8'>
            <h3 className='text-base font-semibold px-4 mb-4'>{title}</h3>
            <ul className='flex flex-col'>
                {children}
            </ul>
        </div>
    </>
}

export default AisleNav