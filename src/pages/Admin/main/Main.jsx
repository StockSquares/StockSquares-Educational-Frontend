import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import style from "../Admin1.module.css";
import { LineChart, Line, ResponsiveContainer } from "recharts";

function Main() {
  const data = [
    { name: "مصر", value: 30 },
    { name: " السعوديه", value: 40 },
    { name: "الامارات ", value: 20 },
    { name: " اخري", value: 10 },
  ];

  const tableData = [
    {
      name: "علي محمد",
      title: "شريك استراتيجي",
      subscriptions: 700,
      sales: "700,000 $",
    },
    {
      name: "سما أيوب",
      title: "مطورة أعمال",
      subscriptions: 680,
      sales: "680,000 $",
    },
    {
      name: "أحمد دسوق",
      title: "شريك فرعي",
      subscriptions: 510,
      sales: "510,000 $",
    },
    {
      name: "نور أشرف",
      title: "مطورة أعمال",
      subscriptions: 490,
      sales: "490,000 $",
    },
    {
      name: "أحمد حسني",
      title: "شريك استراتيجي",
      subscriptions: 410,
      sales: "410,000 $",
    },
    {
      name: "محمد أبو الدهب",
      title: "مطور أعمال",
      subscriptions: 355,
      sales: "355,000 $",
    },
    {
      name: "يوسف طارق",
      title: "مطور أعمال",
      subscriptions: 250,
      sales: "250,000 $",
    },
  ];

  const datalineChart = [
    { month: "يناير", AI: 80, orders: 60, training: 50, books: 20 },
    { month: "فبراير", AI: 90, orders: 70, training: 55, books: 40 },
    { month: "مارس", AI: 85, orders: 75, training: 65, books: 30 },
    { month: "أبريل", AI: 100, orders: 80, training: 70, books: 50 },
    { month: "مايو", AI: 110, orders: 95, training: 85, books: 70 },
    { month: "يونيو", AI: 95, orders: 85, training: 75, books: 60 },
  ];

  const linesMapping = {
    "التدريب الشخصي": "training",
    "توصيات بصير AI": "AI",
    "الكورسات المسجلة": "orders",
    الكتب: "books",
  };
  const stroke = ["orange", "#2E7D32", "#C62828", "#1565C0"];

  const lines = Object.keys(linesMapping);

  const data1 = [
    { name: "1", sales: 400, subscribes: 500 },
    { name: "2", sales: 800, subscribes: 600 },
    { name: "3", sales: 600, subscribes: 500 },
    { name: "4", sales: 100, subscribes: 500 },
    { name: "5", sales: 400, subscribes: 800 },
    { name: "6", sales: 800, subscribes: 500 },
    { name: "7", sales: 600, subscribes: 500 },
    { name: "8", sales: 100, subscribes: 550 },
    { name: "9", sales: 400, subscribes: 500 },
    { name: "10", sales: 800, subscribes: 400 },
    { name: "11", sales: 600, subscribes: 400 },
    { name: "12", sales: 100, subscribes: 500 },
  ];

  const [activeButton, setActiveButton] = useState(null);

  const buttons = [
    "الربع الأول",
    "الربع الثاني",
    "الربع الثالث",
    "الربع الرابع",
  ];

  const [selectedValue, setSelectedValue] = useState(null);

  const [datatType, setDataType] = useState("sales");

  return (
    <div className="container-fluid w-100 px-2 sm:px-4 md:px-8">
      <div className="grid grid-cols-12 gap-2 mb-5 mt-4 items-center">
        <div className="col-span-12 sm:col-span-3 md:col-span-2 ms-4 flex justify-center sm:justify-start">
          <img src="/src/assets/imgs/logo-SS.svg" className="w-32 sm:w-40" />
        </div>
        <div className="col-span-12 sm:col-span-9 md:col-span-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 px-3">
            <div className="border-l-2 shadow-md p-2 border-green-500 text-xl font-bold bg-gradient-to-r from-yellow-300 to-green-500 bg-clip-text text-transparent text-center">
              <h2 className="font-bold">70.10M</h2>
              <p> اجمالي المبيعات</p>
            </div>
            <div className="border-l-2 shadow-md p-2 border-green-500 text-xl font-bold bg-gradient-to-r from-yellow-300 to-green-500 bg-clip-text text-transparent text-center">
              <h2 className="font-bold">100$</h2>
              <p> متوسط الاشتراك</p>
            </div>
            <div className="border-l-2 shadow-md p-2 border-green-500 text-xl font-bold bg-gradient-to-r from-yellow-300 to-green-500 bg-clip-text text-transparent text-center">
              <h2 className="font-bold">11</h2>
              <p> اجمالي عدد الدول </p>
            </div>
            <div className="text-xl shadow-md p-2 font-bold bg-gradient-to-r from-yellow-300 to-green-500 bg-clip-text text-transparent text-center">
              <h2 className="font-bold">7700</h2>
              <p> اجمالي عدد الاشتراك </p>
            </div>
          </div>
        </div>
      </div>
      <hr className="h-[2px] bg-gray-400 mb-3 mt-3" />

      <div className="grid grid-cols-12 gap-2 text-center items-center">
        <div className="col-span-12 sm:col-span-3 md:col-span-2 p-2">
          <select className="rounded-md text-center w-full border-2 border-green-500">
            <option>السنه</option>
            <option>2025</option>
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
            <option>2021</option>
            <option>2020</option>
          </select>
        </div>
        <div className="col-span-12 sm:col-span-9 md:col-span-10 flex items-center flex-col">
          <div className="flex flex-wrap justify-center p-3 gap-4">
            <button
              onClick={() => setDataType("sales")}
              className={`${style.btn}`}
            >
              {" "}
              اجمالي المبيعات{" "}
            </button>
            <button
              onClick={() => setDataType("subscribes")}
              className={`${style.btn}`}
            >
              {" "}
              متوسط الاشتراكات{" "}
            </button>
          </div>
          <div className="overflow-x-auto w-full">
            <BarChart
              width={1200}
              height={250}
              data={data1}
              className="mt-4 shadow-md"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey={datatType}
                fill={datatType === "sales" ? "green" : "brown"}
              />
            </BarChart>
          </div>
        </div>
      </div>
      <hr className="h-[2px] bg-gray-400 mb-3 mt-3" />

      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12 md:col-span-3 lg:col-span-2 flex flex-col gap-2 justify-between p-4">
          {buttons.map((btn, index) => (
            <button
              key={index}
              className={`ms-4 ${
                activeButton === index
                  ? `p-3 bg-yellow-400 ${style.clicked}`
                  : ` ${style.bottom} p-3 bg-yellow-300`
              }`}
              onClick={() => setActiveButton(index)}
            >
              {btn}
            </button>
          ))}
        </div>
        <div className="col-span-12 md:col-span-9 lg:col-span-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-2 flex flex-col text-center shadow-md">
              <h1 className="font-bold mb-2"> اجمالي المبيعات - الشريك </h1>
              <div className="h-full grid grid-cols-2 text-center border-4 border-primary-500">
                <div className="bg-primary-400"> محمد - شريك </div>
                <div className="bg-white"> سما - موظف </div>
                <div className="bg-white"> علي - موظف </div>
                <div className="bg-primary-400"> هانيا - شريك </div>
              </div>
            </div>
            <div className="flex justify-center overflow-x-auto">
              <PieChart width={400} height={300}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={stroke[index % stroke.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>
          <hr className="h-[2px] bg-gray-400 mb-3 mt-3" />

          <div className="bg-white p-4 rounded-lg shadow-md w-full">
            <h2 className="text-lg font-semibold text-center mb-4">
              إجمالي المبيعات - التوصيات
            </h2>
            <div className="overflow-x-auto">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={datalineChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {lines.map((lineData, index) => (
                    <Line
                      key={index}
                      type="monotone"
                      dataKey={linesMapping[lineData]}
                      stroke={stroke[index]}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      name={lineData}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      <hr className="h-[2px] bg-gray-400 mb-3 mt-3" />

      <div className="grid grid-cols-12 gap-2 mb-5">
        <div className="col-span-12 sm:col-span-3 md:col-span-2">
          <select
            className="rounded-md text-center w-full border-2 border-green-500"
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            <option>الموظف- الشريك </option>
            {tableData.map((person) => (
              <option key={person.name} value={person.name}>
                {" "}
                {person.name}{" "}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-12 sm:col-span-9 md:col-span-10 overflow-x-auto">
          <table className="table-fixed w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden text-[10px] md:text-[14px] lg:text-[16px]">
            <thead className="bg-gray-200 text-center">
              <tr>
                <th className="py-3 lg:px-6 border-b w-1/4">الاسم</th>
                <th className="py-3 lg:px-6 border-b w-1/4">المسمي الوظيفي</th>
                <th className="py-3 lg:px-6 border-b w-1/4">عدد الاشتراكات</th>
                <th className="py-3 lg:px-6 border-b w-1/4">اجمالي المبيعات</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((person) => (
                <tr
                  key={person.name}
                  className={`hover:bg-gray-100 text-center ${
                    selectedValue === person.name
                      ? "bg-primary-100 scale-105 transition-all"
                      : ""
                  }`}
                >
                  <td className="py-3 lg:px-6 border-b">{person.name}</td>
                  <td className="py-3 lg:px-6 border-b">{person.title}</td>
                  <td className="py-3 lg:px-6 border-b">{person.subscriptions}</td>
                  <td className="py-3 lg:px-6 border-b">{person.sales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Main;
