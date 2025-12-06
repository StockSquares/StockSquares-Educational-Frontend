import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave, faTimes, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import ArticlesManagement from "../articlesPages/ArticlesManagement";

// API function to fetch categories
const fetchCategories = async () => {
    const response = await fetch(
        "https://stocksquare1.runasp.net/api/ArticleCategory/AllCategory"
    );

    if (!response.ok) {
        throw new Error("فشل تحميل الأقسام");
    }

    return response.json();
};

const BlogManagement = () => {
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState("categories");
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        id: "",
        name: "",
        description: "",
        categoryType: ""
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCategoryData, setNewCategoryData] = useState({
        name: "",
        description: "",
        categoryType: "Article"
    });

    // Use React Query to fetch categories
    const { data: categories = [], isLoading: loading } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
        staleTime: 5 * 60 * 1000, // 5 minutes
        enabled: activeTab === "categories", // Only fetch when on categories tab
        onError: (error) => {
            console.error("Error fetching categories:", error);
            toast.error("حدث خطأ أثناء تحميل الأقسام");
        }
    });

    // Update mutation
    const updateMutation = useMutation({
        mutationFn: async (formData) => {
            const response = await fetch(
                "https://stocksquare1.runasp.net/api/ArticleCategory/UpdateCategory",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "فشل التحديث");
            }

            return response.json();
        },
        onSuccess: () => {
            toast.success("تم تحديث القسم بنجاح");
            setEditingId(null);
            queryClient.invalidateQueries(['categories']);
        },
        onError: (error) => {
            console.error("Error updating category:", error);
            toast.error("فشل التحديث: " + error.message);
        }
    });

    // Create mutation
    const createMutation = useMutation({
        mutationFn: async (categoryData) => {
            const response = await fetch(
                "https://stocksquare1.runasp.net/api/ArticleCategory/CreateCategory",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(categoryData),
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "فشل الإضافة");
            }

            return response.json();
        },
        onSuccess: () => {
            toast.success("تم إضافة القسم بنجاح");
            setIsModalOpen(false);
            setNewCategoryData({
                name: "",
                description: "",
                categoryType: "Article"
            });
            queryClient.invalidateQueries(['categories']);
        },
        onError: (error) => {
            console.error("Error adding category:", error);
            toast.error("فشل الإضافة: " + error.message);
        }
    });

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: async (categoryId) => {
            const token = Cookies.get("token");

            const response = await fetch(
                "https://stocksquare1.runasp.net/api/ArticleCategory/" + categoryId,
                {
                    method: "DELETE",
                    headers: {
                        "Accept": "text/plain",
                        ...(token && { "Authorization": "Bearer " + token })
                    }
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || response.statusText);
            }

            return categoryId;
        },
        onSuccess: () => {
            toast.success("تم حذف القسم بنجاح");
            queryClient.invalidateQueries(['categories']);
        },
        onError: (error) => {
            console.error("Error deleting category:", error);
            toast.error("فشل الحذف: " + error.message);
        }
    });

    const handleEditClick = (category) => {
        setEditingId(category.id);
        setEditFormData({
            id: category.id,
            name: category.name,
            description: category.description,
            categoryType: category.categoryType || ""
        });
    };

    const handleCancelClick = () => {
        setEditingId(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleNewCategoryChange = (e) => {
        const { name, value } = e.target;
        setNewCategoryData({ ...newCategoryData, [name]: value });
    };

    const handleSaveClick = () => {
        updateMutation.mutate(editFormData);
    };

    const handleAddNewCategory = () => {
        if (!newCategoryData.name.trim()) {
            toast.error("الرجاء إدخال اسم القسم");
            return;
        }
        createMutation.mutate(newCategoryData);
    };

    const handleDeleteCategory = (categoryId, categoryName) => {
        const confirmDelete = window.confirm(
            "هل أنت متأكد من حذف القسم \"" + categoryName + "\"؟\n\nتحذير: قد يؤثر ذلك على المقالات المرتبطة بهذا القسم!"
        );

        if (!confirmDelete) return;
        deleteMutation.mutate(categoryId);
    };

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const handleCategoryClick = (categoryId) => {
        setSelectedCategoryId(categoryId);
        setActiveTab("articles");
    };

    return (
        <div className="p-2 md:p-6 bg-gray-50 min-h-screen" dir="rtl">
            <h1 className="text-xl md:text-3xl font-bold text-gray-800 mb-6">المدونة التعليمية</h1>

            {/* Tabs */}
            <div className="flex gap-3 md:gap-6 border-b border-gray-300 mb-6 overflow-x-auto">
                <button
                    onClick={() => {
                        setActiveTab("categories");
                        setSelectedCategoryId(null); // Reset filter when going back to categories
                    }}
                    className={
                        "pb-3 px-2 md:px-4 text-sm md:text-base whitespace-nowrap font-semibold transition-colors " +
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
                        "pb-3 px-2 md:px-4 text-sm md:text-base whitespace-nowrap font-semibold transition-colors " +
                        (activeTab === "articles"
                            ? "text-green-600 border-b-2 border-green-600"
                            : "text-gray-500 hover:text-gray-700")
                    }
                >
                    المقالات
                </button>
            </div>

            {/* Categories Tab Content */}
            {activeTab === "categories" && (
                <>
                    <div className="flex justify-between items-center mb-6 gap-2">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-700 whitespace-nowrap">إدارة الأقسام</h2>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-lg shadow-md transition-colors flex items-center gap-2 whitespace-nowrap"
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            <span>إضافة قسم جديد</span>
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center py-10">
                            <div className="flex items-center justify-center gap-3">
                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                                <span className="text-gray-600">جاري التحميل...</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Mobile View (Cards) */}
                            <div className="md:hidden space-y-4 mb-6">
                                {categories.map((category) => (
                                    <div key={category.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                        {editingId === category.id ? (
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={editFormData.name}
                                                        onChange={handleInputChange}
                                                        className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
                                                    <input
                                                        type="text"
                                                        name="description"
                                                        value={editFormData.description}
                                                        onChange={handleInputChange}
                                                        className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                                                    />
                                                </div>
                                                <div className="flex justify-end gap-2 mt-3">
                                                    <button onClick={handleSaveClick} className="text-green-600 bg-green-50 px-3 py-1 rounded hover:bg-green-100 flex items-center gap-1">
                                                        <FontAwesomeIcon icon={faSave} /> <span>حفظ</span>
                                                    </button>
                                                    <button onClick={handleCancelClick} className="text-red-600 bg-red-50 px-3 py-1 rounded hover:bg-red-100 flex items-center gap-1">
                                                        <FontAwesomeIcon icon={faTimes} /> <span>إلغاء</span>
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3
                                                        onClick={() => handleCategoryClick(category.id)}
                                                        className="font-bold text-gray-800 text-lg cursor-pointer hover:text-green-600"
                                                    >
                                                        {category.name}
                                                    </h3>
                                                    <div className="flex gap-2">
                                                        <button onClick={() => handleEditClick(category)} className="text-blue-600 p-2 hover:bg-blue-50 rounded-full">
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </button>
                                                        <button onClick={() => handleDeleteCategory(category.id, category.name)} className="text-red-600 p-2 hover:bg-red-50 rounded-full">
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 text-sm">{category.description || "لا يوجد وصف"}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Desktop View (Table) */}
                            <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
                                <table className="min-w-full table-auto">
                                    <thead className="bg-gray-200">
                                        <tr>
                                            <th className="px-6 py-3 text-right text-sm font-bold text-gray-700">الاسم</th>
                                            <th className="px-6 py-3 text-right text-sm font-bold text-gray-700">الوصف</th>
                                            <th className="px-6 py-3 text-center text-sm font-bold text-gray-700">إجراءات</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {categories.map((category) => (
                                            <tr key={category.id} className="hover:bg-gray-50">
                                                {editingId === category.id ? (
                                                    <>
                                                        <td className="px-6 py-4">
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                value={editFormData.name}
                                                                onChange={handleInputChange}
                                                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                                            />
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <input
                                                                type="text"
                                                                name="description"
                                                                value={editFormData.description}
                                                                onChange={handleInputChange}
                                                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                                            />
                                                        </td>
                                                        <td className="px-6 py-4 text-center space-x-2 space-x-reverse">
                                                            <button
                                                                onClick={handleSaveClick}
                                                                className="text-green-600 hover:text-green-800 mx-2"
                                                                title="حفظ"
                                                            >
                                                                <FontAwesomeIcon icon={faSave} size="lg" />
                                                            </button>
                                                            <button
                                                                onClick={handleCancelClick}
                                                                className="text-red-600 hover:text-red-800 mx-2"
                                                                title="إلغاء"
                                                            >
                                                                <FontAwesomeIcon icon={faTimes} size="lg" />
                                                            </button>
                                                        </td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td className="px-6 py-4 text-gray-800 font-medium">
                                                            <button
                                                                onClick={() => handleCategoryClick(category.id)}
                                                                className="text-gray-800 hover:text-green-600 hover:underline text-right w-full transition-colors font-semibold"
                                                            >
                                                                {category.name}
                                                            </button>
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-600">{category.description}</td>
                                                        <td className="px-6 py-4 text-center space-x-2 space-x-reverse">
                                                            <button
                                                                onClick={() => handleEditClick(category)}
                                                                className="text-blue-600 hover:text-blue-800 transition-colors mx-2"
                                                                title="تعديل"
                                                            >
                                                                <FontAwesomeIcon icon={faEdit} size="lg" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteCategory(category.id, category.name)}
                                                                className="text-red-600 hover:text-red-800 transition-colors mx-2"
                                                                title="حذف"
                                                            >
                                                                <FontAwesomeIcon icon={faTrash} size="lg" />
                                                            </button>
                                                        </td>
                                                    </>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {/* Modal for Adding Category */}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg shadow-xl p-5 w-[90%] max-w-sm md:max-w-md">
                                <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">إضافة قسم جديد</h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            اسم القسم <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={newCategoryData.name}
                                            onChange={handleNewCategoryChange}
                                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            placeholder="مثال: التحليل الفني"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            الوصف
                                        </label>
                                        <textarea
                                            name="description"
                                            value={newCategoryData.description}
                                            onChange={handleNewCategoryChange}
                                            rows="3"
                                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            placeholder="وصف مختصر للقسم..."
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <button
                                        onClick={handleAddNewCategory}
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        إضافة
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsModalOpen(false);
                                            setNewCategoryData({
                                                name: "",
                                                description: "",
                                                categoryType: "Article"
                                            });
                                        }}
                                        className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition-colors"
                                    >
                                        إلغاء
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Articles Tab Content */}
            {activeTab === "articles" && (
                <div className="bg-white rounded-lg shadow p-2 md:p-6">
                    <ArticlesManagement selectedCategoryId={selectedCategoryId} />
                </div>
            )}
        </div>
    );
};

export default BlogManagement;
