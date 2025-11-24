import { useEffect, useState } from "react";
import "./investorSurvey.css";
import Cookies from "js-cookie";
import { questions } from "../../assets/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Questionare from "../../components/general/questionare/Questionare";
import { Register } from "..";
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

  const [result, setResult] = useState(null);

  const calculatePersonality = (finalAnswers) => {
    const optionsMap = ["أ", "ب", "ج", "د", "هـ"];
    const mappedAnswers = finalAnswers.map(idx => optionsMap[idx]);

    const conservative = mappedAnswers.filter(a => a === "أ" || a === "هـ").length;
    const moderate = mappedAnswers.filter(a => a === "ج").length;
    const risk = mappedAnswers.filter(a => a === "ب" || a === "د").length;

    if (risk >= conservative && risk >= moderate) return "Risk Taker";
    if (conservative >= risk && conservative >= moderate) return "Conservative";
    return "Moderate";
  };

  // Helper to calculate personality from letters (for the useEffect case)
  const calculatePersonalityFromMapped = (mappedAnswers) => {
    const conservative = mappedAnswers.filter(a => a === "أ" || a === "هـ").length;
    const moderate = mappedAnswers.filter(a => a === "ج").length;
    const risk = mappedAnswers.filter(a => a === "ب" || a === "د").length;

    if (risk >= conservative && risk >= moderate) return "Risk Taker";
    if (conservative >= risk && conservative >= moderate) return "Conservative";
    return "Moderate";
  };

  const submitPersonality = async (mappedAnswers) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      console.log("Submitting answers:", mappedAnswers);

      const response = await fetch(`https://stocksquare1.runasp.net/api/User/UpdatePersonalityUser`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(mappedAnswers) // Send array directly
      });

      if (response.ok) {
        localStorage.removeItem("tempAnswers");
      } else {
        const errorText = await response.text();
        console.error("Failed to submit personality:", errorText);
        alert(`حدث خطأ أثناء حفظ النتيجة: ${errorText}`);
      }
    } catch (error) {
      console.error("Error submitting personality:", error);
    }
  };

  useEffect(() => {
    const tempAnswers = localStorage.getItem("tempAnswers");
    if (userData && tempAnswers) {
      try {
        const parsedAnswers = JSON.parse(tempAnswers);
        submitPersonality(parsedAnswers);

        // Calculate and show result for returning user
        const personality = calculatePersonalityFromMapped(parsedAnswers);
        setResult(personality);
      } catch (e) {
        console.error("Error parsing temp answers", e);
      }
    }
  }, [userData]);

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

    // Check if it's the last question
    if (index === questions.length - 1) {
      // Map indices to letters
      const optionsMap = ["أ", "ب", "ج", "د", "هـ"];
      const mappedAnswers = updatedAnswers.map(idx => optionsMap[idx]);

      // Calculate locally for display
      const personality = calculatePersonalityFromMapped(mappedAnswers);
      setResult(personality);

      if (userData) {
        submitPersonality(mappedAnswers);
      } else {
        localStorage.setItem("tempAnswers", JSON.stringify(mappedAnswers));
        setIsLoggedIn(true); // Redirect to Register/Login
      }
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

  if (result && userData) {
    return (
      <div className="contain" style={{ textAlign: "center", padding: "50px" }}>
        <h2 className="text-2xl font-bold mb-4">نتيجة الاستبيان</h2>
        <p className="text-xl mb-4">نوع شخصيتك الاستثمارية هو:</p>
        <div className="text-3xl font-bold text-primary-900 mb-6">
          {result === "Risk Taker" && "مخاطر (Risk Taker)"}
          {result === "Conservative" && "متحفظ (Conservative)"}
          {result === "Moderate" && "متوازن (Moderate)"}
        </div>
        <p className="text-gray-600">
          شكراً لمشاركتك في الاستبيان. تم حفظ النتيجة في ملفك الشخصي.
        </p>
      </div>
    );
  }

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

export default InvestorSurvey;
