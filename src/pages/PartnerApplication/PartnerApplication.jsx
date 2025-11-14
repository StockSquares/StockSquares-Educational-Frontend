import { React, useState } from "react";
import { questions } from "../../assets/data2";
import "react-datepicker/dist/react-datepicker.css";
import "../InvestorSurvey/investorSurvey.css";
// import * as Yup from "yup";
// import { usePostApi } from "../../components/general/custom-hooks/usePostApi";
// import { FormValidation } from "../../components/general/formValidation/FormValidation";
import PartnerApplicationUi from "./PartnerApplicationUi";
import { useAuth } from "../../Context/AuthContext";

const PartnerApplication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedanswer, setSelectedanswer] = useState("");
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);

  const handleOptionClick = (optionData) => {
    setSelectedOption(optionData);
    setError(false);
  };

  const next = () => {
    if (!selectedOption) {
      setError(true);
      return;
    }

    const updatedAnswers = [...answers];
    updatedAnswers[index] = selectedOption;
    setAnswers(updatedAnswers);

    if (index === questions.length - 1 && !userData) {
     setIsLoggedIn(true);
      return;
    }

    setIndex(index + 1);
    setSelectedOption(updatedAnswers[index + 1] || null);
  };

  const previous = () => {
    if (index === 0) return;
    setIndex(index - 1);
    setSelectedOption(answers[index - 1] || null);
  };

  // const PartnerRegister = Yup.object().shape({
  //   firstName: FormValidation.name,
  //   parentName: FormValidation.name,
  //   familyName: FormValidation.name,
  //   phoneNumber: FormValidation.phoneNumber,
  //   email: FormValidation.email,
  //   password: FormValidation.password,
  //   confirmPassword: FormValidation.confirmPassword,
  //   birthday: FormValidation.birthday,
  //   gender: FormValidation.gender,
  //   jobStatus: FormValidation.jobStatus,
  //   acceptTerms: FormValidation.acceptTerms,
  //   referralCode: FormValidation.referralCode,
  //   partnerType: Yup.string().required("مطلوب"),
  // });
  // const addToApi = usePostApi();
  // const handleSubmit = async (values) => {
  //   try {
  //     const isoDate = new Date(values.birthday).toISOString();
  //     const updatedData = { ...values, birthday: isoDate };
  //     const res = await addToApi.mutateAsync({
  //       url: `https://stocksquare1.runasp.net/api/Account/partner-register?partnerType=${values.partnerType}`,
  //       updatedData: updatedData,
  //     });
  //     console.log(res);

  //     setIsLoggedIn(addToApi.isSuccess ? true : false);
  //   } catch (e) {
  //     console.log("error in sending");
  //   }
  // };

  const { userData } = useAuth();

  return (
    <PartnerApplicationUi
      handleOptionClick={handleOptionClick}
      next={next}
      previous={previous}
      index={index}
      selectedOption={selectedOption}
      setIndex={setIndex}
      // PartnerRegister={PartnerRegister}
      // handleSubmit={handleSubmit}
      // addToApi={addToApi}
      isLoggedIn={isLoggedIn}
      error={error}
      answers={answers}
      setAnswers={setAnswers}
      setSelectedanswer={setSelectedanswer}
      selectedanswer={selectedanswer}
      userData={userData}
    />
  );
};

export default PartnerApplication;
