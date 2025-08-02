import React, { useState } from "react";


function MarketingLink() {
  const [referralRecord, setReferralRecord] = useState([
    {
      id: "1",
      Name: "الاسم",
      referralDate: "تاريخ الاحاله",
      selectedService: "الخدمه المختارة",
      referralState: "حاله الاحاله",
      commissionAchieved: "العموله المحققه",
    },
    {
      id: "2",
      Name: "الاسم",
      referralDate: "تاريخ الاحاله",
      selectedService: "الخدمه المختارة",
      referralState: "حاله الاحاله",
      commissionAchieved: "العموله المحققه",
    },
    {
      id: "3",
      Name: "الاسم",
      referralDate: "تاريخ الاحاله",
      selectedService: "الخدمه المختارة",
      referralState: "حاله الاحاله",
      commissionAchieved: "العموله المحققه",
    },
  ]);

  const services = ["الكورسات المسجله", "التدريب الشخصي", " توصيات بصير AI"];
  return (
    <div className=" mt-5 mb-5 font-Cairo">
      <div className="flex flex-col gap-2 md:flex-row justify-between">
        <div className="font-bold flex flex-col mt-7 gap-2  ">
          <h1 className="text-black text-2xl">
            ارسل الرابط التالي الخاص بك الي اصدقائك و عملائك
          </h1>
          <h1 className="text-black text-2xl">
            و احصل علي <span className="text-primary-900">عمولات فوريه</span> و مستمرة شهريه بالاضافه الي ارباح سنويه.
          </h1>

          <h1 className="text-blue-600 mt-5 underline">
            www.StockSquares.com/Ref1001
          </h1>
        </div>
        <div className="w-[100%] md:w-[25%] ">
          <img src="/src/assets/Share link.gif" alt="image" className="w-full h-full object-cover" />
        </div>
      </div>

      <hr className="bg-gray-200 h-0.5 mb-5 mt-5 font-bold" />

      <h1 className="font-bold text-xl text-black mb-3"> سجل الاحاله :</h1>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 shadow-lg rounded-lg">
          <thead className="bg-green-600 text-white">
            <tr className="text-lg">
              <th className="p-3 border">اسم العميل</th>
              <th className="p-3 border"> تاريخ الاحاله </th>
              <th className="p-3 border"> الخدمه المختاره </th>
              <th className="p-3 border"> حاله الاحاله </th>
              <th className="p-3 border"> العموله المحققه </th>
            </tr>
          </thead>
          <tbody>
            {referralRecord.map((referral) => (
              <tr key={referral.id} className="text-center">
                <td className="p-3 border">{referral.Name}</td>
                <td className="p-3 border">{referral.referralDate}</td>

                <td className="p-3 border">{referral.selectedService}</td>
                <td className="p-3 border">{referral.referralState}</td>
                <td className="p-3 border">{referral.commissionAchieved}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h1 className="mt-7 text-xl text-black font-bold mb-4">مكتبه التصميمات الدعائيه :</h1>
      {services.map((ser) => (
        <div
          className="flex  text-center items-center justify-between mb-3"
          key={ser}
        >
          <h1 className="font-bold text-lg"> الخدمه : {ser} </h1>
          <button className="bg-accent-800 py-1 px-3 rounded-lg text-black ">
            تحميل الصورة الاعلانيه{" "}
          </button>
        </div>
      ))}
    </div>
  );
}

export default MarketingLink;
