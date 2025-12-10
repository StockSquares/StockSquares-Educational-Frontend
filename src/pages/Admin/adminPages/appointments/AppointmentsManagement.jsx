import React, { useState, useEffect } from 'react';
import { Modal } from "../../../../components";
import DatePicker, { registerLocale } from "react-datepicker";
import ar from "date-fns/locale/ar";
registerLocale("ar", ar);
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faSave, faClock, faUserGroup, faFilter } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppointmentsManagement = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [newTimeSlot, setNewTimeSlot] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [showTrainerModal, setShowTrainerModal] = useState(false);
    const [selectedReservationId, setSelectedReservationId] = useState(null);
    const [selectedTrainer, setSelectedTrainer] = useState("");
    const [trainers, setTrainers] = useState([]);

    // Filter State
    const [filterMonth, setFilterMonth] = useState(new Date().getMonth() + 1);
    const [filterYear, setFilterYear] = useState(new Date().getFullYear());
    const [isFiltered, setIsFiltered] = useState(false);
    const [apiDebug, setApiDebug] = useState(null); // Debug state

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                // Speculative endpoint - please confirm the correct one
                const response = await fetch("https://stocksquare1.runasp.net/api/Employee/GetAllEmployees");
                if (response.ok) {
                    const result = await response.json();
                    if (result.isSuccess || Array.isArray(result)) {
                        setTrainers(result.data || result);
                    }
                }
            } catch (error) {
                console.error("Error fetching trainers:", error);
            }
        };

        fetchTrainers();
    }, []);

    // Predefined time slots (10 AM - 10 PM)
    const predefinedSlots = [
        { id: 1, display: "10:00 صباحاً - 12:00 ظهراً", apiStart: "10:00:00" },
        { id: 2, display: "12:00 ظهراً - 02:00 عصراً", apiStart: "12:00:00" },
        { id: 3, display: "02:00 عصراً - 04:00 عصراً", apiStart: "14:00:00" },
        { id: 4, display: "04:00 عصراً - 06:00 مساءً", apiStart: "16:00:00" },
        { id: 5, display: "06:00 مساءً - 08:00 مساءً", apiStart: "18:00:00" },
        { id: 6, display: "08:00 مساءً - 10:00 مساءً", apiStart: "20:00:00" },
    ];

    const handleAction = async (id, action) => {
        if (action === 'accept') {
            setSelectedReservationId(id);
            setShowTrainerModal(true);
            return;
        }

        // Reject Logic
        const endpoint = `https://stocksquare1.runasp.net/api/Reservations/DenyReservation/${id}`;
        try {
            const response = await fetch(endpoint, {
                method: 'PUT'
            });

            if (response.ok) {
                toast.success("تم رفض الحجز بنجاح");
                setReservations(prev => prev.map(r =>
                    r.reservationsId === id ? { ...r, localStatus: 'rejected' } : r
                ));
                setTimeout(() => {
                    setReservations(prev => prev.filter(r => r.reservationsId !== id));
                }, 3000);
            } else {
                console.error("Deny failed with status:", response.status);
                toast.error("فشل رفض الحجز - خطأ من السيرفر (500)");
            }
        } catch (error) {
            console.error(error);
            toast.error("حدث خطأ في الاتصال");
        }
    };

    const confirmAcceptance = async () => {
        let endpoint = `https://stocksquare1.runasp.net/api/Reservations/AcceptReservation/${selectedReservationId}`;

        if (selectedTrainer) {
            endpoint += `?TrainerId=${selectedTrainer}`;
        }

        try {
            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                toast.success("تم قبول الحجز بنجاح");
                setReservations(prev => prev.map(r =>
                    r.reservationsId === selectedReservationId ? { ...r, localStatus: 'accepted' } : r
                ));
                setTimeout(() => {
                    setReservations(prev => prev.filter(r => r.reservationsId !== selectedReservationId));
                }, 3000);
                setShowTrainerModal(false);
                setSelectedReservationId(null);
                setSelectedTrainer("");
            } else {
                const errorData = await response.json().catch(() => ({}));
                toast.error(`فشل قبول الحجز: ${errorData.message || response.statusText}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("حدث خطأ في الاتصال");
        }
    };

    const fetchReservations = async () => {
        try {
            const response = await fetch("https://stocksquare1.runasp.net/api/Reservations/GetPendingReservations");
            if (response.ok) {
                const result = await response.json();
                if (result.isSuccess && Array.isArray(result.data)) {
                    setReservations(result.data);
                    setIsFiltered(false);
                }
            }
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    };

    const fetchMonthlyReservations = async () => {
        try {
            // API: GET /api/Reservations/GetReservations?month=...&year=...
            const endpoint = `https://stocksquare1.runasp.net/api/Reservations/GetReservations?month=${filterMonth}&year=${filterYear}`;
            const response = await fetch(endpoint);

            if (response.ok) {
                const result = await response.json();
                setApiDebug(result); // Save raw response for debugging

                // Check structure. Screenshot showed "data" might be directly returned or wrapped
                // Assuming standard wrapper { isSuccess: true, data: [...] } or just array
                // The screenshot response example was truncated, but Pending returned data in result.data
                // Let's assume consistent response format

                let fetchedData = [];
                if (result.isSuccess && Array.isArray(result.data)) {
                    fetchedData = result.data;
                } else if (Array.isArray(result)) {
                    fetchedData = result;
                }

                if (fetchedData.length > 0) {
                    console.log(`Fetched ${fetchedData.length} records. Filtering for ${filterMonth}/${filterYear}`);

                    // Display exactly what the API returns, no filtering
                    setReservations(fetchedData);
                    setIsFiltered(true);
                    toast.success(`تم استرجاع ${fetchedData.length} حجز`);
                } else {
                    toast.info("لا توجد حجوزات في هذا التاريخ");
                    setReservations([]);
                }
            } else {
                toast.error("فشل في استرجاع البيانات");
            }
        } catch (error) {
            console.error("Error fetching monthly reservations:", error);
            toast.error("حدث خطأ في الاتصال");
        }
    };

    useEffect(() => {
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

    // Toggle predefined slot selection
    const toggleSlotSelection = (slot) => {
        if (selectedSlots.find(s => s.id === slot.id)) {
            setSelectedSlots(selectedSlots.filter(s => s.id !== slot.id));
        } else {
            setSelectedSlots([...selectedSlots, slot]);
        }
    };

    const handleSave = async () => {
        // If no slots selected, assume we want to close/delete the WHOLE day
        const isWholeDay = selectedSlots.length === 0;

        if (isWholeDay) {
            if (!window.confirm("هل أنت متأكد من غلق اليوم بالكامل؟ (سيتم حذف إتاحة اليوم)")) {
                return;
            }
        }

        // Common Date Query Params
        const queryParams = new URLSearchParams();
        queryParams.append("date.year", selectedDate.getFullYear());
        queryParams.append("date.month", selectedDate.getMonth() + 1);
        queryParams.append("date.day", selectedDate.getDate());
        queryParams.append("date.dayOfWeek", selectedDate.toLocaleDateString("en-US", { weekday: "long" }));

        // CASE 1: Delete specific slots
        if (!isWholeDay) {
            let successCount = 0;
            let failCount = 0;

            for (const slot of selectedSlots) {
                try {
                    // Append start time for this specific slot
                    const slotParams = new URLSearchParams(queryParams);
                    slotParams.append("start", slot.apiStart);

                    const endpoint = `https://stocksquare1.runasp.net/api/Reservations/DeleteAvailableDay?${slotParams.toString()}`;

                    const response = await fetch(endpoint, { method: "DELETE" });

                    if (response.ok) {
                        successCount++;
                    } else {
                        console.error(`Failed to delete slot ${slot.apiStart}: ${response.status}`);
                        failCount++;
                    }
                } catch (error) {
                    console.error("Error deleting slot:", error);
                    failCount++;
                }
            }

            if (successCount > 0) {
                toast.success(`تم غلق ${successCount} فترة بنجاح`);
                setSelectedSlots([]);
            }
            if (failCount > 0) {
                toast.error(`فشل غلق ${failCount} فترة`);
            }

        } else {
            // CASE 2: Delete Whole Day (No 'start' param)
            try {
                const endpoint = `https://stocksquare1.runasp.net/api/Reservations/DeleteAvailableDay?${queryParams.toString()}`;
                const response = await fetch(endpoint, { method: "DELETE" });

                if (response.ok) {
                    toast.success("تم غلق اليوم بالكامل بنجاح");
                } else {
                    const text = await response.text();
                    toast.error(`فشل غلق اليوم: ${text || response.statusText}`);
                }
            } catch (error) {
                console.error("Error deleting day:", error);
                toast.error("حدث خطأ أثناء الاتصال بالخادم");
            }
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen" dir="rtl">
            <ToastContainer />
            <h1 className="md:text-3xl text-2xl font-bold mb-8 text-gray-800 flex items-center gap-2 whitespace-nowrap">
                إدارة مواعيد التدريب
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Right Column: Date Selection */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="md:text-xl text-sm font-bold mb-10 text-gray-700">1. اختر اليوم</h2>
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
                        <p className="text-gray-600 font-bold">اليوم المحدد:</p>
                        <p className="text-lg font-bold text-green-700 md:text-xl text-sm">
                            {selectedDate.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                </div>

                {/* Left Column: Time Slots */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="md:text-xl text-sm font-bold mb-4 text-gray-700">2. اختر المواعيد المتاحة</h2>

                    {/* Predefined Time Slots */}
                    <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-600 mb-3">الفترات المتاحة:</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {predefinedSlots.map((slot) => {
                                const isSelected = selectedSlots.find(s => s.id === slot.id);
                                return (
                                    <button
                                        key={slot.id}
                                        onClick={() => toggleSlotSelection(slot)}
                                        className={`p-3 rounded-lg border-2 transition-all font-medium ${isSelected
                                            ? 'bg-red-600 text-white border-red-600 shadow-md'
                                            : 'bg-white text-gray-700 border-gray-300 hover:border-red-500 hover:bg-red-50'
                                            }`}
                                    >
                                        {slot.display}
                                    </button>
                                );
                            })}
                        </div>
                        <p className="text-sm text-gray-500 mt-3">
                            تم اختيار {selectedSlots.length} فترة
                        </p>
                    </div>

                    {/* Hiding Manual Add per User Request */}
                    {/* <div className="border-t pt-4 mb-4">...</div> */}

                    <button
                        onClick={handleSave}
                        className={`w-full py-2 md:py-3 text-sm md:text-lg rounded-lg font-bold text-white flex items-center justify-center  transition-all mt-4
                            ${selectedSlots.length > 0
                                ? 'bg-red-600 hover:bg-red-700 shadow-md hover:shadow-lg'
                                : 'bg-orange-500 hover:bg-orange-600 shadow-md'}`}
                    >
                        {/* <FontAwesomeIcon icon={faTrash} /> */}
                        {selectedSlots.length > 0
                            ? `غلق / إلغاء المواعيد المحددة (${selectedSlots.length} فترة)`
                            : `غلق اليوم بالكامل (${selectedDate.toLocaleDateString('ar-EG')})`
                        }
                    </button>
                </div>
            </div>

            {/* Reservations Table Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="md:text-xl text-sm font-bold text-gray-800 flex items-center gap-2">
                        {isFiltered ? `سجل الحجوزات (${filterMonth}/${filterYear})` : "الحجوزات المعلقة (Pending)"}
                    </h2>

                    <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
                        <select
                            value={filterYear}
                            onChange={(e) => setFilterYear(e.target.value)}
                            className="bg-white border text-center border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            {[2024, 2025, 2026, 2027].map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                        <select
                            value={filterMonth}
                            onChange={(e) => setFilterMonth(e.target.value)}
                            className="bg-white border text-center border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                                <option key={m} value={m}>{new Date(0, m - 1).toLocaleString('ar-EG', { month: 'long' })}</option>
                            ))}
                        </select>
                        <button
                            onClick={fetchMonthlyReservations}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                        >
                            بحث
                        </button>
                        {isFiltered && (
                            <button
                                onClick={fetchReservations}
                                className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition"
                            >
                                عودة
                            </button>
                        )}
                    </div>
                </div>

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
                                    <th className="p-4 font-semibold">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.map((res, index) => (
                                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-medium text-gray-800">{res.fullName}</td>
                                        <td className="p-4 text-gray-600">{res.email}</td>
                                        <td className="p-4 text-gray-600">
                                            {res.day && !isNaN(new Date(res.day).getTime())
                                                ? new Date(res.day).toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                                                : res.day || "تاريخ غير متوفر"}
                                        </td>
                                        <td className="p-4 text-gray-600" dir="ltr">{res.startTime}</td>
                                        <td className="p-4">
                                            {res.localStatus === 'accepted' ? (
                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                                                    تم القبول
                                                </span>
                                            ) : res.localStatus === 'rejected' ? (
                                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                                                    تم الرفض
                                                </span>
                                            ) : (
                                                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                                                    قيد الانتظار
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 flex gap-2">
                                            {!res.localStatus && (
                                                <>
                                                    <button
                                                        onClick={() => handleAction(res.reservationsId, 'accept')}
                                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition"
                                                    >
                                                        قبول
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(res.reservationsId, 'reject')}
                                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                                                    >
                                                        رفض
                                                    </button>
                                                </>
                                            )}
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

                {/* Debug View */}
                {/* Debug View Removed */}
            </div>

            {showTrainerModal && (
                <Modal onClose={() => setShowTrainerModal(false)}>
                    <div className="p-4" dir="rtl">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">تعيين مدرب للحجز</h2>
                        <p className="text-gray-600 mb-4">يرجى اختيار المدرب (اختياري) أو الضغط على تأكيد مباشرة:</p>

                        <select
                            value={selectedTrainer}
                            onChange={(e) => setSelectedTrainer(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-green-500 outline-none"
                        >
                            <option value="">-- اختر مدرب --</option>
                            {trainers.map(trainer => (
                                <option key={trainer.id} value={trainer.id}>{trainer.name || trainer.fullName}</option>
                            ))}
                        </select>

                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowTrainerModal(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                            >
                                إلغاء
                            </button>
                            <button
                                onClick={confirmAcceptance}
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold transition shadow-md"
                            >
                                تأكيد والتعيين
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default AppointmentsManagement;
