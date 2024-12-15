import React from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import axios from 'axios';
import Style from './Register.module.css';

function Register() {
    const { t } = useTranslation(); 

    const RegisterForm = async (values, { setSubmitting, resetForm, setServerError }) => {
        try {
            const response = await axios.post('/api/register', {
                name: values.name,
                email: values.email,
                phone: values.phone,
                password: values.password
            });
            
            console.log('User registered successfully', response.data);
            resetForm();
            // Potentially redirect or show success message
        } catch (error) {
            console.error('Error registering user', error);
            setServerError(error.response?.data?.message || t('errors.registration'));
        } finally {
            setSubmitting(false);
        }
    };

    // Formik validation schema
    const validationSchema = Yup.object({
        name: Yup.string()
            .required(t('form.name.required'))
            .min(3, t('form.name.minLength'))
            .max(20, t('form.name.maxLength')),
        email: Yup.string()
            .required(t('form.email.required'))
            .email(t('form.email.invalid')),
        phone: Yup.string()
            .required(t('form.phone.required'))
            .matches(/^01[1250][0-9]{8}$/, t('form.phone.invalid')),
        password: Yup.string()
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, t('form.password.complexity'))
            .required(t('form.password.required')),
        rePassword: Yup.string()
            .oneOf([Yup.ref("password")], t('form.password.confirmPassword'))
            .required(t('form.password.confirmationRequired')),
        agreeToTerms: Yup.boolean()
            .oneOf([true], t('form.terms.required'))
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
        <div className="my-5 p-6 shadow-lg rounded-lg bg-white max-w-2xl mx-auto">
            <h1 className="text-center mb-4 text-2xl font-bold">
                {t('auth.signup')}
            </h1>
            
            <form className="space-y-4" onSubmit={formik.handleSubmit}>
                {/* Name Input */}
                <div>
                    <label htmlFor='name' className="block text-sm font-medium mb-2">
                        {t('form.name.label')}
                    </label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder={t('form.name.placeholder')}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <div className="text-sm text-red-500 mt-1">
                            {formik.errors.name}
                        </div>
                    )}
                </div>

                {/* Email Input */}
                <div>
                    <label htmlFor='email' className="block text-sm font-medium mb-2">
                        {t('form.email.label')}
                    </label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder={t('form.email.placeholder')}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="text-sm text-red-500 mt-1">
                            {formik.errors.email}
                        </div>
                    )}
                </div>

                {/* Phone Input */}
                <div>
                    <label htmlFor='phone' className="block text-sm font-medium mb-2">
                        {t('form.phone.label')}
                    </label>
                    <input 
                        type="tel" 
                        name="phone" 
                        id="phone" 
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder={t('form.phone.placeholder')}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                        <div className="text-sm text-red-500 mt-1">
                            {formik.errors.phone}
                        </div>
                    )}
                </div>

                {/* Password Input */}
                <div>
                    <label htmlFor='password' className="block text-sm font-medium mb-2">
                        {t('form.password.label')}
                    </label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder={t('form.password.placeholder')}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div className="text-sm text-red-500 mt-1">
                            {formik.errors.password}
                        </div>
                    )}
                </div>

                {/* Confirm Password Input */}
                <div>
                    <label htmlFor='rePassword' className="block text-sm font-medium mb-2">
                        {t('form.confirmPassword.label')}
                    </label>
                    <input 
                        type="password" 
                        name="rePassword" 
                        id="rePassword" 
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder={t('form.confirmPassword.placeholder')}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.rePassword}
                    />
                    {formik.touched.rePassword && formik.errors.rePassword && (
                        <div className="text-sm text-red-500 mt-1">
                            {formik.errors.rePassword}
                        </div>
                    )}
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-center">
                    <input 
                        type="checkbox" 
                        name="agreeToTerms" 
                        id="agreeToTerms" 
                        className="mr-2 rounded text-primary-600"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.agreeToTerms}
                    />
                    <label htmlFor="agreeToTerms" className="text-sm">
                        {t('form.terms.label')}
                    </label>
                </div>
                {formik.touched.agreeToTerms && formik.errors.agreeToTerms && (
                    <div className="text-sm text-red-500 mt-1">
                        {formik.errors.agreeToTerms}
                    </div>
                )}

                {/* Submit Button */}
                <button 
                    type="submit" 
                    disabled={!formik.isValid || formik.isSubmitting}
                    className="w-full bg-primary text-white p-3 rounded-lg hover:bg-primary-700 disabled:opacity-50"
                >
                    {t('buttons.signup')}
                </button>
            </form>
        </div>
    );
}

export default Register;