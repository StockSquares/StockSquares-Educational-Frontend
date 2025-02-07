import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";



const COLORS = ["#0088FE", "#FFBB28", "#FF8042"];

function Admin1() {
  const data = [
    { name: "الباقة الأساسية", value: 30 },
    { name: "الباقة المتوسطة", value: 40 },
    { name: "الباقة الاحترافية", value: 30 },
  ];
  return (
    <div className="container-fluid w-100  ">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-2 bg-red-800">superAdmin</div>
        <div className="col-span-10 bg-red-400">
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-orange-400">
              <h2>70.10M</h2>
              <p> اجمالي المبيعات</p>
            </div>
            <div className="bg-orange-200">
            <h2>100$</h2>
            <p> متوسط الاشتراك</p></div>
            <div className="bg-orange-400">
            <h2>11</h2>
            <p> اجمالي عدد الدول </p>
            </div>
            <div className="bg-orange-200">
            <h2>7700</h2>
            <p> اجمالي عدد الاشتراك </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-2 bg-slate-800">11</div>
        <div className="col-span-10 bg-slate-400">11</div>
      </div>

      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-2 bg-slate-200 flex flex-col gap-2">
            <button className="border-2"> الربع الأول </button>
            <button> الربع الثاني </button>
            <button> الربع الثالث </button>
            <button> الربع الرابع </button>
        </div>
        <div className="col-span-10 bg-slate-400">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-orange-400">
            <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={150}
        fill="#8884d8"
        dataKey="value"
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
            </div>
            <div className="bg-orange-200">22</div>
          </div>
          <div className="bg-orange-600">22</div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-2 ">
        <div className="col-span-2 bg-yellow-800">33</div>
        <div className="col-span-10 bg-yellow-400">33</div>
      </div>
    </div>
  );
}
export default Admin1;
