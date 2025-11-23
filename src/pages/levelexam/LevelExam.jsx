import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import LevelExamQuestions from "./LevelExamQuestions";
import { useAuth } from "../../Context/AuthContext";
import { Login } from "..";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes";
import styles from '../../pages/TrainingAndEducation/TrainingAndEducation.module.css';
import { useTranslation } from "react-i18next";

function LevelExam() {
  const { userData } = useAuth();
  const { t } = useTranslation();

  const [isExamFinished, setIsExamFinished] = useState(false);
  const [examResult, setExamResult] = useState({ score: 0, total: 0 });

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

  // 1. عرض النتيجة (لو الامتحان خلص والمستخدم مسجل دخول)
  if (isExamFinished && userData) {
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

  // 2. عرض تسجيل الدخول (لو الامتحان خلص والمستخدم مش مسجل)
  if (isExamFinished && !userData) {
    return (
      <div className="flex flex-col items-center gap-5 mt-5">
        <div className="p-4 bg-yellow-100 border border-yellow-400 rounded-lg text-yellow-800">
          <p className="font-bold">أحسنت! لقد أنهيت الاختبار.</p>
          <p>يرجى تسجيل الدخول لحفظ نتيجتك وعرضها.</p>
        </div>
        <Login />
      </div>
    );
  }

  // 3. عرض الأسئلة (الوضع الافتراضي)
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
