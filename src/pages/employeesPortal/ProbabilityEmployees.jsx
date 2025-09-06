import {
  faCheck,
  faElevator,
  faFilter,
  faMailBulk,
  faMessage,
  faPlus,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import React from "react";
import { motion } from "framer-motion";
import { Modal } from "../../components";
import { TabItem, Tabs } from "flowbite-react";
import ClientCard from "../../components/general/clientCard/ClientCard";

function ProbabilityEmployees() {
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "أحمد علي",
      phone: "0123456789",
      email: "ahmed@example.com",
      status: "نشط",
      joinDate: "dd-mm-yyyy",
      clientStatus: "متابعه",
    },
    {
      id: 2,
      name: "سارة محمد",
      phone: "0987654321",
      email: "sara@example.com",
      status: "نشط",
      joinDate: "dd-mm-yyyy",
      clientStatus: "جديد",
    },
    {
      id: 3,
      name: "خالد حسن",
      phone: "0112233445",
      email: "khaled@example.com",
      status: "مغلق",
      joinDate: "dd-mm-yyyy",
      clientStatus: "مغلق بنجاح",
    },
  ]);

  const statusColors = {
    نشط: "bg-green-100 text-green-700",
    // متابعة: "bg-yellow-100 text-yellow-700",
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
    status: "",
    joinDate: "",
    clientStatus: "",
  });

  // const handleClicked = (lead) => {
  //   setNameClicked(true);
  //   setSelectedLead({
  //     id: lead.id,
  //     name: lead.name,
  //     email: lead.email,
  //     phone: lead.phone,
  //     status: lead.status,
  //     joinDate: lead.joinDate,
  //     clientStatus: lead.clientStatus,
  //   });
  // };
  const [showSubSelect, setShowSubSelect] = useState(false);

  // const handleSelectChange = (e) => {
  //   if (e.target.value === "custom") {
  //     setShowSubSelect(true);
  //   } else {
  //     setShowSubSelect(false);
  //   }
  // };

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && (
        <Modal>
          <h1 className="text-center text-lg font-semibold mt-2">
            {" "}
            اضافه عميل جديد{" "}
          </h1>
          <div className="flex flex-col px-8  mt-3">
            <div className="w-[100%] mb-3 ">
              <input
                type="text"
                placeholder="الاسم "
                className=" border rounded-lg"
              />
            </div>
            <div className="w-[100%] mb-3">
              <input
                type="email"
                placeholder="البريدالالكتروني "
                className=" border rounded-lg"
              />
            </div>
            <div className="w-[100%] mb-3">
              <input
                type="text"
                placeholder="رقم الهاتف  "
                className=" border rounded-lg"
              />
            </div>
            <div className="w-[100%] mb-3">
              <input
                type="text"
                placeholder="تاريخ الانضمام    "
                className=" border rounded-lg"
              />
            </div>
            <div>
              <select
                className="text-[14px] w-[100%] "
                style={{ paddingTop: "0" }}
              >
                <option> جديد </option>
                <option> مؤهل </option>
                <option> متابعه </option>
                <option> مغلق </option>
              </select>
            </div>
            <div className="flex gap-2 justify-center">
              <button className=" bg-green-500 self-center px-6 py-2 mb-2 text-lime-50 rounded-lg mt-5">
                {" "}
                اضافه{" "}
              </button>
              <button
                className=" bg-red-500 self-center px-6 py-2 mb-2 text-lime-50 rounded-lg mt-5"
                onClick={() => setIsOpen(false)}
              >
                {" "}
                الغاء{" "}
              </button>
            </div>
          </div>
        </Modal>
      )}

      <div className="w-full mb-5 mt-5 font-Cairo flex flex-col gap-10 text-[9px] md:text-[15px] ">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-center">
            📋 قائمة العملاء المحتملين
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

          <div className="mb-5 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
            <div className="bg-gray-50 p-3 space-y-3 overflow-auto h-[60vh]">
              <div className="flex justify-between">
                <h2> جديد </h2>
                <FontAwesomeIcon
                  icon={faPlus}
                  onClick={() => setIsOpen(true)}
                  className="bg-gray-200 p-2 rounded-lg shadow-sm hover:bg-primary-900 cursor-pointer hover:text-white transition-all"
                />
              </div>
              {[1, 2, 3, 4, 5].map((item, idx) => (
                <ClientCard index={idx} isClicked={setNameClicked} />
              ))}
            </div>
            <div className="bg-gray-50 p-3 space-y-3 h-[60vh]">
              <h2 className="mb-5"> متابعه </h2>

              {[1,2].map((item, idx) => (
                <ClientCard index={idx} isClicked={setNameClicked} />
              ))}
            </div>
            <div className="bg-gray-50 p-3 space-y-3 h-[60vh]">
              <h2 className="mb-2"> مؤهل </h2>
              <Tabs className="gap-2  ">
                <Tabs.Item title="مؤهل بنجاح">
                  {[1].map((item, idx) => (
                    <ClientCard index={idx} isClicked={setNameClicked} />
                  ))}
                </Tabs.Item>
                <Tabs.Item title="غير مؤهل"> غير مؤهل </Tabs.Item>
              </Tabs>
            </div>

            <div className="bg-gray-50 p-3 space-y-3 h-[60vh]">
              <h2> مغلق </h2>
              <Tabs className="gap-2">
                <Tabs.Item title="مغلق بنجاح">
                  {[1].map((item, idx) => (
                    <ClientCard index={idx} isClicked={setNameClicked} />
                  ))}
                </Tabs.Item>
                <Tabs.Item title=" مغلق بفشل"> مغلق بفشل </Tabs.Item>
              </Tabs>
            </div>
          </div>
        </div>

        {name && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-[100%] mb-6 "
          >
            <div className="flex gap-7  flex-col sm:flex-row ">
              <div className="flex flex-col w-full  sm:w-[40%]">
                <div className="btns grid grid-cols-3 gap-3 mt-5">
                 
                  <div className="flex flex-col">
                    <label> قيمه الصفقه :</label>
                    <input type="number" />
                  </div>

                  <div className="flex flex-col">
                    <label> قيمه الربح :</label>
                    <input type="number" />
                  </div>
                  <div className="flex flex-col">
                    <label> التاريخ :</label>
                    <input type="date" />
                  </div>

                  <div className="flex flex-col">
                    <label> موعد المتابعه :</label>
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
                      <th className="p-3 border"> موعد المتابعه</th>
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
    </>
  );
}

export default ProbabilityEmployees;
