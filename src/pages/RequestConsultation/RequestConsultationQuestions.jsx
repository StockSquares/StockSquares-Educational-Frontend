import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { consultationDates } from "../../assets/cosultationDates";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import decor from "./RequestConsultation.module.css";
config.autoAddCss = false;

function RequestConsultationQuestions() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [consultAnswers, setConsultAnswers] = useState([]);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [questions, setQuestions] = useState([]);

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
    if (bookedValue === false) setSelectedTime(time);
  };

  const handleBooking = () => {
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

  useEffect(() => {
    fetch("https://stocksquare.runasp.net/api/Consultations") 
      .then((response) => response.json())
      .then((data) => {   console.log("Received data:", data); 

         setQuestions(data);}) 
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  return (
    <>
      {!(index === questions.length - 1) ? (
        <div className="flex flex-col w-[100%] md:w-[50%] gap-3 mt-4">
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

          { questions.length>0?( 
            <div className="m-auto w-[85%]">
              <h2  className=" m-auto text-lg md:text-2xl mb-5 mt-3 font-bold text-start ">{questions[index].question}</h2>
              <ul className="m-auto">
                {questions[index].answers.map((answer)=>(
                  <li key={answer.id} onClick={()=>handleOptionClick(answer.id)} className={`${selectedOption=== answer.id? decor.selected : decor.questionLi}  md:w[300px] lg:w-[550px]`}>
                    {answer.answer}
                  </li>
                ))}
              </ul>
            </div>)
         :""}

          <p className={error ? "error" : ""}>
            {error ? "يرجى اختيار إجابة قبل المتابعة!" : ""}
          </p>
          <div className="pop">
            <button className={decor.send} onClick={previous}>
              السابق
            </button>
            <button className={decor.send} onClick={next}>
              التالي
            </button>
          </div>
        </div>
      ) : (
        <>
          <h1 className="mb-[5rem] text-2xl mt-8 font-bold">
            اختر الموعد المناسب لك
          </h1>
          <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 gap-8 mb-10">
            {consultationDates.map((el, cardIndex) => (
              <div
                key={index}
                className="conCard flex flex-col justify-between items-center border-1 rounded-2xl overflow-hidden shadow-md  "
              >
                <h4 className="border border-b-2 border-b-green-600 w-full bg-[#25863f] p-3 text-xl text-center text-white">
                  {el.day} 22/5
                </h4>
                <ul className="p-4 w-full flex-grow text-center">
                  {el.times.map((times, idx) => (
                    <li
                      className={`cursor-pointer p-2 rounded-md mb-1 ${
                        times.booked
                          ? "line-through text-gray-400 cursor-not-allowed"
                          : selectedTime === `${cardIndex}-${idx}`
                          ? "bg-[#25863f] text-white "
                          : "hover:bg-gray-100 "
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
                  className={`${decor.send} mb-2 bg-accent text-black`}
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
