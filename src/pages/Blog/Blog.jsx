import React, { useContext, useEffect, useState } from "react";

import { AisleContext } from "../../Context";
import { useTranslation } from "react-i18next";

import { useCategories } from "../../Context/CategoriesContext";
import BlogUi from "./BlogUi";

// Helper function to decode base64 to text
const decodeFromBase64 = (base64Text) => {
  if (!base64Text) return "";
  try {
    return decodeURIComponent(escape(atob(base64Text)));
  } catch (error) {
    console.error("Failed to decode base64:", error);
    return base64Text; // Return original if decode fails
  }
};

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
        const response = await fetch(
          "https://stocksquare1.runasp.net/api/Articles/GetAll"
        );
        const data = await response.json();
        if (response.ok) {
          // Decode base64 body for each article
          const decodedArticles = data.map(article => ({
            ...article,
            body: decodeFromBase64(article.body)
          }));
          setArticles(decodedArticles);
          console.log("data", decodedArticles);
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
    <BlogUi
      articles={articles}
      loading={loading}
      articleDetails={articleDetails}
      setArticleDetails={setArticleDetails}
      setSelectedArticle={setSelectedArticle}
      selectedArticle={selectedArticle}
      categories={categories}
      handleAisle={handleAisle}
      getCategoryName={getCategoryName}
    />
  );
}

export default Blog;
