import React, { useState } from "react";
import CategoriesTab from "./CategoriesTab";
import ArticlesManagement from "../articlesPages/ArticlesManagement";

const BlogManagement = () => {
    const [activeTab, setActiveTab] = useState("categories");

    return (
        <div className="p-6 bg-gray-50 min-h-screen" dir="rtl">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">المدونة التعليمية</h1>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-300 mb-6">
                <button
                    onClick={() => setActiveTab("categories")}
                    className={
                        "pb-3 px-4 font-semibold transition-colors " +
                        (activeTab === "categories"
                            ? "text-green-600 border-b-2 border-green-600"
                            : "text-gray-500 hover:text-gray-700")
                    }
                >
                    أقسام المقالات
                </button>
                <button
                    onClick={() => setActiveTab("articles")}
                    className={
                        "pb-3 px-4 font-semibold transition-colors " +
                        (activeTab === "articles"
                            ? "text-green-600 border-b-2 border-green-600"
                            : "text-gray-500 hover:text-gray-700")
                    }
                >
                    المقالات
                </button>
            </div>

            {/* Tab Content */}
            {activeTab === "categories" && <CategoriesTab />}
            {activeTab === "articles" && <ArticlesManagement />}
        </div>
    );
};

export default BlogManagement;
