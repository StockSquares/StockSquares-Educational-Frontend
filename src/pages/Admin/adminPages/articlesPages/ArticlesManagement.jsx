import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { useCategories } from "../../../../Context";

function ArticlesManagement() {
  const [article, setArticle] = useState({
    id: null,
    title: "",
    Body: "",
    Writer: "",
    WriterImage: null,
    MainImageFile: null,
    CategoryId: "",
  });

  const [articles, setArticles] = useState([]); // Store list of articles
  const [isEditing, setIsEditing] = useState(false); // Track if editing
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setArticle((prev) => ({ ...prev, [type]: file }));
    }
  };

  const [addArticle, setAddArticle] = useState(false);
  const categories = useCategories();

  // Fetch all articles
  const fetchArticles = async () => {
    try {
      const response = await fetch(
        "https://stocksquare1.runasp.net/api/Articles/GetAll"
      );
      const data = await response.json();
      if (response.ok) {
        setArticles(data);
      } else {
        console.error("Failed to fetch articles");
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Delete article
  const deleteArticle = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا المقال؟")) return;

    console.log("🗑️ Deleting Article ID:", id); // DEBUG

    try {
      const response = await fetch(
        `https://stocksquare1.runasp.net/api/Articles/Delete?id=${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "text/plain",
          },
        }
      );

      if (response.ok) {
        toast.success("تم حذف المقال بنجاح", { theme: "colored" });
        fetchArticles(); // Refresh list
      } else {
        const errorText = await response.text();
        console.error("❌ Delete Failed:", errorText);
        toast.error(`فشل الحذف: ${errorText}`, { theme: "colored" });
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء الحذف", { theme: "colored" });
      console.error(error);
    }
  };

  // Handle edit button click
  const handleEdit = (item) => {
    setArticle({
      id: item.id,
      title: item.title,
      Body: item.body,
      Writer: item.writername,
      WriterImage: null, // Will be updated if user uploads new image
      MainImageFile: null, // Will be updated if user uploads new image
      CategoryId: item.categoryId,
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveArticle = async () => {
    // Validation (images optional for update)
    if (!article.title || !article.CategoryId || !article.Body || !article.Writer) {
      toast.error("يرجى ملء جميع الحقول المطلوبة", {
        theme: "colored",
      });
      return;
    }

    // For new articles, images are required
    if (!isEditing && (!article.MainImageFile || !article.WriterImage)) {
      toast.error("يرجى إرفاق الصور المطلوبة", {
        theme: "colored",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("Title", article.title);
      formData.append("Body", article.Body);
      formData.append("Writername", article.Writer);
      formData.append("CategoryId", article.CategoryId);

      // Only append images if provided
      if (article.MainImageFile) {
        formData.append("MainImageFile", article.MainImageFile);
      }
      if (article.WriterImage) {
        formData.append("WriterImage", article.WriterImage);
      }

      // DEBUG: Log what we are sending
      console.log("🚀 Sending Article Data:");
      console.log("📝 Mode:", isEditing ? "UPDATE" : "CREATE");
      console.log("🆔 Article ID:", article.id);
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const url = isEditing
        ? `https://stocksquare1.runasp.net/api/Articles/Update?Id=${article.id}&Title=${encodeURIComponent(article.title)}&Body=${encodeURIComponent(article.Body)}&CategoryId=${article.CategoryId}&Writername=${encodeURIComponent(article.Writer)}`
        : "https://stocksquare1.runasp.net/api/Articles/create";

      const method = isEditing ? "PUT" : "POST";

      console.log("🌐 Request URL:", url);
      console.log("📡 Request Method:", method);

      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      // DEBUG: Log the raw response status
      console.log("📡 Response Status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Server Error Response:", errorText);
        throw new Error(`Server Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("✅ Success Data:", data);

      const successMessage = isEditing ? "تم تعديل المقال بنجاح!" : "تم إرسال المقال بنجاح!";
      toast.success(successMessage, { theme: "colored" });

      setArticle({
        id: null,
        title: "",
        Body: "",
        Writer: "",
        WriterImage: null,
        MainImageFile: null,
        CategoryId: "",
      });
      setIsEditing(false);
      setAddArticle(false);
      fetchArticles(); // Refresh list
    } catch (error) {
      toast.error(`حدث خطأ: ${error.message}`);
      console.error("❌ Exception:", error);
    }
  };

  // // دالة لتحميل صورة عبر API واسترجاع الرابط
  // const uploadImageToAPI = async (file) => {
  //   const formData = new FormData();
  //   formData.append("file", file);

  //   try {
  //     const response = await fetch(
  //       "https://lawmaster.runasp.net/api/CourtSession/UploadCourtSessionAttachments?courtSessionId=5",
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );
  //     if (!response.ok) throw new Error("فشل رفع الصورة");

  //     const data = await response.json();
  //     return data.url; // استرجاع رابط الصورة من API
  //   } catch (error) {
  //     toast.error("فشل رفع الصورة");
  //     console.error("❌ خطأ في رفع الصورة:", error);
  //     return null;
  //   }
  //   };

  // دالة لرفع الصورة داخل SunEditor واستخدام URL مخصص بدل Base64
  console.log(article);

  return (
    <div className="flex flex-col gap-3 mt-4">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="عنوان المقال"
          value={article.title}
          className="dark:bg-dark-background w-full dark:placeholder-100"
          onChange={(e) =>
            setArticle((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <select
          value={article.CategoryId}
          className="dark:bg-dark-background w-full dark:placeholder-100"
          onChange={(e) =>
            setArticle({ ...article, CategoryId: e.target.value })
          }
        >
          <option value="">اختر التصنيف</option>
          {/* <option value="mn">n m</option> */}
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        placeholder="الكاتب"
        value={article.Writer}
        className="dark:bg-dark-background  dark:placeholder-100"
        onChange={(e) => setArticle({ ...article, Writer: e.target.value })}
      />

      <div className="article">
        <div className="flex justify-between gap-3">
          <div className="flex flex-col md:flex-row gap-3 w-full items-center mb-3">
            <label
              htmlFor="mainArticleImage"
              className="px-3 py-2 bg-accent-900 dark:text-black font-semibold rounded-md cursor-pointer hover:bg-accent-400"
            >
              اضف صورة للمقال
            </label>
            <input
              type="file"
              className="hidden "
              id="mainArticleImage"
              onChange={(e) => handleFileChange(e, "MainImageFile")}
            />
            {article.MainImageFile && (
              <div className="flex items-center gap-2 ">
                <span className="text-green-600">
                  {article.MainImageFile.name}
                </span>
                <img
                  src={URL.createObjectURL(article.MainImageFile)}
                  alt="معاينة المقال"
                  className="w-[50px] h-[50px] rounded-md border"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row w-full justify-start  gap-3 items-center mb-3">
            <label
              htmlFor="WriterImage"
              className="px-3 py-2 bg-primary-900  text-white rounded-md cursor-pointer  font-semibold hover:bg-green-700"
            >
              اضف صورة للكاتب
            </label>
            <input
              type="file"
              className="hidden"
              id="WriterImage"
              onChange={(e) => handleFileChange(e, "WriterImage")}
            />
            {article.WriterImage && (
              <div className="flex items-center gap-2">
                <span className="text-green-600">{article.WriterImage.name}</span>
                <img
                  src={URL.createObjectURL(article.WriterImage)}
                  alt="معاينة الكاتب"
                  className="w-[50px] h-[50px] rounded-md border"
                />
              </div>
            )}
          </div>
        </div>

        <SunEditor
          setContents={article.Body}
          onChange={(content) =>
            setArticle((prev) => ({ ...prev, Body: content }))
          }
          setOptions={{
            buttonList: [
              ["bold", "italic", "underline", "strike"],
              ["font", "fontColor", "hiliteColor", "fontSize"],
              ["align", "list", "table"],
              ["link", "image"],
              ["preview"],
            ],
          }}
        />
        <div className="flex gap-5">
          <button className="bg-accent-950 dark:text-black text-dark px-4 py-2 mt-3 rounded hover:bg-gray-600">
            حفظ المقال
          </button>

          <button
            className="bg-primary-950 text-white px-4 py-2 mt-3 rounded hover:bg-gray-600"
            onClick={saveArticle}
          >
            {isEditing ? "تحديث المقال" : "نشر المقال"}
          </button>

          {isEditing && (
            <button
              className="bg-gray-500 text-white px-4 py-2 mt-3 rounded hover:bg-gray-600"
              onClick={() => {
                setArticle({
                  id: null,
                  title: "",
                  Body: "",
                  Writer: "",
                  WriterImage: null,
                  MainImageFile: null,
                  CategoryId: "",
                });
                setIsEditing(false);
              }}
            >
              إلغاء التعديل
            </button>
          )}
        </div>
      </div>

      {/* Article List Section */}
      <div className="mt-10 border-t pt-5">
        <h2 className="text-xl font-bold mb-4">قائمة المقالات</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded-lg shadow-sm bg-white dark:bg-dark-background flex flex-col justify-between min-h-[350px]"
            >
              <div>
                <img
                  src={`data:image/*;base64,${item.mainImage}`}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  الكاتب: {item.writername}
                </p>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex-1"
                >
                  تعديل
                </button>
                <button
                  onClick={() => deleteArticle(item.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex-1"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default ArticlesManagement;
