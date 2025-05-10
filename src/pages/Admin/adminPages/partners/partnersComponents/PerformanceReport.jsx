import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";
import style from "../../adminPages.module.css"


function PerformanceReport(){


    const dataByDuration = [
        { name: "يناير", value: 400 },
        { name: "فبراير", value: 300 },
        { name: "مارس", value: 500 },
        { name: "ابريل", value: 700 },
        { name: "مايو", value: 900 }
      ];
    
      const dataBySubscription = [

        { name: "عادي", value: 200 },
        { name: "بريميوم", value: 450 },
        { name: "VIP", value: 600 },
      ];
    
      const dataByRevenue = [

        { name: "الخطة A", value: 1000 },
        { name: "الخطة B", value: 1500 },
        { name: "الخطة C", value: 800 },
        { name: "الخطة D", value: 900 },
        { name: "الخطة E", value: 600 },

      ];
    
      const [chartData, setChartData] = useState(dataByDuration);
      const [activeButton,setActiveButton]=useState("duration");
    
      return (
        <div className="w-full max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
        <div className="flex justify-center gap-5 mb-4 ">

            <button onClick={() =>{ setChartData(dataByDuration); setActiveButton("duration")}}
             className={activeButton === "duration" ? style.performancBtnActivated : style.performanceBtn }>حسب المدة</button>
            
            <button onClick={() => {setChartData(dataBySubscription); setActiveButton("subscription")}}
            className={activeButton === "subscription" ? style.performancBtnActivated : style.performanceBtn }>حسب الاشتراك</button>
            
            <button onClick={() => {setChartData(dataByRevenue); setActiveButton("revenue")}}
            className={activeButton === "revenue" ? style.performancBtnActivated : style.performanceBtn }>حسب الأرباح</button>
          </div>
    
          <ResponsiveContainer width="105%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={"value"}
               fill="#8bd680" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );

}
export default PerformanceReport;