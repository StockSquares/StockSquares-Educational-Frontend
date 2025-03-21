import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShare } from "@fortawesome/free-solid-svg-icons";
import investor from "/src/assets/imgs/investor.jpg";
import prog from "/src/assets/imgs/programming.jpg";
function Activities() {
  const data = [
    {
      image:  investor ,
      text: " ستوك سكويرز تطلق مبادره تدريب و تأهيل 1000 مستثمر ",
    },
    {
      image: prog ,
      text: " ستوك سكويرز تطلق مبادره تدريب مبرمجين المستقبل ",
    },
  ];
  return (
    <div className="mt-7">
      <h1 className="text-2xl font-bold w-[300px] p-2 rounded-l-3xl bg-accent-800"> الأنشطه والفعاليات </h1>
      <div className="grid grid-cols-1  p-4 gap-4 mt-7 justify-center md:grid-cols-2">
      {data.map((card)=>(
        <div className="bg-white h-60 rounded-2xl mt-5 shadow-xl w-[85%] overflow-hidden">
        <div className="h-40 w-full overflow-hidden duration-150 hover:scale-110 ">
          <img
            src={card.image}
            alt="Placeholder"
            className="h-full w-full object-cover "
          />
          </div>
          <div className="flex bg-gray-800 h-10 items-center overflow-hidden">
            <motion.div
              className="text-white font-semibold whitespace-nowrap "
              style={{letterSpacing:"2px"}}
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            >
              {card.text}
            </motion.div>
          </div>

          {/* Bottom Icons */}
          <div className="flex justify-between p-2 items-center">
            <span className="text-primary-950 text-md font-bold">١٠٠٠ مشاهدة</span>
            <div className="flex gap-3">
              <FontAwesomeIcon
                icon={faHeart}
                size="lg"
                className="text-red-500 cursor-pointer"
              />
              <FontAwesomeIcon
                icon={faShare}
                size="lg"
                className="text-blue-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
    ))}
      </div>
    </div>
  );
}

export default Activities;
