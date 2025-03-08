import { useState, useEffect } from "react";
import style from "../adminPages.module.css";
import TrainerSelected from "./TrainerSelected";
import SunEditor from "suneditor-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

function CoursesManagement() {
  const [categories, setCategories] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showcourseContent, setShowCourseContent] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    id: "",
    Title: "",
    Type: "",
    NameOfTranier: "",
    Time: "",
    BioOfTranier: "",
    Image: "",
    Description: "",
    CategoryId: "",
  });

  const [courseContent, setCourseContent] = useState({
    FileName: "",
    Pdfs: "",
    CourseId: newCourse.id,
  });

  const [isShow, setIsShow] = useState(false);

  const saveCourse = async () => {
    if (newCourse.Title || newCourse.NameOfTranier) {
      const formData = new FormData();
      formData.append("Title", newCourse.Title);
      formData.append("Type", newCourse.Type);
      formData.append("NameOfTranier", newCourse.NameOfTranier);
      formData.append("Time", newCourse.Time);
      formData.append("BioOfTranier", newCourse.BioOfTranier);
      formData.append("Image", newCourse.Image);
      formData.append("Description", newCourse.Description);
      formData.append("CategoryId", newCourse.CategoryId);
      if (newCourse.id) {
        formData.append("Id", newCourse.id);
      }

      try {
        setIsLoading(true);
        if (newCourse.id) {
          let response = await fetch(
            "https://stocksquare.runasp.net/api/Course/UpdateCourse",
            {
              method: "PUT",
              body: formData,
            }
          );

          let data = await response.json();
          console.log(data);
        } else {
          let response = await fetch(
            "https://stocksquare.runasp.net/api/Course/CreateCourse",
            {
              method: "Post",
              body: formData,
            }
          );

          let data = await response.json();
          console.log(data);

          setShowModal(false);
        }
      } catch (e) {
        alert("wrong", e.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const deleteCourse = async (courseId) => {
    console.log(courseId);

    try {
      let response = await fetch(
        `https://stocksquare.runasp.net/api/Course/DeleteCourse?id=${courseId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "text/plain",
          },
        }
      );

      if (response.ok) {
        alert("تم حذف الكورس بنجاح ✅");
      } else {
        alert("❌ فشل في حذف الكورس");
      }
    } catch (e) {
      console.log("cant Delete", e.message);
    }
  };

  const UpdateCourse = (course) => {
    setNewCourse({
      id: course.id,
      Title: course.title,
      Type: course.type,
      NameOfTranier: course.nameOfTranier,
      Time: course.time,
      BioOfTranier: course.bioOfTranier,
      Image: "",
      Description: course.description,
    });
    setShowModal(true);
  };

  useEffect(() => {
    fetch("https://stocksquare.runasp.net/api/Category/GetByType?type=string")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("❌ حدث خطأ أثناء جلب البيانات:", error));
  }, []);

  useEffect(() => {
    fetch("https://stocksquare.runasp.net/api/Course/GetAll")
      .then((response) => response.json())
      .then((data) => setAllCourses(data))
      .catch((error) => alert("wrong data", error));
  }, []);

  useEffect(() => {
    if (newCourse.id) {
      setCourseContent((prev) => ({ ...prev, CourseId: newCourse.id }));
    }
  }, [newCourse]);
  

  
  const handleCourseContent = async () => {
    console.log(courseContent);
    
    if (courseContent.FileName && courseContent.Pdfs) {
      const contentFormData = new FormData();

      contentFormData.append("FileName", courseContent.FileName);
      contentFormData.append("Pdfs", courseContent.Pdfs);
      contentFormData.append("CourseId", courseContent.CourseId);

      try {
        let response = await fetch(
          "https://stocksquare.runasp.net/api/CourseAttachment",
          {
            method: "POST",
            body: contentFormData,
          }
        );
        if (response.ok) {
          console.log("finished");
          setCourseContent({ FileName: "", Pdfs: "", CourseId: newCourse.id });
        }
      } catch (e) {
        console.log(e.message);
      }
    }
    else{
      console.log("no");
      
    }
  };

  console.log(allCourses);
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">
        📋 إدارة الكورسات والمدربين
      </h2>

      <div className="flex justify-center gap-2 mb-3">
        <button
          onClick={() => setIsShow(false)}
          className={style.performanceBtn}
        >
          إضافة/إخفاء/تعديل الكورسات والمدربين
        </button>
        <button
          onClick={() => setIsShow(true)}
          className={style.performanceBtn}
        >
          تسكين المدرب أونلاين
        </button>
      </div>

      {!isShow ? (
        <>
          <div className="flex justify-start gap-4 mb-5 mt-5">
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              ➕ إضافة بيانات الكورس
            </button>

            <button
              onClick={() => setShowCourseContent(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              ➕ إضافة محتوي الكورس
            </button>
          </div>

          <table className="text-[9px] md:text-[15px]">
            <thead className="text-center bg-slate-200 ">
              <th className="p-2 rounded-s-lg"> العنوان </th>
              <th> النوع </th>
              <th> مده الكورس </th>
              <th> المدرب </th>
              <th className="rounded-e-lg"> اجراءات </th>
            </thead>
            <tbody>
              {allCourses.map((course) => (
                <tr
                  key={course.id}
                  className="text-center border-b-2 border-gray-300"
                >
                  <td className="p-3">{course.title}</td>
                  <td className="p-3">{course.type}</td>
                  <td className="p-3">{course.time}</td>
                  <td className="p-3">{course.nameOfTranier}</td>
                  <td className="p-1 ">
                    <div className="flex flex-col gap-2 md:flex-row">
                      <button
                        className="bg-blue-500 text-white rounded-lg px-2 py-1"
                        onClick={() => UpdateCourse(course)}
                      >
                        {" "}
                        تعديل{" "}
                      </button>
                      <button
                        className="bg-red-500 text-white rounded-lg px-2 py-1"
                        onClick={() => deleteCourse(course.id)}
                      >
                        {" "}
                        حذف{" "}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showModal && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 mt-[8%] flex items-center justify-center bg-gray-900 bg-opacity-50"
            >
              <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] md:w-[70%] ">
                <h3 className="text-xl font-bold mb-4">إضافة كورس جديد</h3>

                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="العنوان"
                    className="w-full p-2 border rounded mb-2"
                    disabled={isLoading}
                    value={newCourse.Title}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, Title: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="النوع"
                    className="w-full p-2 border rounded mb-2"
                    disabled={isLoading}
                    value={newCourse.Type}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, Type: e.target.value })
                    }
                  />
                </div>
                <div className="flex gap-2 justify-center">
                  <input
                    type="number"
                    placeholder=" مده الكورس بالدقائق "
                    className=" p-2 border rounded mb-2"
                    value={newCourse.Time}
                    disabled={isLoading}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        Time: e.target.value,
                      })
                    }
                  />

                  <select
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, CategoryId: e.target.value })
                    }
                    value={newCourse.CategoryId}
                    disabled={isLoading}
                    className="h-[42px] rounded-lg"
                  >
                    <option> اختر التصنيف </option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="المدرب"
                  className="w-full p-2 border rounded mb-2"
                  value={newCourse.NameOfTranier}
                  disabled={isLoading}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      NameOfTranier: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  placeholder=" نبذه عن المدرب "
                  className="w-full p-2 border rounded mb-2"
                  value={newCourse.BioOfTranier}
                  disabled={isLoading}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, BioOfTranier: e.target.value })
                  }
                />
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="trainerImage"
                    className=" bg-darkgray text-white rounded-md  p-2  font-normal hover:cursor-pointer"
                  >
                    {" "}
                    اضافه صوره المدرب
                  </label>
                  <input
                    id="trainerImage"
                    type="file"
                    placeholder="  صوره المدرب "
                    className=" p-2 border rounded mb-2 hidden"
                    disabled={isLoading}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        Image: e.target.files[0],
                      })
                    }
                  />
                  {newCourse.Image && (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-primary-950 "
                      size="lg"
                    />
                  )}
                </div>
                <SunEditor
                  setContents={newCourse.Description}
                  onChange={(content) =>
                    setNewCourse((prevState) => ({
                      ...prevState,
                      Description: content,
                    }))
                  }
                  setOptions={{
                    buttonList: [
                      ["bold", "italic", "underline", "strike"],
                      ["font", "fontColor", "hiliteColor", "fontSize"],
                      ["align", "list", "table"],
                    ],
                  }}
                />

                <div className="flex justify-between mt-4">
                  <button
                    onClick={saveCourse}
                    className={` ${
                      isLoading ? "bg-gray-500" : "bg-green-500"
                    } text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600`}
                    disabled={isLoading}
                  >
                    {isLoading ? "جار الحفظ ..." : "حفظ"}
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    {" "}
                    إلغاء
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {showcourseContent && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 mt-[8%] flex items-center justify-center bg-gray-900 bg-opacity-50"
            >
              <div className="bg-white flex flex-col items-start gap-3 p-8 rounded-lg shadow-lg w-[90%] md:w-[30%] ">
                <h2 className="font-bold mb-4"> رفع محتوي الكورس </h2>
                <input
                  type="text"
                  name="FileName"
                  value={courseContent.FileName}
                  placeholder=" اسم الملف "
                  onChange={(e) =>
                    setCourseContent({
                      ...courseContent,
                      FileName: e.target.value,
                    })
                  }
                />
                <label htmlFor="content" className=" font-normal ">
                  {" "}
                  رفع المحتوي{" "}
                </label>
                <input
                  id="content"
                  type="file"
                  accept=".pdf"
                  name="Pdfs"
                  placeholder="  الملف "
                  onChange={(e) => {
                    if (e.target.files.length > 0) {
                      setCourseContent({
                        ...courseContent,
                        Pdfs: e.target.files[0],
                      });
                    }
                  }}
                />
                <div className="flex justify-between w-full mt-3">
                  <button
                    onClick={() => handleCourseContent()}
                    className="bg-primary-900 text-white px-4 py-2 rounded"
                  >
                    حفظ
                  </button>

                  <button
                    onClick={() => setShowCourseContent(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </>
      ) : (
        <TrainerSelected />
      )}
    </div>
  );
}

export default CoursesManagement;
