import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faStar, faUserTie } from "@fortawesome/free-solid-svg-icons";
import LectureCard from "./LectureCard";
import Style from "./Admin.module.css";
import { motion } from "framer-motion";
function Home() {
  const data = [
    { month: "يناير", hours: 16, teachers: 4 },
    { month: "فبراير", hours: 36, teachers: 8 },
    { month: "مارس", hours: 8, teachers: 4 },
  ];

  return (
  <div className="w-full min-h-screen font-Cairo px-4 sm:px-6 lg:px-12 bg-gray-50 dark:bg-transparent transition-colors duration-300 ">
      {/* Header */}
      <motion.div
      className="border border-gray-200 dark:border-gray-700 rounded-xl shadow-md w-full flex flex-col md:flex-row justify-between items-center p-8 bg-transparent text-white rounded-3xl shadow-2xl mt-6 "
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.div
        className="text-center md:text-left space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <div className="flex items-center justify-center md:justify-start gap-5 ">
          <FontAwesomeIcon icon={faUserTie} size="lg" className="text-black dark:text-white" />
          <motion.h1
            className="font-extrabold text-4xl text-black dark:text-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
          <span className="">  أهلاً، </span> <span className="text-[#02cd38]">عمرو مندور</span>
          </motion.h1>
        </div>
        <motion.p
          className="text-lg font-medium bg-[#007a20] px-20 py-2 rounded-full shadow-lg inline-block text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          لديك ٢ إشعار جديد
        </motion.p>
      </motion.div>

      <motion.div
        className="mt-6 md:mt-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.p
          className="text-xl font-semibold text-black dark:text-white"
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          متدرب
        </motion.p>
      </motion.div>
    </motion.div>

      {/* Next Lecture */}
      <motion.div
      className="border border-gray-200 dark:border-gray-700 mt-10 p-8 rounded-2xl bg-transparent shadow-2xl transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.h2
        className="text-center text-4xl font-extrabold text-[#02cd38] mb-8 tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        المحاضرة القادمة
      </motion.h2>
        <LectureCard
          subject="البورصة المصرية"
          trainee="زياد عبد الخالق"
          date="6d:5h:15s"
          level="محترف"
          className="dark:text-white"
        />
    </motion.div>

      {/* Main Sections */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* تقييم المدرب */}
        <div className="flex flex-col items-center justify-center gap-5 w-full p-6 bg-white dark:bg-transparent border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">تقييم المدرب</h2>
          <div className="flex gap-2 text-yellow-400 text-3xl">
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon key={i} icon={faStar} />
            ))}
          </div>
          <div className="flex justify-between w-full items-center mt-4 px-2">
            <p className="text-gray-700 dark:text-gray-300 font-medium underline">التعليقات</p>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-yellow-600">4.5 / 5</span>
              <FontAwesomeIcon icon={faCircleUser} size="2x" className="text-gray-700 dark:text-gray-300" />
            </div>
          </div>
        </div>

        {/* تقييم الأداء */}
        <div className="bg-white dark:bg-transparent border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md">
          <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white mb-6">تقييم أداء الكورسات المسجلة</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 dark:border-gray-700 text-center text-sm">
              <thead className="bg-green-500 dark:bg-green-700 text-white">
                <tr>
                  <th className="p-3 border">الشهر</th>
                  <th className="p-3 border">عدد الساعات</th>
                  <th className="p-3 border">عدد الكورسات</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="p-3 border text-gray-800 dark:text-gray-300">{item.month}</td>
                    <td className="p-3 border text-gray-800 dark:text-gray-300">{item.hours}</td>
                    <td className="p-3 border text-gray-800 dark:text-gray-300">{item.teachers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
