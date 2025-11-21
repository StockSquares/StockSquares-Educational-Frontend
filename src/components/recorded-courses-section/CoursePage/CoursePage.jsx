import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, 
  faCheck, 
  faClock, 
  faDownload,
  faBook,
  faCertificate,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const CourseView = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [activeLecture, setActiveLecture] = useState(null);

  const course = {
    title: "أساسيات تطوير الأعمال",
    instructor: "د. طارق",
    duration: "12 ساعة",
    lectures: 24,
    progress: 35,
    description: "دورة شاملة في أساسيات تطوير الأعمال تغطي استراتيجيات النمو وتحليل السوق وإدارة المشاريع",
    sections: [
      {
        title: "مقدمة في تطوير الأعمال",
        lectures: [
          { title: "مفهوم تطوير الأعمال", duration: "15:00", completed: true },
          { title: "أهمية التخطيط الاستراتيجي", duration: "20:00", completed: true },
          { title: "تحليل السوق", duration: "25:00", completed: false }
        ]
      },
      {
        title: "استراتيجيات النمو",
        lectures: [
          { title: "تحديد فرص النمو", duration: "30:00", completed: false },
          { title: "دراسة المنافسين", duration: "25:00", completed: false },
          { title: "خطة التوسع", duration: "20:00", completed: false }
        ]
      }
    ]
  };

  return (
    <motion.div 
      className="max-w-screen-xl mx-auto p-6 rtl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      dir="rtl"
    >
      {/* Course Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span><FontAwesomeIcon icon={faBook} className="ml-2" />{course.lectures} درس</span>
              <span><FontAwesomeIcon icon={faClock} className="ml-2" />{course.duration}</span>
              <span><FontAwesomeIcon icon={faCertificate} className="ml-2" />شهادة إتمام</span>
            </div>
          </div>
          <div className="md:w-1/3">
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>تقدمك</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-green-600 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
              <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors mb-2">
                متابعة التعلم
              </button>
              <button className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors">
                <FontAwesomeIcon icon={faDownload} className="ml-2" />
                تحميل المواد
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-6">محتوى الدورة</h2>
        {course.sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-4">
            <button
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setActiveSection(activeSection === sectionIndex ? null : sectionIndex)}
            >
              <span className="font-medium">{section.title}</span>
              <FontAwesomeIcon 
                icon={faChevronDown} 
                className={`transition-transform ${activeSection === sectionIndex ? 'transform rotate-180' : ''}`}
              />
            </button>
            {activeSection === sectionIndex && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2"
              >
                {section.lectures.map((lecture, lectureIndex) => (
                  <button
                    key={lectureIndex}
                    className={`w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-md ${
                      lecture.completed ? 'text-gray-500' : ''
                    }`}
                    onClick={() => setActiveLecture(lectureIndex)}
                  >
                    <div className="flex items-center">
                      <FontAwesomeIcon 
                        icon={lecture.completed ? faCheck : faPlay} 
                        className={`ml-3 ${lecture.completed ? 'text-green-600' : 'text-gray-400'}`}
                      />
                      <span>{lecture.title}</span>
                    </div>
                    <span className="text-sm text-gray-500">{lecture.duration}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CourseView;