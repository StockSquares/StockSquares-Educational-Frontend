import { useState } from "react";

function LectureCard({ subject, trainee, date, level, traineeRequests=false, courseInterval }) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className=" flex flex-col items-center  mt-2 mb-5 font-Cairo ">
      <div className="container flex flex-col ">
        <div className=" self-end text-center ">
          <h1 className= {` px-10 font-semibold   p-1 ${subject.trim()=== "البورصه المصريه" ?"bg-red-600 text-white" : subject.trim()==="البورصه السعوديه" ? "bg-green-600 text-white" : subject.trim()==="بورصه العملات المشفره"?"bg-purple-950 text-white": "bg-yellow-200 text-black"}`}>
            {subject}
          </h1>
        </div>
        <div className="bg-gray-100 w-[100%] p-2 shadow-md ">
          {trainee ? (
            <h1 className="text-gray-600 text-lg mt-3 px-2">
              اسم المتدرب :{" "}
              <span className="text-black me-3 text-[15px] md:text-lg">{trainee}</span>|
              <span
                className={` ms-2 font-bold text-[15px] md:text-[20px]  ${
                  level === "محترف"
                    ? "text-red-600"
                    : level === "متقدم"
                    ? " text-orange-400"
                    : " text-green-500"
                } `}
              >
                {level}
              </span>
            </h1>
          ) : (
            <h1 className="text-gray-600 text-lg mt-3 px-2">
              مستوي الكورس:{" "}
              <span
                className={` ms-2 font-bold text-[15px] md:text-[20px] ${
                  level === "محترف"
                    ? "text-red-600"
                    : level === "متقدم"
                    ? " text-orange-400"
                    : " text-green-500"
                } `}
              >
                {level}
              </span>{" "}
            </h1>
          )}
          <div className="flex  mb-5 px-2 mt-3 py-3">
          {traineeRequests?(<p className="text-lg text-gray-600"> مده الكورس: <span className="text-black font-semibold ">{courseInterval}</span> </p>):(
            <p className="text-lg"> {date} </p>
          )}  
           {!traineeRequests&&  <button className="ms-4 px-5  bg-white rounded-lg text-black  border border-2  border-y-green-500 border-x-yellow-300 hover:bg-green-500 hover:text-white">
              انضم الان
            </button>}
          </div>
          {traineeRequests && (
            <div className="flex gap-3 justify-center text-white relative p-2">
              <button className="px-3 py-1 bg-primary-900 rounded-lg hover:bg-primary-950">
                قبول الطلب
              </button>
              <button
                className="px-3 py-1 bg-red-600 rounded-lg hover:bg-red-700"
                onClick={() => setShowConfirm(true)}
              >
                رفض الطلب
              </button>
              {showConfirm && (
                <div className="bg-white text-center  p-2  transition-all border border-2 border-red-700 absolute left-[2vw]">
                  <p className="text-black"> هل انت متأكد؟ </p>
                  <button className="px-2 me-3 bg-red-700 rounded-lg">
                    {" "}
                    نعم{" "}
                  </button>
                  <button className="px-3 rounded-lg text-black bg-gray-100">
                    {" "}
                    لا{" "}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default LectureCard;
