import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes";



function LevelExam() {
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
    };}
  return (
    <div className="w-full">
      <div className="container  mt-5 flex flex-col  justify-center items-center">
        <div className="p-2 rounded-2xl border shadow-md bg-green-100 mb-5 w-[100%] md:w-[70%] ">
          <FontAwesomeIcon
            icon={faCircle}
            className="text-white border bg-[#25863f]  rounded-full"
          />
          <h4 className="text-[12px] md:text-xl lg:text-xl px-1 md:px-3 mb-4 flex flex-col text-green-600 font-semibold leading-5 ">
            يساعدك اختبار تحديد المستوى على اختيار مستوى التدريب المناسب لخبرتك
            والحصول على تدريب تفاعلي فعال بناء على الاجابات المختارة ولذالك يجب
            ان تقوم بالاختبار للتأكد من تعلمك في المستوى المناسب ( متقدم – محترف
            )   <br/>
            <span className=" text-green-700 self-center mt-2 font-bold"> *لا تحتاج الي عمل الاختبار اذا كنت ستبدأ من المستوي المبتدئ </span>         
          </h4>
          
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4  bg-white shadow-none border-none w-[100%] md:w-[70%]">
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

            <Link
            to={ROUTES.LEVELEXAMQUESTIONS}
              
              className="self-center mt-4 px-10 py-2 rounded-lg bg-green-600 text-white text-xl hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              ابدأ
            </Link>
          </form>
      </div>
    </div>
  );
}
export default LevelExam;
