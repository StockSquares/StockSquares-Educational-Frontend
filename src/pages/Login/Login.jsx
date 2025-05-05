import React, { useState } from 'react';
import styles from './Login.module.css';
import logo from '../../assets/imgs/logo-SS.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import falogo2 from '../../assets/icons/social-contacts/facebook-svgrepo-com (1).svg';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const refreshAccessToken = async () => {
        try {
            const refreshToken = localStorage.getItem('RefreshToken');
            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            const response = await fetch('https://stocksquare.runasp.net/api/Account/RefreshToken', {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/plain',
                    'Authorization': `Bearer ${refreshToken}`,
                },
            });

            const result = await response.json();
            if (result.isSuccess) {
                const { token, refreshToken: newRefreshToken } = result.data;
                localStorage.setItem('accessToken', token);
                if (newRefreshToken) {
                    localStorage.setItem('RefreshToken', newRefreshToken);
                }
                console.log('Token refreshed:', result);
                return token;
            } else {
                throw new Error(result.error?.description || 'Failed to refresh token');
            }
        } catch (error) {
            console.error('Refresh Token Error:', error);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('RefreshToken');
            navigate('/login');
            return null;
        }
    };

    const handleSubmit = async () => {
        const { email, password } = formData;

        if (!email || !password) {
            setErrorMessage('من فضلك، أدخل البريد الإلكتروني وكلمة المرور.');
            return;
        }

        try {
            const response = await fetch('https://stocksquare.runasp.net/api/Account/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/plain',
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (result.isSuccess) {
                const { token, refreshToken } = result.data;
                localStorage.setItem('accessToken', token); // تخزين الـ Access Token
                localStorage.setItem('RefreshToken', refreshToken); // تخزين الـ Refresh Token
                console.log('User Token:', token);
                console.log('Refresh Token:', refreshToken);
                alert('✅ تم تسجيل الدخول بنجاح!');
                setErrorMessage('');
                // navigate('/dashboard'); // توجيه المستخدم لصفحة الـ Dashboard
            } else {
                setErrorMessage(result.error?.description || 'حدث خطأ غير متوقع.');
            }
        } catch (error) {
            console.error('Login Error:', error);
            setErrorMessage('❌ فشل الاتصال بالخادم. حاول مرة أخرى لاحقًا.');
        }
    };

    // دالة طلب محمي تتعامل مع ايرور 401
    const makeProtectedRequest = async (url) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                navigate('/login');
                return null;
            }

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/plain',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (response.status === 401) {
                // ايرور 401، حاول تجديد الـ Token
                const newToken = await refreshAccessToken();
                if (newToken) {
                    // إعادة الطلب بالـ Token الجديد
                    const retryResponse = await fetch(url, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'text/plain',
                            'Authorization': `Bearer ${newToken}`,
                        },
                    });
                    return await retryResponse.json();
                } else {
                    return null; // فشل التجديد، المستخدم يروح للـ Login
                }
            }

            return await response.json();
        } catch (error) {
            console.error('Protected Request Error:', error);
            return null;
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = 'https://stocksquare.runasp.net/api/Account/login-External?provider=Google';
    };

    const handleFacebookLogin = () => {
        window.location.href = 'https://stocksquare.runasp.net/api/Account/login-External?provider=Facebook';
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
                <p className="text-blue-600 my-3 cursor-pointer">هل نسيت كلمة المرور؟</p>

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
                    ليس لديك حساب؟ <Link to="/register">إنشاء حساب جديد</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;