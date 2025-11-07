import PageHeader from "../../../../components/general/PageHeader/PageHeader";
import { useState } from "react";
import EmployeesManagement from "./employeesPages/EmployeesManagement";
import PerformanceReports from "./employeesPages/PerformanceReports";
function Employees() {
  const [isClicked, setIsClicked] = useState(0);
  const handleClicked = (idx) => {
    setIsClicked(idx);
  };

  const buttons = [" اداره الموظفين ", " تقارير الأداء "];
  return (
    <div className="grid  grid-cols-1 mt-5 gap-2 justify-items-center">
      {" "}
      <PageHeader
        Buttons={buttons}
        Clicked={isClicked}
        HandleClicked={handleClicked}
      />
      <div className="show w-full">
        {isClicked === 0 ? <EmployeesManagement /> : <PerformanceReports />}
      </div>
    </div>
  );
}
export default Employees;
