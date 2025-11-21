import { useState } from "react";
import PageHeader from "../../../../components/general/PageHeader/PageHeader";
import ClientsDataAnalysis from "./ClientsDataAnalysis";
import Main from "./Main";
import ClientsManagement from "./ClientsManagement";

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
    <div className="container justify-center w-full flex  mt-5">
      <div className="grid w-full grid-cols-1 gap-2">
        <PageHeader
          Buttons={buttons}
          Clicked={isClicked}
          HandleClicked={handleClicked}
        />

        {isClicked === 0 ? (
          <Main />
        ) : isClicked === 1 ? (
          "ااا"
        ) : isClicked === 2 ? (
          "hhhh"
        ) : isClicked === 3 ? (
          <ClientsManagement />
        ) : (
          "ااا"
        )}
      </div>
    </div>
  );
}
export default Clients;
