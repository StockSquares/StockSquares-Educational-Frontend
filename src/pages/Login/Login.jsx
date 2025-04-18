import React, { useState } from "react";
import styles from "./Login.module.css";
import logo from "../../assets/imgs/logo-SS.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import falogo2  from "../../assets/icons/social-contacts/facebook-svgrepo-com (1).svg"

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = () => {
        const { email, password } = formData;

        if (!email || !password) {
            setErrorMessage("من فضلك، أدخل البريد الإلكتروني وكلمة المرور.");
        } else {
            setErrorMessage("");
            alert("تم تسجيل الدخول بنجاح!");
        }
    };
    

    const handleGoogleLogin = async () => {
        try {
            const response = await fetch('https://stocksquare.runasp.net/api/Account/login-External?provider=google', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
    
            const data = await response.json();
            console.log('Response:', data);
    
            if (response.ok) {
                alert('تم تسجيل الدخول بنجاح عبر Google!');
            } else {
                throw new Error(data?.message || 'حدث خطأ أثناء تسجيل الدخول عبر Google.');
            }
        } catch (error) {
            console.error('Google Login Error:', error);
            setErrorMessage('حدث خطأ أثناء تسجيل الدخول عبر Google.');
        }
    };
    const handleFacebookLogin = async () => {
        try {
            const response = await fetch('https://stocksquare.runasp.net/api/Account/login-External?provider=facebook', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
    
            const data = await response.json();
            console.log('Response:', data);
    
            if (response.ok) {
                alert('تم تسجيل الدخول بنجاح عبر Facebook!');
            } else {
                throw new Error(data?.message || 'حدث خطأ أثناء تسجيل الدخول عبر Facebook.');
            }
        } catch (error) {
            console.error('Facebook Login Error:', error);
            setErrorMessage('حدث خطأ أثناء تسجيل الدخول عبر Facebook.');
        }
    };
    

    return (
        <div className={styles.contain2}>
            <img src={logo} alt="Logo" className={styles.logo}  />
            <h2>أول منصة عربية ذكية لدعم المستثمرين ورواد الأعمال</h2>
            <h1>تسجيل الدخول</h1>
            <hr />
            <div className={styles.contain3}>
                <label htmlFor="email">البريد الإلكتروني:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="أدخل البريد الإلكتروني"
                    onChange={handleChange}
                />

                <label htmlFor="password">كلمة المرور:</label>
                <div className={styles.passwordField}>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="أدخل كلمة المرور"
                        onChange={handleChange}
                    />
                    <FontAwesomeIcon
                        icon={showPassword ? faEye : faEyeSlash}
                        className={styles.eyeIcon}
                        onClick={togglePasswordVisibility}
                    />
                </div>
                <p className="text-blue-600">هل نسيت كلمه المرور ؟ </p>


                {errorMessage && <p className={styles.error}>{errorMessage}</p>}

                <button className={styles.bu1} onClick={handleSubmit}>
                    تسجيل الدخول
                </button>

                <button className={styles.googleButton} onClick={handleGoogleLogin}>

                    تسجيل الدخول باستخدام 
                    <img src="https://www.svgrepo.com/show/223041/google.svg" alt="Google Logo" />
                </button>
                <button className={styles.facebookButton} onClick={handleFacebookLogin}>

                تسجيل الدخول باستخدام 
                <img src={falogo2} alt="Facebook Logo" />
                </button>

                <p className={styles.registerLink}>
                    ليس لديك حساب؟ <a href="/register">إنشاء حساب جديد</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
