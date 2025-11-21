import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const barData = [
  { name: "Jan", value: 5 },
  { name: "Feb", value: 10 },
  { name: "Mar", value: 15 },
  { name: "Apr", value: 18 },
  { name: "May", value: 20 },
  { name: "Jun", value: 22 },
  { name: "Jul", value: 23 },
  { name: "Aug", value: 25 },
  { name: "Sep", value: 26 },
  { name: "Oct", value: 28 },
];

const pieData = [
  { name: "A", value: 25 },
  { name: "B", value: 25 },
  { name: "C", value: 20 },
  { name: "D", value: 15 },
  { name: "E", value: 15 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#0088fe"];

function PerformanceReports() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h2 className="text-xl font-bold text-center mb-4">مؤشرات قياس الأداء</h2>

      <div className=" text-white  rounded-lg flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
        <p className="text-sm bg-gray-800 p-4">
          ارحب بكم محمد احمد مدرب معتمد علي خبره بتداولا لاكثر من 7 اعوام واعمل
          في البورصة المصرية منذ2007 حاصل شهادة MBA 2020 مع تقدير امتياز من جامعة
          القاهرة
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
        <div className="border border-gray-300 rounded-lg w-full">
          {[
            "تقييم المتدربين",
            "عدد الطلبة",
            "التفاعل مع الأسئلة",
            "الانتظام في المواعيد",
            "استخدام طرق الشرح الحديثة",
          ].map((label, i) => (
            <div
              key={i}
              className="flex justify-between border-b last:border-b-0 p-2"
            >
              <span>{label}</span>
              <span className="bg-gray-100 p-2 rounded-lg dark:text-black">95%</span>
            </div>
          ))}
        </div>

        <PieChart width={300} height={200}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>

        <BarChart width={300} height={200} data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#7ADAA5" />
        </BarChart>
      </div>
    </div>
  );
}

export default PerformanceReports;
