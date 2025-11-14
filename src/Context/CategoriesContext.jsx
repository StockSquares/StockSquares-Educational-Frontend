import React, { createContext, useContext, useEffect, useState } from "react";

const CategoriesContext = createContext();

export const useCategories = () => useContext(CategoriesContext);

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://stocksquare1.runasp.net/api/ArticleCategory/AllCategory"
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("❌ فشل تحميل التصنيفات:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={categories}>
      {children}
    </CategoriesContext.Provider>
  );
};
