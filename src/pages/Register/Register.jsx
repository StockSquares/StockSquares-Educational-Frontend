import React, { useState } from "react";
import { ROUTES } from "../../routes";
import "react-phone-number-input/style.css";

import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { FormValidation } from "../../components/general/formValidation/FormValidation";
import RegisterUi from "./RegisterUi";
import { usePostApi } from "../../components/general/custom-hooks/usePostApi";

const RegistrationForm = Yup.object().shape({
  firstName: FormValidation.name,
  parentName: FormValidation.name,
  familyName: FormValidation.name,
  phoneNumber: FormValidation.phoneNumber,
  email: FormValidation.email,
  password: FormValidation.password,
  confirmPassword: FormValidation.confirmPassword,
  birthday: FormValidation.birthday,
  gender: FormValidation.gender,
  jobStatus: FormValidation.jobStatus,
  acceptTerms: FormValidation.acceptTerms,
  referralCode: FormValidation.referralCode,
});

function Register() {
  const navigate = useNavigate();
  const addToApi = usePostApi();

  const handleSubmit = async (values) => {
    let url = "";
    const isobirthday = new Date(values.birthday).toISOString();

    const updatedData = {
      ...values,
      birthday: isobirthday,
      clientIdStatus: "0",  // Send as String
      ScientificStatus: values.jobStatus || "0" // Map jobStatus to ScientificStatus
    };

    url = "https://stocksquare1.runasp.net/api/Account/user-register";

    try {
      localStorage.setItem("email", updatedData.email);
      const data = await addToApi.mutateAsync({ url, updatedData });
      console.log("تم التسجيل", data);
      navigate(ROUTES.VERIFYOTP);
    } catch (err) {
      console.error("خطأ:", err);
    }
  };

  return (
    <RegisterUi
      RegistrationForm={RegistrationForm}
      handleSubmit={handleSubmit}
    />
  );
}

export default Register;
