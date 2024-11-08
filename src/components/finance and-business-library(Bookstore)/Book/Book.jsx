import React, { useEffect, useState } from 'react';

// Internal Imports (components, Assets and Styles)
import Style from './Book.module.css';

// External libraries

function Book() {
    const [counter, setCounter] = useState(0);



    useEffect(() => {
        
    }, []);

    return <>
        <h2>Book</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quidem distinctio dicta tenetur impedit aspernatur!</p>
    </>
}

export default Book