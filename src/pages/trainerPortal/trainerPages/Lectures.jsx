import LectureCard from "./LectureCard";

function Lectures(){
    return(
        <div className="w-[100%]">
        <div className="w-100 text-center mt-3 mb-10  font-Cairo text-2xl ">
        <h1 className="text-black font-semibold dark:text-dark-text " >  المحاضرات  </h1>

        </div>

        <div className="grid  md:grid-cols-2 grid-cols-1">
        <LectureCard  subject={"البورصه العالميه"} trainee={"زياد عبد الخالق "} date={"6d:5h:15s"} level={"متقدم"}/>
        <LectureCard subject={" البورصه السعوديه "} trainee={"زياد عبد الخالق "} date={"6d:5h:15s"} level={"مبتدئ"}/>
        <LectureCard subject={"البورصه المصريه"} trainee={"زياد عبد الخالق "} date={"6d:5h:15s"} level={"محترف"}/>
        <LectureCard  subject={" البورصه العالميه "} trainee={"زياد عبد الخالق "} date={"6d:5h:15s"} level={"متقدم"}/>


        </div>

               


        </div>
        

    );
}
export default Lectures;