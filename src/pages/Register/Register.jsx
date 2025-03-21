import React, { useState } from 'react';
import styles from './Register.module.css';
import logo from '../../assets/imgs/logo-SS.svg';
import { ROUTES } from '../../routes';
import { Link } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        phone: '',
        countryCode: '',
        email: '',
        password: '',
        year: '',
        month: '',
        day: '',
        gender: '',
        jobStatus: '',
        termsAccepted: false,
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = () => {
        const { firstName, middleName, lastName, phone, countryCode, email, password, year, month, day, gender, jobStatus, termsAccepted } = formData;

        if (!firstName || !middleName || !lastName || !phone || !countryCode || !email || !password || !year || !month || !day || !gender || !jobStatus) {
            setErrorMessage('من فضلك، تأكد من ملء جميع الحقول المطلوبة.');
        } else if (!termsAccepted) {
            setErrorMessage('يجب الموافقة على اتفاقية الشروط والأحكام وسياسة الخصوصية.');
        } else {
            setErrorMessage('');
            alert('تم تسجيل الحساب بنجاح!');
        }
    };

    return (
        <div className={styles.contain2}>
            <img src={logo} alt="Logo" className={styles.logo} />
            <h2>أول منصة عربية ذكية لدعم المستثمرين ورواد الأعمال</h2>
            <h1>تسجيل حساب جديد</h1>
            <hr />
            <div className={styles.contain3}>
                <label htmlFor="firstName">الاسم الأول:</label>
                <input type="text" id="firstName" name="firstName" placeholder="أدخل الاسم الأول" onChange={handleChange} />

                <label htmlFor="middleName">اسم الأب:</label>
                <input type="text" id="middleName" name="middleName" placeholder="أدخل اسم الأب" onChange={handleChange} />

                <label htmlFor="lastName">اسم العائلة:</label>
                <input type="text" id="lastName" name="lastName" placeholder="أدخل اسم العائلة" onChange={handleChange} />

                <label htmlFor="phone">رقم الهاتف الجوال:</label>
                <div className={styles.phoneInput}>
                    <input type="tel" id="phone" name="phone" placeholder="أدخل رقم الهاتف" onChange={handleChange} />
                    <select name="countryCode" id="countryCode" className={styles.countryCode} onChange={handleChange}>
                        <option value="+20">+20 مصر</option>
                        <option value="+966">+966 السعودية</option>
                        <option value="+971">+971 الإمارات</option>
                        <option value="+973">+973 البحرين</option>
                        <option value="+965">+965 الكويت</option>
                        <option value="+974">+974 قطر</option>
                        <option value="+968">+968 عمان</option>
                        <option value="+212">+212 المغرب</option>
                        <option value="+964">+964 العراق</option>
                        <option value="+961">+961 لبنان</option>
                        <option value="+962">+962 الأردن</option>
                        <option value="+249">+249 السودان</option>
                    </select>
                </div>

                <label htmlFor="email">البريد الإلكتروني:</label>
                <input type="email" id="email" name="email" placeholder="أدخل البريد الإلكتروني" onChange={handleChange} />

                <label htmlFor="password">إنشاء كلمة مرور:</label>
                <input type="password" id="password" name="password" placeholder="أدخل كلمة المرور" onChange={handleChange} />

                <label>تاريخ الميلاد:</label>
                <div className={styles.birthDate}>
                    <select name="year" id="year" className={styles.dateInput} onChange={handleChange}>
                        <option value="">السنة</option>
                        {[...Array(80).keys()].map((i) => (
                            <option value={2025 - i} key={i}>
                                {2025 - i}
                            </option>
                        ))}
                    </select>
                    <select name="month" id="month" className={styles.dateInput} onChange={handleChange}>
                        <option value="">الشهر</option>
                        {[...Array(12).keys()].map((i) => (
                            <option value={i + 1} key={i}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                    <select name="day" id="day" className={styles.dateInput} onChange={handleChange}>
                        <option value="">اليوم</option>
                        {[...Array(31).keys()].map((i) => (
                            <option value={i + 1} key={i}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                </div>

                <label>الجنس:</label>
                <div className={styles.gender}>
                    <input type="radio" id="male" name="gender" value="male" onChange={handleChange} />
                    <label htmlFor="male">ذكر</label>
                    <input type="radio" id="female" name="gender" value="female" onChange={handleChange} />
                    <label htmlFor="female">أنثى</label>
                </div>

                <label htmlFor="jobStatus">الحالة العملية:</label>
                <select name="jobStatus" id="jobStatus" className={styles.jobStatus} onChange={handleChange}>
                    <option value="">اختر الحالة</option>
                    <option value="employee">صاحب عمل</option>
                    <option value="student">موظف</option>
                    <option value="freelancer">طالب</option>
                </select>

                <div className={styles.terms}>
                    <input type="checkbox" id="termsAccepted" name="termsAccepted" onChange={handleChange} />
                    <label htmlFor="termsAccepted">
                        قرأت وأوافق على <Link to={ROUTES.CONDITIONS} className='text-blue-500 underline'> اتفاقية الشروط والأحكام</Link> و <Link className='text-blue-500 underline' to={ROUTES.PRIVACYPOLICY}>سياسة الخصوصية</Link> 
                    </label>
                </div>

                {errorMessage && <p className={styles.error}>{errorMessage}</p>}

                <button className={styles.bu1} onClick={handleSubmit}>إنشاء حساب جديد</button>
                <p className={styles.redirectText}>
                   هل لديك حساب؟ <a href="/login" className={styles.redirectLink}>تسجيل الدخول</a>
                </p>

            </div>
        </div>
    );
}

export default Register;
