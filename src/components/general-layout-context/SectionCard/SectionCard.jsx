import React, { useEffect, useState } from "react";

// Internal Imports (components, Assets and Styles)
import Style from "./SectionCard.module.css";
import { Button } from "./../..";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../routes";
import PracticalTrainingSection from "./../../practical-training-section/PracticalTrainingSection/PracticalTrainingSection";

// External libraries

function SectionCard({
  children,
  heading = "",
  wrapperClass = "",
  headingSpan = "",
  headingBtn = "",
  p6 = true,
  LinkTo = "",
}) {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <div
        className={`shadow ${wrapperClass} bg-lightgray dark:bg-dark-background dark:text-dark h-full`}
      >
        <header className="flex-y-center justify-between bg-primary p-2 mb-0">
          <Link to={LinkTo} className="text-white underline md:no-underline">
            {heading}
          </Link>
          {headingSpan && (
            <span className="text-accent opacity-75 text-sm">
              {headingSpan}
            </span>
          )}
          {headingBtn && (
            <Button
              btnText={headingBtn}
              textColor="black"
              bgColor="white"
              bgHoverColor="accent"
            />
          )}
        </header>
        <div
          className={`bg-lightgray  dark:bg-dark-background dark:text-dark ${
            p6 ? "p-6" : ""
          }`}
        >
          {children}
        </div>
      </div>
    </>
  );
}

export default React.memo(SectionCard);
