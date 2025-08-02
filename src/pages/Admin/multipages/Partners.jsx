import React from "react";
import { useState } from "react";

function Partners() {

 const [partners, setPartners] = useState([
        {
          id: 1,
          name: "أحمد علي",
          startDate: "2024-01-15",
          status: "شريك استراتيجي",
          numOfSubscriptions:"3"
        },
        {
          id: 2,
          name: "سارة محمد",
          startDate: "2023-05-20",
          status: "شريك فرعي",
          numOfSubscriptions: "5"
        },
        {
          id: 3,
          name: "خالد حسن",
          startDate: "2023-11-10",
          status: "مدرب",
          numOfSubscriptions: "2"
        },
      ]);
    


    return (
        <div className="container=fluid text-[9px] md:text-[15px] font-Cairo">
        <h2 className="text-2xl font-semibold mb-4 text-center">  📋 الشركاء</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 shadow-lg rounded-lg">
            <thead className="bg-green-500 text-white">
              <tr>
                <th className="p-3 border">اسم الشريك</th>
                <th className="p-3 border"> مستوي الشريك</th>
                <th className="p-3 border">تاريخ الانضمام </th>
                <th className="p-3 border">عدد الاشتراكات </th>
              </tr>
            </thead>
            <tbody>
              {partners.map((par) => (
                <tr key={par.id} className="text-center">
                  <td className="p-3 border">{par.name}</td>
                  <td className={`p-3 border font-semibold rounded`}>
                    {par.status}
                  </td>
                  <td className="p-3 border">{par.startDate}</td>
                  
                  <td className="p-3 border">{par.numOfSubscriptions}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default Partners;
