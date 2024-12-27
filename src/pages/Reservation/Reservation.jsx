import React, { useState } from "react";

const Reservation = () => {
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedSession, setSelectedSession] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState([]); // Fixed: Renamed state
  const [description, setDescription] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const DurationOptions = ["30 دقيقة", "60 دقيقة"];
  const MarketOptions = [
    "البورصة المصرية",
    "البورصة السعودية",
    "البورصة الاماراتية",
    "البورصة العالمية والفوركس",
    "البورصة الامريكية",
    "بورصة العملات المشفرة",
  ];

  const handleDurationSelection = (duration) => {
    if (selectedDuration.includes(duration)) {
      setSelectedDuration(selectedDuration.filter((item) => item !== duration));
    } else if (selectedDuration.length < 1) {
      setSelectedDuration([...selectedDuration, duration]);
    }
  };

  const handleMarketSelection = (market) => {
    if (selectedMarket.includes(market)) {
      setSelectedMarket(selectedMarket.filter((item) => item !== market));
    } else if (selectedMarket.length < 1) {
      setSelectedMarket([...selectedMarket, market]);
    }
  };

  return (
    <div className="bg-gray-100 p-6 md:p-12 rtl" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-md" >
        {/* Header */}
        <h2 className="text-center text-2xl font-semibold mb-6" >احجز مدربك الشخصي</h2>
        <div className="flex justify-between items-center mb-8">
          <span className="text-green-600 border-b-2 border-green-600 pb-1">
             خصائص التدريب
          </span>
        </div>

        {/* Gender Selection */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">جنس المتدرب</label>
          <div className="flex gap-4">
            {["male", "female"].map((gender) => (
              <button
                key={gender}
                onClick={() => setSelectedGender(gender)}
                className={`px-6 py-2 rounded-full border ${
                  selectedGender === gender
                    ? "bg-green-600 text-white"
                    : "border-gray-300 text-gray-600"
                }`}
              >
                {gender === "male" ? "ذكر" : "أنثى"}
              </button>
            ))}
          </div>
        </div>

        {/* Birthdate Input */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">أدخل تاريخ ميلادك</label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Session Selection */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">اختر حجز جلسة أو باقة:</label>
          <div className="flex gap-4">
            {["package", "session"].map((choice) => (
              <button
                key={choice}
                onClick={() => setSelectedSession(choice)}
                className={`px-6 py-2 rounded-full border ${
                  selectedSession === choice
                    ? "bg-green-600 text-white"
                    : "border-gray-300 text-gray-600"
                }`}
              >
                {choice === "session" ? "جلسة" : "باقة واحصل على خصم"}
              </button>
            ))}
          </div>
        </div>

        {/* Duration Selection */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">اختر مدة الجلسة</label>
          <div className="flex flex-wrap gap-3">
            {DurationOptions.map((duration) => (
              <button
                key={duration}
                onClick={() => handleDurationSelection(duration)}
                className={`px-4 py-2 text-sm rounded-full border ${
                  selectedDuration.includes(duration)
                    ? "bg-green-600 text-white"
                    : "border-gray-300 text-gray-600"
                }`}
              >
                {duration}
              </button>
            ))}
          </div>
        </div>

        {/* Market Selection */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">اختر السوق المالي</label>
          <div className="flex flex-wrap gap-3">
            {MarketOptions.map((market) => (
              <button
                key={market}
                onClick={() => handleMarketSelection(market)}
                className={`px-4 py-2 text-sm rounded-full border ${
                  selectedMarket.includes(market)
                    ? "bg-green-600 text-white"
                    : "border-gray-300 text-gray-600"
                }`}
              >
                {market}
              </button>
            ))}
          </div>
        </div>

        {/* Text Area */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">عبّر عن إستفسارك بشكل مختصر</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="ما هي إستفساراتك؟"
            className="w-full h-32 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            maxLength={300}
          ></textarea>
          <span className="block text-right text-gray-500 text-sm mt-1">
            {description.length} / 300
          </span>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button className="text-red-500 underline">مسح جميع الحقول</button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-md">التالي</button>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
