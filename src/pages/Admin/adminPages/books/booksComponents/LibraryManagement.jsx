import { useState } from "react";
import style from "../../../../../components/general/PageHeader/adminPages.module.css";
import AddBook from "./libraryManagementComponents/AddBook";
import LoadBook from "./libraryManagementComponents/LoadBook";

function LibraryManagement() {
    const buttons=[
        " نفاذ/ اضافه كتاب",
        " تحميل كتب الكترونيه"

    ];
      const [isClicked, setIsClicked] = useState(0);
    
    return(
        <div className="flex justify-center mt-5">
        <div className="grid w-full grid-cols-1 gap-2 ">
          <div className="controlButtons flex justify-center gap-3  ">
            {buttons.map((btn, idx) => (
              <button
                key={idx}
                className={`${isClicked === idx ? style.performancBtnActivated : style.performanceBtn} text-[12px] md:text-[15px] dark:text-black`}
                onClick={() => setIsClicked(idx)}
              >
                {btn}
              </button>
            ))}
          </div>
          <div className="show w-full">
            {isClicked === 0 ? (
              <AddBook />
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