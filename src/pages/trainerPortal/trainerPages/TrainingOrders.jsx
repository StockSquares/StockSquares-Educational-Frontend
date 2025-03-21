import LectureCard from "./LectureCard";

function TrainingOrders(){
    return(
       <div>
       <h1 className="font-Cairo text-3xl text-black text-center mt-3"> _______طلبات التدريب_______ </h1>
       <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
        <LectureCard subject={"البورصه المصريه"}  level={"مبتدئ"} traineeRequests={true} courseInterval={"18 ساعه | 4 محاضرات"}/>
        <LectureCard subject={"بورصه العملات المشفره "}  level={"متقدم"} traineeRequests={true} courseInterval={"36 ساعه | 8 محاضره"}/>
        <LectureCard subject={"البورصه العالميه"}  level={"محترف"} traineeRequests={true} courseInterval={"36 ساعه | 8 محاضره"}/>
       </div></div>
    );
}
export default TrainingOrders;