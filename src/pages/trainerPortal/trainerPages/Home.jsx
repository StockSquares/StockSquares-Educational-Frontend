import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faStar,
  faUser,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import LectureCard from "./LectureCard";

function Home() {
  const data = [
    { month: "يناير", hours: 16, teachers: 4 },
    { month: "فبراير", hours: 36, teachers: 8 },
    { month: "مارس", hours: 8, teachers: 4 },
  ];

  return (
    <div className="w-full min-h-screen font-Cairo  px-4 sm:px-6 lg:px-12">
      <div className="w-full flex flex-col md:flex-row justify-between items-center bg-primary-200 p-4 shadow-md rounded-lg mt-4 border border-green-500">
        <div className="text-center md:text-right">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <FontAwesomeIcon
              icon={faUserTie}
              size="lg"
              className="text-black"
            />
            <h1 className="font-bold text-xl sm:text-2xl">
              اهلا: <span className="text-green-500">عمرو مندور</span>
            </h1>
          </div>
          <p className="mt-2  text-lg bg-yellow-200 px-4 py-1 rounded-md shadow-md inline-block">
            لديك ٢ طالب جديد
          </p>
        </div>
        <p className="mt-4 md:mt-0 text-xl text-gray-700">مدرب شريك</p>
      </div>

      <div className="mt-6">
        <h1 className="text-center text-2xl ">المحاضرة القادمة</h1>
        <LectureCard
          subject={"البورصه المصريه"}
          trainee={"زياد عبد الخالق "}
          date={"6d:5h:15s"}
          level={"محترف"}
        />
      </div>

      <div className="mt-6 bg-white  rounded-lg grid md:grid-cols-2 gap-6 items-end ">
        {/* قسم تقييم المتدربين */}
        <div className="flex flex-col items-center justify-center gap-4 w-full p-6 bg-primary-200 border border-green-500">
          <h1 className="text-2xl font-bold text-gray-700">تقييم المتدربين </h1>
          <div className="flex mt-3 gap-2 text-yellow-400 text-3xl">
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon key={i} icon={faStar} />
            ))}
          </div>
          <div className="flex justify-between w-full items-center mt-4 px-4">
            <p className="font-semibold underline text-gray-700">التعليقات</p>
            <div className="flex items-end gap-2">
              <span className="text-lg font-semibold">
                {" "}
                <span className="text-yellow-600">4.5</span>/5{" "}
              </span>
              <FontAwesomeIcon
                icon={faCircleUser}
                size="2x"
                className="text-black"
              />
            </div>
          </div>
        </div>

        {/* قسم تقييم الأداء */}
        <div className=" ">
          <h2 className="text-center text-2xl font-bold text-gray-700 mb-4">
            تقييم الأداء
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[300px] shadow-md bg-white">
              <thead className="bg-green-500 text-white text-lg">
                <tr className="text-sm md:text-lg">
                  <th className="border border-gray-400 p-3">الشهر</th>
                  <th className="border border-gray-400 p-3">عدد الساعات</th>
                  <th className="border border-gray-400 p-3">عدد المتدربين</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100 text-center">
                    <td className="border border-gray-400 p-3">{item.month}</td>
                    <td className="border border-gray-400 p-3">{item.hours}</td>
                    <td className="border border-gray-400 p-3">
                      {item.teachers}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Performance Evaluation */}
    </div>
  );
}

export default Home;
