import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";

export default function FinanceAndBusinessLibrary() {
  return (
    <div className="w-full min-h-[80vh] mt-6">
      <div className="container m-auto flex flex-col gap-5">
        <div className="sliderCard w-full h-[30vh] bg-red-400"></div>
        <div className="flex items-center gap-2 mb-2 min-h-[35px]">
          <p className="font-semibold "> التصنيف عبر: </p>
          <select className="" style={{padding:"2px 35px"}}>
            <option> السعر </option>
            <option> الأحدث </option>
          </select>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5].map((card, idx) => (
            <div className="bookCard flex flex-col justify-between bg-red-200 h-[30vh]" key={idx}>
              <div className="bg-red-500 h-[60%]">
                <img />
              </div>
              <div className="p-2"> BookDetails is here </div>
              <div className="flex items-center gap-5 mb-1 p-2">
                <button className="bg-red-300 px-5 py-1 rounded-lg transition-all border-2 border-red-300 hover:bg-red-100 "> اضافه الي العربه </button>
                <FontAwesomeIcon icon={faHeart} size="lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
