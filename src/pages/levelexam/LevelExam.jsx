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

function LevelExam() {
  const { userData, setDecodedUser, isAuthLoading } = useAuth();
  const { t } = useTranslation();

  const [isExamFinished, setIsExamFinished] = useState(false);
  const [examResult, setExamResult] = useState({ score: 0, total: 0 });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    try {
      const loginResponse = await fetch("https://stocksquare1.runasp.net/api/Account/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password })
      });

      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        const token = loginData.data?.token || loginData.token;

        if (token) {
          setDecodedUser(token);
          setIsLoggedIn(true);
        } else {
          alert("تم التسجيل بنجاح، لكن حدث خطأ في تسجيل الدخول. الرجاء تسجيل الدخول يدوياً.");
        }
      } else {
        alert("تم التسجيل بنجاح! الرجاء تسجيل الدخول للمتابعة.");
      }
    } catch (error) {
      alert("تم التسجيل بنجاح! الرجاء تسجيل الدخول للمتابعة.");
    }
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
  if (!isLoggedIn) {
    return (
      <div className="contain" dir="rtl" style={{ width: "100%", padding: "10px" }}>
        <div style={{ width: "100%", margin: "0 auto" }}>
          <Register
            onSuccess={handleRegistrationSuccess}
            hideHeader={true}
            customTitle={
              <>
                <h2 className="text-2xl font-bold text-center mb-2">اختبار تحديد المستوى</h2>
                <div className="p-2 rounded-2xl border w-full shadow-md bg-green-100 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="text-white border bg-[#25863f] rounded-full p-1 text-xs"
                    />
                    <span className="font-bold text-green-700">لماذا هذا الاختبار؟</span>
                  </div>
                  <h4 className="text-sm md:text-base text-green-800 leading-6 px-2">
                    يساعدك اختبار تحديد المستوى على اختيار مستوى التدريب المناسب
                    لخبرتك والحصول على تدريب تفاعلي فعال بناء على الاجابات المختارة.
                    <br />
                    <span className="text-green-600 block mt-2 font-bold text-xs">
                      *لا تحتاج الي عمل الاختبار اذا كنت ستبدأ من المستوي المبتدئ
                    </span>
                  </h4>
                </div>
              </>
            }
            customButtonText="ابدأ الاختبار"
            hideLoginLink={true}
          />
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
        <h4 className="text-[12px] md:text-xl lg:text-xl px-1 md:px-3 mb-4 flex flex-col text-green-400 font-semibold leading-5">
          يساعدك اختبار تحديد المستوى على اختيار مستوى التدريب المناسب
          لخبرتك والحصول على تدريب تفاعلي فعال بناء على الاجابات المختارة…
          <br />
          <span className="text-green-600 self-center mt-2 font-bold">
            *لا تحتاج الي عمل الاختبار اذا كنت ستبدأ من المستوي المبتدئ
          </span>
        </h4>
      </div>

      <LevelExamQuestions onFinish={handleExamFinish} />
    </div>
  );
}

export default LevelExam;
