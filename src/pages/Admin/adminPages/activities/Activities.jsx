import { useState } from "react";
import SunEditor from "suneditor-react";
function Activities() {
  const [activity, setActivity] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activity.title && activity.description && activity.image) {
      setError(false);
      setActivity({
        title: activity.title,
        description: activity.description,
        image: activity.image,
      });
    } else {
      setError(true);
    }
    console.log(activity);
  };
  return (
    <div className="w-full flex flex-col justify-center items-center gap-3 mt-7">
      <h2 className="text-center text-2xl text-primary-900 font-bold">
        {" "}
        اضافه نشاط او فاعليه جديده{" "}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-[50%] text-start p-4 bg-white border-none shadow-md flex flex-col mb-5"
      >
        <label className="mb-2"> العنوان :</label>
        <input
          type="text"
          className={`w-full p-2 border rounded ${error && 'border-2 border-red-600 '}`}
          value={activity.title}
          onChange={(e) => setActivity({ ...activity, title: e.target.value })}
        />

        <label className="mt-5 mb-2"> الوصف: </label>
        
        <SunEditor
          setContents={activity.description}
          onChange={(content) =>
            setActivity((prevState) => ({
              ...prevState,
              description: content,
            }))
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

        <label className="mb-3 mt-5"> رفع صوره للنشاط :</label>
        <input
          type="file"
          onChange={(e) =>
            setActivity({ ...activity, image: e.target.files[0] })
          }
        />
        {error && (
          <p className="mt-4 mb-3 text-red-600 font-bold">
            {" "}
            يرجي اكمال البيانات للمتابعه !
          </p>
        )}

        <button
          type="submit"
          className="px-8 py-2 bg-accent-950 self-center rounded-lg mt-5"
        >
          {" "}
          ارسال{" "}
        </button>
      </form>
    </div>
  );
}
export default Activities;
