
import { useState } from "react";
import CustomSelect from "../license/CustomSelect";
import { AlertCircle } from "lucide-react";

const durationOptions = ["اسبوع", "اسبوعين", "شهر"];

export default function PauseSubscriptionForm({ onSubmit }) {
  const [duration, setDuration] = useState("");
  const [reason, setReason] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [confirmation, setConfirmation] = useState(""); // رسالة التأكيد
  const [errors, setErrors] = useState({});



  const submit = (e) => {
    e.preventDefault();

    if (!duration) {
      setErrors({ duration: "من فضلك اختر مدة التعليق" });
      return;
    }
    // امسحي الاخطاء القديمه
    setErrors({})

    onSubmit({ type: "pause", duration, reason });

    // عرض رسالة التأكيد
    setConfirmation("⚠️ التعليق لا يوقف الاشتراك المالي تلقائيًا. يرجى مراجعة الشروط أو التواصل مع الدعم.");

    // disable الفورم
    setIsDisabled(true);

    // مسح القيم بعد ثواني لو حابة
    setTimeout(() => {
      setDuration("");
      setConfirmation(""); // تختفي الرسالة بعد 5 ثواني
    }, 5000);
  };

  return (
    <form onSubmit={submit} className="space-y-4 bg-gray-50 p-6 rounded-xl relative pt-16">
      {confirmation && (
        <div className="absolute top-0 left-0 right-0 bg-green-100 border border-green-400 text-green-700 p-3 rounded-md text-center">
          {confirmation}
        </div>
      )}

      {/* الوصف */}
      <p className="text-green-600 text-sm md:text-base mb-3 bg-green-50 p-2 rounded">
        لو محتاج توقف الجلسات مؤقتًا، استخدم النموذج التالي لتحديد مدة التعليق
      </p>
      <label className="block text-sm text-gray-700">اختر مدة التعليق</label>
      <CustomSelect
        options={durationOptions}
        value={duration}
        onChange={setDuration}
        disabled={isDisabled}
        placeholder="اختر المدة..."
      />
      {errors.duration &&
        <p className="text-red-500 text-sm flex items-center mt-1">
          <AlertCircle className="h-4 w-4 ml-1" /> {errors.duration}
        </p>
      }


      <label className="block text-sm text-gray-700">سبب التعليق (اختياري)</label>
      <textarea disabled={isDisabled} value={reason} onChange={(e) => setReason(e.target.value)} className="w-full p-3 border rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600" />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isDisabled}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >طلب تعليق مؤقت
        </button>
      </div>
    </form>
  );
}

