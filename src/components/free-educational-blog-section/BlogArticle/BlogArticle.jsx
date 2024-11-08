import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Style from './BlogArticle.module.css';

function BlogArticle() {
    const [counter, setCounter] = useState(0);



    useEffect(() => {
        
    }, []);

    return <>
        <h2>BlogArticle</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quidem distinctio dicta tenetur impedit aspernatur!</p>
    </>
}

export default BlogArticle