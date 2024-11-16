import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Style from './HeroSection.module.css';

function HeroSection() {
    const [counter, setCounter] = useState(0);



    useEffect(() => {
        
    }, []);

    return <>
        <h2>HeroSection</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quidem distinctio dicta tenetur impedit aspernatur!</p>
    </>
}

export default HeroSection