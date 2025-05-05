import React from "react";
import Style from "./Admin.module.css";

const certificates = [1]; 

function Certificate() {



  //  لو عنده شهادات
  if (certificates.length > 0) {
    return (
      <div className={Style.mainContent}>
        <h2 className={Style.certTitle}>🎓 شهاداتك التعليمية</h2>

        <div className={Style.certGrid}>
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className={`${Style.certCard} ${
                cert.completed ? Style.certActive : Style.certLocked
              }`}
            >
              <h3>{cert.course}</h3>
              <p><strong>التاريخ:</strong> {cert.date}</p>
              <p><strong>رقم الشهادة:</strong> {cert.serial}</p>

              {cert.completed ? (
                <div className={Style.certActions}>
                  <a href={`/certificates/${cert.serial}.pdf`} download>📄 تحميل</a>
                  <button onClick={() => handleShare(cert)}>🔗 مشاركة</button>
                </div>
              ) : (
                <p className={Style.lockedMsg}>🔒 أكمل الدورة لفتح الشهادة</p>
              )}
            </div>
          ))}
        </div>

        <div className={Style.congratsBox}>
          🏆 مبروك على إنجازاتك! كل شهادة بتقربك من احتراف التداول!
        </div>
      </div>
    );
  }

  //لو مفيش شهادات 
  return (
        <div className={Style.mainContent21}>
        <div className={Style.emptyCertContainer}>
            <div className={Style.emptyIcon}>📜</div>
            <h2 className={Style.emptyTitle}>مفيش شهادات لسه؟</h2>
            <p className={Style.emptyMessage}>
            ابدأ أول خطوة في رحلتك التعليمية واحصل على شهادتك بمجرد ما تخلص أول دورة! 💼📈
            </p>
            <button
            className={Style.startLearningBtn}
            onClick={() => {
                window.location.href = "/recorded-courses";
            }}
            >
            🚀 ابدأ التعلم الآن
            </button>
        </div>
        </div>
  );
}

export default Certificate;
