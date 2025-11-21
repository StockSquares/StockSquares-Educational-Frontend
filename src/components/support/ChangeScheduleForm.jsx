
import { useState } from "react";
import CustomSelect from "../license/CustomSelect";
import { AlertCircle } from "lucide-react";

const patternOptions = ["صباحًا", "مساءً"];
const daysOptions = ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"];

export default function ChangeScheduleForm({ onSubmit }) {
  const [pattern, setPattern] = useState("");
  const [days, setDays] = useState([]);
  const [reason, setReason] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [confirmation, setConfirmation] = useState(""); // رسالة التأكيد
  const [errors, setErrors] = useState({});


  const toggleDay = (d) => setDays(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);

  const submit = (e) => {
    e.preventDefault();
    if (!pattern) {
      setErrors({ pattern: "من فضلك اختر التوقيت المناسب لك" });
      return
    }
    if (days.length === 0) {
      setErrors({ days: "من فضلك اختر اليوم المناسب لك" });
      return
    }
    // مسح الاخطاء السابقة
    setErrors({})

    onSubmit({ type: "change_schedule", pattern, days, reason });

    setConfirmation("⚠️ لو محتاج توقف الجلسات مؤقتًا، استخدم النموذج التالي لتحديد مدة التعليق. ")
    setTimeout(() => setConfirmation(""), 5000); // تختفي بعد 5 ثواني
    setPattern("");
    setDays([]);
    setReason("");
    setIsDisabled(true)

  };

  return (
    <form onSubmit={submit} className="space-y-4 bg-gray-50 p-6 rounded-xl pt-16 relative">
      {confirmation && (
        <div className="absolute top-0 left-0 right-0 bg-green-100 border border-green-400 text-green-700 p-3 rounded-md text-center">
          {confirmation}
        </div>
      )}

      {/* الوصف */}
      <p className="text-green-600 text-sm md:text-base mb-3 bg-green-50 p-2 rounded">
        لو محتاج توقف الجلسات مؤقتًا، استخدم النموذج التالي لتحديد مدة التعليق
      </p>

      <label className="block text-sm text-gray-700">النمط الجديد</label>
      <CustomSelect
        options={patternOptions}
        value={pattern}
        onChange={setPattern}
        disabled={isDisabled}
        placeholder="اختر النمط..."
      />
      {errors.pattern &&
        <p className="text-red-500 text-sm flex items-center mt-1">
          <AlertCircle className="h-4 w-4 ml-1" /> {errors.pattern}
        </p>
      }


      <label className="block text-sm text-gray-700">أيام محددة</label>
      <div className="flex flex-wrap gap-2">
        {daysOptions.map(d => (
          <button
            key={d}
            type="button"
            onClick={() => toggleDay(d)}
            disabled={isDisabled}
            // className={`px-3 py-2 rounded-lg border ${days.includes(d) ? "bg-green-600 text-white" : "border-gray-300"}`}
            className={`px-3 py-2 rounded-lg border ${days.includes(d) 
              ? "bg-green-600 text-white border-transparent"
                : "border-gray-300 text-gray-700 hover:bg-green-100 hover:border-green-100"
              }`}
          >
            {d}
          </button>

        ))}
      </div>
      {errors.days &&
        <p className="text-red-500 text-sm flex items-center mt-1">
          <AlertCircle className="h-4 w-4 ml-1" /> {errors.days}
        </p>
      }


      <label className="block text-sm text-gray-700">سبب التغيير (اختياري)</label>
      <textarea disabled={isDisabled} value={reason} onChange={(e) => setReason(e.target.value)} className="w-full p-3 border rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600" />

      <div className="flex justify-end">
        <button disabled={isDisabled} type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">طلب تغيير الجدولة</button>
      </div>
    </form>
  );
}

