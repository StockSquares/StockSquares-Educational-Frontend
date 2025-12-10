// InvestorSurvey.jsx – full implementation with Portfolio Plan
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./investorSurvey.css";
import Cookies from "js-cookie";
import { questions } from "../../assets/data";
import Questionare from "../../components/general/questionare/Questionare";
import { Register } from "..";
import Login from "../Login/Login";
import { useAuth } from "../../Context/AuthContext";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Ensure toast is imported if used, otherwise rely on alert or pass it via props? Actually Date.jsx used toast. Let's see if InvestorSurvey uses it. It doesn't seem to import it. I'll stick to alert or add toast if needed. The previous code used alert in handleRegistrationSuccess. I will switch to using the existing notification method or standard alerts as per existing code style in this file, but to be consistent with the user's "same story" request, I should probably handle it similarly. Since toast is better, I will check if I can add it, but without standard toast setup in this file it might break. I will stick to the existing alerts or add toast import if the project uses react-toastify globally. The project DOES use react-toastify in Date.jsx. I see existing alerts in handleRegistrationSuccess. I will keep alerts for now to minimize dependencies unless I add the import.
// Wait, I see "import { toast, ToastContainer } from 'react-toastify';" in Date.jsx but not here. I will add the import to make it nice.
// import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Portfolio Plans Data
const PORTFOLIO_PLANS = {
  Conservative: {
    title: "خطة تقسيم محفظة مالية بطريقة متحفظة",
    goals: [
      "الحفاظ على رأس المال",
      "تحقيق عائد ثابت ومستقر",
      "تقليل المخاطر إلى أدنى حد",
    ],
    sections: [
      {
        asset: "السندات الحكومية",
        percentage: "40-50%",
        details: "من الاستثمارات الأكثر أمانًا، وتوفر عائداً ثابتاً.",
      },
      {
        asset: "الصناديق الاستثمارية المتداولة (ETFs) ذات الدخل الثابت",
        percentage: "20-30%",
        details: "توفر تنويعاً أكبر ضمن فئة السندات، مما يساعد على تقليل المخاطر.",
      },
      {
        asset: "الأسهم ذات القيمة العالية",
        percentage: "15-20%",
        details: "أكثر استقراراً من الأسهم النامية، وتوفر عائداً جيداً على المدى الطويل.",
      },
      {
        asset: "العقارات (مباشر أو REITs)",
        percentage: "10-15%",
        details: "توفر تدفقاً نقدياً شهرياً وتقدير رأسمال على المدى الطويل.",
      },
    ],
    advice: [
      "التنويع الجغرافي: لا تركز استثماراتك في منطقة جغرافية واحدة.",
      "إعادة التوازن: قم بإعادة تقييم محفظتك بشكل دوري.",
      "الاستعانة بمحترف: استشر خبير مالي لمساعدتك.",
    ],
  },
  Moderate: {
    title: "خطة تقسيم محفظة بقيمة مليون دولار بمخاطر متوسطة",
    goals: [
      "التوازن للوصول لعائد اعلى من الاستثمارات الآمنة",
      "الحفاظ على نسبة كبيرة من رأس المال",
      "تحقيق عائد ونمو اكبر على المدى المتوسط",
    ],
    sections: [
      {
        asset: "الأسهم (الكبيرة والراسخة، وصناديق ETFs)",
        percentage: "40-50%",
        details: "شركات أكثر استقرارًا وعوائد جيدة، وتوفر الصناديق تنويعًا إضافيًا.",
      },
      {
        asset: "السندات (حكومية وذات جودة عالية للشركات)",
        percentage: "30-40%",
        details: "توفر استقرارًا ودخلاً ثابتًا، مع عوائد أعلى قليلاً للسندات الشركات.",
      },
      {
        asset: "العقارات (REITs)",
        percentage: "10-15%",
        details: "توفر تنويعًا في استثمارات العقارات وتدفقًا نقديًا منتظمًا.",
      },
      {
        asset: "الأصول البديلة (الذهب، المعادن الثمينة)",
        percentage: "5-10%",
        details: "تعمل كتحوط ضد التضخم وتقلبات الأسواق.",
      },
    ],
    advice: [
      "التنويع: لا تركز استثماراتك في قطاع أو منطقة جغرافية واحدة.",
      "إعادة التوازن: قم بإعادة تقييم محفظتك بشكل دوري.",
      "الاستعانة بمحترف: استشر خبير مالي لمساعدتك.",
    ],
  },
  "Risk Taker": {
    title: "تقسيم محفظة بقيمة مليون دولار بطريقة مخاطرة عالية",
    goals: [
      "تحمل تقلبات كبيرة من اجل عوائد مرتفعة",
      "المخاطرة بنسبة كبيرة من رأس المال",
      "تحقيق عائد ونمو كبير على المدى القصير او الطويل",
    ],
    sections: [
      {
        asset: "الأسهم (النامية، التكنولوجية، صناديق الأسواق الناشئة)",
        percentage: "60-70%",
        details: "إمكانية نمو عالية مع تقلبات شديدة، للبحث عن عوائد مرتفعة.",
      },
      {
        asset: "العقارات (التجارية، في الأسواق الناشئة)",
        percentage: "20-25%",
        details: "عوائد إيجارية عالية وعوائد مرتفعة محتملة، ولكن مع مخاطر اقتصادية وسياسية.",
      },
      {
        asset: "الأصول البديلة (البتكوين والعملات المشفرة، صناديق رأس المال المخاطر)",
        percentage: "10-15%",
        details: "إمكانية نمو هائلة مع تقلبات شديدة جدًا.",
      },
    ],
    advice: [
      "التنويع: لا تركز استثماراتك في شركة أو قطاع واحد.",
      "إعادة التوازن: قم بإعادة تقييم محفظتك بشكل دوري.",
      "الاستعانة بمحترف: استشر خبير مالي لمساعدتك.",
    ],
  },
};

// Portfolio Plan Component
const PortfolioPlan = ({ personalityType }) => {
  const plan = PORTFOLIO_PLANS[personalityType];
  if (!plan) return null;

  return (

    <div className="mt-10 p-4 sm:p-4 bg-gray-50 border border-gray-200 rounded-2xl w-full  shadow-lg mx-auto" dir="rtl">
      <h3 className="text-xl font-bold text-primary-700 mb-10">{plan.title}</h3>

      {/* الأهداف */}
      <div className="mb-10">
        <h4 className="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">أهداف الاستثمار:</h4>
        <ul className="list-disc pr-6 space-y-3 text-lg text-gray-700 leading-relaxed">
          {plan.goals.map((goal, i) => (<li key={i}>{goal}</li>))}
        </ul>
      </div>




      {/* تقسيم المحفظة */}
      {/* الجدول */}
      <div className="mb-10">

        {/* جدول للشاشات الكبيرة فقط */}
        <div className="hidden lg:block">
          <h4 className="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">
            تقسيم المحفظة المقترح:
          </h4>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-sm border-collapse rounded-xl overflow-hidden">
              <thead className="bg-gray-300">
                <tr>
                  <th className="px-8 py-6 text-right font-bold text-gray-800 text-xl w-1/3">
                    الأصل
                  </th>
                  <th className="px-8 py-6 text-center font-bold text-gray-800 text-xl w-1/5">
                    النسبة المقترحة
                  </th>
                  <th className="px-8 py-6 text-right font-bold text-gray-800 text-xl w-1/2">
                    الوصف
                  </th>
                </tr>
              </thead>

              <tbody>
                {plan.sections.map((item, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    <td className="px-2 py-8 text-lg font-medium text-gray-900">
                      {item.asset}
                    </td>

                    <td className="px-2 py-8 text-center">
                      <span className="inline-block bg-green-200 text-green-800 px-5 py-3 rounded-full text-lg font-semibold shadow-sm">
                        {item.percentage}
                      </span>
                    </td>

                    <td className="px-2 py-8 text-lg text-gray-700 leading-relaxed">
                      {item.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* كروت للشاشات الصغيرة فقط */}
        <div className="lg:hidden">
          <h4 className="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">
            تقسيم المحفظة المقترح:
          </h4>

          <div className="space-y-4">
            {plan.sections.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow p-4 border border-gray-200"
              >
                <div className="flex flex-col gap-2 justify-between  items-center mb-3">
                  <h5 className="text-md font-bold text-gray-900">{item.asset}</h5>

                  <span className="inline-block bg-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                    {item.percentage}
                  </span>
                </div>

                <p className="text-gray-700 leading-relaxed text-base">
                  {item.details}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>



      {/* نصائح */}
      <div>
        <h4 className="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">نصائح إضافية:</h4>
        <ul className="list-disc pr-6 space-y-3 text-lg text-red-600 font-medium leading-relaxed">
          <li className="font-bold">هذه الخطة هي نقطة بداية فقط ولا تعتبر نصيحة مالية.</li>
          {plan.advice.map((advice, i) => (<li key={i}>{advice}</li>))}
          <li className="text-gray-700">التعليم المستمر هو طريق نجاح أي مستثمر.</li>
        </ul>
      </div>
    </div>


  );
};

function InvestorSurvey() {
  const { userData, setDecodedUser } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);



  const calculatePersonalityFromMapped = (mappedAnswers) => {
    const conservative = mappedAnswers.filter((a) => a === "أ" || a === "هـ").length;
    const moderate = mappedAnswers.filter((a) => a === "ج").length;
    const risk = mappedAnswers.filter((a) => a === "ب" || a === "د").length;
    if (risk >= conservative && risk >= moderate) return "Risk Taker";
    if (conservative >= risk && conservative >= moderate) return "Conservative";
    return "Moderate";
  };

  const submitPersonality = async (mappedAnswers) => {
    try {
      const token = Cookies.get("token");
      if (!token) return;

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
      const personality = calculatePersonalityFromMapped(mappedAnswers);
      setResult(personality);

      if (userData) {
        submitPersonality(mappedAnswers);
      } else {
        localStorage.setItem("tempAnswers", JSON.stringify(mappedAnswers));
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

  /* Removed auto-login logic to prioritize OTP verification flow, similar to Reservation */
  const handleRegistrationSuccess = async (data) => {
    // Store email for OTP page and redirect
    if (data?.email || localStorage.getItem('email')) {
      toast.success("تم إنشاء الحساب بنجاح! جاري التوجيه لتفعيل الحساب...");
      setTimeout(() => {
        navigate("/verify-otp");
      }, 1500);
    } else {
      toast.error("حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى.");
    }
  };

  const handleLoginSuccess = (data) => {
    setIsLoggedIn(true);
    toast.success("تم تسجيل الدخول بنجاح!");
  };

  useEffect(() => {
    if (userData) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userData]);

  if (result) {
    return (
      <div className="contain" style={{ padding: "30px 10px" }} dir="rtl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold mb-2 text-gray-900">تهانينا! نتائج الاستبيان</h2>
          <p className="text-xl mb-4 text-gray-600">نوع شخصيتك الاستثمارية هو:</p>
          <div className={`text-4xl font-bold p-3 rounded-xl inline-block shadow-lg 
              ${result === "Risk Taker" ? "bg-red-100 text-red-600" :
              result === "Conservative" ? "bg-green-100 text-green-600" :
                "bg-blue-100 text-blue-600"} 
              mb-6`}>
            {result === "Risk Taker" && "مخاطر (Risk Taker)"}
            {result === "Conservative" && "متحفظ (Conservative)"}
            {result === "Moderate" && "متوازن (Moderate)"}
          </div>

          <p className="text-gray-600 mb-6">
            {userData ?
              "تم حفظ النتيجة في ملفك الشخصي. بناءً على هذه النتيجة، إليك خطة تقسيم محفظة استثمارية مقترحة." :
              "شكراً لمشاركتك. يرجى تسجيل الدخول لحفظ نتيجتك ورؤية الخطة بشكل دائم."}
          </p>

          <p className="text-sm font-medium text-red-500">
            📌 تذكر أن هذا الاستبيان هو أداة أولية لتقييم مستوى المخاطرة.
          </p>
        </div>

        <PortfolioPlan personalityType={result} />

        <div className="mt-8 text-center p-4 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700">
          <p className="font-semibold">تنويه هام:</p>
          <p>هذه الخطة هي نقطة بداية فقط، ولا تعتبر **نصيحة مالية**. يرجى استشارة خبير مالي لتخصيصها لتناسب احتياجاتك الفردية.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="contain" dir="rtl" style={{ width: "100%", padding: "10px" }}>
      {!isLoggedIn ? (
        <div style={{ width: "100%", margin: "0 auto", maxWidth: "800px" }}>
          <ToastContainer position="top-center" theme="colored" />
          {authMode === 'login' ? (
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
              <Login
                onSuccess={handleLoginSuccess}
                hideHeader={true}
                hideRegisterLink={true}
              />
              <div className="flex items-center justify-center gap-2 mt-6">
                <p className="text-gray-500 font-medium">ليس لديك حساب؟</p>
                <span
                  onClick={() => setAuthMode('register')}
                  className="text-green-600 font-bold hover:text-green-700 hover:underline transition-all cursor-pointer text-base select-none"
                >
                  إنشاء حساب جديد
                </span>
              </div>
            </div>
          ) : (
            <div>
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
                customButtonText="تسجيل وابدأ الاستبيان"
                hideLoginLink={true}
              />
              <div className="flex items-center justify-center gap-2 mt-6">
                <p className="text-gray-500 font-medium">لديك حساب بالفعل؟</p>
                <span
                  onClick={() => setAuthMode('login')}
                  className="text-green-600 font-bold hover:text-green-700 hover:underline transition-all cursor-pointer text-base select-none"
                >
                  تسجيل الدخول
                </span>
              </div>
            </div>
          )}
        </div>
      ) : (
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
