import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import shareImg from "../../../assets/ShareLink.gif";
import { useState } from "react";
import facebook from "../../../assets/imgs/facebook.webp";
import snapshot from "../../../assets/imgs/snapshot.png";
function PromotionalLink() {
  const [link, setLink] = useState("www.stocksquares.com");
  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-2 justify-between  container ">
        <div className="space-y-5 mt-[5%] text-center sm:text-start">
          <h2 className="mb-2 text-primary-800 font-semibold text-2xl sm:text-3xl ">
            {" "}
            شارك الرابط التالي واربح عمولات فوريه{" "}
          </h2>
          <p className="text-blue-800 text-lg">
            {link}
            <FontAwesomeIcon
              icon={faCopy}
              size="lg"
              className="ms-2"
              onClick={() => {
                navigator.clipboard.writeText(link);
              }}
            />
          </p>
          <p className="mb-5"> مجموع الأرباح : </p>
          <p className="text-primary-800 font-bold text-2xl border-2 border-primary-500 rounded-lg px-2 w-[20%] text-center bg-gray-50 m-auto sm:m-0">
            {" "}
            60 ${" "}
          </p>
          <p> شارك الرابط عبر: </p>
          <div className="flex justify-center sm:justify-start ">
            <img src={facebook} className="w-[70px] h-[70px]  " />
            <img src={snapshot} className="w-[70px] h-[70px]  " />
          </div>
        </div>

        <div className=" w-full sm:w-[30%]">
          <img
            src={shareImg}
            className="w-full h-full overflow-hidden hidden sm:block object-contain"
          />
        </div>
      </div>
    </div>
  );
}
export default PromotionalLink;
