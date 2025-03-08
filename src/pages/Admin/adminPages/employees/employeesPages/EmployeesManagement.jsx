import { useState } from "react";
import style from "/src/pages/Admin/adminPages/adminPages.module.css";
import { AddEmployee, Cobon, EditEmployeeData } from "./employeesManagementPages/employeesComponents";

function EmployeesManagement(){
     const buttons=[
            " حذف/ اضافه موظف",
            " تعديل بيانات الموظف ",
            " انشاء رابط دعوه/ كود خصم "
    
        ];
          const [isClicked, setIsClicked] = useState(0);
        
    return(
        <div className="flex justify-center mt-5">
        <div className="grid w-full grid-cols-1 gap-2">
          <div className="controlButtons grid grid-cols-3 gap-5 m-auto justify-center">
            {buttons.map((btn, idx) => (
              <button
                key={idx}
                className={`${isClicked === idx ? style.performancBtnActivated : style.performanceBtn} text-[12px] md:text-[15px]`}
                onClick={() => setIsClicked(idx)}
              >
                {btn}
              </button>
            ))}
          </div>
          <div className="show w-full">
            {isClicked === 0 ? (
              <AddEmployee />
            ) : isClicked === 1 ? (
              <EditEmployeeData/>
            ) 
             : (
                <Cobon/>
            )}
          </div>
        </div>
      </div>
    );
}
export default EmployeesManagement;