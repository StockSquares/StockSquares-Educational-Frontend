import React, { useState } from "react";
import FlexibleCard from "../../components/general/FlexibleCard/FlexibleCard";
import style from "./Blog.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import InlineBlog from "./InlineBlog";

function BlogUi({
  articles,
  loading,
  articleDetails,
  selectedArticle,
  setSelectedArticle,
  handleLike,
  handleDislike,
  likedArticles,
  categories,
  setArticleDetails,
  ads,
  handleIncreaseViews, // New prop
}) {
  const [activeTab, setActiveTab] = useState("most-read");

  const getCategoryName = (id) => {
    const category = categories.find((cat) => cat.id === id);
    return category ? category.name : "Uncategorized";
  };

  // Helper to render Article List
  const renderArticles = (articleList) => {
    return (
      <div className="flex flex-col lg:flex-row gap-6 p-5 min-h-[40vh] items-start bg-gray-100 dark:bg-dark-background">
        {/* Articles Column */}
        <div className="flex flex-col gap-4 w-full lg:w-3/4">
          {loading ? (
            <span className={style.loader}></span>
          ) : (
            articleList.map((article) => (
              <div
                key={article.id}
                className="w-full"
                onClick={() => {
                  setSelectedArticle(article);
                  setArticleDetails(true);
                  if (handleIncreaseViews) {
                    handleIncreaseViews(article.id);
                  }
                }}
              >
                <FlexibleCard
                  category={
                    article.categoryId
                      ? getCategoryName(article.categoryId)
                      : "الأكثر قراءة"
                  }
                  title={article.title}
                  blogImg={`data:image/*;base64,${article.mainImage}`}
                  writerName={article.writername}
                  writerImage={article.writerImage}
                  numberOfLikes={article.numberOfLikes || 0}
                  numberOfViews={article.numberOfViews || 0}
                />
              </div>
            ))
          )}
        </div>

        {/* Ads Column */}
        <div className="flex flex-col gap-4 w-full lg:w-1/4">
          {ads &&
            ads.map((ad) => (
              <div
                key={ad.id}
                className="w-full bg-white dark:bg-dark-card rounded-lg shadow overflow-hidden mt-5"
              >
                <a
                  href={ad.link}
                  target="_blank"
                  rel="noreferrer"
                  className="block"
                >
                  <img
                    src={`data:image/*;base64,${ad.image}`}
                    alt={ad.title}
                    className="w-full h-64 object-cover"
                  />
                </a>
              </div>
            ))}
        </div>
      </div>
    );
  };

  if (articleDetails) {
    const categoryName = selectedArticle.categoryId
      ? getCategoryName(selectedArticle.categoryId)
      : "عام";
    return (
      <InlineBlog
        article={selectedArticle}
        categoryName={categoryName}
        setArticleDetails={setArticleDetails}
        handleLike={handleLike}
        isLiked={likedArticles?.has(selectedArticle.id)}
        likes={selectedArticle.numberOfLikes}
      />
    );
  }

  return (
    <div className="w-full overflow-hidden bg-gray-100 dark:bg-dark-background min-h-screen">
      <div className="max-w-screen-xl mx-auto p-5">
        {" "}
        {/* Container to prevent overall scroll */}
        {/* Custom Tabs Header */}
        <div className="flex items-center justify-center gap-6 overflow-x-auto whitespace-nowrap border-b border-gray-200 dark:border-gray-700 p-4 scrollbar-hide">
          <button
            onClick={() => setActiveTab("most-read")}
            className={`pb-2 text-sm font-medium transition-colors duration-200 ${activeTab === "most-read"
              ? "border-b-2 border-primary-600 text-primary-600 dark:text-primary-500"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
          >
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faHeart} className="text-primary-700" />
              <span>الأكثر قراءة</span>
            </div>
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`pb-2 text-sm font-medium transition-colors duration-200 ${activeTab === category.id
                ? "border-b-2 border-primary-600 text-primary-600 dark:text-primary-500"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === "most-read" && renderArticles(articles)}
          {categories.map(
            (category) =>
              activeTab === category.id &&
              renderArticles(
                articles.filter((article) => article.categoryId === category.id)
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogUi;
