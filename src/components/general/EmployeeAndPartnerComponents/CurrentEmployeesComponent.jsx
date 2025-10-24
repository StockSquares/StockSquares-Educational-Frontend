import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { faFilter, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CurrentEmployeesComponent() {
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      name: "أحمد علي",
      startDate: "2024-01-15",
      status: "نشط",
      renewalDate: "2025-01-15",
      joinDate: "dd-mm-yyyy",
      clientStatus: "مؤهل",
      phone: "123123123",
    },
    {
      id: 2,
      name: "سارة محمد",
      startDate: "2023-05-20",
      renewalDate: "2024-05-20",
      status: "مغلق",
      joinDate: "dd-mm-yyyy",
      clientStatus: "مغلق بنجاح",
    },
    {
      id: 3,
      name: "خالد حسن",
      startDate: "2023-11-10",
      status: "مغلق",
      renewalDate: "2024-11-10",
      joinDate: "dd-mm-yyyy",
      clientStatus: "مغلق بفشل",
    },
  ]);

  const statusColors = {
    نشط: "bg-green-100 text-green-700",
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

  const [open, setIsOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    status: "",
    joinDate: "",
  });

  return (
    <div className="container-fluid text-[9px] md:text-[15px] mt-5">
      <h2 className="text-2xl font-semibold mb-4 text-center  ">
        📋 العملاء الحالين
      </h2>
      <div className="flex gap-2 items-center mb-3">
        <input
          type="text"
          className="bg-gray-50 rounded-xl px-4 text-sm w-[80%] sm:w-[20%] ms-3 "
          placeholder="بحث"
        />
        <FontAwesomeIcon
          icon={faFilter}
          className="text-xl bg-gray-50 border-2 rounded-xl p-2"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 shadow-lg rounded-lg">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="p-3 border">اسم العميل</th>
              <th className="p-3 border">تاريخ الاشتراك</th>
              <th className="p-3 border">تاريخ التجديد</th>
              <th className="p-3 border">حالة الاشتراك</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr
                key={sub.id}
                className={`${
                  selectedLead === sub
                    ? "bg-primary-200 border-2 border-black"
                    : ""
                } text-center`}
                onClick={() => {
                  setSelectedLead(sub);
                  setIsOpen(true);
                }}
              >
                <td className="p-3 border">{sub.name}</td>
                <td className="p-3 border">{sub.startDate}</td>
                <td className="p-3 border">{sub.renewalDate}</td>
                <td
                  className={`p-3 border font-semibold rounded ${
                    statusColors[sub.status]
                  }`}
                >
                  {sub.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {open && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-[100%] mb-6 mt-12"
        >
          <div className="flex gap-7  flex-col sm:flex-row ">
            <div className="flex flex-col w-full  sm:w-[40%]">
              <div className="employeeName flex flex-col  sm:flex-row justify-between ">
                <div className="flex flex-col ms-2 gap-1 items-start">
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="text-6xl ms-3 text-green-600"
                  />
                  <div className="text-lg">
                    <p>
                      {" "}
                      <span className="text-gray-500">الاسم: &nbsp;</span>{" "}
                      {selectedLead.name}
                    </p>
                    <p>
                      {" "}
                      <span className="text-gray-500">
                        رقم الهاتف : &nbsp;
                      </span>{" "}
                      {selectedLead.phone}
                    </p>
                    <p>
                      {" "}
                      <span className="text-gray-500">
                        تاريخ الانضمام : &nbsp;
                      </span>{" "}
                      {selectedLead.joinDate}
                    </p>
                    <p>
                      {" "}
                      <span className="text-gray-500">الحاله: &nbsp;</span>{" "}
                      {selectedLead.clientStatus}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-1 mt-3 gap-2   ">
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
              <div className="btns grid grid-cols-3 gap-2 mt-3">
                <div className="flex flex-col">
                  <label> حاله الاشتراك:</label>
                  <select>
                    <option>نشط</option>
                    <option>مغلق </option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label> تحديث الحاله:</label>
                  <select>
                    <option>جديد</option>
                    <option value="custom">مؤهل </option>
                    <option value="option1">متابعه </option>
                    <option value="option2">مغلق بنجاح </option>

                    <option value="sub1">مغلق بفشل</option>
                    <option value="sub2">غير مؤهل</option>
                    <option value="sub3"> لم يتم الرد</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label> التاريخ :</label>
                  <input type="date" />
                </div>

                <div className="flex flex-col">
                  <label> قيمه الربح :</label>
                  <input type="number" />
                </div>
                <div className="flex flex-col">
                  <label> موعد التجديد :</label>
                  <input type="date" />
                </div>

                <div className="flex flex-col">
                  <label> نوع التواصل: </label>
                  <select>
                    <option>مكالمه هاتفيه</option>
                    <option>ايميل الكتروني </option>
                    <option>مقابله اونلاين </option>
                    <option> </option>
                  </select>
                </div>
              </div>
              <button className="bg-primary-900 px-12 py-2 text-white mt-5 self-center rounded-lg ">
                {" "}
                اضافه{" "}
              </button>
            </div>

            {/* الانشطه السابقه  */}

            <div className=" w-full sm:w-[60%]">
              <h2 className="text-2xl font-semibold mb-4 text-center ">
                📋 قائمة الانشطه السابقه
              </h2>
              <table className="w-full border-collapse border border-gray-200 ">
                <thead>
                  <tr className="bg-green-600 text-white">
                    <th className="p-3 border">التاريخ</th>
                    <th className="p-3 border">نوع التواصل</th>
                    <th className="p-3 border">قيمه الربح المتوقع</th>
                    <th className="p-3 border"> موعد التجديد</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
                      <td className="p-3 border text-center">
                        {activity.date}
                      </td>
                      <td className="p-3 border text-center">
                        {activity.type}
                      </td>
                      <td className="p-3 border text-center">
                        {activity.status}
                      </td>
                      <td className="p-3 border text-center">
                        {activity.client}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default CurrentEmployeesComponent;
