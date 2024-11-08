import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";



export let AisleContext = createContext(0);

export default function AisleContextProvider(props) {
    // State to track if 'Popular' tab is active
    const [isPopular, setIsPopular] = useState(true);
    // State to track if 'Recent' tab is active
    const [isRecent, setIsRecent] = useState(false);

    /**
     * Handles tab change events and updates state based on the active tab.
     * 
     * @param {number} activeTabIndex - The index of the currently active tab.
     * 
     * - If `activeTabIndex === 0`, the 'Popular' tab is active, so `isPopular` is set to true and `isRecent` is set to false.
     * - If `activeTabIndex === 1`, the 'Recent' tab is active, so `isPopular` is set to false and `isRecent` is set to true.
     * - If it's any other tab, both `isPopular` and `isRecent` are set to false.
     */
    function handleAisle(activeTabIndex) {
        if (activeTabIndex === 1) { // If 'Recent' tab is selected
            setIsPopular(false);
            setIsRecent(true);
        } else if (activeTabIndex === 0) { // If 'Popular' tab is selected
            setIsPopular(true);
            setIsRecent(false);
        } else { // For other tabs
            setIsPopular(false);
            setIsRecent(false);
        }
    }

    return <AisleContext.Provider value={ {isPopular, isRecent, handleAisle} }>
        {props.children}
    </AisleContext.Provider>
}