import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import './BookYourTrainer.css';

export default function BookYourTrainer() {
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState("male");
  const [dob, setDob] = useState(""); 
  const [selectedMarket, setSelectedMarket] = useState(""); 
  const [selectedTimes, setSelectedTimes] = useState({}); 

  const schedule = [
    { day: "الاثنين", times: ["11 صباحًا", "1 مساءً", "3 مساءً", "5 مساءً", "7 مساءً", "9 مساءً"] },
    { day: "الثلاثاء", times: ["11 صباحًا", "1 مساءً", "3 مساءً", "5 مساءً", "7 مساءً", "9 مساءً"] },
    { day: "الأربعاء", times: ["11 صباحًا", "1 مساءً", "3 مساءً", "5 مساءً", "7 مساءً", "9 مساءً"] },
  ];

  const isUnavailable = (time) => {
    const unavailableTimes = ["3 مساءً", "7 مساءً"];
    return unavailableTimes.includes(time);
  };

  const handleTimeSelection = (day, time) => {
    setSelectedTimes((prev) => ({ ...prev, [day]: time }));
  };

  return (
    <div className="max-w-3xl mx-auto p-8 mt-12 mb-12 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-10 text-center ">
        <FontAwesomeIcon icon={faUserGroup} className="ml-2" /> حجز مدربك الشخصي
      </h1>

      {/* Steps Navigation */}
      <div className="flex items-center space-x-10 border-b pb-5">
        <div className={`relative pb-2 text-black ml-10 ${step === 1 ? 'border-b-2 font-black border-y-green-500' : ''}`}>
          <div className="step-item">
            <span className="step-number">1</span> أركان التدريب
          </div>
        </div>
        <div className={`relative pb-2 text-black ${step === 2 ? 'border-b-2 border-y-green-500' : ''}`}>
          <div className="step-item">
            <span className="step-number">2</span> الدفع
          </div>
        </div>
      </div>

      {/* Gender Selection */}
      <div className="mt-6">
        <h3 className="text-md font-medium text-black">جنس المتدرب</h3>
        <div className="mt-8 flex space-x-4">
          <label className="flex items-center space-x-5">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={() => setGender("male")}
              className="form-radio h-4 w-4 ml-2"
            />
            <span className="text-black">ذكر</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={() => setGender("female")}
              className="form-radio h-4 w-4 ml-2"
            />
            <span className="text-black">أنثى</span>
          </label>
        </div>
      </div>

      {/* Date of Birth Selection */}
      <div className="mt-6">
        <h3 className="text-md font-medium text-black">تاريخ الميلاد</h3>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="mt-2 p-2 border rounded-lg w-full text-white bg-slate-400 text-xl"
        />
      </div>

      {/* Market Selection */}
      <div className="mt-6">
        <h3 className="text-md font-medium text-black">السوق المراد تعلمه</h3>
        <select
          value={selectedMarket}
          onChange={(e) => setSelectedMarket(e.target.value)}
          className="mt-2 p-2 border rounded-lg w-full text-black text-xl"
        >
          <option value="">اختر السوق</option>
          <option value="Egyptian Stock Exchange">البورصة المصرية</option>
          <option value="Saudi Stock Exchange">البورصة السعودية</option>
          <option value="Emirati Stock Exchange">البورصة الإماراتية</option>
          <option value="Global Stocks and Forex">البورصة العالمية والفروكس</option>
          <option value="US Stock Exchange">البورصة الأمريكية</option>
          <option value="Cryptocurrency Exchange">بورصة العملات المشفرة</option>
        </select>
      </div>

      {/* Weekly Training Schedule */}
      <div className="mt-12 " >
        <h3 className="text-lg font-bold text-center mb-6 text-green-700">موعد التدريب الأسبوعي المناسب لك</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedule.map((day, index) => (
            <div key={index} className="border rounded-lg p-4 shadow text-black">
              <h4 className="text-md font-bold text-center bg-green-600 text-white py-2 rounded-t-lg">{day.day}</h4>
              <ul className="mt-4 space-y-2">
                {day.times.map((time, idx) => (
                  <li
                    key={idx}
                    className={`text-center p-2 rounded-lg cursor-pointer ${
                      selectedTimes[day.day] === time ? 'bg-green-200 font-bold' :
                      isUnavailable(time) ? 'line-through text-gray-400 cursor-not-allowed' : 'bg-gray-100'
                    }`}
                    onClick={() => !isUnavailable(time) && handleTimeSelection(day.day, time)}
                  >
                    {time}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center">
  <button className="text-center bg-green-600 text-white font-bold mt-10  py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 shadow-lg">
   التقدم الي الامام
  </button>
     </div>

    </div>
  );
}
