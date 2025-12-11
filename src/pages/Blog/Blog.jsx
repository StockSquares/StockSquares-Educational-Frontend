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
  const [ads, setAds] = useState([]);

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
              body: rawBody ? decodeFromBase64(rawBody) : "",
              numberOfLikes: article.numberOfLikes || article.NumberOfLikes || 0
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

  useEffect(() => {
    fetch("https://stocksquare1.runasp.net/api/Advertisement/GetAll")
      .then((res) => res.json())
      .then((data) => {
        // Filter for "Articles" location (Assuming ID 3)
        // Adjust filter logic if ID differs
        const articleAds = data.filter(ad => ad.locationId == 3 || ad.LocationId == 3);
        setAds(articleAds);
      })
      .catch((e) => console.log(e.message));
  }, []);

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "غير معروف";
  };

  const handleLike = async (articleId) => {
    try {
      // Optimistic Update (or Update on success without refetch)
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
        setLikedArticles((prev) => new Set([...prev, articleId]));

        // Manually update state to reflect change immediately
        setArticles((prevArticles) =>
          prevArticles.map((article) => {
            if (article.id === articleId) {
              return { ...article, numberOfLikes: (article.numberOfLikes || 0) + 1 };
            }
            return article;
          })
        );

        if (selectedArticle.id === articleId) {
          setSelectedArticle((prev) => ({
            ...prev,
            numberOfLikes: (prev.numberOfLikes || 0) + 1,
          }));
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
        setLikedArticles((prev) => {
          const newSet = new Set(prev);
          newSet.delete(articleId);
          return newSet;
        });

        // Manually update state
        setArticles((prevArticles) =>
          prevArticles.map((article) => {
            if (article.id === articleId) {
              return { ...article, numberOfLikes: Math.max((article.numberOfLikes || 0) - 1, 0) };
            }
            return article;
          })
        );

        if (selectedArticle.id === articleId) {
          setSelectedArticle((prev) => ({
            ...prev,
            numberOfLikes: Math.max((prev.numberOfLikes || 0) - 1, 0),
          }));
        }
      }
    } catch (error) {
      console.error("Error disliking article:", error);
    }
  };

  return (
    <BlogUi
      ads={ads}
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
