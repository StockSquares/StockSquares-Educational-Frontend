import React, { useEffect, useState } from 'react';

// Internal Imports (components, Assets and Styles)
import Style from './SecondaryInfo.module.css';

// External libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SecondaryInfo({infoText='Date', icon, ...rest }) {
    const [counter, setCounter] = useState(0);



    useEffect(() => {
        
    }, []);

    return <>
        <span className='text-gray-400 font-normal text-base flex-y-center'>
            <small>
                {icon && <FontAwesomeIcon 
                    className='pe-2' 
                    icon={icon} 
                    {...rest} 
                />}
                {infoText}
            </small>
        </span>
    </>
}

export default SecondaryInfo