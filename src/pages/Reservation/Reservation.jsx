import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  Building2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const Reservation = () => {
  const navigate = useNavigate();

  // Corrected state initialization
  const [formData, setFormData] = useState({
    gender: "",
    birthdate: "",
    market: [],
    selectedPlan: "",
    name: "",
  });

  const [errors, setErrors] = useState({});

  // Steps for progress tracking
  const steps = ["خصائص التدريب", "الموعد", "الدفع"];
  const currentStep = 1;

  const days = ["اليوم", "غداً", "بعد غد"];
  const times = [
    "3:30 م",
    "4:15 م",
    "5:00 م",
    "5:45 م",
    "6:30 م",
    "7:15 م",
    "8:00 م",
    "المزيد",
  ];

  const MarketOptions = [
    "البورصة المصرية",
    "البورصة السعودية",
    "البورصة الاماراتية",
    "البورصة العالمية والفوركس",
    "البورصة الامريكية",
    "بورصة العملات المشفرة",
  ];

  const plans = [
    {
      title: "مبتدئ",
      price: "3000 ج.م",
      hours: "18 ساعه| 4 محاضرات",
      color: "bg-green-100 text-green-900",
      active: "bg-green-300",
    },
    {
      title: "متقدم",
      price: "5000 ج.م",
      hours: "36 ساعه| 8 محاضرات",
      color: "bg-yellow-100 text-yellow-600",
      active: "bg-yellow-300",
    },
    {
      title: "محترف",
      price: "7000 ج.م",
      hours: "36 ساعه| 8 محاضرات",
      color: "bg-red-100 text-red-600",
      active: "bg-red-300",
    },
  ];

  // Handler functions
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleMarketSelection = (market) => {
    setFormData((prev) => {
      return {
        ...prev,
        market: [market],
      };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.gender) newErrors.gender = "يرجى اختيار الجنس";
    if (!formData.birthdate) newErrors.birthdate = "يرجى إدخال تاريخ الميلاد";
    if (formData.market.length === 0)
      newErrors.market = "يرجى اختيار سوق مالي واحد على الأقل";
    if (!formData.selectedPlan)
      newErrors.selectedPlan = "يرجى اختيار الخطه المناسبه لك";
    if (!formData.name) newErrors.name = "يرجى ادخال الاسم ";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      navigate("/date");
    }
  };

  const clearForm = () => {
    setFormData({
      gender: "",
      birthdate: "",
      market: [],
      selectedPlan: "",
      name: "",
    });
    setErrors({});
  };


  
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 rtl" dir="rtl">
      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex justify-between mb-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index + 1 === currentStep
                    ? "bg-green-600 text-white"
                    : index + 1 < currentStep
                    ? "bg-green-200"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </div>
              <span className="mr-2 text-sm text-gray-600">{step}</span>
              {index < steps.length - 1 && (
                <div className="w-24 h-1 mx-4 bg-gray-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
            <Calendar className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            احجز مدربك الشخصي
          </h2>
          <p className="text-gray-600 mt-2">
            اختر الخيارات المناسبة لجلستك التدريبية
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <label className="d-block text-gray-700 font-semibold mb-3">
            {" "}
            <FontAwesomeIcon
              icon={faUser}
              className="me-2 text-green-600"
            />{" "}
            الاسم بالكامل:{" "}
          </label>
          <input
            type="text"
            placeholder="ادخل الاسم بالكامل"
            className="border-gray-300 rounded-lg p-3"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>

        {/* Gender Selection */}
        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <div className="flex items-center mb-4">
            <Users className="h-5 w-5 text-green-600 ml-2" />
            <label className="text-lg font-medium text-gray-800">
              جنس المتدرب
            </label>
          </div>
          <div className="flex gap-4">
            {["male", "female"].map((gender) => (
              <button
                key={gender}
                onClick={() => handleInputChange("gender", gender)}
                className={`flex-1 px-6 py-3 rounded-xl border transition-all duration-200 ${
                  formData.gender === gender
                    ? "bg-green-600 text-white border-transparent shadow-lg"
                    : "border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {gender === "male" ? "ذكر" : "أنثى"}
              </button>
            ))}
          </div>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <AlertCircle className="h-4 w-4 ml-1" />
              {errors.gender}
            </p>
          )}
        </div>

        {/* Birthdate Input */}
        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <div className="flex items-center mb-4">
            <Calendar className="h-5 w-5 text-green-600 ml-2" />
            <label className="text-lg font-medium text-gray-800">
              تاريخ الميلاد
            </label>
          </div>
          <input
            type="date"
            value={formData.birthdate}
            onChange={(e) => handleInputChange("birthdate", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          {errors.birthdate && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <AlertCircle className="h-4 w-4 ml-1" />
              {errors.birthdate}
            </p>
          )}
        </div>

        {/* Market Selection */}
        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <div className="flex items-center mb-4">
            <Building2 className="h-5 w-5 text-green-600 ml-2" />
            <label className="text-lg font-medium text-gray-800">
              السوق المالي
            </label>
          </div>
          <div className="flex flex-wrap gap-3">
            {MarketOptions.map((market) => (
              <button
                key={market}
                onClick={() => handleMarketSelection(market)}
                className={`px-4 py-2 rounded-xl border transition-all duration-200 ${
                  formData.market.includes(market)
                    ? "bg-green-600 text-white border-transparent shadow-lg"
                    : "border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {market}
              </button>
            ))}
          </div>
          {errors.market && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <AlertCircle className="h-4 w-4 ml-1" />
              {errors.market}
            </p>
          )}
        </div>

        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <label className="text-lg font-medium text-gray-800 mb-4">
            {" "}
            اختر الخطه المناسبه لك:
          </label>

          <div className="flex flex-wrap justify-between gap-3">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`w-full sm:w-[240px] text-center p-3 rounded-2xl shadow-md cursor-pointer transition-all ${
                  formData.selectedPlan === plan.title
                    ? plan.active
                    : `${plan.color} hover:scale-105`
                } `}
                onClick={(e) => {
                  handleInputChange("selectedPlan", plan.title);
                  localStorage.setItem("plan", JSON.stringify(plans[index]));
                }}
              >
                <h2 className="text-xl font-bold mb-2">{plan.title}</h2>
                <p className="text-lg font-semibold mb-1">
                  السعر: {plan.price}
                </p>
                <p className="text-base">المده: {plan.hours}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ----------------------------------------------------------------------------- */}

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <button
            onClick={clearForm}
            className="flex items-center text-red-500 hover:text-red-600 transition-colors"
          >
            <span className="ml-2">مسح جميع الحقول</span>
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 transition-colors shadow-lg flex items-center"
          >
            <span> متابعه </span>
            <ChevronLeft className="h-5 w-5 mr-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
