import * as Yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";
export const FormValidation = {
  name: Yup.string().min(3, "too short").max(50, "too long").required("مطلوب"),

  phoneNumber: Yup.string()
    .required("مطلوب")
    .test("valid-phone", "رقم الهاتف غير صحيح", (value) =>
      isValidPhoneNumber(value || "")
    ),
  email: Yup.string().email("invalid e-mail").required("مطلوب"),
  password: Yup.string().required("مطلوب").min(8, "at least 8 characters"),
  confirmPassword: Yup.string()
    .required("مطلوب")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  birthday: Yup.date()
    .max(
      new Date(
        new Date().getFullYear() - 13,
        new Date().getMonth(),
        new Date().getDate()
      ),
      "You must be at least 13 years old"
    )

    .required("مطلوب"),
  gender: Yup.string()
    .oneOf(["female", "male"], "select the gender")
    .required("مطلوب"),
  jobStatus: Yup.string().required("مطلوب"),
  acceptTerms: Yup.boolean(),
  referralCode: Yup.string(),
};
