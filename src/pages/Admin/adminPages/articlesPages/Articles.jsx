import { useState } from "react";
import ArticlesManagement from "./ArticlesManagement";
import DatatAnalysis from "./DataAnalysis";
import PageHeader from "../../../../components/general/PageHeader/PageHeader";

function Articles() {
  const [isClicked, setIsClicked] = useState(0);
  const buttons = [" ادارة المقالات ", "  تحليل البيانات "];

  const handleClicked = (idx) => {
    setIsClicked(idx);
  };
  return (
    <div className="container w-full flex justify-center mt-5">
      <div className="grid  grid-cols-1 gap-2 justify-items-center">
        <PageHeader
          Buttons={buttons}
          Clicked={isClicked}
          HandleClicked={handleClicked}
        />

        <div className="show w-full">
          {isClicked === 0 ? <ArticlesManagement /> : <DatatAnalysis />}
        </div>
      </div>
    </div>
  );
}
export default Articles;
