import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './Reservation.module.css';

function Reservation() {
    const [selectedSession, setSelectedSession] = useState("single");
    const [duration, setDuration] = useState(60);
    const [selectedTime, setSelectedTime] = useState(null);

    const dates = [
        { day: "الأربعاء", date: "13", times: ["10:00 AM", "11:00 AM", "12:00 PM"] },
        { day: "الخميس", date: "14", times: ["4:00 PM", "5:00 PM", "6:00 PM"] },
        { day: "الجمعة", date: "15", times: [] },
        { day: "السبت", date: "16", times: [] },
    ];

    const handleSessionChange = (type) => setSelectedSession(type);
    const handleDurationChange = (time) => setDuration(time);
    const handleTimeSelect = (time) => setSelectedTime(time);

    return (
        <div className={styles.reservationContainer}>
           
            <section className={styles.sessionType}>
                <label>اختر حجز جلسة أو باقة:</label>
                <div>
                    <label>
                        <input type="radio" value="single" checked={selectedSession === "single"} onChange={() => handleSessionChange("single")} />
                        فردية
                    </label>
                    <label>
                        <input type="radio" value="package" checked={selectedSession === "package"} onChange={() => handleSessionChange("package")} />
                        باقة <span className={styles.discount}>أحصل علي الخصم</span>
                    </label>
                </div>
            </section>

            <section className={styles.sessionDuration}>
                <label>اختر مدة الجلسة:</label>
                <div>
                    <label>
                        <input type="radio" value={30} checked={duration === 30} onChange={() => handleDurationChange(30)} />
                        30 دقيقة
                    </label>
                    <label>
                        <input type="radio" value={60} checked={duration === 60} onChange={() => handleDurationChange(60)} />
                        60 دقيقة
                    </label>
                </div>
            </section>

            <section className={styles.calendar}>
                <label>التقويم:</label>
                <div className={styles.dates}>
                    {dates.map((day, index) => (
                        <div key={index} className={styles.day}>
                            <div className={styles.dateHeader}>
                                <span>{day.day}</span>
                                <span>{day.date}</span>
                            </div>
                            <div className={styles.times}>
                                {day.times.length > 0 ? (
                                    day.times.map((time, idx) => (
                                        <button
                                            key={idx}
                                            className={`${styles.time} ${selectedTime === time ? styles.selected : ''}`}
                                            onClick={() => handleTimeSelect(time)}
                                        >
                                            {time}
                                        </button>
                                    ))
                                ) : (
                                    <span className={styles.noTimes}>لا توجد فترات زمنية متاحة</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <footer className={styles.footer}>
                <button className={styles.confirmButton}>
                    احجز الآن بـ ٩٠٠ جنيه مصري
                </button>
            </footer>
        </div>
    );
}

export default Reservation;
