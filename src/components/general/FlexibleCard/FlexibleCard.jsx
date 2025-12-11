import React from "react";

// Internal Imports (components, Assets, and Styles)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faUser, faHeart } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

function FlexibleCard({
  category = "",
  title = "",
  LinkTo = "",
  blogImg = "",
  writerName = "",
  writerImage = "",
  numberOfLikes = 0,
}) {
  return (
    <div className="w-full">
      <div className="mt-5 w-full">
        <div className="w-full">
          <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg ">
            <Link to={LinkTo}>
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
            <div className="flex justify-between w-full text-sm text-gray-500 gap-3">
              <div className="flex items-center gap-2 mb-1">
                <img src={`data:image/*;base64,${writerImage}`} className="w-[40px] h-[40px] object-cover rounded-full" />
                <span> {writerName} </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faEye} className="text-primary-700" />
                  <span>1000</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faHeart} className="text-red-500" />
                  <span>{numberOfLikes}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlexibleCard;
