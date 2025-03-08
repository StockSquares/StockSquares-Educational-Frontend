import { useState, useEffect } from "react";
import RequestConsultationQuestions from "./RequestConsultationQuestions";
import decor from "./RequestConsultation.module.css";

function RequestConsultation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formError, setFormError] = useState(false);

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);



  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryNames = data.map((country) => country.name.common).sort();
        setCountries(countryNames);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !birthDate || !email || !phone || !country) {
      setFormError(true);
      return;
    }
  
    setFormError(false);
  
    const submissionData = {
      fullName: name,
      email: email,
      phoneNumber: phone,
      birthDate: birthDate,
      country: country
    };
  
    setIsLoggedIn(true);
  
    try {
      const response = await fetch(
        "https://stocksquare.runasp.net/api/Consultations/MakeConsultation",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionData),
        }
      );
  
      if (!response.ok) throw new Error("فشل في إرسال البيانات");
  
      const result = await response.json();
      console.log("تم إرسال البيانات بنجاح:", result);
      alert("تم إرسال طلب الاستشارة بنجاح!");
    } catch (error) {
      console.error("حدث خطأ:", error);
      alert("حدث خطأ أثناء إرسال الطلب");
    }
  };
  

  return (
    <div className="w-full h-full flex flex-col items-center p-6">
      {!isLoggedIn ? (
        <div className="w-full max-w-lg">
          <h1 className="text-2xl font-semibold mb-4">طلب الاستشارة</h1>
          <hr className="w-full h-0.5 mb-2" />
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full bg-white shadow-none border-none">
            <div>
              <label className="text-right mb-2 block">الاسم ثلاثي:</label>
              <input
                type="text"
                placeholder="الاسم ثلاثي"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="text-right mb-2 block">رقم الهاتف:</label>
              <input
                type="text"
                placeholder="رقم الهاتف"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="text-right mb-2 block">بلد الإقامة:</label>
              {loading ? (
                <p>جارٍ تحميل قائمة الدول...</p>
              ) : (
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">اختر بلد الإقامة</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div>
              <label className="text-right mb-2 block">تاريخ الميلاد:</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border transition duration-300 
                  ${
                    isFocused ? "border-green-500 shadow-lg" : "border-gray-300"
                  } 
                  ${isHovered ? "border-gray-400" : ""} 
                  focus:outline-none focus:ring-2 focus:ring-green-500`}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            </div>
            <div>
              <label className="text-right mb-2 block">
                البريد الإلكتروني:
              </label>
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {formError && (
              <p className="text-red-600 text-sm self-start">
                يرجى ملء جميع الحقول بشكل صحيح قبل المتابعة.
              </p>
            )}

            <button
              type="submit"
              className="self-center mt-4 w-[30%] py-3 rounded-lg bg-green-600 text-white text-xl hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              ابدأ
            </button>
          </form>
        </div>
      ) : (
        <RequestConsultationQuestions />
      )}
    </div>
  );
}

export default RequestConsultation;
