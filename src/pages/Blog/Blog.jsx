import React, { useContext, useEffect, useState } from "react";

import { AisleContext } from "../../Context";
import { useTranslation } from "react-i18next";

import { useCategories } from "../../Context/CategoriesContext";
import BlogUi from "./BlogUi";

// Helper function to decode base64 to text
const decodeFromBase64 = (base64Text) => {
  if (!base64Text) return "";
  try {
    // Method 1: Try direct decoding
    const decoded = atob(base64Text);
    // Check if it's valid UTF-8
    try {
      return decodeURIComponent(escape(decoded));
    } catch {
      // Method 2: Use TextDecoder if Method 1 fails
      const bytes = new Uint8Array(decoded.length);
      for (let i = 0; i < decoded.length; i++) {
        bytes[i] = decoded.charCodeAt(i);
      }
      const decoder = new TextDecoder('utf-8');
      return decoder.decode(bytes);
    }
  } catch (error) {
    console.error("Failed to decode base64:", error);
    // Return empty to prevent crash
    return "";
  }
};

function Blog() {
  const { t } = useTranslation();
  const { handleAisle } = useContext(AisleContext);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [articleDetails, setArticleDetails] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState({});
  const [likedArticles, setLikedArticles] = useState(new Set());
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
          const decodedArticles = data.map(article => {
            const rawBody = article.body || article.Body || "";
            return {
              ...article,
              body: rawBody ? decodeFromBase64(rawBody) : ""
            };
          });
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

  const handleLike = async (articleId) => {
    try {
      const response = await fetch(
        `https://stocksquare1.runasp.net/api/Articles/AddLike?id=${articleId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response.ok) {
        // Add to liked articles for visual feedback
        setLikedArticles(prev => new Set([...prev, articleId]));

        // Refresh articles to get updated like count
        const articlesResponse = await fetch(
          "https://stocksquare1.runasp.net/api/Articles/GetAll"
        );
        const data = await articlesResponse.json();
        if (articlesResponse.ok) {
          const decodedArticles = data.map(article => {
            const rawBody = article.body || article.Body || "";
            return {
              ...article,
              body: rawBody ? decodeFromBase64(rawBody) : ""
            };
          });
          setArticles(decodedArticles);

          // Update selected article if it's the one that was liked
          if (selectedArticle.id === articleId) {
            const updatedArticle = decodedArticles.find(a => a.id === articleId);
            if (updatedArticle) {
              setSelectedArticle(updatedArticle);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error liking article:", error);
    }
  };

  const handleDislike = async (articleId) => {
    try {
      const response = await fetch(
        `https://stocksquare1.runasp.net/api/Articles/RemoveLike?id=${articleId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response.ok) {
        // Remove from liked articles
        setLikedArticles(prev => {
          const newSet = new Set(prev);
          newSet.delete(articleId);
          return newSet;
        });

        // Refresh articles to get updated like count
        const articlesResponse = await fetch(
          "https://stocksquare1.runasp.net/api/Articles/GetAll"
        );
        const data = await articlesResponse.json();
        if (articlesResponse.ok) {
          const decodedArticles = data.map(article => {
            const rawBody = article.body || article.Body || "";
            return {
              ...article,
              body: rawBody ? decodeFromBase64(rawBody) : ""
            };
          });
          setArticles(decodedArticles);

          // Update selected article if it's the one that was disliked
          if (selectedArticle.id === articleId) {
            const updatedArticle = decodedArticles.find(a => a.id === articleId);
            if (updatedArticle) {
              setSelectedArticle(updatedArticle);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error disliking article:", error);
    }
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
      handleLike={handleLike}
      handleDislike={handleDislike}
      likedArticles={likedArticles}
    />
  );
}

export default Blog;
