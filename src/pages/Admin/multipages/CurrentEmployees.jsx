import React from "react";
import { useState } from "react";

function CurrentEmployees() {
    const [subscriptions, setSubscriptions] = useState([
        {
          id: 1,
          name: "أحمد علي",
          startDate: "2024-01-15",
          status: "نشط",
          renewalDate: "2025-01-15",
        },
        {
          id: 2,
          name: "سارة محمد",
          startDate: "2023-05-20",
          status: "منتهي",
          renewalDate: "2024-05-20",
        },
        {
          id: 3,
          name: "خالد حسن",
          startDate: "2023-11-10",
          status: "مغلق",
          renewalDate: "2024-11-10",
        },
      ]);
    
      const statusColors = {
        نشط: "bg-green-100 text-green-700",
        منتهي: "bg-red-100 text-red-700",
        مغلق: "bg-gray-100 text-black",
      };
    
    
      return (
        <div className="container-fluid text-[9px] md:text-[15px] font-Cairo">
          <h2 className="text-2xl font-semibold mb-4 text-center  ">📋 العملاء الحالين</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 shadow-lg rounded-lg">
              <thead className="bg-green-500 text-white">
                <tr>
                  <th className="p-3 border">اسم العميل</th>
                  <th className="p-3 border">تاريخ الاشتراك</th>
                  <th className="p-3 border">حالة الاشتراك</th>
                  <th className="p-3 border">تاريخ التجديد</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub) => (
                  <tr key={sub.id} className="text-center">
                    <td className="p-3 border">{sub.name}</td>
                    <td className="p-3 border">{sub.startDate}</td>
                    <td className={`p-3 border font-semibold rounded ${statusColors[sub.status]}`}>
                      {sub.status}
                    </td>
                    <td className="p-3 border">{sub.renewalDate}</td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

export default CurrentEmployees;
