import { React, useState } from "react";
import "../InvestorSurvey/investorSurvey.css";
import { questions } from "../../assets/data3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshake } from "@fortawesome/free-regular-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import { Register } from "..";
import { useAuth } from "../../Context/AuthContext";

function Joincomp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState([]);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);

  // 🟢 state للشهادات
  const [certificates, setCertificates] = useState("");

  const handleOptionClick = (optionIndex) => {
    if (index === 3) {
      // السؤال الرابع متعدد الاختيارات
      if (selectedOption.includes(optionIndex)) {
        setSelectedOption(
          selectedOption.filter((item) => item !== optionIndex)
        );
      } else {
        setSelectedOption([...selectedOption, optionIndex]);
      }
    } else {
      setSelectedOption(optionIndex);
    }
    setError(false);
  };

  const next = () => {
    // التحقق من الاختيار
    if (
      (index === 3 && selectedOption.length === 0) ||
      (index !== 3 && !selectedOption)
    ) {
      setError(true);
      return;
    }

    // التحقق من الشهادات لو السؤال التاني واختار إجابة غير الأولى
    if (index === 1 && selectedOption !== 1 && certificates.trim() === "") {
      setError(true);
      return;
    }

    const updatedAnswers = [...answers];
    updatedAnswers[index] =
      index === 1 ? { option: selectedOption, certificates } : selectedOption;
    setAnswers(updatedAnswers);

    if (index === questions.length - 1 && !userData) {
      setIsLoggedIn(true);
      return;
    }

    setIndex(index + 1);
    setSelectedOption(
      updatedAnswers[index + 1] || (index + 1 === 3 ? [] : null)
    );
  };

  const previous = () => {
    if (index === 0) return;
    setIndex(index - 1);
    setSelectedOption(answers[index - 1] || null);
  };

  const { userData } = useAuth();

  return (
    <>
      {!isLoggedIn ? (
        <div className="contain">
          <p className="important-info text-lg">
            نشكرك على اهتمامك بالانضمام إلى فريقنا كمدرب شخصي حر . <br />
            قبل البدء في ملء طلب التقديم، نود أن نوجهكم إلى صراحة الإجابات حتى
            نستطيع تقيم طلبكم بطريقة فعالة وبناء علاقة عملية موثوقة
          </p>
          <h1>
            <FontAwesomeIcon icon={faHandshake} /> طلب الانضمام كمدرب شخصي
          </h1>
          <hr />
          <h2>
            {index + 1}. {questions[index]?.question || "Loading question..."}
          </h2>
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

            {/* 🟢 textarea للشهادات لو السؤال التاني */}
            {index === 1 && selectedOption !== 1 && selectedOption !== null && (
              <div className="flex flex-col gap-2 mt-3">
                <label className="font-semibold">
                  قم بادخال أسماء الشهادات
                </label>
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
                ? "من فضلك أدخل أسماء الشهادات قبل المتابعة"
                : "يرجى اختيار إجابة قبل المتابعة!"
              : ""}
          </p>

          <div className="pop">
            <button className="pop1" onClick={previous}>
              السابق
            </button>
            <button onClick={next}>التالي</button>
            <div className="index">
              <span className="top">{index + 1}</span> of{" "}
              <span className="top">{questions.length}</span> Questions
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
