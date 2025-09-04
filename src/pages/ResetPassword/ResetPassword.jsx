import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import logo from "/src/assets/imgs/logo-SS.svg";
import { toast, ToastContainer } from "react-toastify";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [weakPass, setWeakPass] = useState(false);

  const navigate = useNavigate();

  const sendEmail = async () => {
    const email = localStorage.getItem("Email");
    // const code = localStorage.getItem("Code");
    const formData = new FormData();
    // formData.append("Code", code);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);

    try {
      const response = await fetch(
        "https://stocksquare1.runasp.net/api/Account/reset-password",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("تم التحديث  بنجاح", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          navigate(ROUTES.LOGIN);
        }, 1000);
      } else {
        toast.error("  فشلت اعاده تحديث كلمه المرور", {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setWeakPass(true);
    } else if (password !== confirmPassword) {
      setError(true);
      return;
    } else {
      setError(false);
      setWeakPass(true);
      sendEmail();
    }
  };

  return (
    <div className="container m-auto">
      <div className="flex flex-col gap-2 max-w-lg mx-auto mt-20 shadow-md p-4 mb-7">
        <div className="w-[70%] m-auto mb-3">
          <img src={logo} className="w-full h-full object-cover" />
        </div>
        <h2 className="m-auto text-lg font-semibold text-primary-950">
          إعادة تعيين كلمة المرور
        </h2>
        <div className="space-y-6 flex flex-col">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              كلمة المرور الجديدة
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="أدخل كلمة المرور الجديدة"
              required
              min={6}
              pattern="[0-9]*[A-Z a-z]+[0-9]+[@#$&]"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              تأكيد كلمة المرور
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="أعد إدخال كلمة المرور"
              required
              min={6}
            />
          </div>
          {error && (
            <p className="text-red-500 font-semibold text-sm">
              {" "}
              كلمات المرور غير متطابقه{" "}
            </p>
          )}

          {weakPass && (
            <p className="text-red-500 font-semibold text-sm">
              {" "}
              يجب الا تقل كلمه المرور عن 6 ارقام وتشمل احرف كبيره و رموز مثل
              :@#$&{" "}
            </p>
          )}
          <button
            type="submit"
            className="px-10 self-center bg-primary-950 text-white py-2 rounded-lg hover:bg-primary-700 transition"
            onClick={handleSubmit}
          >
            تأكيد
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
