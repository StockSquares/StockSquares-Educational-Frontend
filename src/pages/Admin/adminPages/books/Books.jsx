import { useState } from "react";
import DataAnalysis from "./booksComponents/DataAnalysis";
import LibraryManagement from "./booksComponents/libraryManagement";
import PageHeader from "../../../../components/general/PageHeader/PageHeader";

function Books() {
  const [isClicked, setIsClicked] = useState(0);
  const buttons = [" ادارة المكتبه ", "  تحليل البيانات "];

  const handleClicked = (idx) => {
    setIsClicked(idx);
  };

  return (
    <div className="container  w-full flex justify-center mt-5 ">
      <div className="grid  grid-cols-1 gap-2  justify-items-center">
        <PageHeader
          Buttons={buttons}
          Clicked={isClicked}
          HandleClicked={handleClicked}
        />

        <div className="show w-full">
          {isClicked === 0 ? <LibraryManagement /> : <DataAnalysis />}
        </div>
      </div>
    </div>
  );
}
export default Books;
