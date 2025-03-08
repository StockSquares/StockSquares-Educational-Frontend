import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function LoadBook() {
  const [book, setBook] = useState({
    category: "",
    title: "",
    bookFile: "",
  });

  const savebook = () => {
    if (book.title !== "" && book.category !== "" && book.bookFile !== "")
      toast.success(" تم الحفظ بنجاح", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  };
  return (
    <div className="flex flex-col justify-center items-center gap-5 mt-4 mb-10">
      <input
        type="text"
        placeholder=" ادخل عنوان الكتاب"
        value={book.title}
        onChange={(e) => setBook({ ...book, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="  ادخل تصنيف الكتاب"
        value={book.category}
        onChange={(e) => setBook({ ...book, category: e.target.value })}
      />
      <input
        type="file"
        value={book.bookFile}
        className="py-2 px-3 "
        onChange={(e) => setBook({ ...book, bookFile: e.target.value })}
      />
      <button
        className=" text-white px-10 py-2 rounded bg-primary-950  hover:bg-green-700"
        onClick={savebook}
      >
        حفظ
      </button>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
export default LoadBook;
