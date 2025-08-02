import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCategories } from "../../../../../../Context/CategoriesContext";

const schema = yup.object().shape({
  BookName: yup.string().required("اسم الكتاب مطلوب"),
  BookPrice: yup
    .number()
    .typeError("يجب أن يكون رقمًا")
    .positive("يجب أن يكون رقمًا موجبًا")
    .required("السعر مطلوب"),
  BookPhoto: yup.mixed().required("الصورة مطلوبة"),
  BookDescription: yup.string().required("الوصف مطلوب"),
  Quantity: yup
    .number()
    .typeError("يجب أن يكون رقمًا")
    .positive("يجب أن يكون رقمًا موجبًا")
    .integer("يجب أن يكون عددًا صحيحًا")
    .required("الكمية مطلوبة"),
  BookCategory: yup.string().required("التصنيف مطلوب"),
  BookSummary: yup.string().required("الملخص مطلوب"),
  BookType: yup.string().required("نوع الكتاب مطلوب"),
});

const AddBook = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [allBooks, setAllBooks] = useState([]);
  const [outOfStock, setOutOfStock] = useState([]);
  const [editBook, setEditBook] = useState(null);

  const DeleteBook = async (bookId) => {
    try {
      let response = await fetch(
        `https://stocksquare.runasp.net/api/Book?Id=${bookId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "text/plain",
          },
        }
      );
      console.log(response);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleEdit = (book) => {
    setEditBook(book); // حفظ بيانات الكتاب المحدد
    reset({
      Id: book.id,
      BookName: book.bookName,
      BookPrice: book.bookPrice,
      BookDescription: book.bookDescription,
      Quantity: book.quantity,
      BookCategory: book.bookCategory,
      BookType: book.bookType,
    });
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("BookName", data.BookName);
    formData.append("BookPrice", data.BookPrice);
    formData.append("BookPhoto", data.BookPhoto[0]);
    formData.append("BookDescription", data.BookDescription);
    formData.append("Quantity", data.Quantity);
    formData.append("BookCategory", data.BookCategory);
    formData.append("BookType", data.BookType);

    if (editBook) {
      formData.append("Id", data.Id);
      try {
        let response = await fetch("https://stocksquare.runasp.net/api/Book", {
          method: "PUT",
          body: formData,
        });
        if (response.ok) {
          console.log("تم التعديل بنجاح");
        } else {
          console.log("فشل التعديل");
        }
      } catch (e) {
        console.log(e.message);
      }
    } else {
      try {
        let response = await fetch("https://stocksquare.runasp.net/api/Book", {
          method: "POST",
          body: formData,
        });
        console.log(response);

        if (response.ok) {
          console.log("great");
        } else {
          console.log("not great");
        }
      } catch (e) {
        console.log(e.message);
      }
    }
    setEditBook(null); // إلغاء وضع التعديل بعد الحفظ
    reset();
  };

  useEffect(() => {
    fetch("https://stocksquare.runasp.net/api/Book/GetAllBooks")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setAllBooks(data.data);
      })
      .catch((e) => console.log(e.message));
  }, []);

  const categories = useCategories();

  return (
    <div className="bg-white rounded-lg p-6 mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
      <form
        className="w-full text-start bg-white border-none shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold mb-4 text-green-600 text-start">
          {editBook ? "تعديل الكتاب" : "إضافة كتاب جديد"}{" "}
        </h2>
        {/* الاسم والسعر */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block mb-2">اسم الكتاب:</label>
            <input
              {...register("BookName")}
              className="w-full p-2 border rounded"
            />
            <p className="text-red-500">{errors.BookName?.message}</p>
          </div>
          <div className="w-1/2">
            <label className="block mb-2">السعر:</label>
            <input
              type="number"
              {...register("BookPrice")}
              className="w-full p-2 border rounded"
            />
            <p className="text-red-500">{errors.BookPrice?.message}</p>
          </div>
        </div>

        {/* التصنيف ونوع الكتاب */}
        <div className="flex gap-4 mt-4 items-end">
          <div className="w-1/2">
            <select {...register("BookCategory")}>
              <option value="">اختر التصنيف</option>
              <option value="mn">n m</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <p className="text-red-500">{errors.BookCategory?.message}</p>
          </div>
          <div className="w-1/2">
            <label className="block mb-2">نوع الكتاب:</label>
            <input
              {...register("BookType")}
              className="w-full p-2 border rounded"
            />
            <p className="text-red-500">{errors.BookType?.message}</p>
          </div>
        </div>

        {/* الصورة */}
        <div className="mt-4">
          <label className="block mb-2">صورة الكتاب:</label>
          <input type="file" {...register("BookPhoto")} className="w-full" />
          <p className="text-red-500">{errors.BookPhoto?.message}</p>
        </div>

        {/* الكمية */}
        <div className="mt-4">
          <label className="block mb-2">الكمية:</label>
          <input
            type="number"
            {...register("Quantity")}
            className="w-full p-2 border rounded"
          />
          <p className="text-red-500">{errors.Quantity?.message}</p>
        </div>

        {/* الوصف */}
        <div className="mt-4">
          <label className="block mb-2">وصف الكتاب:</label>
          <textarea
            {...register("BookDescription")}
            className="w-full p-2 border rounded"
          ></textarea>
          <p className="text-red-500">{errors.BookDescription?.message}</p>
        </div>

        <SunEditor
          setContents={watch("BookSummary")}
          onChange={(content) => setValue("BookSummary", content)}
          setOptions={{
            buttonList: [
              ["bold", "italic", "underline", "strike"],
              ["font", "fontColor", "hiliteColor", "fontSize"],
              ["align", "list", "table"],
            ],
          }}
        />

        {/* زر الإرسال */}
        <button
          type="submit"
          className="mt-6 bg-green-500 text-white w-full p-2 rounded hover:bg-green-600"
        >
          إرسال البيانات
        </button>
      </form>

      <table className="w-full text-[8px] lg:text-[14px] border-collapse border border-gray-300 h-[20%] table-fixed overflow-x-auto">
        <thead>
          <tr className="bg-green-400 text-white">
            <th className="border border-gray-300 p-2 lg:p-3">الاسم</th>
            <th className="border border-gray-300 p-2 lg:p-3">النوع</th>
            <th className="border border-gray-300 p-2 lg:p-3">التصنيف</th>
            <th className="border border-gray-300 p-2 lg:p-3">السعر</th>
            <th className="border border-gray-300 p-2 lg:p-3">الكمية</th>
            <th className="border border-gray-300 p-2 lg:p-3">اجراءات</th>
          </tr>
        </thead>
        <tbody>
          {allBooks.map((book, idx) => (
            <tr key={book.id} className="text-center hover:bg-gray-100">
              <td className="border border-gray-300 p-3"> {book.bookName} </td>
              <td className="border border-gray-300 p-3"> {book.bookType} </td>
              <td className="border border-gray-300 p-3">
                {book.bookCategory}
              </td>
              <td className="border border-gray-300 p-3"> {book.bookPrice} </td>
              <td className="border border-gray-300 p-3"> {book.quantity} </td>
              <td className="border border-gray-300">
                <div className="flex justify-center flex-wrap gap-2">
                  {!outOfStock.includes(book.id) ? (
                    <button
                      className="bg-accent-700 text-black py-1 px-1 lg:px-5 rounded-lg"
                      onClick={() => setOutOfStock([...outOfStock, book.id])}
                    >
                      نفذ
                    </button>
                  ) : (
                    <button
                      className="bg-green-600 text-whitepy-1 px-1 lg:px-3 rounded-lg"
                      onClick={() =>
                        setOutOfStock(outOfStock.filter((id) => id !== book.id))
                      }
                    >
                      متاح
                    </button>
                  )}
                  <button
                    className="bg-blue-500 text-white py-1 px-1 lg:px-3 rounded-lg"
                    onClick={() => handleEdit(book)}
                  >
                    تعديل
                  </button>
                  <button
                    className="bg-red-600 text-white py-1 px-1 lg:px-3 rounded-lg"
                    onClick={() => DeleteBook(book.id)}
                  >
                    حذف
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddBook;
