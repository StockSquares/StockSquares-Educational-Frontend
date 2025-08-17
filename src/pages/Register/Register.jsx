import React, { useState } from "react";
import styles from "./Register.module.css";
import logo from "../../assets/imgs/logo-SS.svg";
import { ROUTES } from "../../routes";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { isValidPhoneNumber } from "react-phone-number-input";
import { usePostApi } from "../../components/general/custom-hooks/usePostApi";
import { useJobStatus } from "../../Context/JobStatusContext";

const RegistrationForm = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "too short")
    .max(50, "too long")
    .required("Required"),
  parentName: Yup.string()
    .min(3, "too short")
    .max(50, "too long")
    .required("Required"),
  familyName: Yup.string()
    .min(3, "too short")
    .max(50, "too long")
    .required("Required"),
  phoneNumber: Yup.string()
    .required("Required")
    .test("valid-phone", "رقم الهاتف غير صحيح", (value) =>
      isValidPhoneNumber(value || "")
    ),
  email: Yup.string().email("invalid e-mail").required("Required"),
  password: Yup.string().required("Required").min(8, "at least 8 characters"),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  birthday: Yup.date()
    .max(new Date(), " invalid birthday ")
    .required("Required"),
  gender: Yup.string()
    .oneOf(["female", "male"], "select the gender")
    .required("Required"),
  scientificStatus: Yup.string().required("Required"),
  // termsAccepted: Yup.boolean(),
  referralCode: Yup.string().nullable(),
});
function Register() {
  const addToApi = usePostApi();
  const jobStatus = useJobStatus();

  const navigate = useNavigate();

  const [pending, setIspending] = useState(false);

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
            scientificStatus: "",
            email: "",
            // termsAccepted: true,
            referralCode: "",
          }}
          validationSchema={RegistrationForm}
          onSubmit={async (values) => {
            let url = "";
            const isobirthday = new Date(values.birthday).toISOString();

            const updatedData = { ...values, birthday: isobirthday };

            url = "https://stocksquare.runasp.net/api/Account/user-register";

            try {
              const data = await addToApi.mutateAsync({ url, updatedData });
              console.log("تم التسجيل", data);
              navigate(ROUTES.LOGIN); 
            } catch (err) {
              console.error("خطأ:", err);
            }
          }}
        >
          {({ errors, touched }) => (
            <Form
              className="w-full text-start bg-transparent border-0 drop-shadow-none p-0 mt-5 "
              style={{ boxShadow: "none" }}
            >
              <div className="flex gap-3">
                <div className="flex flex-col gap-1 w-[50%] ">
                  <Field name="firstName" placeholder="الاسم الاول" className="dark:text-dark-text" />
                  {errors.firstName && touched.firstName ? (
                    <p className="text-red-500"> {errors.firstName} </p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-1 w-[50%]">
                  <Field name="parentName" placeholder="الاسم الثاني" className="dark:text-dark-text" />
                  {errors.parentName && touched.parentName ? (
                    <p className="text-red-500"> {errors.parentName} </p>
                  ) : null}
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col gap-1 w-[50%]">
                  <Field name="familyName" placeholder="الاسم الأخير" className="dark:text-dark-text" />
                  {errors.familyName && touched.familyName ? (
                    <p className="text-red-500"> {errors.familyName} </p>
                  ) : null}
                </div>
                <div className="flex flex-col gap-1 w-[50%]">
                  <Field
                    name="birthday"
                    type="date"
                    placeholder="تاريخ الميلاد"
                    className="dark:bg-darkgray dark:text-dark-text"
                  />
                  {errors.birthday && touched.birthday ? (
                    <p className="text-red-500"> {errors.birthday} </p>
                  ) : null}
                </div>
              </div>

              <Field name="phoneNumber" placeholder="أدخل رقم الهاتف">
                {({ field, form }) => (
                  <PhoneInput
                    international
                    defaultCountry="EG"
                    value={field.value}
                    onChange={(value) =>
                      form.setFieldValue("phoneNumber", value)
                    }
                    placeholder="أدخل رقم الهاتف"
                    className="dark:bg-darkgray"
                  />
                )}
              </Field>
              {errors.phoneNumber && touched.phoneNumber ? (
                <p className="text-red-500"> {errors.phoneNumber} </p>
              ) : null}

              <div className="flex gap-3">
                <div className="flex flex-col gap-1 w-[50%]">
                  <Field
                    name="password"
                    type="password"
                    placeholder="ادخل كلمه المرور"
                    className="dark:bg-darkgray dark:text-dark-text"
                  />
                  {errors.password && touched.password ? (
                    <p className="text-red-500"> {errors.password} </p>
                  ) : null}
                </div>
                <div className="flex flex-col gap-1 w-[50%]">
                  <Field
                    name="confirmPassword"
                    type="password"
                    placeholder="تأكيد كلمه المرور"
                    className="dark:bg-darkgray dark:text-dark-text"
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <p className="text-red-500"> {errors.confirmPassword} </p>
                  ) : null}
                </div>
              </div>

              <Field
                name="email"
                type="email"
                placeholder="ادخل البريد الالكتروني"
                className="dark:bg-darkgray dark:text-dark-text"
              />
              {errors.email && touched.email ? (
                <p className="text-red-500"> {errors.email} </p>
              ) : null}

              <Field
                as="select"
                name="scientificStatus"
                className="dark:bg-darkgray dark:text-dark-text"
              >
                <option value=""> الحالة العمليه</option>
                {jobStatus.map((item) => (
                  <option key={item.id} value={item.value}>
                    {item.value}
                  </option>
                ))}
              </Field>
              {errors.scientificStatus && touched.scientificStatus ? (
                <p className="text-red-500"> {errors.scientificStatus} </p>
              ) : null}

              <Field
                name="referralCode"
                placeholder=" ادخل كود الدعوه (اختياري) "
                className="dark:text-dark-text"
              />

              <div className="flex items-center gap-3">
                <Field type="radio" name="gender" value="male" />
                <label className="dark:text-dark-text">ذكر</label>

                <Field type="radio" name="gender" value="female" />
                <label className="dark:text-dark-text">أنثى</label>
              </div>
              {errors.gender && touched.gender ? (
                <p className="text-red-500"> {errors.gender} </p>
              ) : null}

              <div className={styles.terms}>
                <Field type="checkbox" name="termsAccepted" />
                <label htmlFor="termsAccepted">
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
                <p className="text-red-500  "> {errors.termsAccepted} </p>
              ) : null}

              <button
                type="submit"
                className={`${styles.bu1} ${
                  addToApi.isPending ? "bg-gray-300" : "bg-primary-900 "
                }  `}
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

export default Register;
