import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const traineesData = [
  {
    name: "محمد أحمد",
    date: "23/7/2025",
    question: "ما الفرق بين البورصة المصرية والسعودية والاجنبيه ",
    trainingDate: "AH6 - Sun",
    status: "تم الاجابة",
    level: "محترف",
    statusColor: "bg-green-500",
  },
  {
    name: "محمد أحمد",
    date: "23/7/2025",
    question: "هل فهم التداول شرط اساسي قبل دخول البورصة؟ ",
    trainingDate: "AH6 - Sun",
    status: "مكرر",
    level: "محترف",
    statusColor: "bg-red-500",
  },
  {
    name: "محمد أحمد",
    date: "23/7/2025",
    question: "هل فهم التداول شرط اساسي قبل دخول البورصة؟ ",
    trainingDate: "AH6 - Sun",
    status: "مؤجل",
    level: "محترف",
    statusColor: "bg-blue-400",
  },
  {
    name: "محمد أحمد",
    date: "23/7/2025",
    question: "هل فهم التداول شرط اساسي قبل دخول البورصة؟ ",
    trainingDate: "AH6 - Sun",
    status: "مؤجل",
    level: "محترف",
    statusColor: "bg-blue-400",
  },
];

function TraineesQuestions() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-center text-xl font-bold mb-6">اسئلة المتدربين</h2>
      <div className="flex justify-start gap-2 mb-4">
        <input
          type="text"
          placeholder="ابحث..."
          className="border border-gray-300 rounded-lg px-3 py-1 w-64"
        />
        <button className="border border-gray-300 rounded-lg px-3 py-1">
          <FontAwesomeIcon icon={faFilter}/>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-primary-300">
              <th className="p-2 border">الطالب</th>
              <th className="p-2 border">تاريخ السؤال</th>
              <th className="p-2 border">السؤال</th>
              <th className="p-2 border">موعد التدريب</th>
              <th className="p-2 border">حالة السؤال</th>
              <th className="p-2 border">مستوى الطالب</th>
            </tr>
          </thead>
          <tbody>
            {traineesData.map((t, i) => (
              <tr key={i} className="text-center">
                <td className="p-2 border flex items-center justify-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-400"></div>
                  {t.name}
                </td>
                <td className="p-2 border">{t.date}</td>
                <td className="p-2 border">{t.question}</td>
                <td className="p-2 border">{t.trainingDate}</td>
                <td className="p-2 border">
                  <span
                    className={`text-white px-3 py-1 rounded-md ${t.statusColor}`}
                  >
                    {t.status}
                  </span>
                </td>
                <td className="p-2 border">{t.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TraineesQuestions;
