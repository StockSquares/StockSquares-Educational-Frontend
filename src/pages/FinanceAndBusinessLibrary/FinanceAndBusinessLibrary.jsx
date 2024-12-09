import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TextInput } from "flowbite-react";

// Internal Imports
import {
  AisleCard,
  AisleNav,
  FlexibleCard,
  Sidebar,
  Button,
} from "../../components";
import { AisleContext } from "../../Context/AisleContext";
import { ROUTES } from "../../routes";
import { search } from "../../assets";
import Style from "./FinanceAndBusinessLibrary.module.css";

function FinanceAndBusinessLibrary() {
  const { t } = useTranslation();
  const { handleAisle } = useContext(AisleContext);

  return (
    <div>
      <div className="bg-lightgray h-[30vh] flex-center">
        <form className="w-full md:w-2/3 lg:w-1/2">
          <div className="flex flex-col md:flex-row justify-between gap-2">
            <TextInput
              id="search"
              type="text"
              icon={search}
              className="input-parent grow mb-2 md:mb-0 me-0 md:me-4"
              placeholder={t("common.search")}
            />
            <Button btnText={t("common.search")} bgColor="primary" px="px-8" />
          </div>
        </form>
      </div>

      <div className="container">
        <div className="flex justify-between items-start">
          <div className="md:w-3/5 lg:w-3/4 p-4">
            <Tabs
              aria-label="Pills"
              variant="pills"
              className="flex-center"
              onActiveTabChange={handleAisle}>
              <Tabs.Item active title={t("bookstore.tabs.popular")}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rounded-lg bg-white p-4">
                  <div className="w-full">
                    <FlexibleCard
                      isHorizontal={false}
                      btnLinkTo={ROUTES.BOOKSTORE}
                    />
                  </div>
                  <div className="w-full">
                    <FlexibleCard
                      isHorizontal={false}
                      btnLinkTo={ROUTES.BOOKSTORE}
                    />
                  </div>
                  <div className="w-full">
                    <FlexibleCard
                      isHorizontal={false}
                      btnLinkTo={ROUTES.BOOKSTORE}
                    />
                  </div>
                  <div className="w-full">
                    <FlexibleCard
                      isHorizontal={false}
                      btnLinkTo={ROUTES.BOOKSTORE}
                    />
                  </div>
                </div>
              </Tabs.Item>
              <Tabs.Item title={t("bookstore.tabs.recent")}>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t("bookstore.content.recent")}
                </p>
              </Tabs.Item>
              <Tabs.Item title={t("bookstore.tabs.economy")}>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t("bookstore.content.economy")}
                </p>
              </Tabs.Item>
              <Tabs.Item title={t("bookstore.tabs.stockMarket")}>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t("bookstore.content.stockMarket")}
                </p>
              </Tabs.Item>
              <Tabs.Item title={t("bookstore.tabs.finance")}>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t("bookstore.content.finance")}
                </p>
              </Tabs.Item>
            </Tabs>
          </div>

          <div className="hidden md:block md:w-2/5 lg:w-1/4 px-4 py-8">
            <Sidebar
              popularTitle={t("bookstore.sidebar.popularBooks")}
              recentTitle={t("bookstore.sidebar.recentBooks")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinanceAndBusinessLibrary;
