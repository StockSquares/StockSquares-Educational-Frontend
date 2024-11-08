import React, { useEffect, useState } from 'react';

// Internal Imports (components, Assets and Styles)
import Style from './RecommendationsSection.module.css';

function RecommendationsSection() {
    const [counter, setCounter] = useState(0);



    useEffect(() => {
        
    }, []);

    return <>
        <h2>RecommendationsSection</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quidem distinctio dicta tenetur impedit aspernatur!</p>
    </>
}

export default RecommendationsSection