import {
  faEdit,
  faMoneyBillTransfer,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Modal } from "../../../../../components";
import {
  AddEmployee,
  EditEmployeeData,
} from "./employeesManagementPages/EmployeesComponents";
import FinancialTransactions from "./FinancialTransactions";

function EmployeesManagement() {
  const [openModal, setOpenModal] = useState(false);
  const [openTransactionModal, setOpenTransactionModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  return (
    <>
      <div className="container  w-full flex flex-col gap-5 items-start  dark:text-dark-text">
        <h1 className="text-3xl font-[600] "> اداره الموظفين </h1>
        <p className="mt-[-10px] text-gray-500">
          {" "}
          إدارة ذكية لفريق العمل تساعدك على توفير الوقت وتحسين الأداء.{" "}
        </p>
        <hr className="bg-gray-200 mb-2 h-0.5 w-56 mt-[-10px] " />
        <button
          onClick={() => setOpenModal(true)}
          className="px-3 py-2 self-end bg-primary-900 rounded-lg text-white hover:bg-primary-800 font-semibold"
        >
          {" "}
          + اضافه موظف
        </button>
        <input
          type="text"
          placeholder="ابحث عن موظف..."
          className=" w-full rounded-full dark:bg-darkgray bg-gray-100 py-2 px-4"
        />
        <div className=" w-full h-[30vh] overflow-y-auto">
          <table className="w-full border ">
            <thead className="text-start bg-green-100 dark:bg-darkgray">
              <tr className="p-2  *:p-2">
                <th>الاسم</th>
                <th>البريد الالكتروني</th>
                <th>رقم الهاتف</th>
                <th> الراتب </th>
                <th> اجراءات </th>
              </tr>
            </thead>
            <tbody className="border text-center">
              <tr className="p-2 *:p-2 ">
                <td>asmaa</td>
                <td>asmaa75@gmail.com</td>
                <td>01002547889</td>
                <td>12000</td>
                <td>
                  <div className="flex gap-2 justify-center">
                    <FontAwesomeIcon
                      className="text-primary-800 text-md"
                      icon={faMoneyBillTransfer}
                      onClick={() => {
                        setOpenTransactionModal(true);
                        setSelectedItem("asmaa");
                      }}
                    />
                    <FontAwesomeIcon
                      className="text-blue-600 text-md"
                      icon={faEdit}
                      onClick={() => {
                        setSelectedItem("asmaa");
                        setOpenEditModal(true);
                      }}
                    />
                    <FontAwesomeIcon
                      className="text-red-600 text-md"
                      icon={faTrash}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>
          <AddEmployee />
        </Modal>
      )}

      {openEditModal && selectedItem && (
        <Modal onClose={() => setOpenEditModal(false)}>
          <EditEmployeeData />
        </Modal>
      )}

      {openTransactionModal && selectedItem && (
        <Modal onClose={() => setOpenTransactionModal(false)}>
          <FinancialTransactions />
        </Modal>
      )}
    </>
  );
}
export default EmployeesManagement;
