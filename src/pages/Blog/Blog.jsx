import React, { useContext } from "react";
import {
  adjustments,
  clipboardList,
  dashboard,
  search,
  userCircle,
} from "../../assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FlexibleCard, Button } from "../../components";
import { AisleContext } from "../../Context";
import { ROUTES } from "../../routes";
import { useTranslation } from "react-i18next";
import { Tabs, TextInput } from "flowbite-react";

function Blog() {
  const { t } = useTranslation();
  const { handleAisle } = useContext(AisleContext);

  return (
    <>
      <div className="mt-10">
        {/* <div className="bg-primary-50 h-[30vh] flex-center p-4 mb-6">
          <form className="w-full md:w-2/3 lg:w-1/2">
            <div className="flex flex-col md:flex-row justify-between gap-2">
              <TextInput
                id="emailToSubscribe"
                type="email"
                icon={search}
                className="input-parent grow mb-2 md:mb-0 me-0 md:me-4"
                placeholder="Search"
              />
              <Button btnText="Search" bgColor="primary" px="px-8" />
            </div>
          </form>
        </div> */}
        <div className="  ">
          <div className="flex justify-center  w-full">
            <div className=" w-[80%]">
              <Tabs
                aria-label="Tabs with icons"
                variant="underline"
                onActiveTabChange={handleAisle}
                className="flex justify-evenly"
              >
                <Tabs.Item
                  active
                  title={
                    <>
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="me-2 text-primary-700 "
                      />
                      <span>الأكثر قراءة</span>
                    </>
                  }
                >
                  <FlexibleCard
                    category="أسواق المال"
                    title= "كيف تستثمر اموالك في أوقات الحرب"
                    blogImg="/src/assets/imgs/investImg.jpg"
                    LinkTo={`${ROUTES.INLINEBlog.replace(':title', "كيف تستثمر اموالك في أوقات الحرب")}`}
                    />
                </Tabs.Item>


                <Tabs.Item title="أسواق المال" icon={dashboard}>
                   <FlexibleCard
                    category="أسواق المال"
                    title= "كيف تستثمر اموالك في أوقات الحرب"
                    blogImg="/src/assets/imgs/investImg.jpg"
                    LinkTo={`${ROUTES.INLINEBlog.replace(':title', "كيف تستثمر اموالك في أوقات الحرب")}`}
                    />
                </Tabs.Item>
                <Tabs.Item title={"ريادة الأعمال"} icon={adjustments}>
                  This is{" "}
                  <span className="font-medium text-gray-800 dark:text-white">
                    Settings tab's associated content
                  </span>
                  .
                </Tabs.Item>
                <Tabs.Item title="التسويق و المبيعات" icon={clipboardList}>
                  This is{" "}
                  <span className="font-medium text-gray-800 dark:text-white">
                    Contacts tab's associated content
                  </span>
                  .
                </Tabs.Item>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Blog;
