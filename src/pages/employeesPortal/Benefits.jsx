import React from "react";
import style from "../Admin/Admin.module.css";
import { useState } from "react";


function Benefits() {
     const [deals, setDeals] = useState([
            {
              id: 1,
              name: "أحمد علي",
             partnerName:"اسم الشريك",
              kindOfService:"تدريب شخصي",
              Value:"500$",
              benefitPercent:"125$ - 25%"

            },
            {
              id: 2,
              name: "سارة محمد",
              partnerName:"اسم الشريك",
              kindOfService:"تدريب شخصي",
              Value:"500$",
              benefitPercent:"125$ - 25%"


            },
            {
              id: 3,
              name: "خالد حسن",
              partnerName:"اسم الشريك",
              kindOfService:"تدريب شخصي",
              Value: "500$",
              benefitPercent:"125$ - 25%"

            },
          ]);
      
  return (
    <div className="flex-col items-center font-Cairo">
    <div className="container-fluid mx-auto  flex-col text-[9px] md:text-[15px]">
    <div className="w-full flex justify-end  ">
    <div className={` me-5  mb-5  text-center  border border-solid border-gray-400 rounded-full ${style.circle}`}>
          <h2 className="font-bold bg-white text-green-500 rounded-[10%] p-2 text-2xl">300$</h2>
          <p className="font-bold p-2 ">  الأرباح القابله  <br/> للسحب</p>
        </div>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 px-3">
        <div className="border-l-2 shadow-md p-2  border-green-500 text-xl font-bold bg-gradient-to-r from-yellow-300  to-green-500 bg-clip-text text-transparent text-center">
          <h2 className="font-bold">500$</h2>
          <p> اجمالي العمولات المستحقه</p>
        </div>
        <div className="border-l-2 shadow-md p-2  border-green-500 text-xl font-bold bg-gradient-to-r from-yellow-300  to-green-500 bg-clip-text text-transparent text-center">
          <h2 className="font-bold">10,000$</h2>
          <p> اجمالي العمولات المدفوعه</p>
        </div>
        <div className="border-l-2 shadow-md p-2  border-green-500 text-xl font-bold bg-gradient-to-r from-yellow-300  to-green-500 bg-clip-text text-transparent text-center">
          <h2 className="font-bold">25%</h2>
          <p>  نسبه الأرباح</p>
        </div>
      </div>

      <div className="mt-5">
        <h1 className="font-bold text-2xl text-black mb-5 mt-8 text-center">  📋تفاصيل الصفقات :- </h1>
        <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 shadow-lg rounded-lg">
              <thead className="bg-green-500 text-white">
                <tr>
                  <th className="p-3 border">اسم العميل</th>
                  <th className="p-3 border"> اسم الشريك </th>
                  <th className="p-3 border"> نوع الخدمه </th>
                  <th className="p-3 border"> قيمه الصفقه</th>
                  <th className="p-3 border">  نسبه العموله / الربح</th>

                </tr>
              </thead>
              <tbody>
                {deals.map((deal) => (
                  <tr key={deal.id} className="text-center">
                    <td className="p-3 border">{deal.name}</td>
                    <td className="p-3 border">{deal.partnerName}</td>
                   
                    <td className="p-3 border">{deal.kindOfService}</td>
                    <td className="p-3 border">{deal.Value}</td>
                    <td className="p-3 border">{deal.benefitPercent}</td>


                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    </div>
    </div>
  );
}

export default Benefits;
