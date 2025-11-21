import { useParams } from "react-router-dom";
import { blogCardDetails } from "./../../assets/blogCardDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faUser } from "@fortawesome/free-regular-svg-icons";
import { faHeart, faShare } from "@fortawesome/free-solid-svg-icons";

function InlineBlog() {
  const { title } = useParams();

  const cardDetails = blogCardDetails.find(
    (desc) => desc.title === decodeURIComponent(title)
  );

  return (
    <>
      <div className="flex flex-col items-center mt-5 p-7 ">
        <div className="flex flex-col gap-4 mb-7">
          <h1 className="text-center font-bold text-2xl">
            {cardDetails.title}
          </h1>
          <div className=" flex gap-10 justify-center  ">
            <p className="text-gray-500">{cardDetails.category}</p>
            <div className="flex items-center text-sm text-gray-500 gap-10">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} className="text-primary-700" />
                <span>طارق الليثي</span>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faEye} className="text-primary-700" />
                <span>1000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 leading-7">
          <p>{cardDetails.description1}</p>
          <div className="bg-gray-200 rounded-lg flex justify-center items-center shadow-lg w-[90%] h-[50vh]">
            <h1 className="text-xl font-bold text-gray-600">AD</h1>
          </div>
          <pre className=" w-full font-Cairo">{cardDetails.description2}</pre>
        </div>

        <div className="flex justify-center  gap-10 mt-5 mb-4">
          <button className=" p-2 bg-accent-light rounded-md hover:bg-accent-900">
            <FontAwesomeIcon icon={faHeart} className="text-red-700 me-1" />
            أعجبني المقال{" "}
          </button>
          <button className="border-2 border-primary-dark p-2 bg-gray-200 rounded-md">
            <FontAwesomeIcon icon={faShare} className="me-1" /> مشاركة المقال{" "}
          </button>
        </div>
      </div>
    </>
  );
}
export default InlineBlog;
