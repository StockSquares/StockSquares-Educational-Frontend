import { useParams } from "react-router-dom";
import { blogCardDetails } from "./../../assets/blogCardDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart,
  faShare,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function InlineBlog({ article, categoryName, setArticleDetails, handleLike, isLiked, likes }) {
  const { title } = useParams();

  // Determine which data to show: from props (API) or local file (Fallback)
  let cardDetails = {};

  if (article) {
    // Data from API (passed via props)
    cardDetails = {
      id: article.id,
      title: article.title,
      category: categoryName,
      writer: article.writername || "طارق الليثي",
      views: article.numberOfViews || article.NumberOfViews || 0,
      likes: likes || article.numberOfLikes || article.NumberOfLikes || 0,
      description1: article.content || article.body || "",
      description2: "",
      image: article.mainImage,
    };
  } else {
    // Fallback to existing logic
    const found = blogCardDetails.find(
      (desc) => desc.title === decodeURIComponent(title)
    );
    if (found) {
      cardDetails = found;
      // Mock likes if using local data
      cardDetails.likes = cardDetails.likes || 150;
    }
  }

  const handleShare = async () => {
    const shareData = {
      title: cardDetails.title,
      text: `اقرأ هذا المقال الممتع: ${cardDetails.title}`,
      url: window.location.href, // Note: This shares the current page URL.
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== "AbortError") {
          toast.error("حدث خطأ أثناء المشاركة");
        }
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`).then(
        () => toast.success("تم نسخ رابط المقال للحافظة!"),
        () => toast.error("فشل نسخ الرابط")
      );
    }
  };

  if (!cardDetails.title) {
    return (
      <div className="flex flex-col items-center justify-center p-10">
        <p>لم يتم العثور على المقال</p>
        <button
          onClick={() => setArticleDetails && setArticleDetails(false)}
          className="mt-4 text-primary-700 underline"
        >
          العودة للمقالات
        </button>
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-center" theme="colored" />
      <div className="flex flex-col items-center mt-5 p-7 ">
        {/* Back Button */}
        {setArticleDetails && (
          <div className="w-full max-w-4xl mb-4 flex justify-start">
            <button
              onClick={() => setArticleDetails(false)}
              className="flex items-center gap-2 text-gray-600 hover:text-primary-700 transition"
            >
              <FontAwesomeIcon icon={faArrowRight} />
              <span>العودة للمقالات</span>
            </button>
          </div>
        )}

        <div className="flex flex-col gap-4 mb-7 w-full max-w-4xl">
          <h1 className="text-center font-bold text-2xl">
            {cardDetails.title}
          </h1>
          <div className=" flex gap-10 justify-center  ">
            <p className="text-gray-500">{cardDetails.category}</p>
            <div className="flex items-center text-sm text-gray-500 gap-10">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} className="text-primary-700" />
                <span>{cardDetails.writer}</span>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faEye} className="text-primary-700" />
                <span>{cardDetails.views}</span>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faHeart} className="text-red-500" />
                <span>{cardDetails.likes}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Optional: Show Main Image if available */}
        {cardDetails.image && (
          <div className="w-full max-w-4xl mb-8">
            <img
              src={`data:image/*;base64,${cardDetails.image}`}
              alt={cardDetails.title}
              className="w-full max-h-[400px] object-cover rounded-xl shadow-md"
            />
          </div>
        )}

        <div className="flex flex-col items-center gap-5 leading-7 w-full max-w-4xl">
          {/* Main Content rendered as HTML */}
          <div
            className="w-full text-right font-Cairo whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: cardDetails.description1 }}
          />

          {cardDetails.description2 && (
            <div
              className="w-full text-right font-Cairo whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: cardDetails.description2 }}
            />
          )}
        </div>

        <div className="flex justify-center gap-6 mt-10 mb-8">
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-2 border-2 border-green-800 rounded-lg text-black hover:bg-green-50 transition-colors font-semibold"
          >
            <span>مشاركة المقال</span>
            <FontAwesomeIcon icon={faShare} className="text-black transform scale-x-[-1]" />
          </button>

          {/* Like Button */}
          <button
            onClick={() => handleLike && handleLike(cardDetails.id)}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-black transition-colors font-semibold ${isLiked ? 'bg-red-100 hover:bg-red-200' : 'bg-[#FDE047] hover:bg-[#ebd242]'}`}
          >
            <span>{isLiked ? 'أعجبك هذا' : 'أعجبني المقال'} ({cardDetails.likes})</span>
            <FontAwesomeIcon icon={faHeart} className={isLiked ? "text-red-600" : "text-red-500"} />
          </button>
        </div>
      </div>
    </>
  );
}
export default InlineBlog;
