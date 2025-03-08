import { useState } from "react";
import Main from "./partnersComponents/main";
import Requests from "./partnersComponents/requests";
import PerformanceReport from "./partnersComponents/PerformanceReport";
import PageHeader from "../pageHeader";
import PartnersOperations from "./partnersComponents/PartnersOperations";
import FinancialPartners from "./partnersComponents/FinancialPartners";

function Partners() {
  const [isClicked, setIsClicked] = useState(0);
  const buttons = [
    " الرئيسيه ",
    " طلبات الانضمام ",
    " تقارير الأداء ",
    " اداره العمليات ",
    " المعاملات الماليه ",
  ];

  const handleClicked=(idx)=>{
    setIsClicked(idx);
  }

  return (
    <div className="container w-full flex justify-center mt-5">
      <div className="grid  grid-cols-1 gap-2">

      <PageHeader Buttons={buttons} Clicked={isClicked} HandleClicked={handleClicked} />

        <div className="show w-full">
          {isClicked === 0 ? (
            <Main />
          ) : isClicked === 1 ? (
            <Requests/>
          ) : isClicked === 2 ? (
            (<PerformanceReport/>)
          ) : isClicked === 3 ? (
            (<PartnersOperations />)
          ) : (
            (<FinancialPartners/>)
          )}
        </div>
      </div>
    </div>
  );
}
export default Partners;
