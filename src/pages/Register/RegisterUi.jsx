import styles from "./Register.module.css";
import logo from "../../assets/imgs/logo-SS.svg";
import { Formik } from "formik";
import React from "react";
import { useJobStatus } from "../../Context/JobStatusContext";
import { usePostApi } from "../../components/general/custom-hooks/usePostApi";
import PhoneInput from "react-phone-number-input";
import { Link } from "react-router-dom";
import { Form, Field } from "formik";
import { ROUTES } from "../../routes";
import 'react-phone-number-input/style.css';

function RegisterUi({ RegistrationForm, handleSubmit }) {
  const addToApi = usePostApi();
  const jobStatus = useJobStatus();
  const isPartner = {
    checked: true,
  };
  return (
    <div
      className={`${styles.contain2} dark:bg-dark-background dark:border-black dark:shadow-md`}
    >
      <img src={logo} alt="Logo" className={styles.logo} />
      <h2 className="dark:bg-darkgray dark:text-dark-text">
        أول منصة عربية ذكية لدعم المستثمرين ورواد الأعمال
      </h2>
      <h1>تسجيل حساب جديد</h1>
      <hr />
      <div className={styles.contain3}>
        <Formik
          initialValues={{
            firstName: "",
            parentName: "",
            familyName: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
            birthday: "",
            gender: "",
            jobStatus: "",
            email: "",
            acceptTerms: "",
            referralCode: "",
          }}
          validationSchema={RegistrationForm}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form
              className="w-full text-start bg-transparent border-0 drop-shadow-none p-0 mt-5"
              style={{ boxShadow: "none" }}
            >
              <div className="flex gap-3">
                <div className="flex flex-col gap-1 w-[50%] ">
                  <label htmlFor="firstName" className="sr-only">
                    الاسم الاول
                  </label>

                  <Field
                    id="firstName"
                    name="firstName"
                    placeholder="الاسم الاول"
                    autoComplete="given-name"
                    className="dark:text-dark-text"
                  />
                  {errors.firstName && touched.firstName ? (
                    <p className="text-red-500"> {errors.firstName} </p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-1 w-[50%]">
                  <label htmlFor="parentName" className="sr-only">
                    الاسم الثاني
                  </label>
                  <Field
                    id="parentName"
                    name="parentName"
                    placeholder="الاسم الثاني"
                    autoComplete="additional-name"
                    className="dark:text-dark-text"
                  />
                  {errors.parentName && touched.parentName ? (
                    <p className="text-red-500"> {errors.parentName} </p>
                  ) : null}
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col gap-1 w-[50%]">
                  <label htmlFor="familyName" className="sr-only">
                    الاسم الأخير
                  </label>
                  <Field
                    id="familyName"
                    name="familyName"
                    placeholder="الاسم الأخير"
                    autoComplete="family-name"
                    className="dark:text-dark-text"
                  />
                  {errors.familyName && touched.familyName ? (
                    <p className="text-red-500"> {errors.familyName} </p>
                  ) : null}
                </div>
                <div className="flex flex-col gap-1 w-[50%]">
                  <label htmlFor="birthday" className="sr-only">
                    تاريخ الميلاد
                  </label>
                  <Field
                    id="birthday"
                    name="birthday"
                    type="date"
                    placeholder="تاريخ الميلاد"
                    autoComplete="bday"
                    className="dark:bg-darkgray dark:text-dark-text"
                  />
                  {errors.birthday && touched.birthday ? (
                    <p className="text-red-500"> {errors.birthday} </p>
                  ) : null}
                </div>
              </div>

              <label htmlFor="phoneNumber" className="sr-only">
                رقم الهاتف
              </label>
              <Field name="phoneNumber">
                {({ field, form }) => (
                  <PhoneInput
                    id="phoneNumber"
                    name="phoneNumber"
                    international
                    defaultCountry="EG"
                    value={field.value}
                    onChange={(value) =>
                      form.setFieldValue("phoneNumber", value)
                    }
                    placeholder="أدخل رقم الهاتف"
                    autoComplete="tel"
                    className="dark:bg-darkgray"
                  />
                )}
              </Field>
              {errors.phoneNumber && touched.phoneNumber ? (
                <p className="text-red-500"> {errors.phoneNumber} </p>
              ) : null}

              <div className="flex gap-3">
                <div className="flex flex-col gap-1 w-[50%]">
                  <label htmlFor="password" className="sr-only">
                    كلمة المرور
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    placeholder="ادخل كلمه المرور"
                    autoComplete="new-password"
                    className="dark:bg-darkgray dark:text-dark-text"
                  />
                  {errors.password && touched.password ? (
                    <p className="text-red-500"> {errors.password} </p>
                  ) : null}
                </div>
                <div className="flex flex-col gap-1 w-[50%]">
                  <label htmlFor="confirmPassword" className="sr-only">
                    تأكيد كلمة المرور
                  </label>
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="تأكيد كلمه المرور"
                    autoComplete="new-password"
                    className="dark:bg-darkgray dark:text-dark-text"
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <p className="text-red-500"> {errors.confirmPassword} </p>
                  ) : null}
                </div>
              </div>

              <label htmlFor="email" className="sr-only">
                البريد الإلكتروني
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="ادخل البريد الالكتروني"
                autoComplete="email"
                className="dark:bg-darkgray dark:text-dark-text w-full"
              />
              {errors.email && touched.email ? (
                <p className="text-red-500"> {errors.email} </p>
              ) : null}

              <label htmlFor="jobStatus" className="sr-only">
                الحالة العملية
              </label>
              <Field
                as="select"
                id="jobStatus"
                name="jobStatus"
                className="dark:bg-darkgray dark:text-dark-text"
              >
                <option value=""> الحالة العمليه</option>
                {jobStatus.map((item) => (
                  <option key={item.id} value={item.value}>
                    {item.value}
                  </option>
                ))}
              </Field>

              {errors.jobStatus && touched.jobStatus ? (
                <p className="text-red-500"> {errors.jobStatus} </p>
              ) : null}

              <label htmlFor="referralCode" className="sr-only">
                كود الدعوة
              </label>
              <Field
                id="referralCode"
                name="referralCode"
                placeholder=" ادخل كود الدعوه (اختياري) "
                className="dark:text-dark-text w-full"
              />

              <div className="flex items-center gap-3">
                <Field
                  type="radio"
                  id="genderMale"
                  name="gender"
                  value="male"
                />
                <label htmlFor="genderMale" className="dark:text-dark-text">
                  ذكر
                </label>

                <Field
                  type="radio"
                  id="genderFemale"
                  name="gender"
                  value="female"
                />
                <label htmlFor="genderFemale" className="dark:text-dark-text">
                  أنثى
                </label>
              </div>
              {errors.gender && touched.gender ? (
                <p className="text-red-500"> {errors.gender} </p>
              ) : null}

              <div className={styles.terms}>
                <Field id="acceptTerms" type="checkbox" name="acceptTerms" />
                <label htmlFor="acceptTerms">
                  <span className="dark:text-dark-text"> قرأت وأوافق على </span>
                  <Link
                    to={ROUTES.CONDITIONS}
                    className="text-blue-500 underline"
                  >
                    {" "}
                    اتفاقية الشروط والأحكام
                  </Link>{" "}
                  و{" "}
                  <Link
                    className="text-blue-500 underline"
                    to={ROUTES.PRIVACYPOLICY}
                  >
                    سياسة الخصوصية
                  </Link>
                </label>
              </div>
              {errors.termsAccepted && touched.termsAccepted ? (
                <p className="text-red-500"> {errors.termsAccepted} </p>
              ) : null}

              <button
                type="submit"
                className={`${styles.bu1} ${
                  addToApi.isPending ? "bg-gray-300" : "bg-primary-900 "
                }`}
                disabled={addToApi.isPending}
              >
                {addToApi.isPending ? "جاري التسجيل" : "إنشاء حساب جديد"}
              </button>
            </Form>
          )}
        </Formik>

        <p className={`${styles.redirectText} dark:text-dark-text`}>
          هل لديك حساب؟{" "}
          <a href="/login" className={styles.redirectLink}>
            تسجيل الدخول
          </a>
        </p>
      </div>
    </div>
  );
}
export default React.memo(RegisterUi);
