import React, { useEffect, useState } from 'react';

import Style from './User.module.css';

function User() {
    const [counter, setCounter] = useState(0);



    useEffect(() => {

    }, []);

    return <>
        <h2>User</h2>
        <p>Lorem ipsum dholor sit amet consectetur adipisicing elit. Quibusdam quidem distinctio dicta tenetur impedit aspernatur!</p>
    </>
}

export default User