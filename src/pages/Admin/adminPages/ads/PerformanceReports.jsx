import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer ,  LabelList  } from "recharts";

function PerformanceReports(){
    const chartData = [
        { title: "كتاب   1" , value: 150 },
        { title: "كتاب  2", value: 120 },
        { title: "كتاب  3", value: 70 },
        { title: "كتاب  4", value: 100 },
        { title: "كتاب  5", value: 250 },
      ];
    
      return (
        <div className="show w-full flex justify-center">
          <div className="min-h-screen flex justify-center p-3 w-full">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-5xl h-[70%]">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">📈 الإعلانات الأكثر تفاعلًا</h2>
              <ResponsiveContainer width="95%" height={500}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                  <XAxis 
                    dataKey="title" 
                    tick={{ fill: '#555', fontSize: 14 }} 
                    interval={0} 
                    textAnchor="end" 
                    height={100} 
                  />
                  <YAxis tick={{ fill: '#555' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px' }} />
                  <Legend verticalAlign="top" align="right" />
                  <Bar dataKey="value" fill="#4CAF50" barSize={40} radius={[5, 5, 0, 0]}>
                    <LabelList dataKey="value" position="top" fill="#333" fontSize={14} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
       
      </div>
      );
}
export default PerformanceReports;