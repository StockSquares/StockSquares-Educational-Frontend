import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import ar from "date-fns/locale/ar";
registerLocale("ar", ar);
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faSave, faClock, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppointmentsManagement = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [timeSlots, setTimeSlots] = useState([]);
    const [newTimeSlot, setNewTimeSlot] = useState(null);
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await fetch("https://stocksquare1.runasp.net/api/Reservations/GetPendingReservations");
                if (response.ok) {
                    const result = await response.json();
                    if (result.isSuccess && Array.isArray(result.data)) {
                        setReservations(result.data);
                    }
                }
            } catch (error) {
                console.error("Error fetching reservations:", error);
            }
        };

        fetchReservations();
    }, []);

    const handleAddTimeSlot = () => {
        if (!newTimeSlot) {
            toast.error("الرجاء إدخال وقت الموعد");
            return;
        }

        // Format time to "hh:mm AA" (e.g., 10:30 AM) for display
        const displayTime = newTimeSlot.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        // Format time to "HH:mm:ss" (e.g., 10:30:00) for API
        // Using en-GB ensures 24-hour format
        const apiTime = newTimeSlot.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        if (timeSlots.some(slot => slot.displayTime === displayTime)) {
            toast.warning("هذا الموعد مضاف بالفعل");
            return;
        }

        setTimeSlots([...timeSlots, { displayTime, startTime: apiTime }]);
        setNewTimeSlot(null);
    };

    const handleRemoveTimeSlot = (index) => {
        const updatedSlots = timeSlots.filter((_, i) => i !== index);
        setTimeSlots(updatedSlots);
    };

    const handleSave = async () => {
        if (timeSlots.length === 0) {
            toast.error("الرجاء إضافة مواعيد لهذا اليوم قبل الحفظ");
            return;
        }

        const payload = {
            date: selectedDate.toISOString(),
            day: selectedDate.toLocaleDateString('en-US', { weekday: 'long' }),
            // Send only the properties the API expects
            timeSlots: timeSlots.map(slot => ({ startTime: slot.startTime }))
        };

        try {
            const response = await fetch("https://stocksquare1.runasp.net/api/Reservations/CreateNewDate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                toast.success("تم حفظ المواعيد بنجاح");
                setTimeSlots([]);
            } else {
                const errorData = await response.json();
                toast.error(`فشل الحفظ: ${errorData.message || "خطأ غير معروف"}`);
            }
        } catch (error) {
            console.error("Error saving date:", error);
            toast.error("حدث خطأ أثناء الاتصال بالخادم");
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen" dir="rtl">
            <ToastContainer />
            <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
                <FontAwesomeIcon icon={faClock} className="text-green-600" />
                إدارة مواعيد التدريب
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Right Column: Date Selection */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">1. اختر اليوم</h2>
                    <div className="flex justify-center">
                        <style>{`
                            .react-datepicker {
                                font-family: inherit;
                                border: none;
                                box-shadow: none;
                            }
                            .react-datepicker__header {
                                background-color: white;
                                border-bottom: none;
                            }
                            .react-datepicker__day--selected {
                                background-color: #16a34a !important;
                            }
                            .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected {
                                background-color: #16a34a !important;
                            }
                        `}</style>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            inline
                            calendarClassName="scale-110"
                            locale="ar"
                        />
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">اليوم المحدد:</p>
                        <p className="text-lg font-bold text-green-700">
                            {selectedDate.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                </div>

                {/* Left Column: Time Slots */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">2. أضف المواعيد المتاحة</h2>

                    <div className="flex gap-2 mb-6">
                        <div className="flex-1">
                            <DatePicker
                                selected={newTimeSlot}
                                onChange={(date) => setNewTimeSlot(date)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                timeCaption="الوقت"
                                dateFormat="h:mm aa"
                                placeholderText="اختر الوقت (مثلاً 10:00 AM)"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-center"
                                locale="ar"
                            />
                        </div>
                        <button
                            onClick={handleAddTimeSlot}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            إضافة
                        </button>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">المواعيد المضافة ({timeSlots.length}):</h3>
                        {timeSlots.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto p-1">
                                {timeSlots.map((slot, index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-50 border border-gray-200 p-2 rounded-lg group hover:border-red-200 transition-colors">
                                        <span className="font-medium text-gray-700" dir="ltr">{slot.displayTime}</span>
                                        <button
                                            onClick={() => handleRemoveTimeSlot(index)}
                                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                            title="حذف"
                                        >
                                            <FontAwesomeIcon icon={faTrash} size="sm" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400 text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                                لم يتم إضافة مواعيد بعد
                            </p>
                        )}
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={timeSlots.length === 0}
                        className={`w-full py-3 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition-all
                            ${timeSlots.length > 0
                                ? 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                                : 'bg-gray-300 cursor-not-allowed'}`}
                    >
                        <FontAwesomeIcon icon={faSave} />
                        حفظ المواعيد لليوم المحدد
                    </button>
                </div>
            </div>

            {/* Reservations Table Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    <FontAwesomeIcon icon={faUserGroup} className="text-blue-600" />
                    الحجوزات الحالية
                </h2>

                {reservations.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-right border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-700 border-b border-gray-200">
                                    <th className="p-4 font-semibold">اسم المتدرب</th>
                                    <th className="p-4 font-semibold">البريد الإلكتروني</th>
                                    <th className="p-4 font-semibold">اليوم</th>
                                    <th className="p-4 font-semibold">الوقت</th>
                                    <th className="p-4 font-semibold">الحالة</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.map((res, index) => (
                                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-medium text-gray-800">{res.fullName}</td>
                                        <td className="p-4 text-gray-600">{res.email}</td>
                                        <td className="p-4 text-gray-600">
                                            {new Date(res.day).toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                        </td>
                                        <td className="p-4 text-gray-600" dir="ltr">{res.startTime}</td>
                                        <td className="p-4">
                                            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                                                قيد الانتظار
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                        لا توجد حجوزات حالية
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppointmentsManagement;
