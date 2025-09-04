import { useState } from "react";
import {
  faCheck,
  faElevator,
  faFilter,
  faMailBulk,
  faMessage,
  faPlus,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function ClientCard({ index, isClicked }) {
  const [selectedItem, setSelectedItem] = useState();

  return (
    <div key={index} className="bg-primary-100 p-3 mb-3 rounded-lg shadow-md">
      <div
        className="card  flex gap-3 w-full justify-between"
        onClick={() => isClicked(true)}
      >
        <div className="flex gap-3">
          <img className="bg-green-200 border-2 border-primary-500 rounded-full w-[50px] h-[50px]" />
          <div className="content text-[12px]">
            <p> الاسم </p>
            <p> البريد الالكتروني </p>
            <p> رقم الهاتف </p>
            <p> تاريخ الانضمام </p>
          </div>
        </div>
        <div className="contact-info flex flex-col justify-between ">
          <FontAwesomeIcon
            icon={faMessage}
            className="hover:text-primary-900 cursor-pointer"
            title="Message"
          />
          <FontAwesomeIcon
            icon={faElevator}
            className="hover:text-primary-900 cursor-pointer"
            title="online meeting"
          />
          <FontAwesomeIcon
            icon={faMailBulk}
            className="hover:text-primary-900 cursor-pointer"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <button
          className="bg-primary-900 text-white py-2 px-2 text-[12px] hover:bg-primary-700 cursor-pointer"
          onClick={() => setSelectedItem(index)}
        >
          {" "}
          تحديث الحاله{" "}
        </button>
        {selectedItem === index && (
          <div className="flex gap-2">
            <select
              className="text-[14px] w-[90px]  "
              style={{ paddingTop: "0" }}
            >
              <option> جديد </option>
              <option> مؤهل </option>
              <option> متابعه </option>
              <option> مغلق </option>
            </select>
            <FontAwesomeIcon
              icon={faCheck}
              className="p-2 text-white bg-primary-900 hover:bg-primary-700 cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
}
export default ClientCard;
