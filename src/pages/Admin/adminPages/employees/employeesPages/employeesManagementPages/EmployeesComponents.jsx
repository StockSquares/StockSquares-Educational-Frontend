import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { motion } from "framer-motion";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Modal } from "../../../../../../components";

export function AddEmployee() {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);

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
    
    <div className="container mx-auto p-2">
      <div className=" flex flex-col gap-3 items-start justify-center ">
            <h3 className="text-xl mb-4 font-bold dark:text-dark-text ">إضافة موظف جديد</h3>

            <Formik
              initialValues={{
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
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                const newEmp = { id: Date.now(), ...values };
                setEmployees((prev) => [...prev, newEmp]);
                setShowForm(false);
                resetForm();
              }}
            >
              {({ setFieldValue, values }) => (
                <Form className="text-sm  space-y-2  shadow-none border-none w-full text-right  ">
                  <div className="flex gap-3">
                    <div className="flex flex-col w-full">
                      <Field
                        name="name"
                        type="text"
                        placeholder="الاسم"
                        className="w-full p-2 border rounded mb-2 dark:bg-dark-background dark:placeholder-gray-300"
                      />
                      <ErrorMessage
                        name="name"
                        component="p"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col w-full">
                      <Field
                        name="email"
                        type="email"
                        placeholder="البريد الإلكتروني"
                        className="w-full p-2 border rounded mb-2 dark:bg-dark-background dark:placeholder-gray-300"
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="text-red-500"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex flex-col w-full">
                      <Field
                        name="password"
                        type="password"
                        placeholder="كلمة المرور"
                        className="w-full p-2 border rounded mb-2 dark:bg-dark-background dark:placeholder-gray-300"
                      />
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col w-full">
                      <Field
                        name="confirmPassword"
                        type="password"
                        placeholder="تأكيد كلمة المرور"
                        className="w-full p-2 border rounded mb-2 dark:bg-dark-background dark:placeholder-gray-300"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="p"
                        className="text-red-500"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex flex-col w-full">
                      <Field
                        name="jobTitle"
                        type="text"
                        placeholder="المسمى الوظيفي"
                        className="w-full p-2 border rounded mb-2 dark:bg-dark-background dark:placeholder-gray-300"
                      />
                      <ErrorMessage
                        name="jobTitle"
                        component="p"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col w-full">
                      <Field
                        name="birthDate"
                        type="date"
                        className="w-full p-2 border rounded mb-2 dark:bg-dark-background dark:placeholder-gray-300"
                      />
                      <ErrorMessage
                        name="birthDate"
                        component="p"
                        className="text-red-500"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex flex-col w-full">
                      {/* ✅ PhoneInput custom field */}
                      <PhoneInput
                        country={"eg"}
                        value={values.phone}
                        onChange={(phone) => setFieldValue("phone", phone)}
                        containerClass="w-full"
                        inputClass="!w-full !h-12 !border border-gray-300 rounded-lg px-4 focus:ring-2 focus:ring-blue-400"
                        dropdownClass="!rounded-lg !shadow-md"
                      />
                      <ErrorMessage
                        name="phone"
                        component="p"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col w-full">
                      <Field
                        name="salary"
                        type="number"
                        placeholder="الراتب"
                        className="w-full p-2 border rounded mb-2 dark:bg-dark-background dark:placeholder-gray-300"
                      />
                      <ErrorMessage
                        name="salary"
                        component="p"
                        className="text-red-500"
                      />
                    </div>
                  </div>

                  <Field
                    name="address"
                    type="text"
                    placeholder="العنوان"
                    className="w-full p-2 border rounded  dark:bg-dark-background dark:placeholder-gray-300"
                  />
                  <ErrorMessage
                    name="address"
                    component="p"
                    className="text-red-500 "
                  />

                  <label
                    htmlFor="attachments"
                    className=" mb-1 font-semibold text-right"
                  >
                    رفع المرفقات
                  </label>
                  <input
                    id="attachments"
                    type="file"
                    multiple
                    className="w-full p-2 border rounded mb-2 dark:bg-dark-background dark:placeholder-gray-300"
                    onChange={(e) =>
                      setFieldValue("attachments", Array.from(e.target.files))
                    }
                  />
                  <ErrorMessage
                    name="attachments"
                    component="p"
                    className="text-red-500"
                  />

                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    اضافه
                  </button>
                </Form>
              )}
            </Formik>
       
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
  const [selectedEmployee, setSelectedEmployee] = useState( {
      id: 3,
      name: "الاسم ",
      email: "name@example.com",
      jobTitle: "الوظيفه ",
      salary: 7000,
    });


  return (
    <div className="w-full p-4">
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
              
            >
              حفظ التعديلات
            </button>
       
          </div>
    </div>
   
  );
}

export function Cobon() {
  return <>hhhhhhhh</>;
}
