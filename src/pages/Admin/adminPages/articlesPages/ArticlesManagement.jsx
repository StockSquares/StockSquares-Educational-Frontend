import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

function ArticlesManagement() {
  const [article, setArticle] = useState({
    title: "",
    Body: "",
    Writer: "",
    WriterImage: null,
    MainImageFile: null,
    CategoryId: "",
  });

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setArticle((prev) => ({ ...prev, [type]: file }));
    }
  };

  const [addArticle, setAddArticle] = useState(false);
  const [categories, setCategories] = useState([]);

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
      formData.append("title", article.title);
      formData.append("Body", article.Body);
      formData.append("Writer", article.Writer);
      formData.append("CategoryId", article.CategoryId);
      formData.append("MainImageFile", article.MainImageFile);
      formData.append("WriterImage", article.WriterImage);

      const response = await fetch(
        "https://stocksquare.runasp.net/api/Articles/create",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("فشل في إرسال المقال");

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
    } catch (error) {
      toast.error("حدث خطأ أثناء إرسال المقال");
      console.error("❌ حدث خطأ:", error);
    }
  };

  useEffect(() => {
    fetch("https://stocksquare.runasp.net/api/Category/GetByType?type=string")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("❌ حدث خطأ أثناء جلب البيانات:", error));
  }, []);

  return (
    <div className="flex flex-col gap-3 mt-4">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="عنوان المقال"
          value={article.title}
          onChange={(e) =>
            setArticle((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <select
          value={article.CategoryId}
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
      <input
        type="text"
        placeholder="الكاتب"
        value={article.Writer}
        onChange={(e) => setArticle({ ...article, Writer: e.target.value })}
      />

      {addArticle ? (
        <div className="article">
          <div className="flex gap-3 items-center">
            <label
              htmlFor="mainArticleImage"
              className="px-3 py-2 bg-accent-900 rounded-md cursor-pointer hover:bg-accent-400"
            >
              اضف صورة للمقال
            </label>
            <input
              type="file"
              className="hidden"
              id="mainArticleImage"
              onChange={(e) => handleFileChange(e, "MainImageFile")}
            />{" "}
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

          <div className="flex gap-3 items-center">
            <label
              htmlFor="WriterImage"
              className="px-3 py-2 bg-green-500 rounded-md cursor-pointer hover:bg-green-700"
            >
              اضف صورة للكاتب
            </label>
            <input
              type="file"
              className="hidden"
              id="WriterImage"
              onChange={(e) => handleFileChange(e, "WriterImage")}
            />{" "}
            {article.WriterImage && (
              <div className="flex items-center gap-2">
                <span className="text-green-600">
                  {article.WriterImage.name}
                </span>
                <img
                  src={URL.createObjectURL(article.WriterImage)}
                  alt="معاينة الكاتب"
                  className="w-[50px] h-[50px] rounded-md border"
                />
              </div>
            )}
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
              ],
            }}
          />
          <div className="flex gap-5">
            <button className="bg-accent-950 text-dark px-4 py-2 mt-3 rounded hover:bg-gray-600">
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
      ) : (
        <div className="flex gap-3 text-white mt-4">
          <button
            className="px-3 py-2 bg-primary-dark rounded-lg"
            onClick={() => setAddArticle(true)}
          >
            إضافة مقال
          </button>
          <button className="px-3 py-2 bg-red-600 rounded-lg">حذف</button>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default ArticlesManagement;
