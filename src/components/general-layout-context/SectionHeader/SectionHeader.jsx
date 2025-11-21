import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Style from './SectionHeader.module.css';

function SectionHeader() {
    const [counter, setCounter] = useState(0);



    useEffect(() => {
        
    }, []);

    return <>
        <h2>SectionHeader</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quidem distinctio dicta tenetur impedit aspernatur!</p>
    </>
}

export default SectionHeader