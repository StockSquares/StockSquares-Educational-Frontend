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
import "react-phone-number-input/style.css";
import { Login, Register } from "..";

function PartnerApplicationUi({
  handleOptionClick,
  next,
  previous,
  index,
  selectedOption,
  setIndex,
  // PartnerRegister,
  // handleSubmit,
  // addToApi,
  // isLoggedIn,
  error,
  answers,
  setAnswers,
  setSelectedanswer,
  selectedanswer,
  userData
}) {
  return (
    <> 
        <div className="contain">
          <p className="important-info  ">
            يسعدنا طلبك في الأنضمام الى شبكة شركاء ستوك سكويرز
            <br />
            يرجى الأجابة على الأسئلة التالية لكي نتمكن من تقيم طلبك بشكل أفضل
            نود أن نوضح أننا نبحث عن شركاء يتناسبون مع قيمنا ورؤيتنا وأهدافنا
            ولهذا السبب قد لايتم قبول جميع الطلبات ونشكر تفهمك.
          </p>
          <Questionare
            title={"طلب العمل كشريك"}
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
        </div>
    </>
  );
}
export default PartnerApplicationUi;
