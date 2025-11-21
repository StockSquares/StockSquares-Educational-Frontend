import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function FinancialTransactions() {
  const [transfer, setTransfer] = useState({
    employee: "",
    amount: "",
    date: "",
    method: "",
    note: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!transfer.employee || !transfer.amount || !transfer.date || !transfer.method) {
      toast.error("من فضلك املأ كل الحقول المطلوبة ⚠️");
      return;
    }

    toast.success("تم تحويل المبلغ بنجاح 💸");
    console.log("Transfer Data:", transfer);

    setTransfer({ employee: "", amount: "", date: "", method: "", note: "" });
  };

  const paymentMethods = [
    { id: "bank", label: "تحويل بنكي" },
    { id: "vodafone", label: "فودافون كاش" },
  ];

  return (
    <div className="w-full flex justify-center items-center p-4">
      <Toaster position="top-right" />
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl flex flex-col w-full p-4 space-y-4"
      >
        <h2 className="text-xl font-semibold border-b pb-2">
          تحويل أموال  💰
        </h2>

        {/* Employee */}
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-1">الاسم </label>
          <input
            type="text"
            value={transfer.employee}
            onChange={(e) => setTransfer({ ...transfer, employee: e.target.value })}
            placeholder="اكتب الاسم "
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Amount */}
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-1">المبلغ (جنيه)</label>
          <input
            type="number"
            value={transfer.amount}
            onChange={(e) => setTransfer({ ...transfer, amount: e.target.value })}
            placeholder="ادخل المبلغ"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Date */}
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-1">تاريخ التحويل</label>
          <input
            type="date"
            value={transfer.date}
            onChange={(e) => setTransfer({ ...transfer, date: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Payment Method Buttons */}
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-2">طريقة الدفع</label>
          <div className="flex gap-3">
            {paymentMethods.map((m) => (
              <button
                type="button"
                key={m.id}
                onClick={() => setTransfer({ ...transfer, method: m.id })}
                className={`flex-1 py-2 rounded-lg font-medium border transition-all ${
                  transfer.method === m.id
                    ? "bg-gray-200 font-semibold text-primary-900 border-2 border-primary-900"
                    : "bg-white text-gray-600 border-gray-300 border-2 hover:bg-gray-100"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="  bg-green-600 self-center px-5 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-all"
        >
          تأكيد التحويل
        </button>
      </form>
    </div>
  );
}
