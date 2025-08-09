function BankAccount() {
  const tableData = [
    {
      bankName: "CIB",
      amount: "140 $",
      status: "approved",
      date: "5/2/2025",
    },
    {
      bankName: "QNB",
      amount: "140 $",
      status: "approved",
      date: "5/2/2025",
    },
    {
      bankName: "HSBC",
      amount: "140 $",
      status: "approved",
      date: "5/2/2025",
    },
  ];
  return (
    <div className="flex flex-col gap-3 sm:flex-row justify-around mt-5 mb-12">
      <div className=" w-full sm:w-[40%]">
        <div className="account  flex flex-col gap-2">
          <p> اسم صاحب الحساب: ----</p>
          <p> (IBAN) / رقم الحساب:---- </p>
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

        <p className="text-lg font-semibold mb-3 mt-2 border-b-4 w-[60%] sm:w-[40%] rounded-md py-1 border-accent-600 ">
          {" "}
          اضافه حساب بنكي اخر{" "}
        </p>

        <div className="flex flex-col gap-3 w-full">
          <input
            type="text"
            className="dark:bg-dark-background "
            placeholder="اسم البنك"
          />
          <input
            type="text"
            className="dark:bg-dark-background "
            placeholder="اسم صاحب الحساب"
          />
          <input
            type="text"
            className="dark:bg-dark-background "
            placeholder="  (IBAN)/رقم الحساب"
          />
          <button className=" py-1 text-lg font-semibold rounded-lg bg-accent-800 dark:text-darkgray">
            {" "}
            اعتماد الحساب{" "}
          </button>
        </div>
      </div>

      <table className="  border w-full sm:w-[45%]">
        <thead className="border bg-primary-300 text-[10px] md:text-[11px] lg:text-[15px] dark:text-darkgray">
          <th className="p-2 border"> اسم البنك </th>
          <th className="p-2 border"> المبلغ </th>
          <th className="p-2 border"> حاله العمليه </th>
          <th className="p-2"> تاريخ تنفيذ العمليه </th>
        </thead>
        <tbody className="text-center">
          {tableData.map((item, idx) => (
            <tr
              key={idx}
              className={`${
                idx % 2 === 0 ? "bg-gray-50 dark:bg-darkgray" : ""
              }`}
            >
              <td className="border">{item.bankName}</td>
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
export default BankAccount;
