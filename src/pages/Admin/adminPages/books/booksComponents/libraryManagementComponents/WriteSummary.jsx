import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";

function WriteSummary() {
  const [summary, setSummary] = useState({
    category: "",
    title: "",
    content: "",
  });

  const saveSummary = () => {
    if (
      summary.title !== "" &&
      summary.category !== "" &&
      summary.content !== ""
    )
    toast.success(' تم الحفظ بنجاح', {
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
    <div className="flex flex-col gap-3 mt-4 ">
    
      <div className="flex gap-3">
        <input
          type="text"
          placeholder=" عنوان الكتاب"
          value={summary.title}
          onChange={(e) => setSummary({ ...summary, title: e.target.value })}
        />
        <input
          type="text"
          placeholder=" تصنيف "
          value={summary.category}
          onChange={(e) => setSummary({ ...summary, category: e.target.value })}
        />
      </div>
      <div className="summary">
      

        <button
          className="bg-darkgray text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={saveSummary}
        >
          حفظ الملخص
        </button>
      </div>

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
export default WriteSummary;
