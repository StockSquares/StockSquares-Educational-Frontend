import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { useCategories } from "../../../../Context";

function ArticlesManagement() {
  const [article, setArticle] = useState({
    title: "",
    Body: "",
    Writer: "",
    WriterImage: null,
    MainImageFile: null,
    CategoryId: "",
  });

  const [articles, setArticles] = useState([]); // Store list of articles

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

      // Get raw text first to debug
      const rawText = await response.text();
      console.log("📥 Raw API Response (first 500 chars):", rawText.substring(0, 500));

      // Try to parse JSON
      let data;
      try {
        data = JSON.parse(rawText);
      } catch (parseError) {
        console.error("❌ JSON Parse Error:", parseError);
        console.error("🔍 Problematic JSON around position:", rawText.substring(20540580, 20540600));
        toast.error("خطأ في بيانات المقالات من السيرفر", { theme: "colored" });
        return;
      }

      if (response.ok) {
        setArticles(data);
        console.log("✅ Articles loaded:", data.length);
      } else {
        console.error("Failed to fetch articles");
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      toast.error("فشل تحميل المقالات", { theme: "colored" });
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

  const saveArticle = async () => {
    if (
      !article.title ||
      !article.CategoryId ||
      !article.Body ||
      !article.Writer ||
      !article.MainImageFile ||
      !article.WriterImage
    ) {
      toast.error("يرجى ملء جميع الحقول وإرفاق الصور المطلوبة", {
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
      formData.append("MainImageFile", article.MainImageFile);
      formData.append("WriterImage", article.WriterImage);

      // DEBUG: Log what we are sending
      console.log("🚀 Sending Article Data:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await fetch(
        "https://stocksquare1.runasp.net/api/Articles/create",
        {
          method: "POST",
          body: formData,
        }
      );

      // DEBUG: Log the raw response status
      console.log("📡 Response Status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Server Error Response:", errorText);
        throw new Error(`Server Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("✅ Success Data:", data);

      toast.success("تم إرسال المقال بنجاح!", { theme: "colored" });

      setArticle({
        title: "",
        Body: "",
        Writer: "",
        WriterImage: null,
        MainImageFile: null,
        CategoryId: "",
      });
      setAddArticle(false);
      fetchArticles(); // Refresh list after add
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
            نشر المقال
          </button>
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
              <button
                onClick={() => deleteArticle(item.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 w-full mt-2"
              >
                حذف المقال
              </button>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default ArticlesManagement;
