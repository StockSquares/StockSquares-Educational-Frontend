import React from "react";

const CourseViewer = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-gray-800">
        <div className="text-xl font-semibold">
          <span className="text-red-500">al</span>mentor
        </div>
        <div className="flex items-center space-x-6">
          <span className="text-sm">Digital Strategy 4.0</span>
          <button className="text-sm underline">Rate Course</button>
          <button className="text-sm underline">العربية</button>
          <button className="bg-red-500 px-4 py-2 rounded text-sm">Exit Course</button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 h-2">
        <div className="bg-red-500 h-2" style={{ width: "10%" }}></div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-1/4 bg-gray-800 p-4">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Course Outline</h2>
          </div>
          <ul className="space-y-4">
            <li>
              <h3 className="text-sm font-medium">Course Introduction</h3>
            </li>
            <li>
              <h3 className="text-sm font-medium">1. Digital Briefing Methodology</h3>
              <ul className="mt-2 space-y-2 pl-4">
                <li className="flex justify-between items-center text-sm">
                  <span>1.1 Introduction</span>
                  <span>✓</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span>1.2 Where The Briefing...</span>
                  <span className="loader w-3 h-3 border-2 border-t-2 border-gray-300 rounded-full animate-spin"></span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span>1.3 Who Should Be Involved...</span>
                  <button>☆</button>
                </li>
              </ul>
            </li>
          </ul>
        </aside>

        {/* Main Video Section */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-xl font-bold">Introduction</h1>
          </div>
          <div className="relative">
            <div className="aspect-w-16 aspect-h-9 bg-black">
              <iframe
                title="Video Player"
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                allowFullScreen
              ></iframe>
            </div>
            <button className="absolute top-2 right-2 bg-red-500 px-3 py-1 text-sm rounded">
              Download this video
            </button>
          </div>
          <div className="mt-4 flex justify-between">
            <button className="px-4 py-2 bg-gray-700 rounded">◀ Course Introduction</button>
            <button className="px-4 py-2 bg-gray-700 rounded">Lesson 1.2 ▶</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CourseViewer;
