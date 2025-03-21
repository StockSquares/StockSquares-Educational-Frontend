import React from "react";

const subjects = [
  { name: "محتوى البورصه المصرية", level: "مبتدئ" },
  { name: "محتوى البورصه المصرية", level: "متقدم" },
  { name: "محتوى البورصه المصرية", level: "محترف" },
  { name: "محتوى البورصه العالمية", level: "مبتدئ" },
  { name: "محتوى البورصه العالمية", level: "متقدم" },
  { name: "محتوى البورصه العالمية", level: "محترف" },
  { name: "محتوى البورصه السعودية", level: "مبتدئ" },
  { name: "محتوى البورصه السعودية", level: "متقدم" },
  { name: "محتوى البورصه السعودية", level: "محترف" },
  { name: "محتوى البورصه الأمريكية", level: "مبتدئ" },
  { name: "محتوى البورصه الأمريكية", level: "متقدم" },
  { name: "محتوى البورصه الأمريكية", level: "محترف" },
];

function EducationalSubjects() {
  return (
    <div className="container  flex flex-col items-center font-Cairo">
      <h1 className="text-3xl mt-3 text-black mb-6">  _______المواد التعليميه_______ </h1>
      <div className="w-full bg-white  rounded-lg p-4">
        {subjects.map((subject, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b p-4 last:border-none"
          >
            <p className="text-[10px] md:text-lg font-medium">{subject.name} - <span className={` ms-2 font-bold text-[15px] md:text-[20px] ${
                  subject.level === "محترف"
                    ? "text-red-600"
                    : subject.level === "متقدم"
                    ? " text-orange-400"
                    : " text-green-500"
                } `}>{subject.level}</span> </p>
            <button className="bg-green-500 hover:bg-green-600 text-[10px] md:text-lg text-white px-4 py-2 rounded-md shadow-md">
              فتح
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EducationalSubjects;