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
  // familyName: FormValidation.name, // Removed from UI
  phoneNumber: FormValidation.phoneNumber,
  email: FormValidation.email,
  password: FormValidation.password,
  confirmPassword: FormValidation.confirmPassword,
  birthday: FormValidation.birthday,
  gender: FormValidation.gender,
  scientificStatus: FormValidation.scientificStatus,
  acceptTerms: FormValidation.acceptTerms,
  // referralCode: FormValidation.referralCode, // Removed from UI
});

function Register({ onSuccess, hideHeader, customTitle, customButtonText, hideLoginLink }) {
  const navigate = useNavigate();
  const addToApi = usePostApi();

  const handleSubmit = async (values) => {
    let url = "";

    // Ensure birthday is valid before ISO string conversion
    let isobirthday = new Date().toISOString();
    if (values.birthday) {
      try {
        isobirthday = new Date(values.birthday).toISOString();
      } catch (e) {
        console.error("Invalid date:", values.birthday);
      }
    }

    const updatedData = {
      firstName: values.firstName,
      parentName: values.parentName,
      familyName: ".", // Dummy value since field was removed from UI
      email: values.email,
      phoneNumber: values.phoneNumber,
      password: values.password,
      confirmPassword: values.confirmPassword,
      // Convert gender to "Male" or "Female" (backend expects String enum name)
      gender: values.gender === "male" ? "Male" : "Female",
      scientificStatus: values.scientificStatus || "0",
      birthday: isobirthday,
      referralCode: "", // Removed from UI
      acceptTerms: values.acceptTerms
    };

    // Removed the conditional block that excluded referralCode
    // if (values.referralCode) { ... }

    url = "https://stocksquare1.runasp.net/api/Account/user-register";

    try {
      localStorage.setItem("email", updatedData.email);
      console.log("Sending Data:", JSON.stringify(updatedData));

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/plain"
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
        if (onSuccess) {
          // Pass email and password for auto-login
          onSuccess({
            ...data,
            email: updatedData.email,
            password: updatedData.password
          });
        } else {
          navigate(ROUTES.VERIFYOTP);
        }
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
      hideHeader={hideHeader}
      customTitle={customTitle}
      customButtonText={customButtonText}
      hideLoginLink={hideLoginLink}
    />
  );
}

export default Register;
