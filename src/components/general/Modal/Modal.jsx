import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import Style from "./Modal.module.css";

function Modal({ children, onClose }) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {}, []);

  return ReactDOM.createPortal(
    <div className="bg-black/50 w-full h-full fixed z-50">
      <div className="absolute left-[50%] dark:bg-darkgray translate-x-[-50%] top-1 sm:top-[10%] p-2 dark:text-black   bg-white rounded-lg min-w-[90%] sm:min-w-[50%]  min-h-[370px]">
        <button
          onClick={onClose}
          className="fixed left-[5px] top-[5px] hover:bg-red-700 hover:text-white transition-all rounded-full border border-red-600 text-red-600 font-bold px-3 py-1"
        >
          X
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default Modal;
