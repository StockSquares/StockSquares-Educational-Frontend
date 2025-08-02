import { useState } from "react";
import CoursesManagement from "./CoursesManagement";
import CoursesAnalysis from "./CoursesAnalysis";
import PageHeader from "../../../../components/general/PageHeader/PageHeader";

function Courses() {
  const [isClicked, setIsClicked] = useState(0);
  const buttons = [" ادارة الكورسات ", "  تحليل البيانات "];

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
          {isClicked === 0 ? <CoursesManagement /> : <CoursesAnalysis />}
        </div>
      </div>
    </div>
  );
}
export default Courses;
