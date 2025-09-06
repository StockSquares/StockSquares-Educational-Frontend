import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import Style from "./Modal.module.css";

function Modal({ children }) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {}, []);

  return ReactDOM.createPortal(
    <div className="bg-black/50 w-full h-full fixed z-40">
      <div className="absolute left-[50%] translate-x-[-50%] top-[10%] p-2 dark:text-black   bg-white rounded-lg min-w-[30%] min-h-[370px]">
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default Modal;
