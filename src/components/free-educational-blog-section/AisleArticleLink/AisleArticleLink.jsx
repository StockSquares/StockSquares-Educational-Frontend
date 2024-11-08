import React, { useEffect, useState } from 'react';

// Assets and styles
import Style from './AisleArticleLink.module.css';
import { bookBG } from './../../../assets'


// External libraries
import { Link } from 'react-router-dom';

function AisleArticleLink() {
    const [counter, setCounter] = useState(0);



    useEffect(() => {
        
    }, []);

    return <>
        <Link to="" className="flex-y-center">
            <div className='w-1/3 rounded-md overflow-hidden'><img className='img-cover' src={bookBG} alt="" /></div>
            <div className='w-2/3 p-2'>
                <h5>article-title</h5>
                <p>popular-1</p>
            </div>
        </Link>
    </>
}

export default AisleArticleLink