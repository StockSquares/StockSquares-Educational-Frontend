import { Formik, Form, Field } from "formik";
import SignInWithGoogle from "./SignInWithGoogle";
import SignInWithFacebook from "./SignInWithFacebook";
import styles from "./Login.module.css";
import logo from "../../assets/imgs/logo-SS.svg";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes";
import React from "react";

function LoginUi({ loginForm, isError, handleSubmit }) {
  return (
    <div className={`${styles.contain2} dark:bg-dark-background `}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <h2 className="dark:bg-dark-background dark:text-dark-text">
        أول منصة عربية ذكية لدعم المستثمرين ورواد الأعمال
      </h2>
      <h1>تسجيل الدخول</h1>
      <hr />
      {isError && (
        <p className="text-red-500 mt-2 font-semibold">
          البريد الالكتروني / كلمه المرور غير صحيحه
        </p>
      )}

      <div className={styles.contain3}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginForm}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form
              className="w-full text-start bg-transparent border-0 drop-shadow-none p-0 mt-5"
              style={{ boxShadow: "none" }}
            >
              <Field
                name="email"
                type="email"
                placeholder="أدخل البريد الالكتروني"
                className="block w-full"
              />
              {errors.email && touched.email ? (
                <p className="text-red-500"> {errors.email} </p>
              ) : null}
              <Field
                name="password"
                type="password"
                placeholder="أدخل كلمه المرور"
                className="block w-full"
              />
              {errors.password && touched.password ? (
                <p className="text-red-500"> {errors.password} </p>
              ) : null}

              <Link to={ROUTES.SENDCODE}>
                <p className="text-blue-600 mb-5 cursor-pointer">
                  هل نسيت كلمة المرور؟
                </p>
              </Link>
              <div className="flex flex-col items-center">
                <button
                  type="submit"
                  className={`${styles.bu1} w-full p-2 sm:w-[50%] `}
                >
                  تسجيل الدخول
                </button>

                <div className=" w-full flex items-center justify-center gap-2 mb-3">
                  <hr className="w-[140px] sm:w-[100%] " />
                  <p className="dark:text-dark-text"> أو </p>
                  <hr className="w-[140px] sm:w-[100%] " />
                </div>

                <div className="flex flex-col mb-3 sm:flex-row gap-3">
                  <SignInWithGoogle />

                </div>
                <p className={`${styles.registerLink} dark:text-dark-text`}>
                  ليس لديك حساب؟ <Link to="/register">إنشاء حساب جديد</Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
export default React.memo(LoginUi);
