import { useState } from "react";
import "./investorSurvey.css";
import { questions } from "../../assets/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Questionare from "../../components/general/questionare/Questionare";
import { Login, Register } from "..";
import { useAuth } from "../../Context/AuthContext";
function InvestorSurvey() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [formError, setFormError] = useState(false);
  const [birthDate, setBirthDate] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const { userData } = useAuth();

  const handleOptionClick = (optionIndex) => {
    setSelectedOption(optionIndex);
    setError(false);
  };

  const next = () => {
    if (selectedOption === null) {
      setError(true);
      return;
    }

    const updatedAnswers = [...answers];
    updatedAnswers[index] = selectedOption;
    setAnswers(updatedAnswers);

    if (index === questions.length - 1 && !userData) {
      setIsLoggedIn(true);
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
      {!isLoggedIn ? (
        <div className="contain">
          <p className="important-info">
            📌 هذا الاستبيان هو أداة لتقييم مستوي المخاطرة في الشخصية. لتقييم
            دقيق وشامل، يجب إجراء تقييم نفسي متخصص مثل مقياس البحث عن الإثارة
            ومقياس الميل في المخاطرة.
          </p>
          <Questionare
            title={"استبيان شخصيه مستثمر"}
            next={next}
            previous={previous}
            index={index}
            setIndex={setIndex}
            selectedOption={selectedOption}
            answers={answers}
            handleOptionClick={handleOptionClick}
            questions={questions}
            setAnswers={setAnswers}
            error={error}
          />
        </div>
      ) : (
        <Register />
      )}
    </>
  );
}

{
}

export default InvestorSurvey;
