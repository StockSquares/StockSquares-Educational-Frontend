import { Calendar, AlertCircle, ChevronLeft } from "lucide-react";


import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faMars, faVenus, faCalendarAlt, faClock, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import DatePicker, { registerLocale } from "react-datepicker";
import ar from "date-fns/locale/ar";
import "react-datepicker/dist/react-datepicker.css";
// import './BookYourTrainer.css';
import { useAuth } from "../../Context/AuthContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from "framer-motion";

registerLocale("ar", ar);


import { useNavigate } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
function ReservationDate() {



  const { userData, setDecodedUser } = useAuth();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'

  useEffect(() => {
    setIsLoggedIn(!!userData);
  }, [userData]);

  /* Removed auto-login logic to prioritize OTP verification flow */
  const handleRegistrationSuccess = async (data) => {
    // Store email for OTP page and redirect
    if (data?.email || localStorage.getItem('email')) {
      toast.success("تم إنشاء الحساب بنجاح! جاري التوجيه لتفعيل الحساب...");
      setTimeout(() => {
        navigate("/verify-otp");
      }, 1500);
    } else {
      toast.error("حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى.");
    }
  };

  const handleLoginSuccess = (data) => {
    setIsLoggedIn(true);
    toast.success("تم تسجيل الدخول بنجاح!");
    setStep(1); // Start at first step of logged-in flow (Features)
  };

  const [step, setStep] = useState(1);

  // Dynamic Steps Configuration
  const steps = isLoggedIn
    ? [
      { id: 'features', label: 'خصائص التدريب' },
      { id: 'payment', label: 'الدفع' }
    ]
    : [
      { id: 'auth', label: 'الدخول' },
      { id: 'features', label: 'خصائص التدريب' },
      { id: 'payment', label: 'الدفع' }
    ];

  const currentStepContent = steps[step - 1]?.id;
  const totalSteps = steps.length;

  // Ensure step is valid when switching modes
  useEffect(() => {
    if (step > totalSteps) {
      setStep(totalSteps);
    }
  }, [totalSteps, step]);

  const [gender, setGender] = useState("male");
  const [dob, setDob] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("EgyptStockExchange");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [trainingGoal, setTrainingGoal] = useState("");
  const [assessmentMethod, setAssessmentMethod] = useState(""); // State for second question
  const [errors, setErrors] = useState({}); // State for validation errors

  const trainingGoals = [
    "تطوير مهارات الاستثمار",
    "بناء خطة مالية شخصية",
    "تعلم ادوات التحليل المالي",
    "فهم الاستراتيجيات الفنية"
  ];

  const assessmentMethods = [
    "اختيارات قصيرة بعد كل جلسة",
    "مشروع عملي (محاكاة استثمارية)",
    "تقييم شفهي / نقاشي مع المدرب"
  ];

  // Calendly-like picker state
  // Calculate minimum booking date (Today + 2 days)
  const getMinBookingDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d;
  };
  const minBookingDate = getMinBookingDate();

  // Calendly-like picker state
  const [selectedDate, setSelectedDate] = useState(minBookingDate);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState(null);
  const [selectedTimeSlotObj, setSelectedTimeSlotObj] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Markets List with Icons/Titles for better UI
  const marketOptions = [
    { value: "EgyptStockExchange", label: "البورصة المصرية" },
    { value: "SaudiStockExchange", label: "البورصة السعودية" },
    { value: "EmiratiStockExchange", label: "البورصة الإماراتية" },
    { value: "CryptoExchange", label: "العملات الرقمية" },
    { value: "USStockExchange", label: "البورصة الأمريكية" },
    { value: "GlobalStocksAndForex", label: "البورصة العالمية والفوركس" },
  ];

  const predefinedSlots = [
    { id: 1, startTime: "10:00:00", display: "10:00 ص - 12:00 م", endTime: "12:00:00" },
    { id: 2, startTime: "12:00:00", display: "12:00 م - 02:00 م", endTime: "14:00:00" },
    { id: 3, startTime: "14:00:00", display: "02:00 م - 04:00 م", endTime: "16:00:00" },
    { id: 4, startTime: "16:00:00", display: "04:00 م - 06:00 م", endTime: "18:00:00" },
    { id: 5, startTime: "18:00:00", display: "06:00 م - 08:00 م", endTime: "20:00:00" },
    { id: 6, startTime: "20:00:00", display: "08:00 م - 10:00 م", endTime: "22:00:00" },
  ];

  const [bookedSlotsData, setBookedSlotsData] = useState([]);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const response = await fetch("https://stocksquare1.runasp.net/api/Reservations/GetUpcomingDays");
        if (response.ok) {
          const result = await response.json();
          // Adjust based on whether result is [ ... ] or { data: [ ... ] }
          // Screenshot showed { "data": [ ... ] }
          const data = result.data || result;
          if (Array.isArray(data)) {
            setBookedSlotsData(data);
          }
        }
      } catch (error) {
        console.error("Error fetching booked slots:", error);
      }
    };
    fetchBookedSlots();
  }, []);

  useEffect(() => {
    // 1. Find booked data for the selected date
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const selectedDateStr = `${year}-${month}-${day}`;
    // Need to match against the API date format. API likely returns ISO "2025-12-13T..."
    // We will compare strictly by YYYY-MM-DD part.

    // Normalize date helper
    const getDatePart = (isoStr) => isoStr.split('T')[0];

    console.log("Checking Date:", selectedDateStr);
    if (bookedSlotsData.length > 0) console.log("Sample Booked Date:", bookedSlotsData[0].date);

    // Use filter instead of find to handle multiple entries for the same day if they exist
    const dayBookingsList = bookedSlotsData.filter(d => getDatePart(d.date) === selectedDateStr);

    let filteredSlots = predefinedSlots;

    if (dayBookingsList.length > 0) {
      // Flatten all time slots from all matching day records
      const allBookedSlots = dayBookingsList.flatMap(d => d.timeSlots || []);

      console.log("All Bookings for Day:", allBookedSlots);

      const bookedStartTimes = allBookedSlots.map(s => {
        return (s.startTime || s).toString().trim();
      });

      filteredSlots = predefinedSlots.filter(
        slot => !bookedStartTimes.includes(slot.startTime)
      );
    }
    setAvailableSlots(filteredSlots);
  }, [selectedDate, bookedSlotsData]);



  const handleTimeSlotClick = (slot) => {
    setSelectedTimeSlotId(slot.id);
    setSelectedTimeSlotObj(slot);
  };

  // Final handler that builds payload exactly as requested (Flat JSON + Integer Enum)
  const handleReservation = async () => {
    if (!userData) {
      toast.error("يجب تسجيل الدخول أولاً");
      return;
    }

    const newErrors = {};
    if (!trainingGoal) newErrors.trainingGoal = "الرجاء اختيار الهدف من التدريب";
    if (!assessmentMethod) newErrors.assessmentMethod = "الرجاء اختيار أسلوب التقييم المفضل";
    if (!selectedMarket) newErrors.selectedMarket = "الرجاء اختيار البورصة المستهدفة";
    if (!selectedPlan) newErrors.selectedPlan = "الرجاء اختيار الخطة المناسبة";
    if (!selectedTimeSlotObj) newErrors.timeSlot = "الرجاء اختيار ميعاد";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Optional: scroll to first error or just let user see them
      return;
    }

    // Clear errors if valid
    setErrors({});

    const userId = userData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ||
      userData.uid ||
      userData.id ||
      userData.sub;

    if (!userId) {
      toast.error("حدث خطأ: لم يتم العثور على معرف المستخدم");
      console.error("User Data:", userData);
      return;
    }

    const marketTypeMapping = {
      "EgyptStockExchange": 0,
      "SaudiStockExchange": 1,
      "EmiratiStockExchange": 2,
      "USStockExchange": 3,
      "GlobalStocksAndForex": 4,
      "CryptoExchange": 5
    };

    // Using Flat Structure (proven to work for business logic)
    // + Integer MarketType (to be safe against conversion errors)
    // + English Day (for Weekday parsing)
    const payload = {
      userId: userId,
      date: selectedDate.toISOString(),
      day: selectedDate.toLocaleDateString("en-US", { weekday: "long" }),
      marketType: marketTypeMapping[selectedMarket] ?? 0,
      timeSlots: {
        startTime: selectedTimeSlotObj.startTime,
        endTime: selectedTimeSlotObj.endTime
      }
    };

    console.log('Sending payload:', payload);

    try {
      const response = await fetch('https://stocksquare1.runasp.net/api/Reservations/MakeReservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const text = await response.text();
      let result = null;
      try { result = JSON.parse(text); } catch (e) { /* not JSON */ }

      if (response.ok && result?.isSuccess) {
        toast.success('تم الحجز بنجاح!');
        // Move to next step (Payment)
        const paymentStepIndex = steps.findIndex(s => s.id === 'payment');
        if (paymentStepIndex !== -1) {
          setStep(paymentStepIndex + 1);
        }
      } else {
        const serverMessage = result?.message || result?.title || text || `HTTP ${response.status}`;
        toast.error(`فشل الحجز: ${serverMessage}`);
        console.error('Reservation failed', response.status, result || text);
        if (response.status === 400 && result?.errors) {
          toast.error(`خطأ تحقق إضافي: ${JSON.stringify(result.errors)}`);
        }
      }
    } catch (err) {
      console.error('Network error', err);
      toast.error('حدث خطأ أثناء الاتصال بالخادم');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };




  const plans = [
    {
      title: "مبتدئ",
      price: "5000 ج.م",
      hours: "10 ساعات | 5 محاضرات",
      color: "bg-green-100 text-green-900",
      active: "bg-green-300",
    },
    {
      title: "متقدم",
      price: "7500 ج.م",
      hours: "12 ساعة | 6 محاضرات",
      color: "bg-yellow-100 text-yellow-600",
      active: "bg-yellow-300",
    },
    {
      title: "محترف",
      price: "15000 ج.م",
      hours: "14 ساعة | 7 محاضرات",
      color: "bg-red-100 text-red-600",
      active: "bg-red-300",
    },
  ];

  /* REMOVED EARLY RETURN TO INTEGRATE LOGIN AS STEP 1 */

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      <ToastContainer position="top-center" theme="colored" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden border border-white/50"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-8 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-extrabold relative z-10 flex items-center justify-center gap-3"
          >
            {/* <FontAwesomeIcon icon={faUserGroup} className="text-green-200" /> */}
            حجز مدربك الشخصي
          </motion.h1>
          <p className="mt-2 text-green-100 relative z-10 text-lg">ارتقِ بمهاراتك في التداول مع خبرائنا</p>
        </div>

        {/* Steps Navigation - Dynamic */}
        <div className="flex justify-center items-center p-6 bg-gray-50/50 border-b border-gray-100">
          <div className="flex items-center w-full max-w-lg justify-between px-6 relative">
            {/* Progress Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10 rounded-full mx-10">
              <div
                className="h-full bg-green-500 transition-all duration-500 rounded-full"
                style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
              ></div>
            </div>

            {/* Dynamic Steps Mapping */}
            {steps.map((s, index) => {
              const stepNum = index + 1;
              const isActive = step >= stepNum;
              const isCurrent = step === stepNum;

              return (
                <div key={s.id} className={`flex flex-col items-center gap-2 bg-white px-2 cursor-default relative`}>
                  <motion.div
                    animate={{ scale: isActive ? 1.1 : 1, backgroundColor: isActive ? "#10b981" : "#E5E7EB" }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-colors border-4 border-white ${isCurrent ? 'ring-2 ring-green-100' : ''}`}
                  >
                    {stepNum}
                  </motion.div>
                  <span className={`text-sm font-semibold transition-colors ${isActive ? 'text-green-700' : 'text-gray-400'}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>


        <div className="p-8 md:p-12">

          {/* CONTENT: AUTH */}
          {currentStepContent === 'auth' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-xl mx-auto"
            >
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                {authMode === 'login' ? (
                  <div>
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">تسجيل الدخول للمتابعة</h2>
                      <p className="text-gray-500">يرجى تسجيل الدخول لحجز جلستك التدريبية</p>
                    </div>
                    <Login
                      onSuccess={handleLoginSuccess}
                      hideHeader={true}
                      hideRegisterLink={true}
                    />
                    <div className="text-center mt-6 pt-6 border-t border-gray-100">
                      <p className="text-gray-600">ليس لديك حساب؟ <button onClick={() => setAuthMode('register')} className="text-green-600 font-bold hover:text-green-700 underline transition-colors">إنشاء حساب جديد</button></p>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Register component handles its own title via props usually, but we wrap it nicely */}
                    <Register
                      onSuccess={handleRegistrationSuccess}
                      hideHeader={true}
                      customTitle={
                        <div className="text-center mb-6">
                          <h2 className="text-2xl font-bold text-gray-800 mb-2">إنشاء حساب جديد</h2>
                          <p className="text-gray-500 text-sm">قم بإنشاء حسابك في خطوات بسيطة</p>
                        </div>
                      }
                      customButtonText="حفظ ومتابعة"
                      hideLoginLink={true}
                    />
                    <div className="text-center mt-6 pt-6 border-t border-gray-100">
                      <p className="text-gray-600">لديك حساب بالفعل؟ <button onClick={() => setAuthMode('login')} className="text-green-600 font-bold hover:text-green-700 underline transition-colors">تسجيل الدخول</button></p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}


          {/* CONTENT: FEATURES */}
          {currentStepContent === 'features' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >

              {/* Section 0.5: Training Goal */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl"></span> الهدف من التدريب الشخصي :
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {trainingGoals.map((goal) => (
                    <motion.button
                      key={goal}
                      whileHover={{ scale: 1.01 }}
                      // whileTap={{ scale: 1 }}
                      onClick={() => setTrainingGoal(goal)}
                      className={`p-4 rounded-xl border-2 text-right transition-all duration-300 font-semibold ${trainingGoal === goal
                        ? 'border-green-500 bg-green-50 text-green-800 shadow-sm'
                        : 'border-gray-200 bg-white text-gray-600'
                        }`}
                    >
                      {goal}
                    </motion.button>
                  ))}
                </div>
                {errors.trainingGoal && <p className="text-red-500 text-sm mt-1">{errors.trainingGoal}</p>}
              </motion.div>

              {/* Section 0.75: Assessment Method */}
              <motion.div
                variants={itemVariants} className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl"></span> أسلوب التقييم المفضل :
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {assessmentMethods.map((method) => (
                    <motion.button
                      key={method}
                      whileHover={{ scale: 1.01 }}
                      // whileTap={{ scale: 0.98 }}
                      onClick={() => setAssessmentMethod(method)}
                      className={`p-4 rounded-xl border-2 text-right transition-all duration-300 font-semibold ${assessmentMethod === method
                        ? 'border-green-500 bg-green-50 text-green-800 shadow-sm'
                        : 'border-gray-200 bg-white text-gray-600'
                        }`}
                    >
                      {method}
                    </motion.button>
                  ))}
                </div>
                {errors.assessmentMethod && <p className="text-red-500 text-sm mt-1">{errors.assessmentMethod}</p>}
              </motion.div>

              {/* Section 2: Market Selection */}
              <motion.div
                variants={itemVariants} className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl"></span> البورصة المستهدفة للتدريب العملي :
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {marketOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.01 }}
                      // whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedMarket(option.value)}
                      className={`relative p-4 rounded-xl border-2 text-right transition-all duration-300 ${selectedMarket === option.value
                        ? 'border-green-50 bg-green-50 text-green-800 shadow-sm'
                        : 'border-gray-200 bg-white text-gray-600'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-md">{option.label}</span>
                        {/* <span className="text-xl filter grayscale-[0.5]">{option.icon}</span> */}
                      </div>
                      {selectedMarket === option.value && (
                        <motion.div
                          layoutId="activeRing"
                          className="absolute inset-0 border-2 border-green-500 rounded-xl"
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
                {errors.selectedMarket && <p className="text-red-500 text-sm mt-1">{errors.selectedMarket}</p>}
              </motion.div>


              {/* Section 3: Level Of Plan */}
              <div className="bg-gray-50 p-6 rounded-xl mb-6">
                <label className="text-lg font-medium text-gray-800 mb-4">
                  اختر الخطه المناسبه لك:
                </label>

                <div className="flex flex-wrap justify-between gap-3">
                  {plans.map((plan, index) => (
                    <div
                      key={index}
                      className={`w-full sm:w-[240px] text-center p-3 rounded-2xl shadow-md cursor-pointer transition-all ${selectedPlan === plan.title
                        ? plan.active
                        : `${plan.color} hover:scale-105`
                        } `}
                      onClick={(e) => {
                        setSelectedPlan(plan.title);
                        localStorage.setItem("plan", JSON.stringify(plans[index]));
                      }}
                    >
                      <h2 className="text-xl font-bold mb-2">{plan.title}</h2>
                      <p className="text-lg font-semibold mb-1">
                        السعر: {plan.price}
                      </p>
                      <p className="text-base">المده: {plan.hours}</p>
                    </div>
                  ))}
                </div>
                {errors.selectedPlan && <p className="text-red-500 text-sm mt-2 text-center font-bold">{errors.selectedPlan}</p>}
              </div>



              {/* Section 3: Date & Time Picker */}
              <motion.div variants={itemVariants} className="space-y-6 pt-6 border-t border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                  {/* <FontAwesomeIcon icon={faClock} className="text-green-600" />  */}
                  اختر الموعد المناسب
                </h3>

                <div className="flex flex-col lg:flex-row gap-8 bg-gray-50 p-6 rounded-3xl border border-gray-200">
                  {/* Calendar */}
                  <div className="w-full lg:w-1/2 flex justify-center border-b lg:border-b-0 lg:border-l border-gray-200 pb-6 lg:pb-0 lg:pl-6">
                    <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-sm">
                      <style>{`
                            .react-datepicker { font-family: inherit; border: none; width: 100%; display: flex; justify-content: center; }
                            .react-datepicker__month-container { width: 100%; }
                            .react-datepicker__header { background-color: white; border-bottom: none; pt: 0; }
                            .react-datepicker__current-month { font-family: inherit; font-weight: 700; color: #1f2937; margin-bottom: 1rem; font-size: 1.1rem }
                            .react-datepicker__day-name { color: #9ca3af; font-weight: 500; width: 2.5rem; }
                            .react-datepicker__day { width: 2.5rem; line-height: 2.5rem; border-radius: 0.75rem; font-weight: 600; color: #374151; transition: all 0.2s; }
                            .react-datepicker__day:hover { background-color: #d1fae5 !important; color: #065f46 !important; scale: 1.1; }
                            .react-datepicker__day--selected { background-color: #10b981 !important; color: white !important; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.4); }
                            .react-datepicker__day--keyboard-selected { background-color: #d1fae5; color: #065f46; }
                            .react-datepicker__navigation { top: 12px; }
                          `}</style>
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        inline
                        minDate={minBookingDate}
                        locale="ar"
                        filterDate={(date) => date.getDay() !== 5}
                      />
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="w-full lg:w-1/2">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-gray-700">
                        المواعيد المتاحة ليوم <span className="text-green-600">{selectedDate.toLocaleDateString('ar-EG', { weekday: 'long' })}</span>
                      </h4>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{availableSlots.length} متاح</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 max-h-[320px] overflow-y-auto custom-scrollbar pr-1">
                      {availableSlots.map((slot) => (
                        <motion.button
                          key={slot.id}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleTimeSlotClick(slot)}
                          className={`bg-white p-3 rounded-xl border-2 transition-all duration-200 text-sm font-bold flex flex-col items-center gap-1
                              ${selectedTimeSlotId === slot.id
                              ? 'border-green-500 bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-200'
                              : 'border-gray-100 text-gray-600 hover:border-green-300 hover:shadow-md'
                            }`}
                        >
                          <span className="text-base font-extrabold dir-ltr">{slot.display.split('-')[0]}</span>
                          <span className={`text-xs ${selectedTimeSlotId === slot.id ? 'text-green-100' : 'text-gray-400'}`}>
                            {slot.display}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
                {errors.timeSlot && <p className="text-red-500 text-sm mt-2 font-semibold text-center">{errors.timeSlot}</p>}
              </motion.div>

              {/* Submit Action */}
              <motion.div
                variants={itemVariants}
                className="pt-6 flex justify-end"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReservation}
                  disabled={!selectedTimeSlotObj}
                  className={`px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-green-200 flex items-center gap-3 transition-all duration-300
                      ${selectedTimeSlotObj
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-2xl hover:shadow-green-300'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                    }`}
                >
                  <span>تأكيد الحجز</span>
                </motion.button>
              </motion.div>

            </motion.div>
          )}

          {currentStepContent === 'payment' && (
            <div className="text-center py-20">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 text-4xl"
              >
                ✓
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800">تم الحجز مبدئياً!</h2>
              <p className="text-gray-600 mt-2">جاري تحويلك لبوابة الدفع...</p>
            </div>
          )}
        </div>
      </motion.div >
    </div >



  )
}
export default ReservationDate;
