import React, { useState } from "react";
import image from "../../assets/imgs/book1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
function Cart() {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity(quantity + 1);
  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="container  mt-5  m-auto">
    <h1 className="text-xl font-semibold text-center mb-3"> اتمام عمليه الشراء </h1>
    <hr className="bg-accent-300 w-[110px] m-auto h-[3px] mb-7" />
    <div className="flex gap-4">
      <div className="flex flex-col w-full ">
        <div className="grid grid-cols-5 justify-items-center">
          <p> المنتج</p>
          <p> الاسم </p>
          <p> الكميه </p>
          <p> السعر </p>
        </div>
        <div className="w-full h-full flex  items-start  border-b-2 pb-2">
          <div className="flex flex-col justify-between ">
            <div className="grid grid-cols-5 gap-7 justify-items-center items-center ">
              <div className="image w-[80px] rounded-lg mt-2 overflow-hidden ">
                <img
                  src={image}
                  alt="book-image"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="name flex flex-col  ">
                {/* <p className="text-sm text-gray-400">الاسم</p> */}
                <p className="text-lg">bookName</p>
              </div>
              <div className="count flex flex-col  ">
                {/* <p className="text-sm text-gray-400">الكميه</p> */}
                <p className="text-lg">x1</p>
              </div>
              <div className="price flex flex-col   ">
                {/* <p className="text-sm text-gray-400">السعر</p>{" "} */}
                <p className="text-lg">150$</p>{" "}
              </div>
              <FontAwesomeIcon icon={faTrash} className="text-red-500" />
            </div>
            <div className="btns  flex justify-end items-center gap-5">
              <button
                className="px-5 rounded-lg bg-primary-800 text-white text-lg"
                onClick={increase}
              >
                {" "}
                +{" "}
              </button>
              <p className="text-lg font-semibold">{quantity}</p>
              <button
                className="px-5 rounded-lg bg-gray-200 text-lg"
                onClick={decrease}
              >
                {" "}
                -{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-primary-50 p-3 rounded-md shadow-md">
        <p className="text-lg font-semibold">اختر طريقه الدفع</p>
        <div className="flex items-center mt-4 gap-3 *:px-3 *:py-1 *:rounded-lg">
          <div className="bg-primary-300 text-gray-950">بطاقه بنكيه</div>
          <div className="bg-primary-300 text-gray-950">محفظه الكترونيه</div>
          <div className="bg-primary-300 text-gray-950">تقسيط</div>
        </div>
      </div>
    </div></div>
  );
}

export default Cart;
