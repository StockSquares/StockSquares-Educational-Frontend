import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { useCategories } from "../../../../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

// Helper function to encode text to base64
const encodeToBase64 = (text) => {
  if (!text) return "";
  return btoa(unescape(encodeURIComponent(text)));
};

// Helper function to decode base64 to text
const decodeFromBase64 = (base64Text) => {
  if (!base64Text) return "";
  try {
    // Use TextDecoder for proper UTF-8 handling (supports Arabic)
    const binaryString = atob(base64Text);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(bytes);
  } catch (error) {
    console.error("Failed to decode base64:", error);
    return ""; // Return empty string if decode fails to prevent crashes
  }
};

// API function to fetch articles
const fetchArticles = async () => {
  const response = await fetch(
    "https://stocksquare1.runasp.net/api/Articles/GetAll",
    {
      headers: {
        "Cache-Control": "no-cache",
        "Pragma": "no-cache"
      }
    }
  );

  const textData = await response.text();

  let data;
  try {
    data = JSON.parse(textData);
  } catch (e) {
    console.error("❌ JSON Parse Failed. Attempting recovery...", e);

    // Attempt to recover truncated JSON
    try {
      const lastObjectEnd = textData.lastIndexOf("},");
      if (lastObjectEnd !== -1) {
        const recoveredText = textData.substring(0, lastObjectEnd + 1) + "]";
        data = JSON.parse(recoveredText);
        toast.warning("تم استرجاع بعض المقالات فقط. يبدو أن هناك مقالاً حجمه كبير جداً يسبب مشكلة.", { autoClose: 10000 });
      } else {
        throw new Error("Could not recover JSON");
      }
    } catch (recoveryError) {
      console.error("❌ Recovery Failed:", recoveryError);
      toast.error("بيانات السيرفر تالفة أو كبيرة جداً ولا يمكن عرضها.");
      throw recoveryError;
    }
  }

  if (!Array.isArray(data)) {
    console.error("❌ Expected array but got:", typeof data);
    return [];
  }

  // Decode base64 body for each article
  const decodedArticles = data.map(article => {
    try {
      return {
        ...article,
        body: article.body ? decodeFromBase64(article.body) : ""
      };
    } catch (err) {
      console.error("⚠️ Error decoding article:", article.id, err);
      return article;
    }
  });

  return decodedArticles;
};


function ArticlesManagement({ selectedCategoryId }) {
  const queryClient = useQueryClient();

  const [article, setArticle] = useState({
    id: null,
    title: "",
    Body: "",
    Writer: "",
    WriterImage: null,
    MainImageFile: null,
    CategoryId: "",
    MainImageBase64: "",
    WriterImageBase64: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categories = useCategories(); // Fix: useCategories returns the array directly

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setArticle((prev) => ({ ...prev, [type]: file }));
    }
  };

  // Use React Query to fetch articles
  const { data: articles = [], isLoading, isError, error } = useQuery({
    queryKey: ['articles'],
    queryFn: fetchArticles,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  // Filter articles based on selectedCategoryId
  const filteredArticles = selectedCategoryId
    ? articles.filter(article => article.categoryId === selectedCategoryId)
    : articles;

  // Get selected category name
  const selectedCategoryName = selectedCategoryId
    ? categories.find(c => c.id === selectedCategoryId)?.name
    : null;

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(
        `https://stocksquare1.runasp.net/api/Articles/Delete?Id=${id}`,
        {
          method: "DELETE",
          headers: {
            "Accept": "*/*",
          },
        }
      );

      if (!response.ok) {
        throw new Error("فشل حذف المقال");
      }

      return id;
    },
    onSuccess: () => {
      toast.success("تم حذف المقال بنجاح", { theme: "colored" });
      queryClient.invalidateQueries(['articles']);
    },
    onError: (error) => {
      toast.error(`فشل الحذف: ${error.message}`, { theme: "colored" });
    }
  });

  // Save mutation (Create/Update)
  const saveMutation = useMutation({
    mutationFn: async ({ url, method, formData }) => {
      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      if (!response.ok) {
        // Check if it's a 500 error (often means server-side issue, but we might want to see the message)
        let errorMessage = "فشل حفظ المقال";
        try {
          const errorText = await response.text();
          // Try to parse JSON error if possible
          try {
            const errorJson = JSON.parse(errorText);
            errorMessage = errorJson.message || errorJson.error || errorText;
          } catch {
            errorMessage = errorText;
          }
        } catch (e) {
          errorMessage = response.statusText;
        }

        throw new Error(errorMessage);
      }

      return response.json(); // Or response.text() if API doesn't return JSON on success
    },
    onSuccess: () => {
      toast.success(isEditing ? "تم تعديل المقال بنجاح" : "تم إضافة المقال بنجاح", { theme: "colored" });
      setIsModalOpen(false);
      resetForm();
      queryClient.invalidateQueries(['articles']);
    },
    onError: (error) => {
      console.error("Save error:", error);
      toast.error(`حدث خطأ: ${error.message}`, { theme: "colored" });
    }
  });

  const resetForm = () => {
    setArticle({
      id: null,
      title: "",
      Body: "",
      Writer: "",
      WriterImage: null,
      MainImageFile: null,
      CategoryId: "",
      MainImageBase64: "",
      WriterImageBase64: "",
    });
    setIsEditing(false);
  };

  const handleEdit = (item) => {
    console.log("📝 Editing article:", item);

    // Decode body with fallback
    let decodedBody = "";
    try {
      decodedBody = item.body ? decodeFromBase64(item.body) : "";
      console.log("✅ Decoded body length:", decodedBody.length);
    } catch (error) {
      console.error("❌ Failed to decode body:", error);
      decodedBody = item.body || ""; // Fallback to original if decode fails
    }

    setArticle({
      id: item.id,
      title: item.title,
      Body: decodedBody,
      Writer: item.writername,
      WriterImage: null,
      MainImageFile: null,
      CategoryId: item.categoryId,
      MainImageBase64: item.mainImage,
      WriterImageBase64: item.writerImage,
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const saveArticle = () => {
    // Basic validation
    if (!article.title || !article.CategoryId || !article.Writer) {
      toast.error("يرجى ملء الحقول المطلوبة (العنوان، التصنيف، الكاتب)", { theme: "colored" });
      return;
    }

    // Body is required only for NEW articles
    if (!isEditing && !article.Body) {
      toast.error("يرجى إضافة محتوى المقال", { theme: "colored" });
      return;
    }

    // Images required only for NEW articles
    if (!isEditing && (!article.MainImageFile || !article.WriterImage)) {
      toast.error("يرجى إضافة الصور للمقال الجديد", { theme: "colored" });
      return;
    }

    let url;
    let method;
    const formData = new FormData();

    if (isEditing) {
      url = `https://stocksquare1.runasp.net/api/Articles/Update?Id=${article.id}`;
      method = "PUT";

      // Ensure Body is always a string (fallback to space if empty to avoid server errors)
      const bodyContent = article.Body && article.Body.trim() ? article.Body : " ";

      formData.append("Id", article.id || "");
      formData.append("Title", article.title || "");
      formData.append("Body", encodeToBase64(bodyContent));
      formData.append("CategoryId", article.CategoryId || "");
      formData.append("Writername", article.Writer || "");

      if (article.MainImageFile) formData.append("MainImage", article.MainImageFile);
      if (article.WriterImage) formData.append("WriterImage", article.WriterImage);
    } else {
      url = "https://stocksquare1.runasp.net/api/Articles/Create";
      method = "POST";

      formData.append("Title", article.title);
      formData.append("Body", encodeToBase64(article.Body));
      formData.append("CategoryId", article.CategoryId);
      formData.append("Writername", article.Writer);
      formData.append("MainImage", article.MainImageFile);
      formData.append("WriterImage", article.WriterImage);
    }

    saveMutation.mutate({ url, method, formData });
  };

  const deleteArticle = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المقال؟")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      <span className="mr-3 text-lg text-gray-600">جاري تحميل المقالات...</span>
    </div>
  );

  if (isError) return (
    <div className="text-center py-10 text-red-600">
      <p>حدث خطأ أثناء تحميل المقالات: {error.message}</p>
      <button
        onClick={() => queryClient.invalidateQueries(['articles'])}
        className="mt-4 bg-red-100 text-red-700 px-4 py-2 rounded hover:bg-red-200"
      >
        إعادة المحاولة
      </button>
    </div>
  );

  return (
    <div className="p-0 md:p-6 bg-transparent min-h-screen font-sans" dir="rtl">
      <ToastContainer />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="w-full md:w-auto">
          <h1 className="text-xl md:text-3xl font-bold text-gray-800">إدارة المقالات</h1>
          {selectedCategoryId && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded">
                تصفية حسب القسم: <strong>{selectedCategoryName || '...'}</strong>
              </span>
            </div>
          )}
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="w-full md:w-auto justify-center bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition duration-300 flex items-center gap-2 text-sm md:text-base"
        >
          <FontAwesomeIcon icon={faPlus} /> إضافة مقال جديد
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <div className="relative h-48">
                <img
                  src={`data:image/*;base64,${item.mainImage}`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 right-0 bg-green-600 text-white text-xs px-2 py-1 rounded-bl-lg">
                  {categories.find(c => c.id === item.categoryId)?.name || "غير مصنف"}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2" title={item.title}>
                  {item.title}
                </h3>

                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                      {item.writerImage ? (
                        <img
                          src={`data:image/*;base64,${item.writerImage}`}
                          alt={item.writername}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <i className="fas fa-user"></i>
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-gray-600 truncate max-w-[100px]">{item.writername}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => deleteArticle(item.id)}
                      className="text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16 bg-white rounded-lg border border-dashed border-gray-300">
            <div className="text-gray-400 mb-4">
              <FontAwesomeIcon icon={faPlus} size="3x" />
            </div>
            <p className="text-xl text-gray-600 font-medium">لا توجد مقالات {selectedCategoryId ? 'في هذا القسم' : ''}</p>
            <p className="text-gray-500 mt-2">ابدأ بإضافة مقال جديد</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl my-8 relative flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">
                {isEditing ? "تعديل المقال" : "إضافة مقال جديد"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">عنوان المقال</label>
                    <input
                      type="text"
                      placeholder="عنوان المقال"
                      value={article.title}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                      onChange={(e) =>
                        setArticle((prev) => ({ ...prev, title: e.target.value }))
                      }
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">التصنيف</label>
                    <select
                      value={article.CategoryId}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                      onChange={(e) =>
                        setArticle({ ...article, CategoryId: e.target.value })
                      }
                    >
                      <option value="">اختر التصنيف</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الكاتب</label>
                  <input
                    type="text"
                    placeholder="اسم الكاتب"
                    value={article.Writer}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                    onChange={(e) => setArticle({ ...article, Writer: e.target.value })}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">صورة المقال الرئيسية</label>
                    <div className="flex items-center gap-3">
                      <label
                        htmlFor="mainArticleImage"
                        className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded cursor-pointer hover:bg-gray-200 transition-colors"
                      >
                        اختر صورة
                      </label>
                      <input
                        type="file"
                        className="hidden"
                        id="mainArticleImage"
                        onChange={(e) => handleFileChange(e, "MainImageFile")}
                      />
                      {article.MainImageFile && (
                        <span className="text-sm text-green-600 truncate max-w-[200px]">
                          {article.MainImageFile.name}
                        </span>
                      )}
                    </div>
                    <div className="mt-2">
                      {article.MainImageFile ? (
                        <img src={URL.createObjectURL(article.MainImageFile)} alt="New Preview" className="h-24 w-auto rounded border shadow-sm" />
                      ) : (isEditing && article.MainImageBase64) ? (
                        <div className="relative inline-block">
                          <img src={`data:image/*;base64,${article.MainImageBase64}`} alt="Current" className="h-24 w-auto rounded border shadow-sm opacity-90" />
                          <span className="absolute top-0 right-0 bg-gray-800 text-white text-xs px-1 rounded-bl">الحالية</span>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">صورة الكاتب</label>
                    <div className="flex items-center gap-3">
                      <label
                        htmlFor="WriterImage"
                        className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded cursor-pointer hover:bg-gray-200 transition-colors"
                      >
                        اختر صورة
                      </label>
                      <input
                        type="file"
                        className="hidden"
                        id="WriterImage"
                        onChange={(e) => handleFileChange(e, "WriterImage")}
                      />
                      {article.WriterImage && (
                        <span className="text-sm text-green-600 truncate max-w-[200px]">
                          {article.WriterImage.name}
                        </span>
                      )}
                    </div>
                    <div className="mt-2">
                      {article.WriterImage ? (
                        <img src={URL.createObjectURL(article.WriterImage)} alt="New Preview" className="h-24 w-auto rounded border shadow-sm" />
                      ) : (isEditing && article.WriterImageBase64) ? (
                        <div className="relative inline-block">
                          <img src={`data:image/*;base64,${article.WriterImageBase64}`} alt="Current" className="h-24 w-auto rounded border shadow-sm opacity-90" />
                          <span className="absolute top-0 right-0 bg-gray-800 text-white text-xs px-1 rounded-bl">الحالية</span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">محتوى المقال</label>
                  <SunEditor
                    key={`editor-${article.id || 'new'}-${isEditing}`}
                    setContents={article.Body}
                    onChange={(content) =>
                      setArticle((prev) => ({ ...prev, Body: content }))
                    }
                    setOptions={{
                      height: "400px",
                      minHeight: "300px",
                      buttonList: [
                        ["bold", "italic", "underline", "strike"],
                        ["font", "fontColor", "hiliteColor", "fontSize"],
                        ["align", "list", "table"],
                        ["link", "image"],
                        ["preview"],
                        ["fullScreen", "showBlocks", "codeView"],
                      ],
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 rounded-b-lg flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={saveArticle}
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                {isEditing ? "حفظ التعديلات" : "نشر المقال"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticlesManagement;
