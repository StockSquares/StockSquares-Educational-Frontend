import { useState } from "react";
import BankAccount from "./FinancialTransactionsPages/BankAccount";
import EWallet from "./FinancialTransactionsPages/EWallet";

function FinancialTransactions() {
  const topButtons = [
    "المحفظه الالكترونيه",
    "الحساب البنكي",
  ];

  const [selectedMethod, setSelectedMethod] = useState(0);

  return (
    <div className="mt-5 flex flex-col items-center justify-center gap-3 ">
    <div className="container  flex flex-col items-center justify-center gap-3">
      <div className="flex items-center">
        <p> المبلغ القابل للسحب : </p>
        <h2 className="text-2xl text-primary-900 font-bold">&nbsp; 150 USD </h2>
      </div>

      <div className="topButtons flex flex-col sm:flex-row gap-5 justify-center dark:text-darkgray">
        {topButtons.map((btn, idx) => (
          <button
            key={idx}
            className={` ${
              selectedMethod === idx ? "bg-gray-50 border-accent-900" : ""
            } px-3 py-1 rounded-xl bg-accent-900 border-2 border-accent-900 font-semibold hover:bg-gray-50`}
            onClick={() => setSelectedMethod(idx)}
          >
            {" "}
            {btn}{" "}
          </button>
        ))}
      </div>

      <div className=" w-full">
      {selectedMethod === 1 && <BankAccount />}
      {selectedMethod===0 && <EWallet/> }
      </div>
    </div></div>
  );
}
export default FinancialTransactions;
