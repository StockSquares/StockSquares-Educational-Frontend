import { Tabs } from "flowbite-react";
import { motion } from "framer-motion";
import businessRobot from "/src/assets/imgs/baser.png";
import { useAuth } from "../../Context/AuthContext";


function ChatAi() {
  const data = [
    {
      logo: "S",
      title: "السويدي للكابلات",
      name: "SWDY",
      state: "مغلق بربح",
    },
    {
      logo: "N",
      title: " النساجون الشرقيون",
      name: "ORWE",
      state: "فعاله",
    },
  ];

  // const { userData } = useAuth();
  // console.log(userData);
  
  if (!userData) return null;

  return (
    <div className="w-full mt-5 flex flex-col gap-5">
      <div>
        <div className="flex items-center gap-3 mr-5">
          <img src={businessRobot} className="w-[60px] h-[55px] ms-2" />
          <h2 className=" text-center">
            {" "}
            <span className="font-semibold"> أهلا وسهلا </span>{" "}
            <span className="text-primary-600 font-bold">{userData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]}</span> .. أنا بصير
            مساعدك الذكي للتداول في الأسواق الماليه{" "}
          </h2>

          
        </div>

        <div className="flex bg-gray-800 h-10 items-center overflow-hidden">
          <motion.div
            className="text-white font-semibold whitespace-nowrap "
            style={{ letterSpacing: "2px" }}
            initial={{ x: "-50%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          >
            طبيعه أسواق المال هي التذبذب في الأسعار و لذلك يعمل المتداولون
            المحترفون الي حجز الأرباح أولا بأول , ولتحقيق تداول ناجح قم بتغيير
            سعر وقف خساره الصفقه الي سعر فتح الصفقه بعد تحقيق الهدف الأول و
            يمكنك أيضا جني أرباح جزء من الصفقه لتحويل الربح من ربح عائم الي ربح
            محقق فعليا
          </motion.div>
        </div>
      </div>
      <div>
        <Tabs
          aria-label="Tabs with icons"
          variant="underline"
          // onActiveTabChange={handleAisle}
          className="flex justify-evenly"
        >
          <Tabs.Item active title=" البورصه المصريه ">
            <div className="flex gap-7 justify-center">
              {data.map((item) => (
                <div className="flex flex-col gap-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 w-[300px]">
                  <div className="flex flex-col gap-3 items-center text-center border-b border-gray-200 pb-4">
                    <h1 className="flex items-center gap-2 text-xl font-bold text-gray-800">
                      <span className="bg-accent-950 text-white rounded-full px-3 py-1 text-sm">
                        {item.logo}
                      </span>
                      {item.title}
                    </h1>
                    <h2 className="text-lg text-gray-700 font-medium">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      حالة الصفقة:{" "}
                      <span
                        className={
                          item.state === "فعاله"
                            ? "text-orange-500 font-bold"
                            : "text-primary-900 font-bold"
                        }
                      >
                        {item.state}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 text-gray-700">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <p className="font-semibold">شراء</p>
                      <p>-</p>
                      <p className="font-semibold">الربح الأول</p>
                      <p>-</p>
                      <p className="font-semibold">الربح الثاني</p>
                      <p>-</p>
                      <p className="font-semibold">الربح الثالث</p>
                      <p>-</p>
                      <p className="font-semibold">وقف الخسارة</p>
                      <p>-</p>
                    </div>
                    <p className="text-sm mt-4 text-right text-gray-500">
                      توقيت الصفقة
                    </p>
                  </div>
                </div>
              ))}

             
             
            </div>
          </Tabs.Item>
          <Tabs.Item active title=" البورصه السعوديه "></Tabs.Item>
          <Tabs.Item active title=" البورصه الاماراتيه "></Tabs.Item>
          <Tabs.Item active title=" البورصه العالميه "></Tabs.Item>
          <Tabs.Item active title="  بورصه العملات المشفره ">
          <div className="flex gap-7 justify-center">

          <div className="relative flex  flex-col gap-4 w-[300px] rounded-2xl shadow-inner bg-white/30 backdrop-blur-sm p-6 border border-gray-300">
                <div className="absolute inset-0 rounded-2xl z-10 flex flex-col gap-3 items-center justify-center">
                  <p className="text-red-600 font-bold text-center text-lg">
                    أنت لست مشترك في هذه الباقه
                  </p>
                  <button className="py-2 px-5 bg-primary-800 text-white rounded-lg hover:bg-primary-900"> اشترك الأن </button>
                </div>
                <div className=" blur-sm pointer-events-none">
                  <div className="flex flex-col gap-3 items-center text-center border-b border-gray-200 pb-4">
                    <h1 className="flex items-center gap-2 text-xl font-bold text-gray-800">
                      <span className="bg-accent-950 text-white rounded-full px-3 py-1 text-sm">
                        X
                      </span>
                      بورصة غير مفعلة
                    </h1>
                    <h2 className="text-lg text-gray-700 font-medium">XXXX</h2>
                    <p className="text-sm text-gray-600">
                      حالة الصفقة:{" "}
                      <span className="text-gray-500 font-bold">--</span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 text-gray-700">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <p className="font-semibold">شراء</p>
                      <p>-</p>
                      <p className="font-semibold">الربح الأول</p>
                      <p>-</p>
                      <p className="font-semibold">الربح الثاني</p>
                      <p>-</p>
                      <p className="font-semibold">الربح الثالث</p>
                      <p>-</p>
                      <p className="font-semibold">وقف الخسارة</p>
                      <p>-</p>
                    </div>
                    <p className="text-sm mt-4 text-right text-gray-500">
                      توقيت الصفقة
                    </p>
                  </div>
                </div>
              </div>
              </div>
          </Tabs.Item>
        </Tabs>
      </div>
      <div></div>
    </div>
  );
}
export default ChatAi;
