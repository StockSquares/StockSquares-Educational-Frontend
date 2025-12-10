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
  handleLike,
  handleDislike,
  likedArticles,
}) {
  const isLiked = likedArticles && likedArticles.has(selectedArticle.id);
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
                        numberOfLikes={article.numberOfLikes || 0}
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
                              numberOfLikes={article.numberOfLikes || 0}
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
        <div className="w-[100%] flex justify-center">
          <div className="w-[80%] flex flex-col">
            {/* Article Content */}
            <div
              dangerouslySetInnerHTML={{ __html: selectedArticle.body }}
              className={` flex flex-col  px-5 [&_img]:hidden lg:[&_img]:block  ${style.articleBody} `}
            ></div>

            {/* Like/Dislike Section */}
            <div className="flex items-center gap-6 mt-8 p-4 border-t border-gray-200">
              <button
                onClick={() => handleLike(selectedArticle.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${isLiked
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
              >
                <FontAwesomeIcon icon={faHeart} className={isLiked ? 'animate-pulse' : ''} />
                <span>{isLiked ? 'أعجبني' : 'إعجاب'}</span>
                {selectedArticle.numberOfLikes > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-sm ${isLiked ? 'bg-white text-green-600' : 'bg-green-700 text-white'
                    }`}>
                    {selectedArticle.numberOfLikes}
                  </span>
                )}
              </button>

              <button
                onClick={() => handleDislike(selectedArticle.id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                <FontAwesomeIcon icon={faHeart} className="rotate-180" />
                <span>إلغاء الإعجاب</span>
              </button>

              <button
                onClick={() => setArticleDetails(false)}
                className="mr-auto px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                رجوع
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default React.memo(BlogUi);
