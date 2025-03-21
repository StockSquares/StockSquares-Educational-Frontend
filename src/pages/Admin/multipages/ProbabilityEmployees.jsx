import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import React from "react";
import { motion } from "framer-motion";

function ProbabilityEmployees() {
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "أحمد علي",
      phone: "0123456789",
      email: "ahmed@example.com",
      status: "جديد",
    },
    {
      id: 2,
      name: "سارة محمد",
      phone: "0987654321",
      email: "sara@example.com",
      status: "متابعة",
    },
    {
      id: 3,
      name: "خالد حسن",
      phone: "0112233445",
      email: "khaled@example.com",
      status: "مغلق",
    },
  ]);

  const statusColors = {
    جديد: "bg-green-100 text-green-700",
    متابعة: "bg-yellow-100 text-yellow-700",
    مغلق: "bg-red-100 text-red-700",
  };

  const activities = [
    {
      date: "12-03-2025",
      type: "مكالمة هاتفية",
      status: "مؤهل",
      client: "أحمد علي",
    },
    {
      date: "10-03-2025",
      type: " ايميل الكتروني",
      status: "قيد المتابعة",
      client: "سارة محمد",
    },
    {
      date: "08-03-2025",
      type: "مقابله اونلاين",
      status: " مغلق بنجاح ",
      client: "خالد حسن",
    },
  ];

  const [name, setNameClicked] = useState(false);
  const [selectedLead, setSelectedLead] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleClicked = (lead) => {
    setNameClicked(true);
    setSelectedLead({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
    });
  };
  const [showSubSelect, setShowSubSelect] = useState(false);

  const handleSelectChange = (e) => {
      if (e.target.value === "custom") {
          setShowSubSelect(true);
      } else {
          setShowSubSelect(false);
      }
    }

  return (
    <div className="container-fluid mb-5 mt-5 font-Cairo flex flex-col gap-10 text-[8px] md:text-[15px] ">
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          📋 قائمة العملاء المحتملين
        </h2>
        <div className="overflow-x-auto mb-5">
          <table className="w-full border border-gray-200 shadow-md rounded-lg">
            <thead className="text-gray-100 bg-green-500">
              <tr>
                <th className="p-3 border">اسم العميل</th>
                <th className="p-3 border">رقم الهاتف</th>
                <th className="p-3 border">البريد الإلكتروني</th>
                <th className="p-3 border">حالة الفرصة</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => handleClicked(lead)}
                  className={` ${
                    selectedLead.id === lead.id
                      ? "bg-primary-100 border-black border-2"
                      : ""
                  } text-center cursor-pointer`}
                  title="Enter to show details"
                >
                  <td className="p-3 border">{lead.name}</td>
                  <td className="p-3 border">{lead.phone}</td>
                  <td className="p-3 border">{lead.email}</td>
                  <td
                    className={`p-3 border font-semibold rounded ${
                      statusColors[lead.status]
                    }`}
                  >
                    {lead.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {name && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-[100%] mb-6 "
        >
          <div className="grid grid-cols-1 gap-3  md:grid-cols-2">
            <div className="employeeName flex flex-col justify-center gap-3">
              <div className="flex justify-between items-center">
                <div className="text-lg">
                  <p>{selectedLead.name}</p>
                  <p>{selectedLead.email}</p>
                  <p>{selectedLead.phone}</p>
                </div>
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className="text-6xl me-5 text-green-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 ">
                <button className="bg-accent-700 px-3 py-2 font-semiBold text-[15px] rounded-lg active:bg-accent-500">
                  اضافه تعليق
                </button>
                <button className="bg-accent-700 px-3 py-2 font-semiBold text-[15px] rounded-lg  ">
                  ارسال ايميل
                </button>
                <button className="bg-accent-700 px-3 py-2 font-semiBold text-[15px] rounded-lg  ">
                  اجراء مقابله أونلاين
                </button>
                <button className="bg-accent-700 px-3 py-2  font-semiBold text-[15px] rounded-lg  ">
                  اضافه مهمه مستقبليه
                </button>
              </div>
            </div>
            <div className="btns flex flex-col gap-5">
            <select onChange={handleSelectChange}>
            <option>جديد</option>
            <option value="custom">مؤهل </option>
                <option value="option1">متابعه </option>
                <option value="option2">مغلق بنجاح </option>
            </select>

            {showSubSelect && (
                <select>
                    <option value="sub1">مغلق بفشل</option>
                    <option value="sub2">غير مؤهل</option>
                    <option value="sub3">  لم يتم الرد</option>
                </select>
            )}
              <div className="flex flex-col">
                <label> القيمه المتوقعه للصفقه :</label>
                <input type="number" />
              </div>
              <div className="flex flex-col">
                <label> تاريخ الاغلاق المتوقع :</label>
                <input type="date" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-center ">
          📋 قائمة الانشطه السابقه
        </h2>
        <table className="w-full border-collapse border border-gray-200 ">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="p-3 border">التاريخ</th>
              <th className="p-3 border">نوع التواصل</th>
              <th className="p-3 border">الحالة</th>
              <th className="p-3 border">اسم العميل</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="p-3 border text-center">{activity.date}</td>
                <td className="p-3 border text-center">{activity.type}</td>
                <td className="p-3 border text-center">{activity.status}</td>
                <td className="p-3 border text-center">{activity.client}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProbabilityEmployees;
