import { useState } from "react";
import PageHeader from "../PageHeader";
import ClientsDataAnalysis from "./ClientsDataAnalysis";

function Clients() {
  const [isClicked, setIsClicked] = useState(0);
  const buttons = [
    " الرئيسيه ",
    " الاشتراكات  ",
    "  تحليل البيانات  ",
    " ادارة الزبائن  ",
    " المعاملات الماليه ",
  ];

  const handleClicked = (idx) => {
    setIsClicked(idx);
  };

  return (
    <div className="container w-full flex justify-center mt-5">
      <div className="grid  grid-cols-1 gap-2">
        <PageHeader
          Buttons={buttons}
          Clicked={isClicked}
          HandleClicked={handleClicked}
        />

        <div className="show w-full">
          {isClicked === 0
            ? "ااا"
            : isClicked === 1
            ? "ااا"
            : isClicked === 2
            ? "hhhh"
            : isClicked === 3
            ? "ااا"
            : "ااا"}
        </div>
      </div>
    </div>
  );
}
export default Clients;
