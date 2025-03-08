import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";


function DatatAnalysis(){

    const articlesData = [
        { title: "مقال 1", interactions: 150, reads: 400 },
        { title: "مقال 2", interactions: 120, reads: 350 },
        { title: "مقال 3", interactions: 100, reads: 300 },
        { title: "مقال 4", interactions: 80, reads: 250 },
        { title: "مقال 5", interactions: 60, reads: 200 },
      ];
      const [articles, setArticles] = useState(articlesData);
    return(
        <div className="p-6  min-h-screen">
      <h1 className="text-2xl font-bold mb-4">📝 لوحة تحكم المقالات</h1>
      
      <div className="bg-white p-4 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2">📊 المقالات الأكثر تفاعلاً وقراءة</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={articles}>
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="interactions" fill="#4F46E5" name="الأكثر تفاعلاً" />
            <Bar dataKey="reads" fill="#10B981" name="الأكثر قراءة" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* جدول المقالات الأكثر تفاعلاً */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">🔥 المقالات الأكثر تفاعلاً</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">📝 العنوان</th>
                <th className="border p-2">💬 التفاعلات</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{article.title}</td>
                  <td className="border p-2">{article.interactions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">📖 المقالات الأكثر قراءة</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">📝 العنوان</th>
                <th className="border p-2">👁️ عدد القراءات</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{article.title}</td>
                  <td className="border p-2">{article.reads}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
}
export default DatatAnalysis;