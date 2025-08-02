import { React, useState } from 'react';
import "../InvestorSurvey/investorSurvey.css";
import {questions} from '../../assets/data3';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshake } from "@fortawesome/free-regular-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function Joincomp (){
      const [isLoggedIn, setIsLoggedIn] = useState(false);
      const [index, setIndex] = useState(0);
      const [selectedOption, setSelectedOption] = useState([]);
      const [error, setError] = useState(false);
      const [answers, setAnswers] = useState([]);
      const [formError, setFormError] = useState(false);
    
      const [fullName, setFullName] = useState("");
      const [birthDate, setBirthDate] = useState(null);
      const [email, setEmail] = useState("");
      const [phoneNumber, setPhoneNumber] = useState("");
      const [country, setCountry] = useState("");
    
      const handleOptionClick = (optionIndex) => {
        if (index === 3) {
          // Toggle selection (question 4 - multiple choices)
          if (selectedOption.includes(optionIndex)) {
            setSelectedOption(selectedOption.filter((item) => item !== optionIndex));
          } else {
            setSelectedOption([...selectedOption, optionIndex]);
          }
        } else {
          setSelectedOption(optionIndex);
        }
        setError(false);
      };
      
      const handleStart = () => {
        if (!fullName || !birthDate || !email || !phoneNumber || !country) {
          setFormError(true);
          return;
        }
        setFormError(false);
        setIsLoggedIn(true);
      };
    
      const next = () => {
        if ((index === 3 && selectedOption.length === 0) || (index !== 3 && selectedOption === null)) {
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
        setSelectedOption(updatedAnswers[index + 1] || (index + 1 === 3 ? [] : null));
      };
      
    
      const previous = () => {
        if (index === 0) return;
        setIndex(index - 1);
        setSelectedOption(answers[index - 1] || null);
      };
return(
    <>
      <div className="contain">
        {!isLoggedIn ? (
          <div className="login">
            <h1>
            <FontAwesomeIcon icon={faHandshake} /> طلب الانضمام كمدرب شخصي
            </h1>
            <div className="full">
              <p className="important-info text-lg">نشكرك على اهتمامك بالانضمام إلى فريقنا كمدرب شخصي حر . <br />
              قبل البدء في ملء طلب التقديم، نود أن نوجهكم إلى صراحة الإجابات حتى نستطيع تقيم طلبكم بطريقة فعالة وبناء علاقة عملية موثوقة
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
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="أدخل بلد إقامتك"
                />
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
              <p className="error">يرجى ملء جميع الحقول بشكل صحيح قبل المتابعة !</p>
            )}
            <button type="button" className='px-3' onClick={handleStart}>
              ابدا طلب الانضمام
            </button>
          </div>
        ) : (
          <>
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
                    (index === 3 && selectedOption.includes(i + 1)) || (index !== 3 && selectedOption === i + 1)
                    ? "selected"
                    : ""
                }
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
)
}

export default Joincomp;