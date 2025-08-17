import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import logo from "/src/assets/imgs/logo-SS.svg";
import { toast, ToastContainer } from "react-toastify";

function SendCode() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const sendEmail = async () => {
    const formData = new FormData();
    formData.append("Email", email);

    try {
      const response = await fetch(
        "https://stocksquare.runasp.net/api/Account/SendCodeToEmail",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("تم ارسال البريد الالكتروني بنجاح", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        localStorage.setItem("Email", email);
        setTimeout(() => {
          navigate(ROUTES.CONFIRMCODE);
        }, 1000);
      } else {
        toast.error("فشل ارسال البريد الالكتروني", {
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
    if (!email) {
      setError(true);
    } else {
      setError(false);
      sendEmail(); // 🔁 استدعاء الإرسال هنا
    }
  };

  return (
    <div className="container m-auto ">
      {/* <ToastContainer
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
      /> */}
      <div className="flex flex-col gap-2 max-w-lg mx-auto mt-20 shadow-md p-4">
        <div className="w-[70%] m-auto">
          <img src={logo} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col gap-6 mt-4 ">
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              placeholder="example@xxxxx.com"
              className="border rounded-md p-2 focus:outline-none focus:border-green-500"
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">البريد مطلوب</p>}
          </div>
          <button
            type="submit"
            className="px-10 self-center bg-primary-900 text-white py-2 rounded-lg hover:bg-primary-700 transition"
            onClick={handleSubmit}
          >
            إرسال
          </button>
        </div>
      </div>
    </div>
  );
}

export default SendCode;
