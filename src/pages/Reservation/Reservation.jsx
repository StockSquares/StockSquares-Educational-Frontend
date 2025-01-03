import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Calendar, Users, Building2, Clock, AlertCircle } from 'lucide-react';

const Reservation = () => {
  const navigate = useNavigate();
  
  // Corrected state initialization
  const [formData, setFormData] = useState({
    gender: '',
    birthdate: '',
    market: [],
    selectedDay: 0,
    selectedTime: null
  });

  const [errors, setErrors] = useState({});

  // Steps for progress tracking
  const steps = ['خصائص التدريب',  'الدفع'];
  const currentStep = 1;

  const days = ['اليوم', 'غداً', 'بعد غد'];
  const times = [
    '3:30 م',
    '4:15 م',
    '5:00 م',
    '5:45 م',
    '6:30 م',
    '7:15 م',
    '8:00 م',
    'المزيد'
  ];

  const MarketOptions = [
    "البورصة المصرية",
    "البورصة السعودية",
    "البورصة الاماراتية",
    "البورصة العالمية والفوركس",
    "البورصة الامريكية",
    "بورصة العملات المشفرة",
  ];

  // Handler functions
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleMarketSelection = (market) => {
    setFormData(prev => {
      const currentMarkets = prev.market;
      if (currentMarkets.includes(market)) {
        return {
          ...prev,
          market: currentMarkets.filter(m => m !== market)
        };
      } else if (currentMarkets.length < 1) {
        return {
          ...prev,
          market: [...currentMarkets, market]
        };
      }
      return prev;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.gender) newErrors.gender = 'يرجى اختيار الجنس';
    if (!formData.birthdate) newErrors.birthdate = 'يرجى إدخال تاريخ الميلاد';
    if (formData.market.length === 0) newErrors.market = 'يرجى اختيار سوق مالي واحد على الأقل';
    if (formData.selectedTime === null) newErrors.time = 'يرجى اختيار موعد';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      navigate('/Payment');
    }
  };

  const clearForm = () => {
    setFormData({
      gender: '',
      birthdate: '',
      market: [],
      selectedDay: 0,
      selectedTime: null
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
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index + 1 === currentStep ? 'bg-green-600 text-white' : 
                index + 1 < currentStep ? 'bg-green-200' : 'bg-gray-200'
              }`}>
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
          <h2 className="text-2xl font-bold text-gray-800">احجز مدربك الشخصي</h2>
          <p className="text-gray-600 mt-2">اختر الخيارات المناسبة لجلستك التدريبية</p>
        </div>

        {/* Gender Selection */}
        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <div className="flex items-center mb-4">
            <Users className="h-5 w-5 text-green-600 ml-2" />
            <label className="text-lg font-medium text-gray-800">جنس المتدرب</label>
          </div>
          <div className="flex gap-4">
            {["male", "female"].map((gender) => (
              <button
                key={gender}
                onClick={() => handleInputChange('gender', gender)}
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
            <label className="text-lg font-medium text-gray-800">تاريخ الميلاد</label>
          </div>
          <input
            type="date"
            value={formData.birthdate}
            onChange={(e) => handleInputChange('birthdate', e.target.value)}
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
            <label className="text-lg font-medium text-gray-800">السوق المالي</label>
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

        {/* Time Selection */}
        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <div className="flex items-center mb-4">
            <Clock className="h-5 w-5 text-green-600 ml-2" />
            <label className="text-lg font-medium text-gray-800">الموعد</label>
          </div>
          
          {/* Days Selection */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <div className="flex justify-between items-center">
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => handleInputChange('selectedDay', Math.max(0, formData.selectedDay - 1))}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              
              <div className="grid grid-cols-3 gap-4 flex-1 mx-4">
                {days.map((day, index) => (
                  <div 
                    key={index}
                    onClick={() => handleInputChange('selectedDay', index)}
                    className={`text-center ${
                      index === formData.selectedDay 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-100'
                    } rounded-xl p-3 cursor-pointer transition-all duration-200`}
                  >
                    <div className="font-bold">{day}</div>
                    <div className="text-sm">2024/1/20</div>
                  </div>
                ))}
              </div>

              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => handleInputChange('selectedDay', Math.min(2, formData.selectedDay + 1))}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Times Grid */}
          <div className="grid grid-cols-4 gap-3">
            {times.map((time, index) => (
              <div 
                key={index}
                onClick={() => handleInputChange('selectedTime', index)}
                className={`
                  ${formData.selectedTime === index 
                    ? 'bg-green-600 text-white shadow-lg transform scale-105' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                  rounded-xl p-3 text-center cursor-pointer transition-all duration-200
                `}
              >
                {time}
              </div>
            ))}
          </div>
          {errors.time && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <AlertCircle className="h-4 w-4 ml-1" />
              {errors.time}
            </p>
          )}
        </div>

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
            <span>متابعة للدفع</span>
            <ChevronLeft className="h-5 w-5 mr-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reservation;