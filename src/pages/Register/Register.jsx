import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import axios from 'axios';
import Style from './Register.module.css';

function Register() {
    const [counter, setCounter] = useState(0);
    const { t } = useTranslation(); // The 't' function to access translated strings


    const RegisterForm = async (values) => {
        console.log(values);

        try {
            const response = await axios.post('/your-api-endpoint', values);
            console.log('User registered successfully', response.data);
        } catch (error) {
            console.error('Error registering user', error);
        }
    };

    // Formik validation schema
    const validationSchema = Yup.object({
        name: Yup.string().required(t('form.name.error')).min(3, t('form.name.minLength')).max(20, t('form.name.maxLength')),
        email: Yup.string().required(t('form.email.error')).email(t('form.email.invalid')),
        phone: Yup.string().required(t('form.phone.error')).matches(/^01[1250][0-9]{8}$/, t('form.phone.invalid')),
        password: Yup.string().matches(/[a-z0-9A-Z!@$%^&*()_-]{8,16}$/, t('form.password.error')).required(t('form.password.error')),
        rePassword: Yup.string().oneOf([Yup.ref("password")], t('form.password.confirmPassword')).required(t('form.password.error')),
        agreeToTerms: Yup.boolean().oneOf([true], t('form.terms.error')).required(t('form.terms.error'))
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            email: "",
            password: "",
            rePassword: "",
            agreeToTerms: false
        },
        validationSchema,
        onSubmit: RegisterForm,
    });

    return (
        <div className="my-5 p-6 shadow-lg rounded-lg bg-white  max-w-2xl mx-auto">
            <h1 className="text-center mb-4 text-2xl font-bold">{t('auth.signup')}</h1>
            
            <form className="space-y-2 container" onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor='name' className="block text-sm font-medium p-2">{t('form.name.label')}</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full p-3 border border-gray-300 rounded-lg" type="text" name="name" id="name" placeholder={t('form.name.placeholder')}
                    />
                    {formik.errors.name && formik.touched.name && (
                        <div className="text-sm text-red-500 mt-1">{formik.errors.name}</div>
                    )}
                </div>
                <div>
                    <label htmlFor='email' className="block text-sm font-medium p-2">{t('form.email.label')}</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full p-3 border border-gray-300 rounded-lg" type="email" name="email" id="email" placeholder={t('form.email.placeholder')}
                    />
                    {formik.errors.email && formik.touched.email && (
                        <div className="text-sm text-red-500 mt-1">{formik.errors.email}</div>
                    )}
                </div>
                <div>
                    <label htmlFor='phone' className="block text-sm font-medium p-2">{t('form.phone.label')}</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full p-3 border border-gray-300 rounded-lg" type="tel" name="phone" id="phone" placeholder={t('form.phone.placeholder')}
                    />
                    {formik.errors.phone && formik.touched.phone && (
                        <div className="text-sm text-red-500 mt-1">{formik.errors.phone}</div>
                    )}
                </div>

                <div>
                    <label htmlFor='password' className="block text-sm font-medium p-2">{t('form.password.label')}</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full p-3 border border-gray-300 rounded-lg" type="password" name="password" id="password" placeholder={t('form.password.placeholder')}
                    />
                    {formik.errors.password && formik.touched.password && (
                        <div className="text-sm text-red-500 mt-1">{formik.errors.password}</div>
                    )}
                </div>

                <div>
                    <label htmlFor='rePassword' className="block text-sm font-medium p-2">{t('form.confirmPassword.label')}</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full p-3 border border-gray-300 rounded-lg" type="password" name="rePassword" id="rePassword" placeholder={t('form.confirmPassword.placeholder')}
                    />
                    {formik.errors.rePassword && formik.touched.rePassword && (
                        <div className="text-sm text-red-500 mt-1">{formik.errors.rePassword}</div>
                    )}
                </div>
                {/* agreeToTerms checkbox */}
                <div>
                    <label htmlFor="agreeToTerms" className="inline-flex items-center text-xs font-medium p-2 ">
                        <input type="checkbox" name="agreeToTerms" id="agreeToTerms" onChange={formik.handleChange} onBlur={formik.handleBlur} checked={formik.values.agreeToTerms} className="form-checkbox h-5 w-5 text-[var(--primary-color)] border-gray-300 rounded "
                        />
                        <span className="ml-2 px-2 ">{t('form.terms.label')}</span>
                    </label>
                    {formik.errors.agreeToTerms && formik.touched.agreeToTerms && (
                        <div className="text-sm text-red-500 mt-1">{formik.errors.agreeToTerms}</div>
                    )}
                </div>
                {/* signup buttons */}
                <div>
                    <button
                        disabled={!formik.isValid || formik.isSubmitting || !formik.values.agreeToTerms}
                        type="submit"
                        className="w-full bg-[var(--primary-color)] text-white p-3 rounded-lg mt-4 hover:bg-green-600 disabled:bg-gray-400"
                    >
                        {t('buttons.signup')}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Register;
