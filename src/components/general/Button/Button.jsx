import React, { useEffect, useState } from 'react';

// Internal Imports (components, Assets and Styles)
import Style from './Button.module.css';

// External libr aries
import { Link } from 'react-router-dom';

<<<<<<< HEAD
function Button({ children, linkTo = '', btnText = 'Click', btnClassName = '', textColor = 'white', textHoverColor = textColor, bgColor = 'primary', bgHoverColor = bgColor, bgDarkColor = bgColor, bgHoverDarkColor = bgColor, ringFocusColor = bgColor, ringFocusDarkColor = bgColor, px = 'px-4', py = 'py-1.5', me = '', btnType = 'button' }) {
=======
    function Button({children, linkTo='', btnText='Click', btnClassName='', textColor='white', textHoverColor=textColor, bgColor='primary', bgHoverColor=bgColor, bgDarkColor=bgColor, bgHoverDarkColor=bgColor, ringFocusColor=bgColor, ringFocusDarkColor=bgColor, px = 'px-4', py = 'py-1.5', me = '', btnType='button'}) {
>>>>>>> 4b237b7 (Your commit message)
    const [counter, setCounter] = useState(0);



    useEffect(() => {
<<<<<<< HEAD

=======
        
>>>>>>> 4b237b7 (Your commit message)
    }, []);

    return <>
        {/* <button className={`${btnClassName} ${px} ${py} ${me}`} type={btnType}>
            {btnText} {children}
        </button> */}
        <button className={` 
<<<<<<< HEAD
                text-${textColor}  bg-${bgColor}  hover:bg-${bgHoverColor}-800   hover:text-${textHoverColor}   focus:ring-${ringFocusColor}-300   dark:bg-${bgDarkColor}-800   dark:hover:bg-${bgHoverDarkColor}   dark:focus:ring-${ringFocusDarkColor}-300  ${btnClassName}  ${px} ${py} ${me}  focus:ring-4 focus:outline-none rounded-lg hover:scale-105 transDuration-300`} type={btnType}>
=======
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
                focus:ring-4 focus:outline-none rounded-lg hover:scale-105 transDuration-300`} 
                type={btnType}>
>>>>>>> 4b237b7 (Your commit message)
            <Link to={linkTo} className={`w-fit inline-flex items-center text-sm font-medium text-center`}>
                {btnText} {children}
            </Link>
        </button>
<<<<<<< HEAD
    </>
=======
</>
>>>>>>> 4b237b7 (Your commit message)
}

export default Button