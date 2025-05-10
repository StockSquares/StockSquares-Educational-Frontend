import { useState } from "react";
import AdsManagement from "./AdsManagement";
import PerformanceReports from "./PerformanceReports";
import PageHeader from "../pageHeader";

function Ads() {
  const [isClicked, setIsClicked] = useState(0);
  const buttons = [" ادارة الاعلانات ", "  تقارير الأداء "];

  const handleClicked=(idx)=>{
    setIsClicked(idx);
  }

  return (
    <div className="container w-full flex justify-center mt-5 items-center ">
      <div className="grid  grid-cols-1 gap-2 lg:w-[50%]">
      <PageHeader Buttons={buttons} Clicked={isClicked} HandleClicked={handleClicked} />
        
        <div className="show w-full">
          {isClicked === 0 ? <AdsManagement /> : <PerformanceReports />}
        </div>
      </div>
    </div>
  );
}
export default Ads;
