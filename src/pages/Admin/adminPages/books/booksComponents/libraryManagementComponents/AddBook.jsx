import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCategories } from "../../../../../../Context/CategoriesContext";
import { BookType } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

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
  const [allBooks, setAllBooks] = useState([]);
  const [outOfStock, setOutOfStock] = useState([]);
  const [editBook, setEditBook] = useState(null);

  const [newBook, setNewBook] = useState({
    BookName: "",
    BookPrice: "",
    BookDescription: "",
    Quantity: "",
    BookCategory: "",
    BookType: "",
    BookSummary: "",
  });

  const DeleteBook = async (bookId) => {
    try {
      let response = await fetch(
        `https://stocksquare1.runasp.net/api/Book?Id=${bookId}`,
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
    setNewBook({
      BookName: book.bookName,
      BookPrice: book.bookPrice,
      BookDescription: book.bookDescription,
      Quantity: book.quantity,
      BookCategory: book.bookCategory,
      BookType: book.bookType,
      BookPhoto: null,
      // BookSummary: book.bookSummary || "",
    });
  };

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("BookName", newBook.BookName);
    formData.append("BookPrice", newBook.BookPrice);
    if (newBook.BookPhoto) {
      formData.append("BookPhoto", newBook.BookPhoto);
    }
    formData.append("BookDescription", newBook.BookDescription);
    formData.append("Quantity", newBook.Quantity);
    formData.append("BookCategory", newBook.BookCategory);
    formData.append("BookType", newBook.BookType);
    // formData.append("BookSummary", newBook.BookSummary);

    if (editBook) {
      formData.append("Id", editBook.id);

      const response = await fetch("https://stocksquare1.runasp.net/api/Book", {
        method: "PUT",
        body: formData,
      });
    } else {
      const response = await fetch("https://stocksquare1.runasp.net/api/Book", {
        method: "POST",
        body: formData,
      });
      console.log("sent");
    }

    setEditBook(null);
    setNewBook({
      BookName: "",
      BookPrice: "",
      BookDescription: "",
      Quantity: "",
      BookCategory: "",
      BookType: "",
      BookSummary: "",
      BookPhoto: null,
    });
  };

  useEffect(() => {
    fetch("https://stocksquare1.runasp.net/api/Book/GetAllBooks")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setAllBooks(data.data);
      })
      .catch((e) => console.log(e.message));
  }, []);

  return (
    <div className="bg-white  w-full dark:bg-dark-background rounded-lg  mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
      <form
        className="w-full text-start p-3 bg-white dark:bg-dark-background dark:border-2 dark:border-primary-700  shadow-md"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <h2 className="text-2xl font-bold mb-4 text-green-600 text-start">
          {editBook ? "تعديل الكتاب" : "إضافة كتاب جديد"}{" "}
        </h2>
        {/* الاسم والسعر */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block mb-2">اسم الكتاب:</label>
            <input
              value={newBook.BookName}
              onChange={(e) =>
                setNewBook({ ...newBook, BookName: e.target.value })
              }
              className="w-full p-2 border rounded dark:bg-darkgray dark:placeholder-slate-400"
              placeholder="اسم الكتاب"
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-2">السعر:</label>
            <input
              type="number"
              value={newBook.BookPrice}
              onChange={(e) =>
                setNewBook({ ...newBook, BookPrice: e.target.value })
              }
              className="w-full p-2 border rounded dark:bg-darkgray dark:placeholder-slate-400"
              placeholder="السعر"
            />
          </div>
        </div>

        {/* التصنيف ونوع الكتاب */}
        <div className="flex gap-4 mt-4 items-end">
          <div className="w-1/2">
            <select
              value={newBook.BookCategory}
              onChange={(e) =>
                setNewBook({ ...newBook, BookCategory: e.target.value })
              }
              className="dark:bg-darkgray dark:placeholder-slate-400"
            >
              <option value="">اختر التصنيف</option>
              <option value="physical_Copy"> نسخه ماديه أصليه </option>
              <option value="digital_Copy"> نسخه رقميه ابداعيه </option>
            </select>
          </div>
          <div className="w-1/2">
            <label className="block mb-2">نوع الكتاب:</label>
            <input
              value={newBook.BookType}
              onChange={(e) =>
                setNewBook({ ...newBook, BookType: e.target.value })
              }
              className="w-full p-2 border rounded dark:bg-darkgray dark:placeholder-slate-400"
              placeholder="نوع الكتاب"
            />
          </div>
        </div>

        {/* الصورة */}
        <div className="mt-4">
          <label className="block mb-2">صورة الكتاب:</label>
          <input
            type="file"
            onChange={(e) =>
              setNewBook({ ...newBook, BookPhoto: e.target.files[0] })
            }
            className="w-full dark:bg-darkgray dark:placeholder-slate-400"
          />
        </div>

        {/* الكمية */}
        <div className="mt-4">
          <label className="block mb-2">الكمية:</label>
          <input
            type="number"
            value={newBook.Quantity}
            onChange={(e) =>
              setNewBook({ ...newBook, Quantity: e.target.value })
            }
            className="w-full p-2 border rounded dark:bg-darkgray dark:placeholder-slate-400"
            placeholder="الكميه"
          />
        </div>

        {/* الوصف */}
        <div className="mt-4">
          <label className="block mb-2">وصف الكتاب:</label>
          <textarea
            value={newBook.BookDescription}
            onChange={(e) =>
              setNewBook({ ...newBook, BookDescription: e.target.value })
            }
            className="w-full p-2 border rounded dark:bg-darkgray dark:placeholder-slate-400"
            placeholder="اكتب الوصف هنا..."
          ></textarea>
        </div>

        <SunEditor
          onChange={(content) => (prev) => {
            setNewBook({ ...prev, BookSummary: content });
          }}
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
          {allBooks.map((book) => (
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
                    <FontAwesomeIcon
                      icon={faCircle}
                      className=" text-primary-700  rounded-lg"
                      onClick={() => setOutOfStock([...outOfStock, book.id])}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCircle}
                      className=" text-red-600 rounded-lg"
                      onClick={() =>
                        setOutOfStock(outOfStock.filter((id) => id !== book.id))
                      }
                    />
                  )}

                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-blue-500 rounded-lg"
                    onClick={() => handleEdit(book)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-600 rounded-lg"
                    onClick={() => DeleteBook(book.id)}
                  />
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
