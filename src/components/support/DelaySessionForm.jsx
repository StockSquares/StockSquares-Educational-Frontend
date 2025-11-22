
import { useState } from "react";
import CustomSelect from "../license/CustomSelect";
import { toast } from "react-toastify";
import { AlertCircle } from "lucide-react";
const sessionOptions = [
  { label: "جلسة 1 - 2025-11-21 18:00", value: "session_1" },
  { label: "جلسة 2 - 2025-11-23 20:00", value: "session_2" },
];

export default function DelaySessionForm({ onSubmit }) {
  const [sessionId, setSessionId] = useState("");
  const [newDate, setNewDate] = useState("");
  const [reason, setReason] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [confirmation, setConfirmation] = useState(""); // رسالة التأكيد
  const [errors, setErrors] = useState({});



  const submit = (e) => {
    e.preventDefault();
    if (!sessionId) {
      setErrors({ sessionId: "يرجى اختيار الجلسة" });
      return;
    }
    if (!newDate) {
      setErrors({ newDate: "يرجى اختيار الموعد البديل" });
      return;
    }
    // مسح الاخطاء السابقة
    setErrors({});
    onSubmit({ type: "delay", sessionId, newDate, reason });
    // مسح الحقول

    setConfirmation("🟢 تم استلام طلبك بنجاح! سيتم مراجعته والرد عليك خلال 24 ساعة")
    setTimeout(() => setConfirmation(""), 5000); // تختفي بعد 5 ثواني
    setSessionId("");
    setNewDate("");
    setReason("");
    setIsDisabled(true)
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
        لو محتاج تقديم طلب تأجيل جلسة تدريبية قادمة في حال حدوث ظرف طارئ ، استخدم النموذج التالي
      </p>

      <label className="block text-sm text-gray-700">اختر الجلسة</label>
      <CustomSelect
        options={sessionOptions.map(o => o.label)}
        value={sessionId ? sessionOptions.find(o => o.value === sessionId)?.label : ""}
        onChange={(val) => {
          const selected = sessionOptions.find(o => o.label === val);
          setSessionId(selected?.value || "");
        }}
        placeholder="اختر الجلسة..."
        disabled={isDisabled}
      />
      {errors.sessionId &&
        <p className="text-red-500 text-sm flex items-center mt-1">
          <AlertCircle className="h-4 w-4 ml-1" /> {errors.sessionId}
        </p>
      }

      <label className="block text-sm text-gray-700">الموعد البديل المقترح</label>
      <input
        type="datetime-local"
        value={newDate}
        onChange={(e) => setNewDate(e.target.value)}
        className="w-full p-3 border rounded-lg"
        disabled={isDisabled}
      />

      {errors.newDate &&
        <p className="text-red-500 text-sm flex items-center mt-1">
          <AlertCircle className="h-4 w-4 ml-1" /> {errors.newDate}
        </p>
      }
      <label className="block text-sm text-gray-700">سبب التأجيل (اختياري)</label>
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="w-full p-3 border rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
        disabled={isDisabled}
      />

      <div className="flex justify-end">
        <button disabled={isDisabled} type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
          إرسال طلب التأجيل
        </button>
      </div>
    </form>
  );
}

