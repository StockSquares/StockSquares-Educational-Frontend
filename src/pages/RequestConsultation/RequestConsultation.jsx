import { useState, useEffect } from "react";

import RequestConsultationQuestions from "./RequestConsultationQuestions";

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

  const handleStart = () => {
    if (!name || !birthDate || !email || !phone || !country) {
      setFormError(true);
      return;
    }
    setFormError(false);
    setIsLoggedIn(true);
  };

  return (
    <>
    <div className="contain w-full h-full flex flex-col items-center">
  {!isLoggedIn ? (
      <div className="w-[50%]">
        <h1>طلب الاستشاره</h1>
        <hr />
        <div className="cosultationQuestions flex flex-col gap-3 full">
          <div>
            <label className="text-right mb-2">الاسم ثلاثي :</label>
            <input
              type="text"
              placeholder="الاسم ثلاثي"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-right mb-2">رقم الهاتف:</label>
            <input
              type="text"
              placeholder="رقم الهاتف"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label className="text-right mb-2">بلد الاقامة:</label>
            {loading ? (
              <p>جارٍ تحميل قائمة الدول...</p>
            ) : (
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-6 border-2 border-green-600 rounded-lg"
              >
                <option value="">اختر بلد الاقامة</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div>
            <label className="text-right mb-2">تاريخ الميلاد:</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          <div>
            <label className="text-right mb-2">البريد الالكتروني:</label>
            <input
              type="email"
              placeholder="البريد الالكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {formError && (
            <p className="error self-start">
              يرجي ملئ جميع الحقول بطريقه صحيحه قبل المتابعه
            </p>
          )}
          <button
            onClick={handleStart}
            className="hover:bg-gray-100 hover:text-green-600 hover: border-2 border-green-600"
          >
            ابدأ
          </button>
        </div>
      </div>

      ) : (
  
        <RequestConsultationQuestions />
      )}
</div>

    </>
  );
}

export default RequestConsultation;
