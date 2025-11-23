import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";

const CategoriesManagement = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        id: "",
        name: "",
        description: "",
        categoryType: ""
    });

    // جلب الأقسام
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                "https://stocksquare1.runasp.net/api/ArticleCategory/AllCategory"
            );
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            } else {
                toast.error("فشل تحميل الأقسام");
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("حدث خطأ أثناء تحميل الأقسام");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // بدء التعديل
    const handleEditClick = (category) => {
        setEditingId(category.id);
        setEditFormData({
            id: category.id,
            name: category.name,
            description: category.description,
            categoryType: category.categoryType || "" // التأكد من وجود قيمة
        });
    };

    // إلغاء التعديل
    const handleCancelClick = () => {
        setEditingId(null);
    };

    // التعامل مع تغيير المدخلات
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    // حفظ التعديلات
    const handleSaveClick = async () => {
        try {
            const response = await fetch(
                "https://stocksquare1.runasp.net/api/ArticleCategory/UpdateCategory",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(editFormData),
                }
            );

            if (response.ok) {
                toast.success("تم تحديث القسم بنجاح");
                setEditingId(null);
                fetchCategories(); // تحديث القائمة
            } else {
                const errorText = await response.text();
                toast.error(`فشل التحديث: ${errorText}`);
            }
        } catch (error) {
            console.error("Error updating category:", error);
            toast.error("حدث خطأ أثناء التحديث");
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen" dir="rtl">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">إدارة أقسام المقالات</h1>

            {loading ? (
                <div className="text-center py-10">جاري التحميل...</div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
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
                                        // وضع التعديل
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
                                        // وضع العرض
                                        <>
                                            <td className="px-6 py-4 text-gray-800 font-medium">{category.name}</td>
                                            <td className="px-6 py-4 text-gray-600">{category.description}</td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => handleEditClick(category)}
                                                    className="text-blue-600 hover:text-blue-800 transition-colors"
                                                    title="تعديل"
                                                >
                                                    <FontAwesomeIcon icon={faEdit} size="lg" />
                                                </button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CategoriesManagement;
