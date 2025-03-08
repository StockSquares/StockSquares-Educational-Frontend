import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ClientsDataAnalysis() {
  const customersData = [
    { name: "يناير", new: 400, returning: 240 },
    { name: "فبراير", new: 300, returning: 139 },
    { name: "مارس", new: 200, returning: 980 },
    { name: "أبريل", new: 278, returning: 390 },
  ];

  const productSales = [
    { name: "منتج A", sales: 2400 },
    { name: "منتج B", sales: 4567 },
    { name: "منتج C", sales: 1398 },
    { name: "منتج D", sales: 9800 },
  ];

  const cartAbandonment = [
    { name: "مكتمل", value: 70 },
    { name: "تخلي", value: 30 },
  ];

  const COLORS = ["#0088FE", "#FF8042"];
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
        تحليل بيانات العملاء
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            معدل العملاء الجدد والعائدين
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={customersData}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="new" fill="#4CAF50" name="عملاء جدد" />
              <Bar dataKey="returning" fill="#FF5722" name="عملاء عائدون" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            معدل التخلي عن السلة
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={cartAbandonment}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {cartAbandonment.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg col-span-1 md:col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            أكثر المنتجات مبيعًا
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productSales}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#2196F3" name="المبيعات" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ClientsDataAnalysis;
