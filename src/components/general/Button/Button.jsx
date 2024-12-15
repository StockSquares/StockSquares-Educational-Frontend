import React, { useEffect, useState } from 'react';

// Internal Imports (components, Assets and Styles)
import Style from './Button.module.css';

// External libraries
import { Link } from 'react-router-dom';

function Button({ 
    children, 
    linkTo = '', 
    btnText = 'Click', 
    btnClassName = '', 
    textColor = 'white', 
    textHoverColor = textColor, 
    bgColor = 'primary', 
    bgHoverColor = bgColor, 
    bgDarkColor = bgColor, 
    bgHoverDarkColor = bgColor, 
    ringFocusColor = bgColor, 
    ringFocusDarkColor = bgColor, 
    px = 'px-4', 
    py = 'py-1.5', 
    me = '', 
    btnType = 'button' 
}) {
    // Removed unused useState
    // Removed empty useEffect

    return (
        <button 
            className={`
                text-${textColor}
                bg-${bgColor}
                hover:bg-${bgHoverColor}-800 
                hover:text-${textHoverColor} 
                focus:ring-${ringFocusColor}-300 
                dark:bg-${bgDarkColor}-800 
                dark:hover:bg-${bgHoverDarkColor} 
                dark:focus:ring-${ringFocusDarkColor}-300
                ${btnClassName}
                ${px} ${py} ${me}
                focus:ring-4 focus:outline-none rounded-lg hover:scale-105 transDuration-300
            `} 
            type={btnType}
        >
            <Link 
                to={linkTo} 
                className="w-fit inline-flex items-center text-sm font-medium text-center"
            >
                {btnText} {children}
            </Link>
        </button>
    );
}

export default Button;