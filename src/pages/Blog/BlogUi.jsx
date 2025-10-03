import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FlexibleCard } from "../../components";
import { Tabs } from "flowbite-react";
import React from "react";
import style from "./Blog.module.css";
function BlogUi({
  articles,
  loading,
  articleDetails,
  selectedArticle,
  categories,
  handleAisle,
  getCategoryName,
  setArticleDetails,
  setSelectedArticle,
}) {
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
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="me-2 text-primary-700"
                    />
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
        <div dangerouslySetInnerHTML={{ __html: selectedArticle.body }} className="px-3"></div>
      )}
    </div>
  );
}
export default React.memo(BlogUi);
