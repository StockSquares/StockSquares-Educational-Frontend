import React from "react";
import { useState, useEffect } from "react";
// إضافة CircularProgressbar من النسخة البعيدة
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import assessmentData from './data/assessmentData';
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes";
import styles from '../../pages/TrainingAndEducation/TrainingAndEducation.module.css'

import { useTranslation } from "react-i18next";


const LevelExamQuestions = ({ onFinish }) => {
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

  // لحساب نسبة التقدم الكلية (لشريط التقدم)
  const progressPercentage = (currentIndex / totalQuestions) * 100;


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
    // بناءً على المنطق الأول، الأسئلة مقسمة بالتساوي (نفترض 10 أسئلة لكل مستوى)
    if (nextIndex % 10 === 0 && nextIndex !== 0 && nextIndex < 20) {
      toast.warning("أنتِ الآن داخل على المستوى الأصعب!")
    }
    if (nextIndex === 20) {
      toast.warning("أنتِ الآن داخل على آخر مستوى!")
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

  if (currentIndex >= totalQuestions) {
    if (onFinish) {
      onFinish(score, totalQuestions);
    }
    return null;
  }


  return (
    <>
      <div className="w-full min-h-[80vh] flex justify-center items-start p-2">

        <div className="min-h-[70%] w-[90%] md:w-[60%] flex flex-col gap-4 bg-gray-50 shadow-md p-4">

          {/* شريط التقدم (Progress Bar) */}
          <div className="w-full h-[10px] bg-gray-100 rounded-full overflow-hidden">
            <span
              className={`h-full block bg-accent-900 rounded-full transition-all`}
              style={{ width: `${progressPercentage}%` }}
            ></span>
          </div>
          <p className="m-auto"> {currentIndex + 1}/{totalQuestions} </p>

          <p className="text-lg font-semibold text-center text-primary-900">
            {/* عرض المستوى الحالي بناءً على الـ index */}
            {currentIndex < 10 ? 'مستوى المبتدئين' : currentIndex < 20 ? 'مستوى المتقدمين' : 'مستوى المحترفين'}
          </p>

          <p className="text-lg font-semibold text-center">
            {currentIndex + 1}- {currentQuestion.text}
          </p>

          <ul className="space-y-3 mt-3">
            {currentQuestion.options.map((opt, i) => {
              let bgColor = "bg-white";
              let showRationale = false;
              let rationaleColor = "";

              if (selectedAnswer) {
                // إذا تم الاختيار بالفعل
                if (opt === selectedAnswer) {
                  // هذا هو الاختيار الذي قام به المستخدم
                  bgColor = opt.isCorrect ? "bg-green-200" : "bg-red-100";
                  showRationale = true;
                  rationaleColor = opt.isCorrect ? "text-[#146c2e]" : "text-[#b3261e]";
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

          <div className="flex justify-between mt-5">
            {currentIndex > 0 && (
              <button className={`px-3 py-2 rounded-lg font-semibold text-lg bg-transparent text-primary-800`}
                onClick={handlePrev}
              >
                رجوع
              </button>
            )}

            <button
              className={`px-3 py-2 rounded-lg text-white font-semibold text-lg ${selectedAnswer ? "bg-primary-800" : "bg-gray-300"}`}
              onClick={handleNext}
              disabled={!selectedAnswer}
            >
              {currentIndex < totalQuestions - 1 ? 'التالي' : 'إنهاء الاختبار'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LevelExamQuestions;