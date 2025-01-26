import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faClock,
  faChevronLeft,
  faChevronRight,
  faHeart,
  faShare,
  faBookmark,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { RecordedCourseCard } from "../..";
import CourseView from "../CoursePage/CoursePage";
import {Link} from "react-router-dom"
import { ROUTES } from "../../../routes";

export function VideoCard({
  videoTitle,
  instructor,
  duration,
  imageUrl,
  instructorImage,
  progress = 0,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      className="bg-white shadow-md rounded-lg p-2 flex flex-col gap-2 md:gap-4 relative"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative rounded-lg overflow-hidden h-36 md:h-48">
      
        <img
          src={imageUrl}
          alt="Video Thumbnail"
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black transition-opacity duration-300 ${
            isHovered ? "bg-opacity-60" : "bg-opacity-40"
          }`}
        >
        <Link to={ROUTES.COURSECONTENT}>
          <motion.button
            className="text-white p-4 rounded-full bg-green-600 hover:bg-green-700"
            whileHover={{ scale: 1.1 }}
          >
            <FontAwesomeIcon icon={faPlay} className="text-xl" />
          </motion.button></Link>
        </div>
        {progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div
              className="h-full bg-green-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-sm md:text-lg font-bold mb-1 text-gray-800">
            {videoTitle}
          </h2>
          <div className="flex items-center gap-2 mb-2">
            <img
              src={instructorImage}
              alt={instructor}
              className="w-6 h-6 rounded-full"
            />
            <p className="text-xs md:text-sm text-gray-600">{instructor}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
              <FontAwesomeIcon icon={faClock} />
              <span>{duration} دقيقة</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`transition-colors duration-300 ${
                  isLiked ? "text-red-500" : "text-gray-400"
                }`}
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`transition-colors duration-300 ${
                  isSaved ? "text-green-500" : "text-gray-400"
                }`}
              >
                <FontAwesomeIcon icon={faBookmark} />
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <FontAwesomeIcon icon={faShare} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function VideoSlider({ videos }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videosPerPage = 5;

  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % Math.ceil(videos.length / videosPerPage)
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + Math.ceil(videos.length / videosPerPage)) %
        Math.ceil(videos.length / videosPerPage)
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 10000);
    return () => clearInterval(interval);
  }, []);

  const startIndex = currentIndex * videosPerPage;
  const visibleVideos = videos.slice(startIndex, startIndex + videosPerPage);

  return (
    <div className="relative w-full">
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {visibleVideos.map((video, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <VideoCard {...video} />
          </motion.div>
        ))}
      </motion.div>
      <motion.button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
        whileHover={{ scale: 1.1 }}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </motion.button>
      <motion.button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
        whileHover={{ scale: 1.1 }}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </motion.button>
    </div>
  );
}

function VideoGrid() {
  const videoData = [
    {
      videoTitle: "تطوير الأعمال",
      instructor: "د. طارق",
      duration: 60,
      imageUrl: "https://via.placeholder.com/400x200",
      instructorImage: "https://via.placeholder.com/100",
      progress: 75,
    },
    {
      videoTitle: "أساسيات تطوير الأعمال",
      instructor: "د. طارق",
      duration: 45,
      imageUrl: "https://via.placeholder.com/400x200",
      instructorImage: "https://via.placeholder.com/100",
      progress: 30,
    },
    // ... rest of the video data ...
  ];

  return (
    <motion.div
      className="max-w-screen-xl mx-auto py-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          أساسيات تطوير الأعمال
        </h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            تصفية النتائج
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
            ترتيب حسب
          </button>
       
        </div>
      </div>

      <VideoCard
        videoTitle="تطوير الأعمال"
        instructor="د. طارق"
        duration={60}
        imageUrl="https://via.placeholder.com/400x200"
        instructorImage="https://via.placeholder.com/100"
        progress={45}
      />

      <div className="flex items-center justify-between mt-8 mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          استكشف المزيد من الفيديوهات
        </h2>
        <button className="text-green-600 hover:text-green-700 transition-colors">
          عرض الكل
        </button>
      </div>
      <VideoSlider videos={videoData} />

      <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
        أكمل من حيث توقفت
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {videoData.map((video, index) => (
          <VideoCard key={index} {...video} />
        ))}
      </div>
    </motion.div>
  );
}

export default VideoGrid;
