import {
  faBasketShopping,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import { Modal } from "../../components";

export default function FinanceAndBusinessLibrary() {
  const navigate = useNavigate();
  const [open, setIsOpen] = useState(false);

  return (
    <>
      {open && <Modal>book details</Modal>}

      <div className="w-full min-h-[80vh] mt-6">
        <div className="fixed  p-1">
          <span className="bg-primary-600 absolute left-0 px-2 top-0 rounded-full">
            0
          </span>
          <FontAwesomeIcon
            icon={faBasketShopping}
            onClick={() => navigate(ROUTES.CART)}
            className="text-2xl ms-2 border-2 rounded-full px-3 py-3 "
          />
        </div>
        {/* <div className="fixed mt-16 p-1">
        <span className="bg-red-400 absolute left-0 px-2 top-0 rounded-full">
          0
        </span>
        <FontAwesomeIcon
          icon={faHeart}
          className="text-2xl ms-2 border-2 rounded-full px-3 py-3 "
        />
      </div> */}
        <div className="container m-auto flex flex-col gap-5">
          <div className="sliderCard w-full h-[30vh] bg-primary-400"></div>
          <div className="flex flex-col items-start gap-2 mb-2 min-h-[35px]">
            <p className="font-semibold "> التصنيف عبر: </p>
            <ul className="flex gap-2 items-center  *:border-2 *:border-primary-400 *:rounded-lg *:p-1">
              <li className="bg-primary-400"> الكل </li>
              <li className="bg-gray-50"> الأكثر شراء </li>
              <li className="bg-gray-50"> نسخه مادية أصليه </li>
              <li className="bg-gray-50"> نسخه رقمية ابداعيه </li>
            </ul>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5].map((card, idx) => (
              <div
                className="bookCard flex flex-col justify-between bg-gray-50 h-[30vh]"
                key={idx}
              >
                <div className="bg-primary-500 relative h-[60%]">
                  <FontAwesomeIcon
                    icon={faSquarePlus}
                    className="absolute bottom-0 right-0 text-xl"
                    onClick={() => setIsOpen(true)}
                  />
                  <span className="absolute top-0 left-0 px-1 rounded-br-lg bg-primary-300">
                    category
                  </span>
                  <img />
                </div>
                <div className="p-2"> BookDetails is here </div>
                <div className="flex items-center mb-1 p-2">
                  <button className="bg-primary-500 px-5 py-1 rounded-lg transition-all border-2 border-primary-300 hover:bg-primary-100 ">
                    {" "}
                    اضافه الي العربه{" "}
                    <FontAwesomeIcon icon={faBasketShopping} className="mx-1" />
                  </button>
                  {/* <FontAwesomeIcon icon={faHeart} size="lg" /> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
