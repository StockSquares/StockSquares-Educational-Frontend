import React from "react";

// Internal Imports (components, Assets, and Styles)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faUser } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

function FlexibleCard({
  category = "",
  title = "",
  LinkTo = "",
  blogImg = "",
}) {
  return (
    <div className="flex flex-col p-5 bg-gray-100">
      <div className="grid grid-cols-2 gap-10 mt-5 max-w-screen-lg ms-[6%]">
        <div className="flex flex-col items-start">
          <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg">
            <Link to={LinkTo}>
            {console.log("ok")}
              <img
                src={blogImg}
                alt="Investment"
                className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-110"
              />
            </Link>
            <h5 className="absolute top-0 right-0 py-2 px-3 text-white  font-bold bg-darkgray">
              {category}{" "}
            </h5>

            <h5 className="absolute bottom-0 left-0 w-full py-2 text-white bg-gradient-to-t from-primary-800 to-transparent text-center font-bold">
              {title}
            </h5>
          </div>
          <div className="mt-4 flex justify-between items-center w-full">
            <div className="flex items-center text-sm text-gray-500 gap-3">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} className="text-primary-700" />
                <span>طارق الليثي</span>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faEye} className="text-primary-700" />
                <span>1000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center bg-gray-200 rounded-lg shadow-lg h-64">
          <h1 className="text-xl font-bold text-gray-600">AD</h1>
        </div>
      </div>
    </div>
  );
}

export default FlexibleCard;
