
import { useState } from "react";
import CustomSelect from "../license/CustomSelect";
import { AlertCircle } from "lucide-react";

const reasonOptions = ["استفسار عاجل", "دعم فني", "أخرى"];
const urgencyOptions = ["عادي", "متوسط", "عاجل"];

export default function UrgentContactForm({ onSubmit }) {
  const [reason, setReason] = useState("");
  const [urgency, setUrgency] = useState("");
  const [message, setMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [confirmation, setConfirmation] = useState(""); // رسالة التأكيد
  const [errors, setErrors] = useState({});


  const submit = (e) => {
    e.preventDefault();
    if (!reason) {
      setErrors({ reason: "من فضلك اختر سبب التواصل" });
      return
    }
    if (!urgency) {
      setErrors({ urgency: "من فضلك اختر درجة الإلحاح" });
      return
    }
    // مسح الاخطاء السابقة
    setErrors({});

    onSubmit({ type: "urgent_contact", reason, urgency, message });

    setConfirmation("🟢 سيتم الرد خلال ساعة في الحالات العاجلة، و24 ساعة في الحالات الأخرى")
    setTimeout(() => setConfirmation(""), 5000); // تختفي بعد 5 ثواني
    setReason("");
    setUrgency("");
    setMessage("");
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
        لو عندك استفسار مهم أو محتاج دعم سريع، تقدر تطلب تواصل مباشر مع المدرب
      </p>

      <label className="block text-sm text-gray-700">سبب التواصل</label>
      <CustomSelect
        disabled={isDisabled}
        options={reasonOptions}
        value={reason}
        onChange={setReason}
        placeholder="اختر السبب..."
      />
      {errors.reason &&
        <p className="text-red-500 text-sm flex items-center mt-1">
          <AlertCircle className="h-4 w-4 ml-1" /> {errors.reason}
        </p>
      }


      <label className="block text-sm text-gray-700">درجة الإلحاح</label>
      <CustomSelect
        disabled={isDisabled}
        options={urgencyOptions}
        value={urgency}
        onChange={setUrgency}
        placeholder="اختر درجة الإلحاح..."
      />
      {errors.urgency && <p className="text-red-500 text-sm flex items-center mt-1">
        <AlertCircle className="h-4 w-4 ml-1" />
        {errors.urgency}
      </p>
      }


      <label className="block text-sm text-gray-700">وصف الطلب</label>
      <textarea disabled={isDisabled} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-3 border rounded-lg h-28 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600" />

      <div className="flex justify-end">
        <button disabled={isDisabled} type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">طلب تواصل مباشر</button>
      </div>
    </form>
  );
}

