import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

import { AisleContext } from "../../Context";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

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
        console.log("RAW API DATA:", data); // Debug views field name
        if (response.ok) {
          // Decode base64 body for each article
          const decodedArticles = data.map(article => {
            const rawBody = article.body || article.Body || "";
            return {
              ...article,
              body: rawBody ? decodeFromBase64(rawBody) : "",
              numberOfLikes: article.numberOfLikes || article.NumberOfLikes || 0,
              numberOfViews: article.views || article.numberOfViews || article.NumberOfViews || 0
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
    const token = Cookies.get("token");
    console.log("MY TOKEN:", token); // Log token for easy copying

    if (!token) {
      toast.error("يجب تسجيل الدخول للإعجاب بالمقال");
      return;
    }

    try {
      const response = await fetch(
        `https://stocksquare1.runasp.net/api/Articles/AddLike?id=${articleId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
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
      } else {
        if (response.status === 401) {
          toast.error("انتهت جلسة تسجيل الدخول، يرجى تسجيل الدخول مرة أخرى");
        } else {
          const text = await response.text();
          console.error("Like failed with status:", response.status, text);
          toast.error("فشل تسجيل الإعجاب");
        }
      }
    } catch (error) {
      console.error("Error liking article:", error);
      toast.error("حدث خطأ في الاتصال");
    }
  };

  const handleDislike = async (articleId) => {
    const token = Cookies.get("token");
    if (!token) {
      toast.error("يجب تسجيل الدخول");
      return;
    }

    try {
      const response = await fetch(
        `https://stocksquare1.runasp.net/api/Articles/RemoveLike?id=${articleId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
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

  const handleIncreaseViews = async (articleId) => {
    const token = Cookies.get("token");
    try {
      const headers = { "Content-Type": "application/json" };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      // Just fire the request, we don't strictly need to await the result for UI flow
      console.log(`Sending view increment request for article: ${articleId}`);
      const response = await fetch(
        `https://stocksquare1.runasp.net/api/Articles/${articleId}/views`,
        {
          method: "GET",
          headers: headers
        }
      );
      if (response.ok) {
        console.log("View count incremented successfully");

        // Update local state immediately
        setArticles((prevArticles) =>
          prevArticles.map((article) => {
            if (article.id === articleId) {
              return { ...article, numberOfViews: (article.numberOfViews || 0) + 1 };
            }
            return article;
          })
        );

        setSelectedArticle((prev) => {
          if (prev && prev.id === articleId) {
            return { ...prev, numberOfViews: (prev.numberOfViews || 0) + 1 };
          }
          return prev;
        });

      } else {
        console.error("Failed to increment views:", response.status, await response.text());
      }
    } catch (error) {
      console.error("Error increasing views:", error);
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
      handleIncreaseViews={handleIncreaseViews}
    />
  );
}
export default Blog;
