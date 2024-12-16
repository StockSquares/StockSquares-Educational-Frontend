import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faClock, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function VideoCard({ videoTitle, instructor, duration, imageUrl, instructorImage }) {
    return (
        <div className="bg-white shadow-md rounded-lg p-2 flex flex-col gap-2 md:gap-4">
            {/* Thumbnail Section */}
            <div className="relative rounded-lg overflow-hidden h-36 md:h-48">
                <img src={imageUrl} alt="Video Thumbnail" className="w-full h-full object-cover" />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <button className="text-white text-3xl md:text-4xl">&#9658;</button>
                </div>
            </div>
            
            {/* Details Section */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h2 className="text-sm md:text-lg font-bold mb-1 text-gray-800">{videoTitle}</h2>
                    <p className="text-xs md:text-sm text-gray-600 mb-1">{instructor}</p>
                    <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-500">
                        <FontAwesomeIcon icon={faUserCircle} />
                        <span>By {instructor}</span>
                        <FontAwesomeIcon icon={faClock} />
                        <span>{duration} minutes</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function VideoSlider({ videos }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const videosPerPage = 5;

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(videos.length / videosPerPage));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + Math.ceil(videos.length / videosPerPage)) % Math.ceil(videos.length / videosPerPage));
    };

    const startIndex = currentIndex * videosPerPage;
    const visibleVideos = videos.slice(startIndex, startIndex + videosPerPage);

    return (
        <div className="relative w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-4">
                {visibleVideos.map((video, index) => (
                    <VideoCard key={index} {...video} />
                ))}
            </div>
            {/* Navigation Buttons */}
            <button onClick={prevSlide} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button onClick={nextSlide} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    );
}

function VideoGrid() {
    // Replace with actual video data
    const videoData = [
        {
            videoTitle: 'Business Development',
            instructor: 'Dr. Tarek',
            duration: 60,
            imageUrl: 'https://via.placeholder.com/400x200',
            instructorImage: 'https://via.placeholder.com/100',
        },
        {
            videoTitle: 'Business Development Essentials',
            instructor: 'Dr. Tarek',
            duration: 45,
            imageUrl: 'https://via.placeholder.com/400x200',
            instructorImage: 'https://via.placeholder.com/100',
        },
        {
            videoTitle: 'Digital Strategy 4.0',
            instructor: 'Dr. Tarek',
            duration: 30,
            imageUrl: 'https://via.placeholder.com/400x200',
            instructorImage: 'https://via.placeholder.com/100',
        },
        {
            videoTitle: 'Essential Sales Skills',
            instructor: 'Dr. Tarek',
            duration: 50,
            imageUrl: 'https://via.placeholder.com/400x200',
            instructorImage: 'https://via.placeholder.com/100',
        },
        {
            videoTitle: 'Leadership in Practice',
            instructor: 'Dr. Tarek',
            duration: 40,
            imageUrl: 'https://via.placeholder.com/400x200',
            instructorImage: 'https://via.placeholder.com/100',
        },
        {
            videoTitle: 'Project Management Simplified',
            instructor: 'Tom White',
            duration: 35,
            imageUrl: 'https://via.placeholder.com/400x200',
            instructorImage: 'https://via.placeholder.com/100',
        },
        {
            videoTitle: 'Marketing Fundamentals',
            instructor: 'Dr. Tarek',
            duration: 55,
            imageUrl: 'https://via.placeholder.com/400x200',
            instructorImage: 'https://via.placeholder.com/100',
        },
    ];

    return (
        <div className="max-w-screen-xl mx-auto py-10 px-4">
            {/* Header Section */}
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Business Development Essentials</h1>
            
            {/* Featured Video Section */}
            <VideoCard
                videoTitle="Business Development"
                instructor="Dr. Tarek"
                duration={60}
                imageUrl="https://via.placeholder.com/400x200"
                instructorImage="https://via.placeholder.com/100"
            />

            {/* Slider Section */}
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Explore More Videos</h2>
            <VideoSlider videos={videoData} />

            {/* Continue Section */}
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Continue where you left off</h2>
            
            {/* Video Grid Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {videoData.map((video, index) => (
                    <VideoCard
                        key={index}
                        videoTitle={video.videoTitle}
                        instructor={video.instructor}
                        duration={video.duration}
                        imageUrl={video.imageUrl}
                        instructorImage={video.instructorImage}
                    />
                ))}
            </div>
        </div>
    );
}

export default VideoGrid;
