import React from 'react';

// Internal Imports (components, Assets and Styles)
import Style from './ProtectedRoute.module.css';

// External libraries
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children}) {

    if(localStorage.getItem('UserToken') !== null) {
        return {children};
    } else {
        return <Navigate to={'/'} />
    }
}

export default ProtectedRoute