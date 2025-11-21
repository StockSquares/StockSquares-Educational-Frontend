import { useState } from "react";
import "../InvestorSurvey/investorSurvey.css";
import { questions } from "../../assets/data3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";

export default function JoinAsTrainer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]); // للإجابات المتعددة
  const [selectedOption, setSelectedOption] = useState(null); // للإجابة الفردية
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [formError, setFormError] = useState(false);
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [certificates, setCertificates] = useState(""); // لتخزين أسماء الشهادات

  // تحديد إذا كان السؤال متعدد الاختيارات
  const isMultipleChoice = index === 3; // السؤال الرابع (index = 3)

  // التعامل مع اختيار الإجابة
  const handleOptionClick = (optionIndex) => {
    if (isMultipleChoice) {
      setSelectedOptions((prev) =>
        prev.includes(optionIndex)
          ? prev.filter((opt) => opt !== optionIndex)
          : [...prev, optionIndex]
      );
    } else {
      setSelectedOption(optionIndex);
    }
    setError(false);
  };

  // بدء الاستبيان بعد إدخال البيانات
  const handleStart = () => {
    if (!fullName || !birthDate || !email) {
      setFormError(true);
      return;
    }
    setFormError(false);
    setIsLoggedIn(true);
  };

  // الانتقال للسؤال التالي
  const next = () => {
    if (
      (!isMultipleChoice && selectedOption === null) ||
      (isMultipleChoice && selectedOptions.length === 0)
    ) {
      setError(true);
      return;
    }

    const updatedAnswers = [...answers];
    updatedAnswers[index] = isMultipleChoice ? selectedOptions : selectedOption;
    setAnswers(updatedAnswers);

    if (index === questions.length - 1) {
      alert("Survey completed! Thank you for your participation.");
      return;
    }

    setIndex(index + 1);
    setSelectedOption(updatedAnswers[index + 1] || null);
    setSelectedOptions(updatedAnswers[index + 1] || []);
  };

  // الرجوع للسؤال السابق
  const previous = () => {
    if (index === 0) return;
    setIndex(index - 1);
    setSelectedOption(answers[index - 1] || null);
    setSelectedOptions(answers[index - 1] || []);
  };

  return (
    <div className="contain">
      {!isLoggedIn ? (
        <div className="login">
          <h1>
            <FontAwesomeIcon icon={faClipboardList} /> إستبيان شخصية مستثمر
          </h1>
          <div className="full">
            <p className="important-info text-xl">
              📌 نشكرك علي اهتمامك بالانضمام إلي فريقنا كمدرب شخصي حر. قبل
              البدأ في ملء طلب التقديم، نود أن نوجهكم إلي صراحة الإجابات حتي
              نستطيع تقييم طلبكم بطريقة فعالة وبناء علاقة عملية موثوقة
              ومستمرة.
            </p>
            <div>
              <label>الاسم الثنائي :</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="أدخل اسمك الثنائي"
              />
            </div>
            <div>
              <label>تاريخ الميلاد :</label>
              <input
                type="date"
                value={birthDate}
                className="dark:bg-slate-300"
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>
            <div>
              <label>البريد الإلكتروني :</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="أدخل بريدك الإلكتروني"
              />
            </div>
          </div>
          {formError && (
            <p className="error">
              يرجى ملء جميع الحقول بشكل صحيح قبل المتابعة!
            </p>
          )}
          <button type="button" onClick={handleStart}>
            بدء
          </button>
        </div>
      ) : (
        <>
          <h1>
            <FontAwesomeIcon icon={faClipboardList} /> طلب الانضمام كمدرب شخصي
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
                    (
                      isMultipleChoice
                        ? selectedOptions.includes(i + 1)
                        : selectedOption === i + 1
                    )
                      ? "selected"
                      : ""
                  }
                  onClick={() => handleOptionClick(i + 1)}
                >
                  {questions[index][key]}
                </li>
              ))}
          </ul>

          {/* السؤال التاني وحقل الشهادات */}
          {index === 1 && selectedOption !== null && selectedOption !== 1 && (
            <div className="extra-field">
              <label>من فضلك أدخل أسماء الشهادات :</label>
              <input
                type="text"
                placeholder="أدخل اسم الشهادة"
                value={certificates}
                onChange={(e) => setCertificates(e.target.value)}
              />
            </div>
          )}

          <p className={error ? "error" : ""}>
            {error ? "يرجى اختيار إجابة قبل المتابعة!" : ""}
          </p>

          <div className="pop">
            <button className="pop1" onClick={previous}>
              السابق
            </button>
            <button onClick={next}>التالةي</button>
            <div className="index">
              <span className="top">{index + 1}</span> of{" "}
              <span className="top">{questions.length}</span> Questions
            </div>
          </div>
        </>
      )}
    </div>
  );
}
