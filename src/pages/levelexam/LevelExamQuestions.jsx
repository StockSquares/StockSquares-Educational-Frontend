import React from "react";
import { useState, useEffect } from "react";
import "react-circular-progressbar/dist/styles.css";
import assessmentData from './data/assessmentData';
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes";
import styles from '../../pages/TrainingAndEducation/TrainingAndEducation.module.css'

import { useTranslation } from "react-i18next";




const LevelExamQuestions = () => {
  const levels = assessmentData.assessmentData.levels; // 3 مستويات
  const allQuestions = levels.flatMap(level => level.questions); // دمج كل الأسئلة في مصفوفة واحدة
  const totalQuestions = allQuestions.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const currentQuestion = allQuestions[currentIndex];
  const [answers, setAnswers] = useState(Array(allQuestions.length).fill(null))
  const { t } = useTranslation();



  const score = React.useMemo(
    () => answers.filter(a => a?.isCorrect).length,
    [answers]
  );

  useEffect(() => {
    // عند تغيير currentIndex، نجيب الإجابة اللي المستخدم اختارها قبل كده
    setSelectedAnswer(answers[currentIndex]);
  }, [currentIndex, answers]);

  const handleSelectAnswer = (opt) => {
    console.log('score', score);
    if (!answers[currentIndex]) { // لو مفيش اختيار سابق
      const newAnswers = [...answers];
      newAnswers[currentIndex] = opt; // نخزن الاختيار الحالي
      setAnswers(newAnswers);
      setSelectedAnswer(opt);
    }
  };

  const checkLevelUp = (nextIndex) => {
    //  كل مستوي فيه 10 اسئله
    if (nextIndex % 10 === 0 && nextIndex !== 0 && nextIndex < 20) {
      toast.warning("انتِ الآن داخل على المستوى الأصعب!")
    }
    if (nextIndex === 20) {
      toast.warning("انتِ الآن داخل على اخر مستوي!")
    }
  }

  const handleNext = () => {
    setSelectedAnswer(null);
    const nextIndex = currentIndex + 1
    setCurrentIndex(nextIndex);
    checkLevelUp(nextIndex)
  };
  const handlePrev = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const getLevel = (score) => {
    // مثال بسيط لتقسيم المستويات حسب الدرجة
    if (score / totalQuestions >= 0.7) return "مستوى محترف";
    if (score / totalQuestions >= 0.4) return "مستوى متقدم";
    return "مستوى مبتدئ";
  };

  if (currentIndex >= totalQuestions) {
    // صفحة النتيجة
    return (
      <div className="flex flex-col justify-center items-center gap-4 my-10">
        <h2 className="text-2xl font-bold text-black mb-4">
          نتيجتك في اختبار تحديد المستوى
        </h2>
        <div className="w-40">
          {/* ممكن تضيفي CircularProgressbar */}
          <p className="text-2xl text-center"><span className="text-green-400 font-bold text-3xl">{score}</span> / {totalQuestions}</p>
        </div>
        <p className={`text-xl font-bold mt-4 text-green-400`}>
          {getLevel(score)}
        </p>
        {/* <Link className=""> احجز مدربك الشخصي</Link> */}
        <Link
          to={ROUTES.RESERVATION}
          className={`${styles.buttonPersonal}  font-semibold  bg-primary-900 text-white  rounded-lg shadow-lg hover:bg-primary-800 `}
        >
          {t("TrainingAndEducation.bookYourTrainer")}
        </Link>
      </div>

    );
  }


  return (
    <>
      <div className="w-full min-h-[80vh] flex justify-center items-start p-2">

        <div className="min-h-[70%] w-[90%] md:w-[60%] flex flex-col gap-4 bg-gray-50 shadow-md p-4">
          <p className="text-lg font-semibold text-center">
            {currentIndex + 1}-{currentQuestion.text}
          </p>

          <ul className="space-y-3 mt-3">
            {currentQuestion.options.map((opt, i) => {
              let bgColor = "bg-white";
              let icon = null;
              let showRationale = false;
              let rationaleColor = "";

              if (selectedAnswer) {
                if (opt === selectedAnswer) {
                  bgColor = opt.isCorrect ? "bg-green-200" : "bg-red-100";
                  icon = opt.isCorrect ? faCheck : faTimes;
                  showRationale = true;
                  rationaleColor = opt.isCorrect ? "text-[#146c2e]" : "text-[#b3261e]";
                } else if (!selectedAnswer.isCorrect && opt.isCorrect) {
                  bgColor = "bg-green-200";
                  icon = faCheck;
                  showRationale = true;
                  rationaleColor = "text-green-600";
                }
              }

              return (
                <li
                  key={i}
                  className={`p-2 border rounded-md ${bgColor} ${selectedAnswer ? "cursor-not-allowed" : "cursor-pointer"}`}
                  onClick={() => !selectedAnswer && handleSelectAnswer(opt)}
                >
                  {i + 1} - {opt.text}
                  {showRationale && (
                    <div className="mt-2 p-2 rounded">
                      <p className={`${rationaleColor} font-bold mb-1 flex gap-2`}>
                        {opt.isCorrect ? <FontAwesomeIcon icon={faCheck} className="text-green-600 mt-1" /> : <FontAwesomeIcon icon={faTimes} className="text-red-600 text-xl mt-1" />}
                        {opt.isCorrect ? "الإجابة الصحيحة" : "الإجابة غير صحيحة"}
                      </p>
                      <p className="text-black">{currentQuestion.rationale}</p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex justify-end">
            {currentIndex > 0 ?
              <button className={`px-3 py-2 rounded-lg  font-semibold text-lg bg-transparent text-primary-800`}
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                رجوع
              </button>
              : ''
            }

            <button
              className={`px-3 py-2 rounded-lg text-white font-semibold text-lg ${selectedAnswer ? "bg-primary-800" : "bg-gray-300"
                }`}
              onClick={handleNext}
              disabled={!selectedAnswer}
            >
              التالي
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LevelExamQuestions;
