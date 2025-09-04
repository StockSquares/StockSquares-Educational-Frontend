import { useNavigate } from "react-router-dom";
import OTP from "../../components/general/otp/OTP";
import { usePostApi } from "../../components/general/custom-hooks/usePostApi";
import { ROUTES } from "../../routes";
import { useState } from "react";
function VerifyOTP() {
  const [otpCode, setOtpCode] = useState("");
  const navigate = useNavigate();
  const verifyCode = usePostApi();

  const StoredEmail = localStorage.getItem("email");
  const url = "https://stocksquare1.runasp.net/api/Account/verify-account";

  const handleSubmit = async () => {
    try {
      const res = await verifyCode.mutateAsync({
        url,
        updatedData: { email: StoredEmail, otp: otpCode },
      });
      console.log("the response is ", res);
      navigate(ROUTES.LOGIN);
    } catch (e) {
      console.log("error in verifying otp", e);
    }
  };

  return (
    <OTP
      otpCode={otpCode}
      setOtpCode={setOtpCode}
      handleSubmit={handleSubmit}
      email={StoredEmail}
    />
  );
}
export default VerifyOTP;
