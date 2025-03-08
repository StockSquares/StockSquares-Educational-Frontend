import { useState } from "react";
import style from "/src/pages/Admin/adminPages/adminPages.module.css";
import AddBook from "./libraryManagementComponents/AddBook";
import WriteSummary from "./libraryManagementComponents/WriteSummary";
import LoadBook from "./libraryManagementComponents/LoadBook";

function LibraryManagement() {
    const buttons=[
        " نفاذ/ اضافه كتاب",
        " كتابه ملخص كتاب",
        " تحميل كتب الكترونيه"

    ];
      const [isClicked, setIsClicked] = useState(0);
    
    return(
        <div className="flex justify-center mt-5">
        <div className="grid w-full grid-cols-1 gap-2">
          <div className="controlButtons grid grid-cols-3 gap-5  ">
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
              <AddBook />
            ) : isClicked === 1 ? (
              <WriteSummary/>
            ) 
             : (
                <LoadBook/>
            )}
          </div>
        </div>
      </div>
    );
}
export default LibraryManagement;