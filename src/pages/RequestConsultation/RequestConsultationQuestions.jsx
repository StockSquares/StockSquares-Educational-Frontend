import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { consultQuestions } from "../../assets/requestConsultationData";
import { consultationDates } from "../../assets/cosultationDates";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./RequestConsultation.module.css";
config.autoAddCss = false;

function RequestConsultationQuestions() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [consultAnswers, setConsultAnswers] = useState([]);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(false);

  const [selectedTime, setSelectedTime] = useState(null);

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

    if (index === consultQuestions.length - 1) {
      alert("Survey completed! Thank you for your participation.");
      return;
    }

    setIndex(index + 1);
    setSelectedOption(UpdatedConsultAnswers[index + 1] || null);
  };

  const previous = () => {
    if (index === 0) return;
    setIndex(index - 1);
    setSelectedOption(consultAnswers[index - 1] || null);
  };

  const handleSelectedTime = (time, bookedValue) => {
    // console.log("kk", bookedValue);
    if (bookedValue === false) setSelectedTime(time);
  };

  const handleBooking = () => {
    // console.log(selectedTime);
    
    if (!selectedTime) alert("يرجي اختيار موعد ");
    else showToast();
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

  return (
    <>
      {!(index === consultQuestions.length - 1) ? (
        <div className="flex flex-col w-[50%]">
          <div className="p-1 rounded-2xl border shadow-md bg-green-100 mb-5">
            <FontAwesomeIcon
              icon={faCircle}
              className="text-white border border-green-600 rounded-full"
            />
            <h4 className="sm:text-sm md:text-xl lg:text-xl p-4 text-green-600 font-bold leading-none">
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
                  width: `${((index + 1) / consultQuestions.length) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-sm text-gray-700 mt-2 text-center">
              {index + 1} / {consultQuestions.length}
            </p>
          </div>
          <h2>
            {index + 1}.{" "}
            {consultQuestions[index]?.question || "Loading question..."}
          </h2>
          <ul>
            {Object.keys(consultQuestions[index])
              .filter((key) => key.startsWith("option"))
              .map((key, i) => (
                <li
                  key={i}
                  className={selectedOption === i + 1 ? "selected" : ""}
                  onClick={() => handleOptionClick(i + 1)}
                >
                  {consultQuestions[index][key]}
                </li>
              ))}
          </ul>
          <p className={error ? "error" : ""}>
            {error ? "يرجى اختيار إجابة قبل المتابعة!" : ""}
          </p>
          <div className="pop">
            <button
              className="previous hover:bg-gray-100 hover:text-green-600 hover: border-2 border-green-600"
              onClick={previous}
            >
              السابق
            </button>
            <button
              className="next hover:bg-gray-100 hover:text-green-600 hover: border-2 border-green-600"
              onClick={next}
            >
              التالي
            </button>
          </div>
        </div>
      ) : (
        <>
          <h1 className="mb-[5rem]">اختر الموعد المناسب لك</h1>
          <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2  gap-8">
            {consultationDates.map((el, cardIndex) => (
              <div
                key={index}
                className="conCard flex flex-col justify-between items-center border-1 rounded-2xl overflow-hidden shadow-md"
              >
                <h4 className="border border-b-2 border-b-green-600 w-full bg-[#25863f] p-3 text-xl text-center text-white">
                  {el.day}
                </h4>
                <ul className="p-2 w-full flex-grow">
                  {el.times.map((times, idx) => (
                    <li
                      className={`cursor-pointer p-2 ${
                        times.booked
                          ? "line-through text-gray-400 cursor-not-allowed"
                          : selectedTime === `${cardIndex}-${idx}`
                          ? "bg-green-600 text-white"
                          : "hover:bg-gray-100"
                      }`}
                      key={idx}
                      onClick={() =>
                        handleSelectedTime(`${cardIndex}-${idx}`, times.booked)
                      }
                    >
                      {times.time}
                    </li>
                  ))}
                </ul>
                <button
                  className={styles.send}
                  onClick={handleBooking}
                >
                  حجز
                </button>
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick={false}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
export default RequestConsultationQuestions;
