import logo from "/src/assets/imgs/logo-SS.svg";
import OtpInput from "react-otp-input";

function OTP({ otpCode, setOtpCode, handleSubmit, email }) {
  return (
    <div
      className="flex justify-center items-center w-full mb-5 mt-5 min-h-[60vh]"
      style={{ direction: "ltr" }}
    >
      <div className="container shadow-md md:w-[60%] lg:w-[40%] h-[50vh] flex flex-col items-center justify-center gap-3 ">
        <div className=" w-[60%] ">
          <img src={logo} className="w-full h-full object-cover" />
        </div>
        <h1 className="text-gray-500">
          أدخل الكود الذي تم ارساله الي البريد الالكتروني
        </h1>
        <p className="text-gray-500">{email}</p>
        <div className="flex flex-col items-center">
          <OtpInput
            value={otpCode}
            onChange={setOtpCode}
            numInputs={6}
            placeholder="------"
            inputType="number"
            inputStyle={{
              margin: "10px",
              width: "40px",
              padding: "10px 0",
              borderRadius: "7px",
            }}
            renderInput={(props) => <input {...props} />}
          />
          <button
            className="px-8 rounded-lg py-2 text-white bg-primary-900"
            onClick={handleSubmit}
          >
            ارسال
          </button>
        </div>
      </div>
    </div>
  );
}

export default OTP;
