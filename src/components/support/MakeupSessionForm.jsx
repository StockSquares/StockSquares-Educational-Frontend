
import { useState } from "react";
import CustomSelect from "../license/CustomSelect";
import { AlertCircle } from "lucide-react";

const missedOptions = [
  { label: "جلسة 2025-10-20", value: "past_1" }
];

export default function MakeupSessionForm({ onSubmit }) {
  const [missedId, setMissedId] = useState("");
  const [proposed, setProposed] = useState("");
  const [reason, setReason] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [confirmation, setConfirmation] = useState(""); // رسالة التأكيد
  const [errors, setErrors] = useState({});


  const submit = (e) => {
    e.preventDefault();

    if (!missedId) {
      setErrors({ missedId: " يجب اختيار الجلسه الفائتة" });
      return
    }
    if (!proposed) {
      setErrors({ proposed: "يجب تحديد ميعاد جلسة التعويض" });
      return
    }
    // مسح الاخطاء السابقة
    setErrors({});
    onSubmit({ type: "makeup", missedId, proposed, reason });

    setConfirmation("🟢 تم استلام طلبك، وسنرد عليك خلال يومين عمل")
    setTimeout(() => setConfirmation(""), 5000); // تختفي بعد 5 ثواني
    setMissedId("");
    setProposed("");
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
        : لو فاتتك جلسة بسبب ظرف طارئ، تقدر تطلب جلسة تعويضية
      </p>
      <label className="block text-sm text-gray-700">اختر الجلسة الفائتة</label>
      <CustomSelect
        options={missedOptions.map(o => o.label)}
        value={missedId ? missedOptions.find(o => o.value === missedId)?.label : ""}
        onChange={(val) => {
          const sel = missedOptions.find(o => o.label === val);
          setMissedId(sel?.value || "");
        }}
        placeholder="اختر الجلسة الفائتة..."
      />

      {errors.missedId &&
        <p className="text-red-500 text-sm flex items-center mt-1">
          <AlertCircle className="h-4 w-4 ml-1" /> {errors.missedId}
        </p>
      }


      <label className="block text-sm text-gray-700">الموعد المقترح للتعويض</label>
      <input type="datetime-local" value={proposed} onChange={(e) => setProposed(e.target.value)} className="w-full p-3 border rounded-lg" />
      {errors.proposed &&
        <p className="text-red-500 text-sm flex items-center mt-1">
          <AlertCircle className="h-4 w-4 ml-1" /> {errors.proposed}
        </p>
      }

      <label className="block text-sm text-gray-700">سبب الغياب (اختياري)</label>
      <textarea value={reason} onChange={(e) => setReason(e.target.value)} className="w-full p-3 border rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600" />

      <div className="flex justify-end">
        <button type="submit" disabled={isDisabled} className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">طلب جلسة تعويض</button>
      </div>
    </form>
  );
}

