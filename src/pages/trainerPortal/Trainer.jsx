import Home from "./trainerPages/Home"
import EducationalSubjects from "./trainerPages/EducationalSubjects"
import FinancialTransactions from "./trainerPages/FinancialTransactions"
import Lectures from "./trainerPages/Lectures"
import PerformanceReports from "./trainerPages/PerformanceReports"
import PromotionalLink from "./trainerPages/PromotionalLink"
import TraineesQuestions from "./trainerPages/TraineesQuestions"
import TrainingOrders from "./trainerPages/TrainingOrders"
import { Routes, Route, Link,useLocation } from "react-router-dom";
import React, { useState } from "react";
import Style from "../Admin/Admin.module.css";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons"

function Trainer(){
    const location = useLocation();
     const [isHovered, setIsHovered] = useState(false);
   
     const menuItems = [
       { name: "الرئيسية", path: "/Trainer" },
       {
         name: " المحاضرات ",
         
         path: "/Trainer/Lectures",
       },
       {
         name: "  طلبات التدريب",
        
         path: "/Trainer/TrainingOrders",
       },
       { name: " المواد التعليميه", path: "/Trainer/EducationalSubjects" },
       {
         name: " تقارير الاداء ",
         
         path: "/Trainer/PerformanceReports",
       },
       {
         name: " المعاملات الماليه ",
         
         path: "/Trainer/FinancialTransactions",
       },
       {
         name: " الرابط الترويجي ",
         
         path: "/Trainer/PromotionalLink",
       },
       {
        name: " اسئله المتدربين  ",
        
        path: "/Trainer/TraineesQuestions",
      },
      
     ];
   
     return (
       <div className={Style.container}>
         {/* <div
           className={`${Style.sidebar} ${isHovered ? Style.expanded : ""}`}
           onMouseEnter={() => setIsHovered(true)}
           onMouseLeave={() => setIsHovered(false)}
         >
         <FontAwesomeIcon icon={faCircle} size="lg" className="border-2 border-green-600 rounded-xl animate-pulse"/>
           {isHovered && (
             <ul>
               {menuItems.map((item) => (
                 <li
                   key={item.name}
                   className={location.pathname === item.path ? Style.active : ""}
                 >
                   <Link to={item.path} className={Style.link}>
                     
                     {isHovered && (
                       <span className={Style.menuText}>{item.name}</span>
                     )}
                   </Link>
                 </li>
               ))}
             </ul>
           )}
         </div> */}
   
         <div className="flex flex-col w-full min-h-[100vh] py-[5px] px-[30px]">
           <Routes>
             <Route index element={<Home />} />
             <Route
               path="EducationalSubjects"
               element={<EducationalSubjects />}
             />
             <Route path="FinancialTransactions" element={<FinancialTransactions />} />
             <Route path="Lectures" element={<Lectures />} />
             <Route path="PerformanceReports" element={<PerformanceReports />} />
             <Route path="PromotionalLink" element={<PromotionalLink />} />
             <Route path="TraineesQuestions" element={<TraineesQuestions />} />
             <Route path="TrainingOrders" element={<TrainingOrders />} />
           </Routes>
         </div>
       </div>
     );

}
export default Trainer;