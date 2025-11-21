
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";

function PerformanceReports(){


 const topPartners = [
    { name: " اسم", level: " مدرب ", medal: "gold" },
    { name: " اسم", level: " شريك استراتيجي ", medal: "gold" },
    { name: "اسم ", level: " شريك فرعي ", medal: "gold" },
    { name: " اسم", level: " مدرب ", medal: "gold" },
    { name: " اسم", level: " شريك استراتيجي ", medal: "gold" },
    { name: "اسم ", level: " شريك فرعي ", medal: "gold" },
    { name: "اسم ", level: " شريك فرعي ", medal: "gold" },


  ];

  const newPartners = [
    { name: " اسم", level: " 52000$ ", },
    { name: " اسم", level: " 32000$  " },
    { name: "اسم ", level: "  22000$ " },
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
    { name: " اجمالي الشركاء ", value: 5 },
    { name: " اجمالي الاشتراكات ", value: 11000 },
    { name: " اجمالي العمولات ", value: 22000 },
  ];
  return (
    <div className="grid grid-cols-1 gap-3">
    <div className="grid grid-cols-3 mt-7 gap-2">
     
    </div>
    <div className="flex flex-col md:flex-row gap-7 py-8">
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold text-center bg-accent-900 text-black p-3 rounded-t-lg"> أفضل ٧ موظفين </h2>
        <table className="w-full border-collapse border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-accent-200 text-gray-700">
              <th className="border border-gray-300 px-4 py-2">🏅</th>
              <th className="border border-gray-300 px-4 py-2">الاسم</th>
              <th className="border border-gray-300 px-4 py-2">مستوى الشراكة</th>
            </tr>
          </thead>
          <tbody>
            {topPartners.map((partner, index) => (
              <tr key={index} className="bg-gray-50 dark:bg-dark-background hover:bg-gray-200 transition-all">
                <td className="border border-gray-300 px-4 py-2 text-center">{getMedalIcon(partner.medal)}</td>
                <td className="border border-gray-300 px-4 py-2">{partner.name}</td>
                <td className="border border-gray-300 px-4 py-2">{partner.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold text-center bg-primary-950 text-white p-3 rounded-t-lg">  الأكثر مبيعات</h2>
        <table className="w-full border-collapse border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-green-200 text-gray-700">
              <th className="border border-gray-300 px-4 py-2">الاسم</th>
              <th className="border border-gray-300 px-4 py-2"> المبيعات</th>
            </tr>
          </thead>
          <tbody>
            {newPartners.map((partner, index) => (
              <tr key={index} className="bg-gray-50 dark:bg-dark-background hover:bg-gray-200 transition-all text-center">
                <td className="border border-gray-300 px-4 py-2">{partner.name}</td>
                <td className="border border-gray-300 px-4 py-2">{partner.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );}


export default PerformanceReports;