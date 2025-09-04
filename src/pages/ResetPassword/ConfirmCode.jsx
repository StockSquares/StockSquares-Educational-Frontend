import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import logo from "/src/assets/imgs/logo-SS.svg";
import { toast, ToastContainer } from "react-toastify";
import OtpInput from "react-otp-input";
import OTP from "../../components/general/otp/OTP";
import { useMutation } from "@tanstack/react-query";

function ConfirmCode() {
  const [otpCode, setOtpCode] = useState("");
  const email = localStorage.getItem("Email");
  const formData = new FormData();
  const navigate = useNavigate();

  formData.append("email", email);
  formData.append("code", otpCode);

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        "https://stocksquare1.runasp.net/api/Account/confirm-reset-password-code",
        {
          method: "POST",
          body: formData,
        }
      );
      console.log(res);
      navigate(ROUTES.RESETPASSWORD);
    } catch (e) {}
    console.log("error in sending");
  };

  return (
    <OTP
      otpCode={otpCode}
      setOtpCode={setOtpCode}
      handleSubmit={handleSubmit}
      email={email}
    />
  );
}

export default ConfirmCode;
