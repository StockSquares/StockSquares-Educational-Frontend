/**
 * Switches the website language by updating the HTML tag's language and text direction.
 *
 * @param {string} lang - The language code to switch to (e.g., 'ar' for Arabic, 'en' for English).
 *                        If 'ar' is provided, the text direction will be set to 'rtl' (right-to-left).
 *                        Otherwise, it defaults to 'ltr' (left-to-right).
 */
export default function switchLanguage (lang='ar')  {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('lang', lang); // Optional: persist the language choice in local storage
};


// Usage:
{/* <button onClick={() => switchLanguage('ar')}>عربي</button>
<button onClick={() => switchLanguage('en')}>English</button> */}

