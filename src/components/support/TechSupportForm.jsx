
import { useState } from "react";
import CustomSelect from "../license/CustomSelect";
import { toast } from "react-toastify";
import { AlertCircle } from "lucide-react";

const issueOptions = ["مشكلة صوت", "مشكلة فيديو", "مشكلة دخول", "أخرى"];

export default function TechSupportForm({ onSubmit }) {
  const [issueType, setIssueType] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [details, setDetails] = useState("");
  const [confirmation, setConfirmation] = useState(""); // رسالة التأكيد
  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(false)


  const onFile = (e) => setScreenshot(e.target.files?.[0] || null);
  const submit = (e) => {
    e.preventDefault();
    if (!issueType) {
      setErrors({ issueType: "يرجى اختيار نوع المشكلة" });
      return;
    }
    setErrors({});
    onSubmit({ type: "tech", issueType, details, screenshot });

    // مسح الحقول
    setIssueType("");
    setScreenshot(null);
    setDetails("");
    setIsDisabled(true)
    // رسالة تأكيد
    setConfirmation("🟢تم استلام بلاغك، سيتم التواصل معك خلال دقائق معدوده");
    setTimeout(() => setConfirmation(""), 5000); // تختفي بعد 5 ثواني

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
        لو واجهت مشكلة تقنية أثناء الجلسة أو الدخول، تقدر تبلغنا هنا
      </p>

      <label className="block text-sm text-gray-700">اختر نوع المشكلة</label>
      <CustomSelect
        options={issueOptions}
        value={issueType}
        onChange={setIssueType}
        disabled={isDisabled}
        placeholder="اختر نوع المشكلة..."
      />
      {errors.issueType &&
        <p className="text-red-500 text-sm flex items-center mt-1">
          <AlertCircle className="h-4 w-4 ml-1" /> {errors.issueType}
        </p>
      }

      <label className="block text-sm text-gray-700">رفع لقطة شاشة (اختياري)</label>
      <input disabled={isDisabled} type="file" accept="image/*" onChange={onFile} className="w-full" />

      <label className="block text-sm text-gray-700">تفاصيل إضافية</label>
      <textarea
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        disabled={isDisabled}
        className="w-full p-3 border rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
      />

      <div className="flex justify-end">
        <button
          disabled={isDisabled}
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          إرسال بلاغ الدعم
        </button>
      </div>
    </form>
  );
}


