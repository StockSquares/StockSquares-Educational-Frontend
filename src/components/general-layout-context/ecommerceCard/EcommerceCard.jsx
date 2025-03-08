import React from "react";
import { ROUTES } from "../../../routes";
import { Link } from "react-router-dom";

function EcommerceCard({ productImg, productName, price, rating }) {
  return (
    <div className="flex flex-col max-w-md bg-white rounded-lg shadow-lg overflow-hidden border">
      <div className="">
        <img
          src={productImg}
          alt={productName}
          className="object-cover w-full h-full"
        />
      </div>

      <div className=" p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{productName}</h3>
          <p className="text-xl font-bold text-primary-700">${price}</p>
        </div>

        <Link to={ROUTES.BOOKDETAILS}>

        <button className="mt-4 w-full bg-primary-900 text-white py-2 rounded-md hover:bg-primary-700 transition" >

        المزيد من التفاصيل 
        </button>
        </Link>
      </div>
    </div>
  );
}

export default EcommerceCard;
