import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import axios from 'axios';

function Login() {
    const { t } = useTranslation();
    const [error, setError] = useState('');

    const validationSchema = Yup.object({
        email: Yup.string().required(t('form.email.error')).email(t('form.email.invalid')),
        password: Yup.string().matches(/[a-z0-9A-Z!@$%^&*()_-]{8,16}$/, t('form.password.incorrectPassword')).required(t('form.password.error')),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setError(''); // Clear previous errors

            try {
                const response = await axios.post('/api/login', values);

                // Handle success
                localStorage.setItem('authToken', response.data.token); // Store token in localStorage

                // Redirect to protected page, e.g., Dashboard
                window.location.href = '/dashboard'; // Or use React Router for navigation
            } catch (error) {
                setError(t('auth.loginError')); // Show error message if login fails
                console.error('Login failed:', error.response ? error.response.data : error.message);
            }
        },
    });

    return (
        <div className="my-5 p-4 shadow-lg rounded-lg bg-white max-w-lg mx-auto">
            <h1 className="text-center mb-6 text-2xl font-bold">{t('auth.login')}</h1>

            {error && <div className="text-sm text-red-500 mt-1">{error}</div>}

            <form className="space-y-6 " onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium p-2">{t('form.email.label')}</label>
                    <input type="email" id="email" className="w-full p-3 border border-gray-300 rounded-lg" placeholder={t('form.email.placeholder')} value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="text-sm text-red-500 mt-1">{formik.errors.email}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium p-2">{t('form.password.label')}</label>
                    <input type="password" id="password" className="w-full p-3 border border-gray-300 rounded-lg" placeholder={t('form.password.placeholder')} value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div className="text-sm text-red-500 mt-1">{formik.errors.password}</div>
                    )}
                </div>

                <div>
                    <button type="submit" className="w-full bg-green-500 text-white p-3 rounded-lg mt-4 hover:bg-green-600 disabled:bg-gray-400" disabled={!formik.isValid || formik.isSubmitting}
                    >
                        {t('buttons.login')}
                    </button>
                </div>
                <div className="text-center mt-3">
                    <a href="/register" className="text-green-500 hover:text-green-700">
                        {t('auth.signup')}
                    </a>
                </div>
            </form>

        </div>
    );
}

export default Login;
