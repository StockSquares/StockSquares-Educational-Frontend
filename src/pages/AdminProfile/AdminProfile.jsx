import React, { useEffect, useState } from 'react';

import Style from './AdminProfile.module.css';

function AdminProfile() {
    const [counter, setCounter] = useState(0);



    useEffect(() => {
        
    }, []);

    return <>
        <h2>AdminProfile</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quidem distinctio dicta tenetur impedit aspernatur!</p>
    </>
}

export default AdminProfile