import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import style from "../../../pages/Blog/Blog.module.css";

function Loader() {
  return (
    <div className="w-full h-[100vh] flex items-center">
      <span className={style.loader}></span>
    </div>
  );
}

export default Loader;
