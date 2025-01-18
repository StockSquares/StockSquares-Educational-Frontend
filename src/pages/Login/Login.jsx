import React, { useState } from 'react';
import styles from './Login.module.css';
import logo from '../../assets/imgs/logo-SS.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
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
            setErrorMessage('من فضلك، أدخل البريد الإلكتروني وكلمة المرور.');
        } else {
            setErrorMessage('');
            alert('تم تسجيل الدخول بنجاح!');
        }
    };

    return (
        <div className={styles.contain2}>
            <img src={logo} alt="Logo" className={styles.logo} />
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
                        type={showPassword ? 'text' : 'password'}
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

                {errorMessage && <p className={styles.error}>{errorMessage}</p>}

                <button className={styles.bu1} onClick={handleSubmit}>تسجيل الدخول</button>

                <p className={styles.registerLink}>
                    ليس لديك حساب؟ <a href="/register">إنشاء حساب جديد</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
