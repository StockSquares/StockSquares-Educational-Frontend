import React, { useEffect, useState } from "react";

// Internal Imports (components, Assets and Styles)
import Style from "./FinanceBusinessLibrary.module.css";
import { SectionCard, BookCard } from "../..";

// External libraries
import { useTranslation } from "react-i18next";
import { ROUTES } from "../../../routes";

function FinanceBusinessLibrary() {
  const { t } = useTranslation();

  useEffect(() => {}, []);

  return (
    <>
      <SectionCard
        heading={t("sections.bookstore.title")}
        p6={false}
        LinkTo={ROUTES.FinanceBusinessLibrary}
      >
        <div className="row">
          <div className="w-1/3 md:w-1/4 lg:w-1/6 border-e-2 border-primary">
            <BookCard />
          </div>
          <div className="w-1/3 md:w-1/4 lg:w-1/6 border-e-2 border-primary">
            <BookCard />
          </div>
          <div className="w-1/3 md:w-1/4 lg:w-1/6 md:border-e-2 md:border-primary">
            <BookCard />
          </div>
          <div className="w-full md:w-1/4 lg:w-1/6 hidden md:block lg:border-e-2 lg:border-primary">
            <BookCard />
          </div>
          <div className="w-full md:w-1/4 lg:w-1/6 hidden lg:block lg:border-e-2 lg:border-primary">
            <BookCard />
          </div>
          <div className="w-full md:w-1/4 lg:w-1/6 hidden lg:block">
            <BookCard />
          </div>
        </div>
      </SectionCard>
    </>
  );
}

export default FinanceBusinessLibrary;
