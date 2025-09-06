import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const booksData = [
  { title: "كتاب 1", requests: 120, reads: 300 },
  { title: "كتاب 2", requests: 90, reads: 250 },
  { title: "كتاب 3", requests: 75, reads: 220 },
  { title: "كتاب 4", requests: 60, reads: 180 },
  { title: "كتاب 5", requests: 50, reads: 150 },
];

const DatatAnalysis = () => {
  return (
    <div className=" min-h-screen">
      
      <div className="bg-white dark:bg-dark-background p-4 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2">📊 الكتب الأكثر طلبًا وقراءة</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={booksData}>
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="requests" fill="#4F46E5" name="الأكثر طلبًا" />
            <Bar dataKey="reads" fill="#10B981" name="الأكثر قراءة" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-dark-background p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">🔥 الكتب الأكثر طلبًا</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 dark:bg-primary-800">
                <th className="border p-2">📖 العنوان</th>
                <th className="border p-2">📌 الطلبات</th>
              </tr>
            </thead>
            <tbody>
              {booksData.map((book, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{book.title}</td>
                  <td className="border p-2">{book.requests}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white dark:bg-dark-background p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">📈 الكتب الأكثر قراءة</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 dark:bg-primary-800">
                <th className="border p-2">📖 العنوان</th>
                <th className="border p-2">👁️ عدد القراءات</th>
              </tr>
            </thead>
            <tbody>
              {booksData.map((book, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{book.title}</td>
                  <td className="border p-2">{book.reads}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DatatAnalysis;
