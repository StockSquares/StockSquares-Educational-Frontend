import { React, useState } from "react";
import { questions } from "../../assets/data2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshake } from "@fortawesome/free-regular-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../InvestorSurvey/investorSurvey.css";
import countries from "../../Context/Countries";

const PartnerApplication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [formError, setFormError] = useState(false);

  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleOptionClick = (optionIndex) => {
    setSelectedOption(optionIndex);
    setError(false);
  };

  const handleStart = async () => {
    if (!fullName || !birthDate || !email || !phoneNumber || !country) {
      setFormError(true);
      return;
    }

    const nameParts = fullName.trim().split(" ");
    const [firstName, parentName, familyName] = [
      nameParts[0] || "",
      nameParts[1] || "",
      nameParts.slice(2).join(" ") || "",
    ];

    const payload = {
      firstName,
      parentName,
      familyName,
      email,
      phoneNumber,
      password: "Default@123",
      confirmPassword: "Default@123",
      gender: "غير محدد",
      scientificStatus: "غير محدد",
      birthday: birthDate.toISOString(),
      referralCode: "none",
    };

    try {
      const response = await fetch(
        "https://stocksquare.runasp.net/api/Account/partner-register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/plain",
          },
          body: JSON.stringify(payload),
        }
      );
      console.log(response);
      const result = await response.json();
      if (result.isSuccess) {
        setFormError(false);
        setIsLoggedIn(true);
      } else {
        alert("فشل في التسجيل: " + (result.error?.description || "حدث خطأ"));
      }
    } catch (err) {
      alert("فشل في الاتصال بالخادم.");
      console.error(err);
    }
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
      alert("تم إكمال الاستبيان! شكراً لمشاركتك.");
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
    <>
      <div className="contain">
        {!isLoggedIn ? (
          <div className="login">
            <h1>
              <FontAwesomeIcon icon={faHandshake} /> طلب العمل كشريك
            </h1>
            <div className="full">
              <p className="important-info">
                يسعدنا طلبك في الأنضمام الى شبكة شركاء ستوك سكويرز
                <br />
                يرجى الأجابة على الأسئلة التالية لكي نتمكن من تقيم طلبك بشكل
                أفضل نود أن نوضح أننا نبحث عن شركاء يتناسبون مع قيمنا ورؤيتنا
                وأهدافنا ولهذا السبب قد لايتم قبول جميع الطلبات ونشكر تفهمك.
              </p>
              <div>
                <label>الاسم ثلاثي :</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="أدخل اسمك ثلاثي"
                />
              </div>
              <div>
                <label>رقم الهاتف :</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="أدخل رقم هاتفك"
                />
              </div>
              <div>
                <label>بلد الإقامة :</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-4 py-4 rounded-lg border-2 border-[#25863f] focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option> اختر الدوله </option>
                  {countries.map((country, idx) => (
                    <option key={idx}> {country} </option>
                  ))}
                </select>
              </div>
              <div>
                <label>تاريخ الميلاد :</label>
                <DatePicker
                  selected={birthDate}
                  onChange={(date) => setBirthDate(date)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="اختر تاريخ الميلاد"
                  className="w-full p-2 rounded border"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
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
                يرجى ملء جميع الحقول بشكل صحيح قبل المتابعة !
              </p>
            )}
            <button type="button" onClick={handleStart}>
              ابدا
            </button>
          </div>
        ) : (
          <>
            <h1>
              <FontAwesomeIcon icon={faHandshake} /> طلب العمل كشريك
            </h1>
            <hr />
            <h2>
              {index + 1}.{" "}
              {questions[index]?.question || "جارٍ تحميل السؤال..."}
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
    </>
  );
};

export default PartnerApplication;
