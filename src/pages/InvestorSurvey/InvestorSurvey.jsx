// InvestorSurvey.jsx – full implementation using shared Register component
import { useEffect, useState } from "react";
import "./investorSurvey.css";
import Cookies from "js-cookie";
import { questions } from "../../assets/data";
import Questionare from "../../components/general/questionare/Questionare";
import { Register } from ".."; // Importing Register from pages index
import { useAuth } from "../../Context/AuthContext";

function InvestorSurvey() {
  // ---------- عام ----------
  const [isLoggedIn, setIsLoggedIn] = useState(false); // يتحكم بعرض النموذج أو الاستبيان
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const { userData, setDecodedUser } = useAuth();

  // ---------- حساب الشخصية ----------
  const calculatePersonality = (finalAnswers) => {
    const optionsMap = ["أ", "ب", "ج", "د", "هـ"];
    const mappedAnswers = finalAnswers.map((idx) => optionsMap[idx]);
    const conservative = mappedAnswers.filter((a) => a === "أ" || a === "هـ").length;
    const moderate = mappedAnswers.filter((a) => a === "ج").length;
    const risk = mappedAnswers.filter((a) => a === "ب" || a === "د").length;
    if (risk >= conservative && risk >= moderate) return "Risk Taker";
    if (conservative >= risk && conservative >= moderate) return "Conservative";
    return "Moderate";
  };

  const calculatePersonalityFromMapped = (mappedAnswers) => {
    const conservative = mappedAnswers.filter((a) => a === "أ" || a === "هـ").length;
    const moderate = mappedAnswers.filter((a) => a === "ج").length;
    const risk = mappedAnswers.filter((a) => a === "ب" || a === "د").length;
    if (risk >= conservative && risk >= moderate) return "Risk Taker";
    if (conservative >= risk && conservative >= moderate) return "Conservative";
    return "Moderate";
  };

  // ---------- إرسال النتائج للـ backend ----------
  const submitPersonality = async (mappedAnswers) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await fetch(`https://stocksquare1.runasp.net/api/User/UpdatePersonalityUser`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mappedAnswers),
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

  // ---------- استرجاع إجابات مخزنة للزوار العائدين ----------
  useEffect(() => {
    const tempAnswers = localStorage.getItem("tempAnswers");
    if (userData && tempAnswers) {
      try {
        const parsedAnswers = JSON.parse(tempAnswers);
        submitPersonality(parsedAnswers);
        const personality = calculatePersonalityFromMapped(parsedAnswers);
        setResult(personality);
      } catch (e) {
        console.error("Error parsing temp answers", e);
      }
    }
  }, [userData]);

  // ---------- التعامل مع خيارات الاستبيان ----------
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
    if (index === questions.length - 1) {
      const optionsMap = ["أ", "ب", "ج", "د", "هـ"];
      const mappedAnswers = updatedAnswers.map((idx) => optionsMap[idx]);

      // Debug: طباعة الإجابات للتأكد من صحتها
      console.log("=== نتائج الاستبيان ===");
      console.log("الإجابات (أرقام):", updatedAnswers);
      console.log("الإجابات (حروف):", mappedAnswers);

      const conservative = mappedAnswers.filter((a) => a === "أ" || a === "هـ").length;
      const moderate = mappedAnswers.filter((a) => a === "ج").length;
      const risk = mappedAnswers.filter((a) => a === "ب" || a === "د").length;

      console.log("عدد الإجابات المتحفظة (أ/هـ):", conservative);
      console.log("عدد الإجابات المتوازنة (ج):", moderate);
      console.log("عدد الإجابات المخاطرة (ب/د):", risk);

      const personality = calculatePersonalityFromMapped(mappedAnswers);
      console.log("النتيجة النهائية:", personality);
      console.log("======================");

      setResult(personality);
      if (userData) submitPersonality(mappedAnswers);
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

  // ---------- معالجة نجاح التسجيل ----------
  const handleRegistrationSuccess = async (data) => {
    try {
      // Auto-login after successful registration
      const loginResponse = await fetch("https://stocksquare1.runasp.net/api/Account/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      });

      if (loginResponse.ok) {
        const loginData = await loginResponse.json();

        if (loginData.token) {
          // Save token and set user data
          setDecodedUser(loginData.token);

          alert("تم إنشاء الحساب وتسجيل الدخول بنجاح! يمكنك الآن بدء الاستبيان.");
          setIsLoggedIn(true);
        } else {
          console.warn("Login successful but no token found:", loginData);
          alert("تم التسجيل بنجاح، لكن حدث خطأ في تسجيل الدخول. الرجاء تسجيل الدخول يدوياً.");
        }
      } else {
        const errorText = await loginResponse.text();
        console.error("Auto-login failed:", errorText);
        alert("تم التسجيل بنجاح! الرجاء تسجيل الدخول للمتابعة.");
      }
    } catch (error) {
      console.error("Auto-login error:", error);
      alert("تم التسجيل بنجاح! الرجاء تسجيل الدخول للمتابعة.");
    }
  };

  // Check login status on component mount
  useEffect(() => {
    if (userData) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userData]);

  // ---------- عرض النتيجة إذا وجدت ----------
  if (result) {
    return (
      <div className="contain" style={{ textAlign: "center", padding: "50px" }} dir="rtl">
        <h2 className="text-2xl font-bold mb-4">نتيجة الاستبيان</h2>
        <p className="text-xl mb-4">نوع شخصيتك الاستثمارية هو:</p>
        <div className="text-3xl font-bold text-primary-900 mb-6">
          {result === "Risk Taker" && "مخاطر (Risk Taker)"}
          {result === "Conservative" && "متحفظ (Conservative)"}
          {result === "Moderate" && "متوازن (Moderate)"}
        </div>
        <p className="text-gray-600">
          {userData ? "شكراً لمشاركتك في الاستبيان. تم حفظ النتيجة في ملفك الشخصي." : "شكراً لمشاركتك في الاستبيان."}
        </p>
      </div>
    );
  }

  // ---------- العرض الرئيسي ----------
  return (
    <div className="contain" dir="rtl" style={{ width: "100%", padding: "10px" }}>
      {!isLoggedIn ? (
        // إذا لم يكن مسجلاً -> اعرض مكون التسجيل الجاهز
        <div style={{ width: "100%", margin: "0 auto" }}>
          <Register
            onSuccess={handleRegistrationSuccess}
            hideHeader={true}
            customTitle={
              <>
                <h2 className="text-2xl font-bold text-center mb-2">استبيان شخصية مستثمر</h2>
                <p className="important-info">
                  📌 هذا الاستبيان هو أداة لتقييم مستوي المخاطرة في الشخصية. لتقييم دقيق وشامل، يجب إجراء تقييم نفسي متخصص مثل مقياس البحث عن الإثارة ومقياس الميل في المخاطرة.
                </p>
              </>
            }
            customButtonText="ابدأ الاستبيان"
            hideLoginLink={true}
          />
        </div>
      ) : (
        // بعد تسجيل الدخول – نعرض الاستبيان
        <div className="contain" dir="rtl">
          <h2 className="text-2xl font-bold text-center mb-2">استبيان شخصية مستثمر</h2>
          <p className="important-info">
            📌 هذا الاستبيان هو أداة لتقييم مستوي المخاطرة في الشخصية. لتقييم دقيق وشامل، يجب إجراء تقييم نفسي متخصص مثل مقياس البحث عن الإثارة ومقياس الميل في المخاطرة.
          </p>
          <Questionare
            title="استبيان شخصيه مستثمر"
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
      )}
    </div>
  );
}

export default InvestorSurvey;
