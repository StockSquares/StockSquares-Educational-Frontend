import React, { useState } from "react";
import "../InvestorSurvey/investorSurvey.css";
import { questions } from "../../assets/data3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshake } from "@fortawesome/free-regular-svg-icons";
import { useAuth } from "../../Context/AuthContext";
import { Login, Register } from "..";

function Joincomp() {
  const { userData } = useAuth();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState([]);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [certificates, setCertificates] = useState("");

  // اختيار الإجابات
  const handleOptionClick = (optionIndex) => {
    if (index === 3) {
      // متعدد
      if (selectedOption.includes(optionIndex)) {
        setSelectedOption(selectedOption.filter((o) => o !== optionIndex));
      } else {
        setSelectedOption([...selectedOption, optionIndex]);
      }
    } else {
      setSelectedOption(optionIndex);
    }
    setError(false);
  };

  // التالي
  const next = () => {
    // بدون اختيار
    if (
      (index === 3 && selectedOption.length === 0) ||
      (index !== 3 && !selectedOption)
    ) {
      setError(true);
      return;
    }

    // لازم يدخل الشهادات
    if (index === 1 && selectedOption !== 1 && certificates.trim() === "") {
      setError(true);
      return;
    }

    const updatedAnswers = [...answers];
    updatedAnswers[index] =
      index === 1
        ? { option: selectedOption, certificates }
        : selectedOption;

    setAnswers(updatedAnswers);

    // لو خلّص الأسئلة
    if (index === questions.length - 1) {
      if (!userData) {
        setIsLoggedIn(true);
      }
      return;
    }

    setIndex(index + 1);
    setSelectedOption(
      updatedAnswers[index + 1] || (index + 1 === 3 ? [] : null)
    );
  };

  // السابق
  const previous = () => {
    if (index === 0) return;
    setIndex(index - 1);

    const prevAnswer = answers[index - 1];
    if (index - 1 === 3) {
      setSelectedOption(prevAnswer || []);
    } else {
      setSelectedOption(prevAnswer || null);
    }
  };

  return (
    <>
      {!isLoggedIn ? (
        <div className="contain">
          <p className="important-info text-lg">
            نشكرك على اهتمامك بالانضمام إلى فريقنا كمدرب شخصي حر. <br />
            قبل البدء في ملء طلب التقديم، نود توجيهك لأهمية الإجابات الصادقة
            حتى نستطيع تقييم طلبك بشكل فعّال وبناء علاقة ثقة.
          </p>

          <h1>
            <FontAwesomeIcon icon={faHandshake} /> طلب الانضمام كمدرب شخصي
          </h1>

          <hr />

          <h2>
            {index + 1}. {questions[index]?.question}
          </h2>

          {/* خيارات الأسئلة */}
          <ul>
            {Object.keys(questions[index])
              .filter((key) => key.startsWith("option"))
              .map((key, i) => (
                <li
                  key={i}
                  className={
                    (index === 3 && selectedOption.includes(i + 1)) ||
                      (index !== 3 && selectedOption === i + 1)
                      ? "selected"
                      : ""
                  }
                  onClick={() => handleOptionClick(i + 1)}
                >
                  {questions[index][key]}
                </li>
              ))}

            {/* إدخال الشهادات */}
            {index === 1 && selectedOption !== 1 && selectedOption !== null && (
              <div className="flex flex-col gap-2 mt-3">
                <label className="font-semibold">قم بادخال أسماء الشهادات</label>
                <textarea
                  className="w-full border p-2 rounded"
                  placeholder="اكتب أسماء الشهادات هنا..."
                  rows={2}
                  value={certificates}
                  onChange={(e) => setCertificates(e.target.value)}
                />
              </div>
            )}
          </ul>

          <p className={error ? "error" : ""}>
            {error
              ? index === 1 &&
                selectedOption !== 1 &&
                certificates.trim() === ""
                ? "من فضلك أدخل أسماء الشهادات"
                : "يرجى اختيار إجابة قبل المتابعة!"
              : ""}
          </p>

          {/* أزرار التنقل */}
          <div className="pop">
            <button className="pop1" onClick={previous}>
              السابق
            </button>

            <button onClick={next}>التالي</button>

            <div className="index">
              <span className="top">{index + 1}</span> من{" "}
              <span className="top">{questions.length}</span> سؤال
            </div>
          </div>
        </div>
      ) : (
        <Register />
      )}
    </>
  );
}

export default Joincomp;
