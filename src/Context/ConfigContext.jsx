// ConfigContext.js
import { createContext, useState } from 'react';

export let ConfigContext = createContext();

export default function ConfigProvider({ children }) {
    // Define global configuration values
    const baseURL = "https://example.com"; // Replace with your actual base URL
    const apiVersion = "v1"; // API version if applicable
    const appName = "StockSquares"; // Your project name
    const defaultLanguage = "ar"; // Default language (Arabic, for example)
    const isRtl = getComputedStyle(document.body).direction === 'rtl'; // Tailwind’s default behavior for RTL utilities is to check the presence of the dir attribute on the HTML element, not a CSS property.

    // User-related states
    const [currentUser, setCurrentUser] = useState(null); // Holds the logged-in user
    const [userRole, setUserRole] = useState("visitor"); // Can be 'admin', 'employee', 'investor', 'consultant', etc.

    // Course-related configuration
    const defaultCourseCategory = "Finance"; // Default category for filtering courses
    const [availableCourses, setAvailableCourses] = useState([]); // Dynamic list of courses

    // AI-related configuration
    const aiEnabled = true; // Whether AI features are enabled
    const [aiRecommendations, setAiRecommendations] = useState([]); // AI stock market recommendations

    // Virtual stock trading configuration
    const virtualTradingEnabled = true; // Whether the virtual trading feature is enabled
    const [virtualBalance, setVirtualBalance] = useState(10000); // Starting virtual balance for new users

    /** Window sizes according to tailwind breakpoints standards (change them according to the design priorities) */
    const breakpoints = {
        sm: {
            /** For small screens, typically mobile devices */
            minWidth: 640,
        },
        md: {
            /** For medium screens, such as tablets */
            minWidth: 768,
        },
        lg: {
            /** For large screens, typical desktop screens */
            minWidth: 1024,
        },
        xl: {
            /** For extra-large screens, often high-resolution displays */
            minWidth: 1280,
        },
        '2xl': {
            /** For ultra-large screens, widescreen monitors */
            minWidth: 1536,
        }
    };

    const scrollToPosition = el => {
        const offset = window.innerHeight / 5; // Calculate the offset for the middle of the screen
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        const scrollToPosition = elementPosition - offset; // Adjust scroll position to place the top of the section in the middle of the screen
    
        window.scroll({
            top: scrollToPosition,
            behavior: 'smooth', // Smooth scrolling
        });
    }


    return <ConfigContext.Provider value={{
            baseURL,
            apiVersion,
            appName,
            defaultLanguage,
            isRtl,
            currentUser,
            setCurrentUser,
            userRole,
            setUserRole,
            defaultCourseCategory,
            availableCourses,
            setAvailableCourses,
            aiEnabled,
            aiRecommendations,
            setAiRecommendations,
            virtualTradingEnabled,
            virtualBalance,
            setVirtualBalance,
            breakpoints,
            scrollToPosition,
        }}>
            {children}
        </ConfigContext.Provider>
}
