import React, { useEffect, useState } from 'react';

// Internal Imports (components, Assets and Styles)
import Style from './TemplateName.module.css';
import {  } from '../..';

// External libraries
import { useTranslation } from 'react-i18next';

function TemplateName() {
    const [counter, setCounter] = useState(0);



    useEffect(() => {
        
    }, []);

    return <>
        <h2>TemplateName</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quidem distinctio dicta tenetur impedit aspernatur!</p>
    </>
}

export default TemplateName