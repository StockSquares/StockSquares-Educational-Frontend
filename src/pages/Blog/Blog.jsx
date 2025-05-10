import React, { useContext, useEffect, useState } from "react";
import { adjustments, clipboardList, dashboard } from "../../assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FlexibleCard, Button } from "../../components";
import { AisleContext } from "../../Context";
import { ROUTES } from "../../routes";
import { useTranslation } from "react-i18next";
import { Tabs } from "flowbite-react";

import style from "./Blog.module.css";

import { useCategories } from "../../Context/CategoriesContext";

function Blog() {
  const { t } = useTranslation();
  const { handleAisle } = useContext(AisleContext);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://stocksquare.runasp.net/api/Articles/GetAll"
        );
        const data = await response.json();
        if (response.ok) {
          setArticles(data);
          setLoading(false);
        } else {
          console.log("فشل استرجاع البيانات");
        }
      } catch (e) {
        console.log(e.message);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const categories = useCategories();
  const [articleDetails, setArticleDetails] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState({});

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "غير معروف";
  };

  console.log(selectedArticle);

  return (
    <>
      <div className="mt-10">
        {!articleDetails ? (
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
                   

                    <div className="flex flex-col p-5 min-h-[40vh] items-start bg-gray-100">
                     {loading ? <span className={style.loader}></span> : ""}
                      {articles.map((article) => (
                        <div
                          className="w-full"
                          onClick={() => {
                            setSelectedArticle(article);
                            setArticleDetails(true);
                          }}
                        >
                          <FlexibleCard
                            category={getCategoryName(article.categoryId)}
                            title={article.title}
                            blogImg={`data:image/*;base64,${article.mainImage}`}
                            writerName={article.writername}
                            writerImage={article.writerImage}
                          />
                        </div>
                      ))}
                    </div>
                  </Tabs.Item>

                  <Tabs.Item title="أسواق المال" icon={dashboard}>
                    <div className="flex flex-col p-5 items-start bg-gray-100">
                      <FlexibleCard
                        category="أسواق المال"
                        title="كيف تستثمر اموالك في أوقات الحرب"
                        blogImg="/src/assets/imgs/investImg.jpg"
                        LinkTo={`${ROUTES.INLINEBlog.replace(
                          ":title",
                          "كيف تستثمر اموالك في أوقات الحرب"
                        )}`}
                      />
                    </div>
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
        ) : (
          <div dangerouslySetInnerHTML={{ __html: selectedArticle.body }}></div>
        )}
      </div>
    </>
  );
}

export default Blog;
