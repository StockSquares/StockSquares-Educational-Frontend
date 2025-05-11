import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import logo from "/src/assets/imgs/logo-SS.svg";
import { toast, ToastContainer } from "react-toastify";

function ConfirmCode() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const formData = new FormData();

  const handleChange = (e, idx) => {
    const newCode = [...code];
    newCode[idx] = e.target.value;
    setCode(newCode);

    // الانتقال إلى الخانة التالية بعد إدخال الرقم
    if (e.target.value && idx < code.length - 1) {
      const nextInput = document.getElementById(`input-${idx + 1}`);
      nextInput.focus();
    }
  };

  const sendEmail = async () => {
    const formData = new FormData();
    formData.append("Code", code);
    const email = localStorage.getItem("Email");
    formData.append("Email", email);

    try {
      const response = await fetch(
        "https://stocksquare.runasp.net/api/Account/ConfirmCode",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("تم التأكيد  بنجاح", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        localStorage.setItem("Code", code);
        setTimeout(() => {
          navigate(ROUTES.RESETPASSWORD);
        }, 1000);
      } else {
        toast.error("فشل  تأكيد الكود", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (e) {
      toast.error("حدث خطأ اثناء الارسال ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log(e.message);
    }
  };

  const handleSubmit = () => {
    if (code.every((digit) => digit !== "")) {
      setError("");
      sendEmail();
    } else {
      setError("الرجاء إدخال كود مكون من 6 أرقام");
    }
  };

  return (
    <div className="container m-auto ">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex flex-col gap-2 max-w-lg mx-auto mt-20 shadow-md p-4">
        <div className="w-[70%] m-auto mb-3">
          <img src={logo} className="w-full h-full object-cover" />
        </div>

        <h1 className="m-auto text-lg font-semibold text-primary-950">
          {" "}
          ادخل الكود للتأكيد{" "}
        </h1>

        <div
          className="flex gap-3 justify-between mt-3"
          style={{ direction: "ltr" }}
        >
          {code.map((digit, idx) => (
            <input
              key={idx}
              id={`input-${idx}`}
              className="w-[50px] h-[50px] rounded-lg border border-2 border-primary-700 bg-grey-100 focus:border-primary-950 "
              type="text"
              value={digit}
              pattern="\d"
              onChange={(e) => handleChange(e, idx)}
              maxLength={1}
              autoFocus={idx === 0}
            />
          ))}
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-2 bg-primary-900 text-white rounded-md hover:bg-primary-700"
        >
          إرسال
        </button>
      </div>
    </div>
  );
}

export default ConfirmCode;
