function EWallet() {
  const tableData = [
    {
      provider: "Vodafone Cash",
      amount: "120 $",
      status: "approved",
      date: "5/8/2025",
    },
    {
      provider: "PayPal",
      amount: "75 $",
      status: "pending",
      date: "3/8/2025",
    },
    {
      provider: "Etisalat Cash",
      amount: "300 $",
      status: "approved",
      date: "1/8/2025",
    },
  ];

  return (
    <div className="flex flex-col gap-3 sm:flex-row justify-around mt-5 mb-12">
      <div className="w-full sm:w-[40%]">
        <div className="account flex flex-col gap-2">
          <p> نوع المحفظه:---- </p>
          <p> اسم صاحب المحفظة: ---- </p>
          <p> رقم المحفظة: ---- </p>
          <div className="flex  gap-3">
            <button className="py-1 text-lg w-[50%] rounded-lg bg-primary-800 text-white mb-4 mt-2">
              {" "}
              سحب{" "}
            </button>
            <button className="py-1 text-lg w-[50%] rounded-lg bg-red-500 text-white mb-4 mt-2">
              {" "}
              حذف{" "}
            </button>
          </div>
          <div className="flex items-center justify-center gap-2">
            <hr className="w-[40%] h-[3px] bg-gray-100" />
            <p> أو </p>
            <hr className="w-[40%] h-[3px] bg-gray-100" />
          </div>
        </div>

        <p className="text-lg font-semibold mb-3 mt-2 border-b-4 w-[80%] sm:w-[60%] rounded-md py-1 border-accent-600">
          إضافة محفظة إلكترونية جديدة
        </p>

        <div className="flex flex-col gap-3 w-full">
          <select className="dark:bg-dark-background">
            <option value="">اختر مزود الخدمة</option>
            <option value="vodafone">Vodafone Cash</option>
            <option value="vodafone">Etisalat Cash</option>
            <option value="paypal">PayPal</option>
          </select>
          <input
            type="text"
            className="dark:bg-dark-background"
            placeholder="اسم صاحب المحفظة"
          />
          <input
            type="text"
            className="dark:bg-dark-background"
            placeholder="رقم المحفظة"
          />
          <button className="py-1 text-lg font-semibold rounded-lg bg-accent-800 dark:text-darkgray">
            اضافه المحفظة
          </button>
        </div>
      </div>

      <table className="border w-full sm:w-[45%]">
        <thead className="border bg-primary-300 text-[10px] md:text-[11px] lg:text-[15px] dark:text-darkgray">
          <tr>
            <th className="p-2 border">مزود الخدمة</th>
            <th className="p-2 border">المبلغ</th>
            <th className="p-2 border">حالة العملية</th>
            <th className="p-2">تاريخ تنفيذ العملية</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {tableData.map((item, idx) => (
            <tr
              key={idx}
              className={`${
                idx % 2 === 0 ? "bg-gray-50 dark:bg-darkgray" : ""
              }`}
            >
              <td className="border">{item.provider}</td>
              <td className="border">{item.amount}</td>
              <td className="border">{item.status}</td>
              <td className="border">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EWallet;
