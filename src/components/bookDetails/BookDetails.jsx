import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHeart } from "@fortawesome/free-solid-svg-icons";

import style from "./BookDetails.module.css";
import { useState } from "react";
function BookDetails() {
  const [count, setCount] = useState(0);
  return (
    <div className="main w-[100%] ">
      <div className="container mt-5">
        <div className="content grid grid-cols-2 h-100">
          <div className=" p-3 flex flex-col items-start gap-5">
            <h1 className="text-3xl font-bold mb-5"> عنوان الكتاب </h1>
            <p> وصف مفصل للكتاب </p>

            {/* <div className="flex">
              <FontAwesomeIcon icon={faHeart} className="text-red-500" />

              <FontAwesomeIcon icon={faHeart} className="text-red-500" />
            </div> */}
            <div className="flex items-center mt-5">
              <button onClick={() => (count >= 0 ? setCount(count + 1) : "")} className="px-2 rounded-md  bg-primary-900 text-white font-bold text-xl ">
                +
              </button>
              <p className="px-5 font-bold "> {count} </p>
              <button onClick={() => (count > 0 ? setCount(count - 1) : "")} className="px-2 rounded-md  bg-primary-900 text-white font-bold text-xl ">
                -
              </button>
            </div>
            <button className={style.btnn}>اضافه الي السله  </button>

            <div className="flex flex-col items-start w-[150px] ">
                <div className={`bg-yellow-100 w-[30px] ${style.yellowAnimation1}`} ><span className="text-yellow-100">.</span></div>
                <div className={`bg-yellow-200 w-[60px] ${style.yellowAnimation2}`}><span className="text-yellow-200">.</span></div>
                <div  className={`bg-yellow-300 w-[80px] ${style.yellowAnimation3}`}><span className="text-yellow-300">.</span></div>
            </div>

          </div>
          <div className=" flex justify-center p-5  flex-row-reverse ">
          <div className="flex items-start">
          <div className="flex  w-[150px] flex-col-reverse items-end">
           <div className={`bg-yellow-100 w-[30px] ${style.yellowAnimation1}`} ><span className="text-yellow-100">.</span></div>
                <div className={`bg-yellow-200 w-[60px] ${style.yellowAnimation2}`}><span className="text-yellow-200">.</span></div>
                <div  className={`bg-yellow-300 w-[80px] ${style.yellowAnimation3}`}><span className="text-yellow-300">.</span></div>
            </div>
            </div>






            <img src="/src/assets/imgs/bookstore/book-bg.jpg"  className="rounded-md"/>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BookDetails;
