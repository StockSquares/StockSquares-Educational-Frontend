import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const validationSchema = Yup.object({
        email: Yup.string()
            .required(t('form.email.required'))
            .email(t('form.email.invalid')),
        password: Yup.string()
            .required(t('form.password.required'))
            .min(8, t('form.password.minLength'))
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setError(''); // Clear previous errors
            setSubmitting(true);

            try {
                const response = await axios.post('/api/login', {
                    email: values.email,
                    password: values.password
                });

                // Handle successful login
                const { token, user } = response.data;

                // Store authentication information
                localStorage.setItem('authToken', token);
                localStorage.setItem('user', JSON.stringify(user));

                // Redirect to dashboard or home page
                navigate('/dashboard');
            } catch (error) {
                // Handle login error
                const errorMessage = error.response?.data?.message || 
                    t('auth.loginError');
                
                setError(errorMessage);
                console.error('Login failed:', errorMessage);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-lg rounded-xl">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        {t('auth.loginTitle')}
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        {t('auth.loginSubtitle')}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        {/* Email Input */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                {t('form.email.label')}
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                placeholder={t('form.email.placeholder')}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="mt-2 text-sm text-red-600">
                                    {formik.errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                {t('form.password.label')}
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                placeholder={t('form.password.placeholder')}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className="mt-2 text-sm text-red-600">
                                    {formik.errors.password}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="font-medium text-primary-600 hover:text-primary-500"
                            >
                                {t('auth.forgotPassword')}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={!formik.isValid || formik.isSubmitting}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                        >
                            {formik.isSubmitting 
                                ? t('buttons.logging')
                                : t('buttons.login')
                            }
                        </button>
                    </div>

                    {/* Register Link */}
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            {t('auth.noAccount')}{' '}
                            <button
                                type="button"
                                onClick={handleRegister}
                                className="font-medium text-primary-600 hover:text-primary-500"
                            >
                                {t('auth.signup')}
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;