import React from "react";
import Spline from "@splinetool/react-spline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Style from "../../../pages/Admin/Admin.module.css";
import { motion } from "framer-motion";

function HomeComponent() {
  return (
    <div className={`${Style.mainContent} p-0 md:px-1 md:py-1 `}>
      <div className={`${Style.header} flex-col md:flex-row`}>
        <div className={Style.userInfo}>
          <div className={`${Style.useralign} flex-col md:flex-row`}>
            <div className={Style.activate}>
              <FontAwesomeIcon icon={faCircleUser} className={Style.userIcon} />
              <span></span>
            </div>
            <span className={Style.userText}>
              اهلا :<span> طارق الليثي</span>
            </span>
          </div>
          <div className={Style.userDetails}>
            <p className={Style.userEmail}>tarek.ellath@gmail.com</p>
          </div>
        </div>
        <p className={` ${Style.userCount} shadow-md p-2 rounded-lg bg-gray-100 text-lg font-semibold`}>  استشاري تطوير الأعمال </p>
      </div>

      <div className="p-1 lg:p-6 space-y-6 flex flex-col bg-gray-100 min-h-screen">
        <motion.div
          className="bg-yellow-200 w-full lg:w-[15%] p-2 self-end shadow-md rounded-lg text-center font-semibold cursor-pointer hover:bg-yellow-300 flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.05 }} 
        >
          <motion.span
            className="text-2xl"
            whileHover={{ x: [0, -2, 2, -2, 2, 0] }}
            transition={{ repeat:Infinity, duration: 0.2 }}
          >
            🔔
          </motion.span>
          <span>لديك 3 مهام قادمة</span>
        </motion.div>

        {/* مخطط الأداء الشهري */}
        <div className="bg-white p-2 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-3 mt-1">مخطط الأداء الشهري</h2>
          <table className="w-full border text-[11px] md:text-lg border-gray-300">
            <thead>
              <tr className="bg-[#008824ab]">
                <th className="border p-2">الشهر</th>
                <th className="border p-2">الصفقات الناجحة</th>
                <th className="border p-2">صفقات فاشلة</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">يناير</td>
                <td className="border p-2">20</td>
                <td className="border p-2">2</td>
              </tr>
              <tr>
                <td className="border p-2">فبراير</td>
                <td className="border p-2">15</td>
                <td className="border p-2">5</td>
              </tr>
              <tr>
                <td className="border p-2">مارس</td>
                <td className="border p-2">25</td>
                <td className="border p-2">3</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* مخطط أداء الفرص */}
        <div className="bg-white p-2 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-3 mt-1">مخطط أداء الفرص</h2>
          <table className="w-full border border-gray-300 text-[11px] md:text-lg">
            <thead>
              <tr className="bg-[#008824ab]">
                <th className="border p-2">المرحلة الفرصة</th>
                <th className="border p-2">النسبة المئوية</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">الدعم</td>
                <td className="border p-2">30%</td>
              </tr>
              <tr>
                <td className="border p-2">المرونة</td>
                <td className="border p-2">20%</td>
              </tr>
              <tr>
                <td className="border p-2">الإغلاق</td>
                <td className="border p-2">50%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* مخطط الأداء المالي */}
        <div className="bg-white p-2 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-3 mt-1">مخطط الأداء المالي</h2>
          <table className="w-full border border-gray-300 text-[11px] md:text-lg">
            <thead>
              <tr className="bg-[#008824ab]">
                <th className="border p-2">الأسبوع</th>
                <th className="border p-2">القيمة المالية (دولار)</th>
                <th className="border p-2">متوسط الصفقات (أيام)</th>
                <th className="border p-2">عدد الصفقات الناجحة</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">1-7 يناير</td>
                <td className="border p-2">50,000</td>
                <td className="border p-2">15</td>
                <td className="border p-2">25</td>
              </tr>
              <tr>
                <td className="border p-2">1-7 فبراير</td>
                <td className="border p-2">40,000</td>
                <td className="border p-2">12</td>
                <td className="border p-2">22</td>
              </tr>
              <tr>
                <td className="border p-2">1-15 مارس</td>
                <td className="border p-2">60,000</td>
                <td className="border p-2">10</td>
                <td className="border p-2">20</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* مخطط النشاطات اليومية */}
        <div className="bg-white p-2 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-3 mt-1">مخطط النشاطات اليومية</h2>
          <table className="w-full border border-gray-300 text-[11px] md:text-lg">
            <thead>
              <tr className="bg-[#008824ab]">
                <th className="border p-2">اليوم</th>
                <th className="border p-2">المكالمات</th>
                <th className="border p-2">الاجتماعات</th>
                <th className="border p-2">البريد الإلكتروني/الرسائل</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">1مارس</td>
                <td className="border p-2">40</td>
                <td className="border p-2">2</td>
                <td className="border p-2">30</td>
              </tr>
              <tr>
                <td className="border p-2">2مارس</td>
                <td className="border p-2">50</td>
                <td className="border p-2">0</td>
                <td className="border p-2">20</td>
              </tr>
              <tr>
                <td className="border p-2">3مارس</td>
                <td className="border p-2">30</td>
                <td className="border p-2">1</td>
                <td className="border p-2">50</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HomeComponent;
