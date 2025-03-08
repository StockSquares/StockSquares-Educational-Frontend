import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { motion } from "framer-motion";

export function AddEmployee() {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false

  );

  const validationSchema = Yup.object({
    name: Yup.string().required("الاسم مطلوب"),
    email: Yup.string()
      .email("البريد الإلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
    password: Yup.string()
      .min(6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف")
      .required("كلمة المرور مطلوبة"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "كلمة المرور غير متطابقة")
      .required("تأكيد كلمة المرور مطلوب"),
    phone: Yup.string().required("رقم الهاتف مطلوب"),
    jobTitle: Yup.string().required("المسمى الوظيفي مطلوب"),
    birthDate: Yup.date().required("تاريخ الميلاد مطلوب"),
    address: Yup.string().required("العنوان مطلوب"),
    salary: Yup.number()
      .positive("الراتب يجب أن يكون رقمًا موجبًا")
      .required("الراتب مطلوب"),
    attachments: Yup.array().min(1, "يجب رفع ملف واحد على الأقل"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      jobTitle: "",
      birthDate: "",
      address: "",
      salary: "",
      attachments: [],
    },
    validationSchema,
    onSubmit: (values) => {
      const newEmp = { id: Date.now(), ...values };
      setEmployees([...employees, newEmp]);
      setShowForm(false);
      formik.resetForm();
      
    },
  });

  return (
    <div className="container mx-auto p-4">
      <div className=" flex flex-col gap-3 items-start justify-center ">
        <button className="px-3 py-2 rounded-lg bg-primary-950 text-white mb-3 mt-2" onClick={()=>setShowForm(true)}>
          اضافه موظف جديد
        </button>
        <table className="w-full">
          <thead className="bg-emerald-100">
            <th> الاسم </th>
            <th> المسمي الوظيفي </th>
            <th> البريد الألكتروني </th>
            <th> الراتب </th>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr className="text-center ">
                <td className="p-2">{emp.name}</td>
                <td className="p-2">{emp.jobTitle}</td>
                <td className="p-2">{emp.email}</td>
                <td className="p-2">{emp.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {showForm && 
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-4 mt-10 rounded shadow-lg w-[100%]"
        >
          <h3 className="text-xl font-bold mb-4">إضافة موظف جديد</h3>

          <form
            onSubmit={formik.handleSubmit}
            className="bg-white shadow-none border-none w-full text-right"
          >
            <div className="flex gap-3 ">
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  placeholder="الاسم"
                  className="w-full p-2 border rounded mb-2"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500">{formik.errors.name}</p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  className="w-full p-2 border rounded mb-2"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500">{formik.errors.email}</p>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col">
                <input
                  type="password"
                  placeholder="كلمة المرور"
                  className="w-full p-2 border rounded mb-2"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500">{formik.errors.password}</p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <input
                  type="password"
                  placeholder="تأكيد كلمة المرور"
                  className="w-full p-2 border rounded mb-2"
                  {...formik.getFieldProps("confirmPassword")}
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="text-red-500">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  placeholder="المسمى الوظيفي"
                  className="w-full p-2 border rounded mb-2"
                  {...formik.getFieldProps("jobTitle")}
                />
                {formik.touched.jobTitle && formik.errors.jobTitle && (
                  <p className="text-red-500">{formik.errors.jobTitle}</p>
                )}
              </div>

              <div className="flex flex-col w-full">
                <input
                  type="date"
                  className="w-full p-2 border rounded mb-2"
                  {...formik.getFieldProps("birthDate")}
                />
                {formik.touched.birthDate && formik.errors.birthDate && (
                  <p className="text-red-500">{formik.errors.birthDate}</p>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col w-full">
                <PhoneInput
                  country={"eg"}
                  containerClass="w-full"
                  inputClass="!w-full !h-12 !border border-gray-300 rounded-lg px-4 focus:ring-2 focus:ring-blue-400"
                  dropdownClass="!rounded-lg !shadow-md"
                  value={formik.values.phone}
                  onChange={(phone) => formik.setFieldValue("phone", phone)}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-red-500">{formik.errors.phone}</p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <input
                  type="number"
                  placeholder="الراتب"
                  className="w-full p-2 border rounded mb-2"
                  {...formik.getFieldProps("salary")}
                />
                {formik.touched.salary && formik.errors.salary && (
                  <p className="text-red-500">{formik.errors.salary}</p>
                )}
              </div>
            </div>
            <input
              type="text"
              placeholder="العنوان"
              className="w-full p-2 border rounded mb-2"
              {...formik.getFieldProps("address")}
            />
            {formik.touched.address && formik.errors.address && (
              <p className="text-red-500">{formik.errors.address}</p>
            )}
            <label
              htmlFor="attachments"
              className="mt-2 mb-1 font-semibold text-right"
            >
              رفع المرفقات
            </label>
            <input
              id="attachments"
              type="file"
              multiple
              className="w-full p-2 border rounded mb-2"
              onChange={(e) =>
                formik.setFieldValue("attachments", Array.from(e.target.files))
              }
            />
            {formik.touched.attachments && formik.errors.attachments && (
              <p className="text-red-500">{formik.errors.attachments}</p>
            )}

            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
             
            >
              اضافه
            </button>
          </form>
        </motion.div>}
      </div>
    </div>
  );
}

export function EditEmployeeData() {
  const employeesData = [
    {
      id: 1,
      name: " الاسم",
      email: "name@example.com",
      jobTitle: " الوظيفه",
      salary: 5000,
    },
    {
      id: 2,
      name: "الاسم ",
      email: "name@example.com",
      jobTitle: "الوظيفه ",
      salary: 4500,
    },
    {
      id: 3,
      name: "الاسم ",
      email: "name@example.com",
      jobTitle: "الوظيفه ",
      salary: 7000,
    },
  ];

  const [employees, setEmployees] = useState(employeesData);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleSave = () => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === selectedEmployee.id ? selectedEmployee : emp
      )
    );
    setSelectedEmployee(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">جدول الموظفين</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">الاسم</th>
            <th className="border p-2">البريد الإلكتروني</th>
            <th className="border p-2">الوظيفة</th>
            <th className="border p-2">الراتب</th>
            <th className="border p-2">إجراء</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="text-center">
              <td className="border p-2">{employee.name}</td>
              <td className="border p-2">{employee.email}</td>
              <td className="border p-2">{employee.jobTitle}</td>
              <td className="border p-2">{employee.salary} $</td>
              <td className="border p-2">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => handleEdit(employee)}
                >
                  تعديل
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedEmployee && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">تعديل بيانات الموظف</h3>
            <label className="block mb-2">الاسم:</label>
            <input
              type="text"
              value={selectedEmployee.name}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  name: e.target.value,
                })
              }
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block mb-2">البريد الإلكتروني:</label>
            <input
              type="email"
              value={selectedEmployee.email}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  email: e.target.value,
                })
              }
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block mb-2">الوظيفة:</label>
            <input
              type="text"
              value={selectedEmployee.jobTitle}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  jobTitle: e.target.value,
                })
              }
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block mb-2">الراتب:</label>
            <input
              type="number"
              value={selectedEmployee.salary}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  salary: e.target.value,
                })
              }
              className="w-full p-2 border rounded mb-3"
            />

            <div className="flex justify-between mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleSave}
              >
                حفظ التعديلات
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setSelectedEmployee(null)}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function Cobon() {
  return <>hhhhhhhh</>;
}
