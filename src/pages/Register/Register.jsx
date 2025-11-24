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

    // Reverting to the original structure that was working, but with safe defaults
    // Strictly matching the Swagger schema shown in the image
    const updatedData = {
      firstName: values.firstName,
      parentName: values.parentName,
      familyName: values.familyName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      password: values.password,
      confirmPassword: values.confirmPassword,
      gender: values.gender,
      scientificStatus: values.jobStatus || "0", // Matches 'scientificStatus' in Swagger
      birthday: isobirthday,
      referralCode: values.referralCode || null,
      acceptTerms: values.acceptTerms
    };

    url = "https://stocksquare1.runasp.net/api/Account/user-register";

    try {
      localStorage.setItem("email", updatedData.email);

      console.log("Sending Data:", JSON.stringify(updatedData));

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/plain" // Matching Swagger
        },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      console.log("تم التسجيل", data);

      if (data.isSuccess) {
        navigate(ROUTES.VERIFYOTP);
      } else {
        alert("فشل التسجيل: " + (data.error?.description || "خطأ غير معروف"));
      }

    } catch (err) {
      console.error("خطأ:", err);
      alert(`فشل إنشاء الحساب: ${err.message}`);
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
