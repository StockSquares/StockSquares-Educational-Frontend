import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import DatePicker, { registerLocale } from "react-datepicker";
import ar from "date-fns/locale/ar";
registerLocale("ar", ar);
import "react-datepicker/dist/react-datepicker.css";
import './BookYourTrainer.css';
import { useAuth } from "../../Context/AuthContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BookYourTrainer() {
  const { userData } = useAuth();
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState("male");
  const [dob, setDob] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("");

  const [selectedTimes, setSelectedTimes] = useState({});

  // New State for Calendly-style Picker
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const [availableDays, setAvailableDays] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Standard daily slots
  const allDailySlots = [
    "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM", "07:00 PM", "09:00 PM"
  ];

  // Fetch upcoming available days on mount
  useEffect(() => {
    const fetchAvailableDays = async () => {
      setLoadingSlots(true);
      try {
        const response = await fetch("https://stocksquare1.runasp.net/api/Reservations/GetUpcomingAvailableDays");
        if (!response.ok) throw new Error("Failed to fetch");
        const result = await response.json();

        if (result.isSuccess && Array.isArray(result.data)) {
          setAvailableDays(result.data);
        }
      } catch (error) {
        console.error("Error fetching available days:", error);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchAvailableDays();
  }, []);

  // Filter slots when selectedDate or availableDays change
  useEffect(() => {
    if (!selectedDate) return;

    const dateString = selectedDate.toLocaleDateString('en-CA'); // YYYY-MM-DD

    // Find all day objects matching the selected date
    // The API might return multiple entries for the same date or a single entry with multiple slots
    const matchingDays = availableDays.filter(d => d.date && d.date.startsWith(dateString));

    if (matchingDays.length > 0) {
      // Aggregate all time slots from all matching day entries and attach dayId
      const allSlots = matchingDays.flatMap(day => {
        return (day.timeSlots || []).map(slot => ({ ...slot, dayId: day.id }));
      });

      // Remove duplicates based on startTime just in case
      const uniqueSlots = Array.from(new Map(allSlots.map(slot => [slot.startTime, slot])).values());

      // Sort slots by time
      uniqueSlots.sort((a, b) => a.startTime.localeCompare(b.startTime));

      setAvailableSlots(uniqueSlots);
    } else {
      setAvailableSlots([]);
    }
  }, [selectedDate, availableDays]);

  // Function to check if a date is available (exists in the API response)
  const isDateAvailable = (date) => {
    const dateString = date.toLocaleDateString('en-CA');
    return availableDays.some(d => d.date && d.date.startsWith(dateString));
  };

  const handleTimeSlotClick = (slot) => {
    setSelectedTimeSlot(slot);
  };

  const handleReservation = async () => {
    if (!userData) {
      toast.error("يجب تسجيل الدخول أولاً");
      return;
    }

    if (!selectedTimeSlot) {
      toast.error("الرجاء اختيار ميعاد");
      return;
    }

    // Try to get User ID from common claims
    const userId = userData.uid || userData.id || userData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || userData.sub;

    if (!userId) {
      toast.error("حدث خطأ: لم يتم العثور على معرف المستخدم");
      console.error("User Data:", userData);
      return;
    }

    const payload = {
      userId: userId,
      availableDayId: selectedTimeSlot.dayId, // Retrieved from the slot object
      timeSlotId: selectedTimeSlot.id
    };

    try {
      const response = await fetch("https://stocksquare1.runasp.net/api/Reservations/MakeReservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && result.isSuccess) {
        toast.success("تم الحجز بنجاح!");
        setStep(2); // Proceed to next step (Payment)
      } else {
        toast.error(`فشل الحجز: ${result.message || "خطأ غير معروف"}`);
      }
    } catch (error) {
      console.error("Error making reservation:", error);
      toast.error("حدث خطأ أثناء الاتصال بالخادم");
    }
  };



  return (
    <div className="max-w-3xl mx-auto p-8 mt-12 mb-12 bg-white shadow-lg rounded-lg">
      <ToastContainer />
      <h1 className="text-xl font-bold mb-10 text-center ">
        <FontAwesomeIcon icon={faUserGroup} className="ml-2" /> حجز مدربك الشخصي
      </h1>

      {/* Steps Navigation */}
      <div className="flex items-center space-x-10 border-b pb-5">
        <div className={`relative pb-2 text-black ml-10 ${step === 1 ? 'border-b-2 font-black border-y-green-500' : ''}`}>
          <div className="step-item">
            <span className="step-number">1</span> أركان التدريب
          </div>
        </div>
        <div className={`relative pb-2 text-black ${step === 2 ? 'border-b-2 border-y-green-500' : ''}`}>
          <div className="step-item">
            <span className="step-number">2</span> الدفع
          </div>
        </div>
      </div>

      {/* Gender Selection */}
      <div className="mt-6">
        <h3 className="text-md font-medium text-black">جنس المتدرب</h3>
        <div className="mt-8 flex space-x-4">
          <label className="flex items-center space-x-5">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={() => setGender("male")}
              className="form-radio h-4 w-4 ml-2"
            />
            <span className="text-black">ذكر</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={() => setGender("female")}
              className="form-radio h-4 w-4 ml-2"
            />
            <span className="text-black">أنثى</span>
          </label>
        </div>
      </div>

      {/* Date of Birth Selection */}
      <div className="mt-6">
        <h3 className="text-md font-medium text-black">تاريخ الميلاد</h3>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="mt-2 p-2 border rounded-lg w-full text-white bg-slate-400 text-xl"
        />
      </div>

      {/* Market Selection */}
      <div className="mt-6">
        <h3 className="text-md font-medium text-black">السوق المراد تعلمه</h3>
        <select
          value={selectedMarket}
          onChange={(e) => setSelectedMarket(e.target.value)}
          className="mt-2 p-2 border rounded-lg w-full text-black text-xl"
        >
          <option value="">اختر السوق</option>
          <option value="Egyptian Stock Exchange">البورصة المصرية</option>
          <option value="Saudi Stock Exchange">البورصة السعودية</option>
          <option value="Emirati Stock Exchange">البورصة الإماراتية</option>
          <option value="Global Stocks and Forex">البورصة العالمية والفروكس</option>
          <option value="US Stock Exchange">البورصة الأمريكية</option>
          <option value="Cryptocurrency Exchange">بورصة العملات المشفرة</option>
        </select>
      </div>

      {/* Weekly Training Schedule */}
      {/* Weekly Training Schedule - COMMENTED OUT */}


      {/* New Calendly-like Date & Time Picker */}
      <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" dir="ltr">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-right" dir="rtl">اختر التاريخ والوقت</h3>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Calendar Section */}
            <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-200 pb-6 md:pb-0 md:pr-6">
              <style>{`
                .react-datepicker {
                  font-family: inherit;
                  border: none;
                  width: 100%;
                  display: flex;
                  justify-content: center;
                }
                .react-datepicker__month-container {
                  width: 100%;
                }
                .react-datepicker__header {
                  background-color: white;
                  border-bottom: none;
                  padding-top: 0;
                }
                .react-datepicker__current-month {
                  font-size: 1.1rem;
                  font-weight: 600;
                  color: #374151;
                  margin-bottom: 1rem;
                }
                .react-datepicker__day-name {
                  color: #6B7280;
                  width: 2.5rem;
                  line-height: 2.5rem;
                  margin: 0.1rem;
                }
                .react-datepicker__day {
                  width: 2.5rem;
                  line-height: 2.5rem;
                  margin: 0.1rem;
                  border-radius: 50%;
                  color: #374151;
                  font-weight: 500;
                }
                /* Style for Available Days */
                .react-datepicker__day:not(.react-datepicker__day--disabled):not(.react-datepicker__day--selected) {
                  color: #059669; /* Green-600 */
                  background-color: #ecfdf5; /* Green-50 */
                  font-weight: bold;
                  cursor: pointer;
                }
                .react-datepicker__day--selected {
                  background-color: #059669 !important; /* Green-600 */
                  color: white !important;
                }
                .react-datepicker__day--keyboard-selected {
                  background-color: #d1fae5;
                  color: #065f46;
                }
                .react-datepicker__day:hover {
                  background-color: #34d399 !important; /* Green-400 */
                  color: white !important;
                }
                .react-datepicker__navigation {
                  top: 5px;
                }
                .react-datepicker__day--disabled {
                  color: #d1d5db !important; /* Gray-300 */
                  background-color: transparent !important;
                  pointer-events: none;
                  text-decoration: line-through;
                  font-weight: normal !important;
                }
              `}</style>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                inline
                calendarClassName="w-full"
                filterDate={isDateAvailable}
                minDate={new Date()}
                locale="ar"
              />
            </div>

            {/* Time Slots Section */}
            <div className="flex-1 pt-6 md:pt-0 md:pl-6">
              <h4 className="font-semibold mb-4 text-gray-700 text-center">
                {selectedDate.toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' })}
              </h4>

              {loadingSlots ? (
                <div className="text-center py-10 text-gray-500">جاري تحميل المواعيد...</div>
              ) : availableSlots.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {availableSlots.map((slot, index) => {
                    // Format time for display (e.g., "10:30:00" -> "10:30 AM")
                    // Assuming slot.startTime is "HH:mm:ss"
                    let displayTime = slot.startTime;
                    try {
                      const [hours, minutes] = slot.startTime.split(':');
                      const date = new Date();
                      date.setHours(hours);
                      date.setMinutes(minutes);
                      displayTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
                    } catch (e) {
                      // Fallback if parsing fails
                      console.error("Error parsing time", e);
                    }

                    return (
                      <button
                        key={slot.id || index}
                        onClick={() => handleTimeSlotClick(slot)}
                        className={`py-3 px-4 rounded-lg border transition-all duration-200 text-sm font-medium
                          ${selectedTimeSlot === slot
                            ? 'bg-green-600 text-white border-green-600 shadow-md transform scale-105'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-green-500 hover:text-green-600'
                          }`}
                      >
                        {displayTime}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  لا توجد مواعيد متاحة في هذا اليوم
                </div>
              )}
            </div>
          </div>

          {/* Next Button */}
          {selectedTimeSlot && (
            <div className="mt-8 flex justify-end animate-fade-in">
              <button
                onClick={handleReservation}
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-lg flex items-center gap-2"
              >
                احجز الآن
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
