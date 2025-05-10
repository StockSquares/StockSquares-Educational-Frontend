import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";

function Main(){
     const topClients = [
       { name: " اسم", level: " -- ", medal: "gold" },
       { name: " اسم", level: " --", medal: "silver" },
       { name: "اسم ", level: " -- ", medal: "bronze" },
     ];
   
     const newClients = [
       { name: " اسم", level: " -- ", },
       { name: " اسم", level: " --" },
       { name: "اسم ", level: " -- " },
     ];
   
     const getMedalIcon = (medal) => {
       const colors = {
         gold: "text-yellow-500",
         silver: "text-gray-400",
         bronze: "text-orange-500",
       };
       return (
         <FontAwesomeIcon icon={faMedal} className={`text-xl ${colors[medal]}`} />
       );
     };
     const total = [
       { name: " اجمالي الزبائن ", value: 5 },
       { name: " اجمالي عدد الاشتراكات ", value: 60 },
       { name: " اجمالي قيمه الاشتراكات ", value: 22000 },
     ];
     return (
       <div className="grid grid-cols-1 gap-3">
       <div className="grid grid-cols-1 md:grid-cols-3 mt-7 gap-2">
         {total.map((item, idx) => (
           <div
             key={idx}
             className=" text-center shadow-md border-l-2 border-green-500  p-2 "
           >
             <h2 className=" mb-2 text-xl font-bold bg-gradient-to-r from-yellow-300  to-green-500 bg-clip-text text-transparent text-center">
               {item.name}
             </h2>
             <p className="text-xl font-semibold">{item.value}</p>
           </div>
         ))}
       </div>
       <div className="flex flex-col md:flex-row gap-7 py-8">
         <div className="w-full md:w-1/2">
           <h2 className="text-xl font-semibold text-center bg-accent-900 text-black p-3 rounded-t-lg">الأكثر فاعلية</h2>
           <table className="w-full border-collapse border border-gray-300 shadow-lg">
             <thead>
               <tr className="bg-accent-200 text-gray-700">
                 <th className="border border-gray-300 px-4 py-2">🏅</th>
                 <th className="border border-gray-300 px-4 py-2">الاسم</th>
                 <th className="border border-gray-300 px-4 py-2"> الخدمات</th>
               </tr>
             </thead>
             <tbody>
               {topClients.map((partner, index) => (
                 <tr key={index} className="bg-gray-50 hover:bg-gray-200 transition-all">
                   <td className="border border-gray-300 px-4 py-2 text-center">{getMedalIcon(partner.medal)}</td>
                   <td className="border border-gray-300 px-4 py-2">{partner.name}</td>
                   <td className="border border-gray-300 px-4 py-2">{partner.level}</td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
   
         <div className="w-full md:w-1/2">
           <h2 className="text-xl font-semibold text-center bg-primary-950 text-white p-3 rounded-t-lg">الزبائن الأحدث انضمامًا</h2>
           <table className="w-full border-collapse border border-gray-300 shadow-lg">
             <thead>
               <tr className="bg-green-200 text-gray-700">
                 <th className="border border-gray-300 px-4 py-2">الاسم</th>
                 <th className="border border-gray-300 px-4 py-2"> الخدمات</th>
               </tr>
             </thead>
             <tbody>
               {newClients.map((partner, index) => (
                 <tr key={index} className="bg-gray-50 hover:bg-gray-200 transition-all">
                   <td className="border border-gray-300 px-4 py-2">{partner.name}</td>
                   <td className="border border-gray-300 px-4 py-2">{partner.level}</td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </div>
       </div>
     );
}
export default Main;