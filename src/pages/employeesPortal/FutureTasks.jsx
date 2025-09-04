import React from "react";
import { useState } from "react";

function FutureTasks() {
     const [tasks, setTasks] = useState([
                {
                  id: 1,
                  taskName: "أحمد علي",
                 date:"2/2/2025",
                  priority:"priority ",
                  state:"state",
                  endDate:"5/5/2027"
    
                },
                {
                  id: 2,
                  taskName: "أحمد علي",
                  date:"2/2/2025",
                  priority:"priority ",
                 state:"state",
                  endDate:"5/5/2027"
    
    
                },
                {
                  id: 3,
                  taskName: "أحمد علي",
                  date:"2/2/2025",
                  priority:"priority ",
                  state:"state",
                  endDate:"5/5/2027"
    
                },
              ]);
    return (
  
     <div className="mt-5 text-[9px] md:text-[15px] font-Cairo">
        <h1 className="font-semibold text-2xl text-center text-black mb-5">  📋المهمات المستقبليه  :- </h1>
        <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 shadow-lg rounded-lg">
              <thead className="bg-green-500 text-white">
                <tr>
                  <th className="p-3 border"> عنوان المهمه</th>
                  <th className="p-3 border">  تاريخ المهمه </th>
                  <th className="p-3 border"> الأولويه  </th>
                  <th className="p-3 border"> الحاله </th>
                  <th className="p-3 border">  تاريخ الانتهاء </th>

                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="text-center">
                    <td className="p-3 border">{task.taskName}</td>
                    <td className="p-3 border">{task.date}</td>
                   
                    <td className="p-3 border">{task.priority}</td>
                    <td className="p-3 border">{task.state}</td>
                    <td className="p-3 border">{task.endDate}</td>


                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    );
}

export default FutureTasks;
