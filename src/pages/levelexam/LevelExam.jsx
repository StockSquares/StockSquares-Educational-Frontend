import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import LevelExamQuestions from "./LevelExamQuestions";
import { useAuth } from "../../Context/AuthContext";
import { Register } from ".."; // Changed from Login to Register
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes";
import styles from '../../pages/TrainingAndEducation/TrainingAndEducation.module.css';
import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LevelExam() {
  const { userData, setDecodedUser, isAuthLoading } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isExamFinished, setIsExamFinished] = useState(false);
  const [examResult, setExamResult] = useState({ score: 0, total: 0 });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'

  useEffect(() => {
    if (userData) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userData]);

  const handleExamFinish = (score, total) => {
    setExamResult({ score, total });
    setIsExamFinished(true);
  };

  const getLevel = (finalScore, totalQuestions) => {
    const percentage = finalScore / totalQuestions;
    if (percentage >= 0.7) return "مستوى محترف";
    if (percentage >= 0.4) return "مستوى متقدم";
    return "مستوى مبتدئ";
  };

  const handleRegistrationSuccess = async (data) => {
    // Store email for OTP page and redirect
    if (data?.email || localStorage.getItem('email')) {
      toast.success("تم إنشاء الحساب بنجاح! جاري التوجيه لتفعيل الحساب...");
      setTimeout(() => {
        navigate("/verify-otp");
      }, 1500);
    } else {
      toast.error("حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى.");
    }
  };

  const handleLoginSuccess = (data) => {
    setIsLoggedIn(true);
    toast.success("تم تسجيل الدخول بنجاح!");
  };

  // 1. Loading State
  if (isAuthLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-lg font-semibold text-gray-600" dir="rtl">
        <p>يتم التحقق من حالة تسجيل الدخول...</p>
      </div>
    );
  }

  // 2. Registration Screen (if not logged in)
  // 2. Auth Screen (Login/Register Toggle)
  if (!isLoggedIn) {
    return (
      <div className="contain" dir="rtl" style={{ width: "100%", padding: "10px" }}>
        <ToastContainer position="top-center" theme="colored" />
        <div style={{ width: "100%", margin: "0 auto", maxWidth: "800px" }}>
          <div className="p-2 rounded-2xl border w-full shadow-md bg-green-100 mb-4">
            <div className="flex items-center justify-center gap-2 mb-2 w-full">
              <FontAwesomeIcon
                icon={faCircle}
                className="text-white border bg-[#25863f] rounded-full p-1 text-xs"
              />
              <span className="font-bold text-green-900 text-lg">لماذا هذا الاختبار؟</span>
            </div>
            <h4 className="text-sm md:text-base text-green-800 leading-6 px-2">
              يساعدك اختبار تحديد المستوى على اختيار مستوى التدريب المناسب
              لخبرتك <br /> والحصول على تدريب تفاعلي فعال بناء على الاجابات المختارة.
              <br />
              <span className="text-green-600 block mt-2 font-bold text-xs">
                *لا تحتاج الي عمل الاختبار اذا كنت ستبدأ من المستوي المبتدئ
              </span>
            </h4>
          </div>

          {authMode === 'login' ? (
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 ">
              <Login
                onSuccess={handleLoginSuccess}
                hideHeader={true}
                hideRegisterLink={true}
              />
              <div className="flex items-center justify-center gap-2 mt-6">
                <p className="text-gray-500 font-medium">ليس لديك حساب؟</p>
                <span
                  onClick={() => setAuthMode('register')}
                  className="text-green-600 font-bold hover:text-green-700 hover:underline transition-all cursor-pointer text-base select-none"
                >
                  إنشاء حساب جديد
                </span>
              </div>
            </div>
          ) : (
            <div>
              <Register
                onSuccess={handleRegistrationSuccess}
                hideHeader={true}
                customTitle={<h2 className="text-2xl font-bold text-center mb-2">إنشاء حساب جديد</h2>}
                customButtonText="تسجيل وابدأ الاختبار"
                hideLoginLink={true}
              />
              <div className="flex items-center justify-center gap-2 mt-6">
                <p className="text-gray-500 font-medium">لديك حساب بالفعل؟</p>
                <span
                  onClick={() => setAuthMode('login')}
                  className="text-green-600 font-bold hover:text-green-700 hover:underline transition-all  cursor-pointer text-base select-none"
                >
                  تسجيل الدخول
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 3. Result Screen (if exam finished)
  if (isExamFinished) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 mt-10 min-h-[60vh]">
        <h2 className="text-2xl font-bold text-black mb-4">
          نتيجتك في اختبار تحديد المستوى
        </h2>

        <div className="w-40 h-40">
          <CircularProgressbar
            value={(examResult.score / examResult.total) * 100}
            text={`${examResult.score} / ${examResult.total}`}
            styles={buildStyles({
              pathColor: "#10b981",
              textColor: "#1f2937",
              trailColor: "#e5e7eb",
              textSize: "16px",
            })}
          />
        </div>

        <p className={`text-xl font-bold mt-4 text-green-400`}>
          {getLevel(examResult.score, examResult.total)}
        </p>

        <Link
          to={ROUTES.RESERVATION}
          className={`${styles.buttonPersonal} font-semibold bg-primary-900 text-white rounded-lg shadow-lg hover:bg-primary-800 `}
        >
          {t("TrainingAndEducation.bookYourTrainer")}
        </Link>
      </div>
    );
  }

  // 4. Exam Questions (Default view for logged in user)
  return (
    <div className="flex flex-col items-center gap-5 mt-5">
      <div className="p-2 rounded-2xl border w-[90%] md:w-[60%] shadow-md bg-green-100">
        <FontAwesomeIcon
          icon={faCircle}
          className="text-white border bg-[#25863f] rounded-full"
        />
        <h2 className="text-xl font-bold text-green-600 mb-2  text-center">لماذا هذا الاختبار؟</h2>
        <h4 className="text-[12px] md:text-xl lg:text-xl px-1 md:px-3 mb-4 flex flex-col text-green-400 font-semibold leading-5 text-center">
          يساعدك اختبار تحديد المستوى على اختيار مستوى التدريب المناسب 
          لخبرتك  <br />والحصول على تدريب تفاعلي فعال بناء على الاجابات المختارة…
          <br />
          <span className="text-green-600 self-center mt-2 font-semibold">
            *لا تحتاج الي عمل الاختبار اذا كنت ستبدأ من المستوي المبتدئ
          </span>
        </h4>
      </div>

      <LevelExamQuestions onFinish={handleExamFinish} />
    </div>
  );
}

export default LevelExam;
