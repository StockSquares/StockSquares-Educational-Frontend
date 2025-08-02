import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FlexibleCard } from "../../components";
import { AisleContext } from "../../Context";
import { useTranslation } from "react-i18next";
import { Tabs } from "flowbite-react";
import style from "./Blog.module.css";
import { useCategories } from "../../Context/CategoriesContext";

function Blog() {
  const { t } = useTranslation();
  const { handleAisle } = useContext(AisleContext);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [articleDetails, setArticleDetails] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState({});
  const categories = useCategories();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://stocksquare.runasp.net/api/Articles/GetAll");
        const data = await response.json();
        if (response.ok) {
          setArticles(data);
        } else {
          console.log("فشل استرجاع البيانات");
        }
      } catch (e) {
        console.log(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "غير معروف";
  };

  return (
    <div className="mt-10">
      {!articleDetails ? (
        <div className="flex justify-center w-full">
          <div className="w-[80%] ">
            <Tabs
              aria-label="Tabs with icons"
              variant="underline"
              onActiveTabChange={handleAisle}
              className="flex justify-evenly"
            >
              {/* Tab: الأكثر قراءة */}
              <Tabs.Item
                active
                title={
                  <>
                    <FontAwesomeIcon icon={faHeart} className="me-2 text-primary-700" />
                    <span>الأكثر قراءة</span>
                  </>
                }
              >
                <div className="flex flex-col p-5 min-h-[40vh] items-start bg-gray-100 dark:bg-dark-background">
                  {loading ? <span className={style.loader}></span> : ""}
                  {articles.map((article) => (
                    <div
                      key={article.id}
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

              {/* باقي Tabs: حسب التصنيفات */}
              {categories.map((category) => (
                <Tabs.Item key={category.id} title={category.name}>
                  <div className="flex flex-col p-5 min-h-[40vh] items-start bg-gray-100 dark:bg-dark-background">
                    {loading ? (
                      <span className={style.loader}></span>
                    ) : (
                      articles
                        .filter((article) => article.categoryId === category.id)
                        .map((article) => (
                          <div
                            key={article.id}
                            className="w-full"
                            onClick={() => {
                              setSelectedArticle(article);
                              setArticleDetails(true);
                            }}
                          >
                            <FlexibleCard
                              category={category.name}
                              title={article.title}
                              blogImg={`data:image/*;base64,${article.mainImage}`}
                              writerName={article.writername}
                              writerImage={article.writerImage}
                            />
                          </div>
                        ))
                    )}
                  </div>
                </Tabs.Item>
              ))}
            </Tabs>
          </div>
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: selectedArticle.body }}></div>
      )}
    </div>
  );
}

export default Blog;
