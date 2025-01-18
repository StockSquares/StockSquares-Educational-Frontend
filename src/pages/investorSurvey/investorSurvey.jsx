import { useState } from "react";
import "./investorSurvey.css";
import { questions } from "../../assets/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";

const InvestorSurvey = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [formError, setFormError] = useState(false);

  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");

  const handleOptionClick = (optionIndex) => {
    setSelectedOption(optionIndex);
    setError(false);
  };

  const handleStart = () => {
    if (!fullName || !birthDate || !email) {
      setFormError(true);
      return;
    }
    setFormError(false);
    setIsLoggedIn(true);
  };

  const next = () => {
    if (selectedOption === null) {
      setError(true);
      return;
    }

    const updatedAnswers = [...answers];
    updatedAnswers[index] = selectedOption;
    setAnswers(updatedAnswers);

    if (index === questions.length - 1) {
      alert("Survey completed! Thank you for your participation.");
      return;
    }

    setIndex(index + 1);
    setSelectedOption(updatedAnswers[index + 1] || null);
  };

  const previous = () => {
    if (index === 0) return;
    setIndex(index - 1);
    setSelectedOption(answers[index - 1] || null);
  };

  return (
    <div className="contain">
      {!isLoggedIn ? (
        <div className="login">
          <h1>
            <FontAwesomeIcon icon={faClipboardList} /> إستبيان شخصية مستثمر
          </h1>
          <div className="full">
            <p className="important-info">
              📌 هذا الاستبيان هو أداة لتقييم مستوي المخاطرة في الشخصية. لتقييم
              دقيق وشامل، يجب إجراء تقييم نفسي متخصص مثل مقياس البحث عن الإثارة
              ومقياس الميل في المخاطرة.
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
            <p className="error">يرجى ملء جميع الحقول بشكل صحيح قبل المتابعة !</p>
          )}
          <button type="button" onClick={handleStart}>
            بدء
          </button>
        </div>
      ) : (
        <>
          <h1>
            <FontAwesomeIcon icon={faClipboardList} /> إستبيان شخصية مستثمر
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
                  className={selectedOption === i + 1 ? "selected" : ""}
                  onClick={() => handleOptionClick(i + 1)}
                >
                  {questions[index][key]}
                </li>
              ))}
          </ul>
          <p className={error ? "error" : ""}>
            {error ? "يرجى اختيار إجابة قبل المتابعة!" : ""}
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
        </>
      )}
    </div>
  );
};

export default InvestorSurvey;
