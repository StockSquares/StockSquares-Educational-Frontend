import React, { useState } from "react";
import Style from "./Admin.module.css";
import { FaLock, FaCheck } from "react-icons/fa";

const lessons = [
  { id: 1, title: "مقدمة", status: "unlocked", level: "basic" },
  { id: 2, title: "الأساسيات", status: "locked", level: "basic" },
  { id: 3, title: "الاسواق", status: "locked", level: "basic" },
  { id: 4, title: "الشموع اليابانية", status: "locked", level: "advanced" },
  { id: 5, title: "تحليل فني", status: "locked", level: "advanced" },
];

function EducationJourney() {
  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleLessonClick = (lesson) => {
    if (lesson.status === "unlocked") {
      setSelectedLesson(lesson);
      alert(`فتحنا درس: ${lesson.title}`);
    }
  };

  const completedLessons = lessons.filter(
    (l) => l.status === "unlocked" || l.status === "completed"
  );
  const progress = (completedLessons.length / lessons.length) * 100;
  const isComplete = progress === 100;

  const renderSection = (title, lessons) => (
    <>
      <h3 className={Style.sectionTitle}>{title}</h3>
      <div className={Style.journey}>
        {lessons.map((lesson, index) => (
          <div key={lesson.id} className={Style.lessonWrapper}>
            <div
              className={`${Style.lesson} ${
                lesson.status === "unlocked"
                  ? Style.unlocked
                  : Style.locked
              } ${lesson.level === "advanced" ? Style.advanced : ""}`}
              onClick={() => handleLessonClick(lesson)}
            >
              {lesson.status === "completed" ? (
                <FaCheck />
              ) : lesson.status === "locked" ? (
                <FaLock />
              ) : (
                lesson.id
              )}
            </div>
            <p className={Style.title}>{lesson.title}</p>
            {index !== lessons.length && (
              <div className={Style.connector}></div>
            )}
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className={Style.mainContent}>
      <div className={Style.progressBarWrapper}>
        <div className={Style.progressTitle}>تقدمك في رحلة التعلم 🚀</div>
        <div className={Style.progressBar}>
          <div
            className={Style.progress}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        {isComplete && (
          <div className={Style.celebrate}>🎉 مبروك! خلصت الرحلة التعليمية! 🎉</div>
        )}
      </div>
      {renderSection("الدروس الأساسية", lessons)}
    </div>
  );
}

export default EducationJourney;
