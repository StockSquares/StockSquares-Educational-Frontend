import React, { useEffect, useState } from 'react';

import Style from './Ad.module.css';

function Ad() {
    const [counter, setCounter] = useState(0);



    useEffect(() => {
        
    }, []);

    return <>
        <div className='bg-lightgray h-48 flex-center'>
            <h2>Ad</h2>
        </div>
    </>
}

export default Ad