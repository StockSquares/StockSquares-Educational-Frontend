
import { useState } from "react";
import CustomSelect from "../license/CustomSelect";
import { AlertCircle } from "lucide-react";

const reasonOptions = [
  "لا يوجد توافق في اسلوب التواصل",
  "طريقة الشرح لا تساعدني على الاستيعاب",
  "عدم التزام المدرب بمواعيد الجلسات",
  "سبب اخر"
];

export default function ChangeTrainerForm({ onSubmit }) {
  const [reason, setReason] = useState("");
  const [confirmation, setConfirmation] = useState(""); // رسالة التأكيد
  const [isDisabled, setIsDisabled] = useState(false);
  const [errors, setErrors] = useState({});

  const submit = (e) => {
    e.preventDefault();
    //التحقق الاول
    if (!reason) {
      setErrors({ reason: "من فضلك اختر سبب التغيير" });
      return;
    }

    // 2. امسحي الأخطاء القديمة
    setErrors({});

    // 3. ابعتي الداتا للـ parent / API
    onSubmit({ type: "change_trainer", reason });
    // 4. عرض رسالة التأكيد (تظهر فورًا)
    setConfirmation("⚠️نحرص على راحتك، وسيتم مراجعة الطلب بسرية تامة.")

    // 5. اقفلي الفورم (منع التعديل بعد الإرسال)
    setIsDisabled(true);
    // لو فيه سبب

    setTimeout(() => {
      setConfirmation("");
      setReason("")
    }, 5000); // تختفي بعد 5 ثواني
  };




  return (
    <form onSubmit={submit} className="space-y-4 bg-gray-50 p-6 rounded-xl relative pt-16" >
      {confirmation && (
        <div className="absolute top-0 left-0 right-0 bg-green-100 border border-green-400 text-green-700 p-3 rounded-md text-center">
          {confirmation}
        </div>
      )}

      {/* الوصف */}
      <p className="text-green-600 text-sm md:text-base mb-3 bg-green-50 p-2 rounded">
        لو حاسس إنك محتاج تغيير في أسلوب التدريب، تقدر تطلب مدرب بديل قبل المحاضرة الثالثة
      </p>

      <label className="block text-sm text-gray-700">اختر سبب التغيير</label>
      <CustomSelect
        options={reasonOptions}
        value={reason}
        onChange={setReason}
        disabled={isDisabled}
        placeholder="اختر السبب..."
        required={true}
      />
      {errors.reason &&
        <p className="text-red-500 text-sm flex items-center mt-1">
          <AlertCircle className="h-4 w-4 ml-1" /> {errors.reason}
        </p>
      }


      <div className="flex justify-end">
        <button disabled={isDisabled} type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">طلب تغيير المدرب</button>
      </div>
    </form>
  );
}

