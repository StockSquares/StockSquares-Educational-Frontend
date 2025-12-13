import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faClock } from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../InvestorSurvey/investorSurvey.css";
import decor from "./RequestConsultation.module.css";
import DatePicker, { registerLocale } from "react-datepicker";
import ar from "date-fns/locale/ar";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";

registerLocale("ar", ar);
config.autoAddCss = false;

function RequestConsultationQuestions() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [consultAnswers, setConsultAnswers] = useState([]);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);

  // New Booking State
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);

  // Generate 15-minute slots from 10:00 AM to 06:00 PM
  const generateTimeSlots = () => {
    const slots = [];
    let currentTime = new Date();
    currentTime.setHours(10, 0, 0, 0); // Start at 10:00 AM
    const endTime = new Date();
    endTime.setHours(22, 0, 0, 0); // End at 10:00 PM

    while (currentTime < endTime) {
      const timeString = currentTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      const displayTime = currentTime.toLocaleTimeString("ar-EG", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      // Calculate end time for display (15 mins later)
      const nextTime = new Date(currentTime.getTime() + 15 * 60000);
      const displayEndTime = nextTime.toLocaleTimeString("ar-EG", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      slots.push({
        id: timeString, // Use time as ID
        startTime: timeString,
        display: `${displayTime} - ${displayEndTime}`,
      });
      currentTime = nextTime;
    }
    return slots;
  };

  useEffect(() => {
    // Regenerate slots when date changes
    setAvailableSlots(generateTimeSlots());
  }, [selectedDate]);

  const handleOptionClick = (optionIndex) => {
    setSelectedOption(optionIndex);
    setError(false);
  };

  const next = () => {
    if (selectedOption === null) {
      setError(true);
      return;
    }

    const UpdatedConsultAnswers = [...consultAnswers];
    UpdatedConsultAnswers[index] = selectedOption;
    setConsultAnswers(UpdatedConsultAnswers);

    if (index === questions.length - 1) {
      // Survey done logic
    }

    setIndex(index + 1);
    setSelectedOption(UpdatedConsultAnswers[index + 1] || null);
  };

  const previous = () => {
    if (index === 0) return;
    setIndex(index - 1);
    setSelectedOption(consultAnswers[index - 1] || null);
  };

  const handleBooking = () => {
    if (!selectedTimeSlot) {
      toast.error("يرجي اختيار موعد أولاً");
    } else {
      showToast();
    }
  };

  const showToast = () => {
    toast.success(
      "لقد قدمت طلب الاستشاره بنجاح\n جاري مراجعه الطلب و سيتم الرد عبر بريدك الالكتروني",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }
    );
  };

  useEffect(() => {
    fetch("https://stocksquare1.runasp.net/api/Consultations")
      .then((response) => response.json())
      .then((data) => {
        console.log("Received data:", data);
        setQuestions(data);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  return (
    <>
      <ToastContainer position="top-center" theme="colored" />
      {index < questions.length ? (
        <div className="mt-1 contain">
          <div className="p-1 rounded-2xl border shadow-md bg-green-100 mb-5">
            <FontAwesomeIcon
              icon={faCircle}
              className="text-white border bg-[#25863f] rounded-full"
            />
            <h4 className="text-[12px] md:text-xl lg:text-xl p-1 text-green-600 font-semibold leading-5">
              قبل البدء في طلب جلسة مجانيه أون لاين لمدة 15 دقيقة مع مستشار
              استثمار محترف يرجى الأجابة على الأسئلة التالية لكي نتمكن من تقيم
              طلبك بشكل أفضل نود أن نوضح أننا نبحث عن مستثمرين يتناسبون مع
              رؤيتنا وأهدافنا ولهذا السبب قد لايتم قبول جميع الطلبات ونشكر تفهمك
            </h4>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
                style={{
                  width: `${((index + 1) / questions.length) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-sm text-gray-700 mt-2 text-center">
              {index + 1} / {questions.length}
            </p>
          </div>

          {questions.length > 0 && questions[index] ? (
            <div className="m-auto w-[85%]">
              <h2 className=" m-auto text-lg md:text-2xl mb-5 mt-3 font-bold text-start ">{questions[index].question}</h2>
              <ul className="m-auto">
                {questions[index].answers.map((answer) => (
                  <li key={answer.id} onClick={() => handleOptionClick(answer.id)} className={`${selectedOption === answer.id ? "selected" : ""}  `}>
                    {answer.answer}
                  </li>
                ))}
              </ul>
            </div>)
            : ""}

          <p className={error ? "error" : ""}>
            {error ? "يرجى اختيار إجابة قبل المتابعة!" : ""}
          </p>
          <div className="pop">
            <button className={decor.send} onClick={previous} disabled={index === 0}>
              السابق
            </button>
            <button className={decor.send} onClick={next}>
              التالي
            </button>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto p-4 md:p-8"
        >
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2 flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faClock} className="text-green-600" />
            حجز موعد الاستشارة
          </h1>
          <p className="text-center text-gray-500 mb-8">جلسة استشارية مجانية لمدة 15 دقيقة</p>

          <div className="flex flex-col lg:flex-row gap-8 bg-gray-50 p-6 rounded-3xl border border-gray-200 shadow-sm">
            {/* Calendar Section */}
            <div className="w-full lg:w-1/2 flex justify-center border-b lg:border-b-0 lg:border-l border-gray-200 pb-6 lg:pb-0 lg:pl-6">
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-sm">
                <style>{`
                    .react-datepicker { font-family: inherit; border: none; width: 100%; display: flex; justify-content: center; }
                    .react-datepicker__month-container { width: 100%; }
                    .react-datepicker__header { background-color: white; border-bottom: none; pt: 0; }
                    .react-datepicker__current-month { font-family: inherit; font-weight: 700; color: #1f2937; margin-bottom: 1rem; font-size: 1.1rem }
                    .react-datepicker__day-name { color: #9ca3af; font-weight: 500; width: 2.5rem; }
                    .react-datepicker__day { width: 2.5rem; line-height: 2.5rem; border-radius: 0.75rem; font-weight: 600; color: #374151; transition: all 0.2s; }
                    .react-datepicker__day:hover { background-color: #d1fae5 !important; color: #065f46 !important; scale: 1.1; }
                    .react-datepicker__day--selected { background-color: #10b981 !important; color: white !important; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.4); }
                    .react-datepicker__day--keyboard-selected { background-color: #d1fae5; color: #065f46; }
                    .react-datepicker__navigation { top: 12px; }
                  `}</style>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  inline
                  minDate={new Date()}
                  locale="ar"
                  filterDate={(date) => date.getDay() !== 5} // Exclude Fridays if needed
                />
              </div>
            </div>

            {/* Time Slots Section */}
            <div className="w-full lg:w-1/2">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-gray-700">
                  المواعيد المتاحة ليوم <span className="text-green-600">{selectedDate.toLocaleDateString('ar-EG', { weekday: 'long' })}</span>
                </h4>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{availableSlots.length} متاح</span>
              </div>

              <div className="grid grid-cols-2 gap-3 max-h-[320px] overflow-y-auto custom-scrollbar pr-1">
                {availableSlots.map((slot) => (
                  <motion.button
                    key={slot.id}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 text-sm font-bold flex flex-col items-center gap-1
                          ${selectedTimeSlot?.id === slot.id
                        ? 'border-green-500 bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-200'
                        : 'bg-white border-gray-100 text-gray-600 hover:border-green-300 hover:shadow-md'
                      }`}
                  >
                    <span className="text-base font-extrabold dir-ltr">{slot.startTime.split(':')[0]}:{slot.startTime.split(':')[1]}</span>
                    <span className={`text-[10px] ${selectedTimeSlot?.id === slot.id ? 'text-green-100' : 'text-gray-400'}`}>
                      {slot.display}
                    </span>
                  </motion.button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <button
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg
                          ${selectedTimeSlot
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-green-200 hover:-translate-y-1'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                  onClick={handleBooking}
                  disabled={!selectedTimeSlot}
                >
                  تأكيد الحجز
                </button>
                <button
                  onClick={() => setIndex(0)}
                  className="w-full mt-3 text-gray-500 text-sm hover:text-green-600 underline"
                >
                  العودة للأسئلة
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
export default RequestConsultationQuestions;
