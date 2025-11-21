import { useState } from "react";
import { motion } from "framer-motion";

function LectureCard({ subject, trainee, date, level, traineeRequests = false, courseInterval }) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
<motion.div
  className="w-full  mx-auto flex flex-col items-center mt-2 mb-5 px-3 font-Cairo dark:text-white"
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: "easeOut" }}
>
  <motion.div
    className="w-full flex flex-col dark:text-white"
    initial={{ scale: 0.9 }}
    animate={{ scale: 1 }}
    transition={{ delay: 0.4, duration: 0.8 }}
  >
    <div className="bg-gray-100 w-full p-4 sm:p-6 shadow-md rounded-lg dark:bg-transparent  transition-colors relative">
      {/* البادج */}
      <div className={`absolute top-4 left-0 px-3 py-1 text-xs sm:text-sm font-semibold rounded-md text-white z-10
        ${subject.trim() === "البورصة المصرية" ? "bg-red-600" :
        subject.trim() === "البورصه السعوديه" ? "bg-green-600" :
        subject.trim() === "بورصه العملات المشفره" ? "bg-purple-950" : "bg-blue-600"}`}
      >
        {subject}
      </div>

      {/* اسم المدرب والمستوى */}
      <h1 className="text-gray-600 lg:text-2xl md:mt-2 sm:text-lg  sm:mt-8 px-2 dark:text-gray-300 font-bold">
        {trainee ? (
          <>
            اسم المدرب:{" "}
            <span className="text-[#02cd38] me-2 font-bold">
              {trainee}
            </span>
            |
          </>
        ) : "مستوي الكورس:"}
        <span
          className={`ms-2 font-bold text-sm sm:text-base md:text-lg ${
            level === "محترف"
              ? "text-red-600"
              : level === "متقدم"
              ? "text-orange-400"
              : "text-green-500"
          }`}
        >
          {level}
        </span>
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2 mt-3 py-3">
        {traineeRequests ? (
          <p className="text-base text-gray-600 dark:text-gray-300">
            مدة الكورس:{" "}
            <span className="text-black  lg:text-2xl  font-semibold dark:text-white">{courseInterval}</span>
          </p>
        ) : (
          <p className="text-2xl dark:text-gray-300  font-bold">
            <span className="lg:text-2xl font-bold text-sm text-dark dark:text-white">متبقي من الزمن : </span><span className="text-green-500">{date}</span> 
          </p>
        )}

        {!traineeRequests && (
          <motion.button
            className="w-full sm:w-auto px-4 py-2 bg-white text-black border-2 border-green-500 rounded-lg hover:bg-green-600 hover:text-white dark:bg-gray-700 dark:text-white dark:hover:bg-green-600 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            انضم الآن
          </motion.button>
        )}
      </div>

      {/* الطلبات */}
      {traineeRequests && (
        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center text-white relative p-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <motion.button
            className="px-4 py-2 bg-green-700 rounded-lg hover:bg-green-800 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            قبول الطلب
          </motion.button>
          <motion.button
            className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
            onClick={() => setShowConfirm(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            رفض الطلب
          </motion.button>

          {showConfirm && (
            <motion.div
              className="bg-white dark:bg-gray-800 text-center p-4 rounded-md shadow-lg border border-red-700 absolute left-[2vw] z-10 transition-all"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-black dark:text-white mb-3">هل أنت متأكد؟</p>
              <button className="px-4 py-1 me-3 bg-red-700 text-white rounded-lg hover:bg-red-800">
                نعم
              </button>
              <button className="px-4 py-1 rounded-lg bg-gray-100 text-black hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                لا
              </button>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  </motion.div>
</motion.div>

  );
}

export default LectureCard;
