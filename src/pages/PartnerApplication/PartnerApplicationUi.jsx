import { questions } from "../../assets/data2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshake } from "@fortawesome/free-regular-svg-icons";
import Questionare from "../../components/general/questionare/Questionare";
import { Formik } from "formik";
import { Form, Field } from "formik";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes";
import PhoneInput from "react-phone-number-input";
import styles from "../Register/Register.module.css";

function PartnerApplicationUi({
  handleOptionClick,
  next,
  previous,
  index,
  selectedOption,
  setIndex,
  PartnerRegister,
  handleSubmit,
  addToApi,
  isLoggedIn,
  error,
  answers,
  setAnswers,
  setSelectedanswer,
  selectedanswer,
}) {
  return (
    <>
      <div className="contain dark:bg-dark-background">
        {!isLoggedIn ? (
          <div className="login">
            <h1>
              <FontAwesomeIcon icon={faHandshake} /> طلب العمل كشريك
            </h1>
            <div className="">
              <p className="important-info  ">
                يسعدنا طلبك في الأنضمام الى شبكة شركاء ستوك سكويرز
                <br />
                يرجى الأجابة على الأسئلة التالية لكي نتمكن من تقيم طلبك بشكل
                أفضل نود أن نوضح أننا نبحث عن شركاء يتناسبون مع قيمنا ورؤيتنا
                وأهدافنا ولهذا السبب قد لايتم قبول جميع الطلبات ونشكر تفهمك.
              </p>
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
                    jobStatus: "Student",
                    email: "",
                    acceptTerms: true,
                    referralCode: "",
                    partnerType: "",
                  }}
                  validationSchema={PartnerRegister}
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
                            <p className="text-red-500">
                              {" "}
                              {errors.parentName}{" "}
                            </p>
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
                            <p className="text-red-500">
                              {" "}
                              {errors.familyName}{" "}
                            </p>
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
                            <p className="text-red-500">
                              {" "}
                              {errors.confirmPassword}{" "}
                            </p>
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
                        className="dark:bg-darkgray dark:text-dark-text"
                      />
                      {errors.email && touched.email ? (
                        <p className="text-red-500"> {errors.email} </p>
                      ) : null}
                      <label htmlFor="partnerType" className="sr-only">
                        نوع الشراكة
                      </label>
                      <Field
                        as="select"
                        id="partnerType"
                        name="partnerType"
                        className="dark:bg-darkgray dark:text-dark-text"
                      >
                        <option value=""> نوع الشراكه </option>
                        {["SubPartner", "StrategicPartner"].map((item, idx) => (
                          <option key={idx} value={item}>
                            {item}
                          </option>
                        ))}
                      </Field>

                      {errors.partnerType && touched.partnerType ? (
                        <p className="text-red-500"> {errors.partnerType} </p>
                      ) : null}
                      <label htmlFor="referralCode" className="sr-only">
                        كود الدعوة
                      </label>
                      <Field
                        id="referralCode"
                        name="referralCode"
                        placeholder=" ادخل كود الدعوه (اختياري) "
                        className="dark:text-dark-text"
                      />
                      <div className="flex items-center gap-3">
                        <Field
                          type="radio"
                          id="genderMale"
                          name="gender"
                          value="male"
                        />
                        <label
                          htmlFor="genderMale"
                          className="dark:text-dark-text"
                        >
                          ذكر
                        </label>

                        <Field
                          type="radio"
                          id="genderFemale"
                          name="gender"
                          value="female"
                        />
                        <label
                          htmlFor="genderFemale"
                          className="dark:text-dark-text"
                        >
                          أنثى
                        </label>
                      </div>
                      {errors.gender && touched.gender ? (
                        <p className="text-red-500"> {errors.gender} </p>
                      ) : null}
                      <div className={styles.terms}>
                        <Field
                          id="acceptTerms"
                          type="checkbox"
                          name="acceptTerms"
                        />
                        <label htmlFor="acceptTerms">
                          <span className="dark:text-dark-text">
                            {" "}
                            قرأت وأوافق على{" "}
                          </span>
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
                        {addToApi.isPending ? " جاري الارسال" : "ارسال"}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>

            {/* <button type="button" onClick={handleStart}>
              ابدا
            </button> */}
          </div>
        ) : (
          <Questionare
            next={next}
            previous={previous}
            index={index}
            setIndex={setIndex}
            selectedOption={selectedOption}
            answers={answers}
            handleOptionClick={handleOptionClick}
            questions={questions}
            setAnswers={setAnswers}
            error={error}
            setSelectedanswer={setSelectedanswer}
            selectedanswer={selectedanswer}
          />
        )}
      </div>
    </>
  );
}
export default PartnerApplicationUi;
