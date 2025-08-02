import { useState } from "react";
import PageHeader from "../../../../components/general/PageHeader/PageHeader";
import Main from "./employeesPages/Main";
import EmployeesManagement from "./employeesPages/EmployeesManagement";
import PerformanceReports from "./employeesPages/PerformanceReports";
import FinancialTransactions from "./employeesPages/FinancialTransactions";

function Employees() {
  const [isClicked, setIsClicked] = useState(0);
  const buttons = [
    "  الرئيسية ",
    " اداره الموظفين ",
    " تقارير الأداء ",
    " المعاملات الماليه ",
  ];

  const handleClicked = (idx) => {
    setIsClicked(idx);
  };

  return (
    <div className="container w-full flex justify-center mt-5 items-center ">
      <div className="grid  grid-cols-1 gap-2 ">
        <PageHeader
          Buttons={buttons}
          Clicked={isClicked}
          HandleClicked={handleClicked}
        />

        <div className="show w-full">
          {isClicked === 0 ? (
            <Main />
          ) : isClicked === 1 ? (
            <EmployeesManagement />
          ) : isClicked === 2 ? (
            <PerformanceReports />
          ) : (
            <FinancialTransactions />
          )}
        </div>
      </div>
    </div>
  );
}
export default Employees;
