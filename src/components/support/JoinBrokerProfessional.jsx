// src/components/support/JoinBrokerProfessional.jsx
import React, { useState } from "react";
import { Building2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import CustomSelect from "../license/CustomSelect";
import { toast } from "react-toastify";

export default function JoinBrokerProfessional() {
    const [formData, setFormData] = useState({
        companyName: "",
        location: "",
        website: "",
        licenseType: "",
        contactName: "",
        contactPosition: "",
        contactPhone: "",
        contactEmail: "",
        activityAreas: [],
        dealSize: "",
        companyStage: "",
        strategicPartnership: "",
        notes: "",
    });

    const [errors, setErrors] = useState({});
    const activityOptions = [
        "أسهم",
        "سندات",
        "عملات",
        "صناديق",
        "عقارات",
        "شركات",
        "أدوات تمويل",
    ];
    const dealSizeOptions = [
        "أقل من 10 الاف دولار",
        "بين 25 الى 50 الف دولار",
        "بين 75 الى 100 الف دولار",
        "اكثر من 100 الف دولار",
    ];
    const companyStages = [
        "الانتشار وبناء قاعدة بيانات",
        "النمو وتحقيق المبيعات",
        "التوسّع في أسواق أخرى",
    ];

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => {
            if (!prev[name]) return prev;
            const copy = { ...prev };
            delete copy[name];
            return copy;
        });
    };

    const handleToggle = (name, value) => {
        setFormData((prev) => {
            const arr = prev[name] || [];
            if (arr.includes(value)) return { ...prev, [name]: arr.filter((v) => v !== value) };
            return { ...prev, [name]: [...arr, value] };
        });
        setErrors((prev) => {
            if (!prev[name]) return prev;
            const copy = { ...prev };
            delete copy[name];
            return copy;
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.companyName) newErrors.companyName = "يرجى إدخال اسم الشركة";
        if (!formData.location) newErrors.location = "يرجى إدخال اسم المدينةاو الدولة";
        if (!formData.website) newErrors.website = "يرجى إدخال رابط الموقع الالكتروني ";
        if ((formData.licenseType || []).length === 0) newErrors.licenseType = " يرجي اختيار نوع الترخيص";

        if (!formData.contactName) newErrors.contactName = "يرجى إدخال اسم مسؤول التواصل";
        if (!formData.contactPosition) newErrors.contactPosition = "يرجى إدخال وظيفتك ";
        if (!formData.contactPhone) newErrors.contactPhone = "يرجى إدخال رقم الموبايل";
        if (!formData.contactEmail) newErrors.contactEmail = "يرجى إدخال البريد الإلكتروني";
        // if (!formData.strategicPartnership) newErrors.strategicPartnership = " يرجي الاختيار";
        if ((formData.activityAreas || []).length === 0) newErrors.activityAreas = "اختر على الأقل مجالًا واحدًا";
        if (!formData.dealSize) newErrors.dealSize = "اختر حجم صفقتك ";
        if (!formData.companyStage) newErrors.companyStage = "اختر  المرحلة الحالية لشركتك ";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        // هنا تقدر تبعتي الداتا ل API
        console.log("Join Broker payload:", formData);
        toast.success("تم تسجيل بيانات شركتكم بنجاح. سنقوم بالتواصل معكم قريبًا")
        // امسحي الفورم بعد الإرسال
        setFormData({
            companyName: "",
            location: "",
            website: "",
            licenseType: "",
            contactName: "",
            contactPosition: "",
            contactPhone: "",
            contactEmail: "",
            activityAreas: [],
            dealSize: "",
            companyStage: "",
            strategicPartnership: "",
            notes: "",
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-xl my-5">

            <div className="p-2 rounded-2xl flex flex-col gap-3 border w-full justify-center items-center mb-7 shadow-md bg-green-100">
                <div className="inline-block p-3 bg-gray-50 rounded-full mb-4">
                    <Building2 className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">الرعاية التجارية</h2>
                <p className="text-[12px] md:text-xl lg:text-xl px-1 md:px-3 mb-4 flex flex-col text-green-400 font-semibold leading-5">إذا كانت شركتكم تعمل في مجال الوساطة المالية أو الاستثمار، ففرص التعاون معنا مفتوحة.
                    سجّل بياناتكم وأستعد لنبدأ شراكة ناجحة وفعالة ومستمرة
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 w-full" dir="rtl">
                {/* Company info */}
                <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="font-semibold mb-4">بيانات الشركة</h3>

                    <label className="block text-sm text-gray-700 mb-2">اسم الشركة</label>
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={(e) => handleChange("companyName", e.target.value)}
                        className="w-full p-3 border rounded-lg"
                    />
                    {errors.companyName && (
                        <p className="text-red-500 text-sm flex items-center mt-1">
                            <AlertCircle className="h-4 w-4 ml-1" /> {errors.companyName}
                        </p>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">الدولة / المدينة</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={(e) => handleChange("location", e.target.value)}
                                className="w-full p-3 border rounded-lg"
                            />
                            {errors.location && (
                                <p className="text-red-500 text-sm flex items-center mt-1">
                                    <AlertCircle className="h-4 w-4 ml-1" /> {errors.location}
                                </p>
                            )}
                        </div>


                        <div>
                            <label className="block text-sm text-gray-700 mb-2">رابط الموقع الإلكتروني</label>
                            <input
                                type="url"
                                name="website"
                                value={formData.website}
                                onChange={(e) => handleChange("website", e.target.value)}
                                className="w-full p-3 border rounded-lg"
                            />
                            {errors.website && (
                                <p className="text-red-500 text-sm flex items-center mt-1">
                                    <AlertCircle className="h-4 w-4 ml-1" /> {errors.website}
                                </p>
                            )}
                        </div>


                    </div>

                    <div className="mt-4">
                        <label className="block text-sm text-gray-700 mb-2">نوع الترخيص المالي</label>
                        <CustomSelect
                            value={formData.licenseType}
                            onChange={(val) => handleChange("licenseType", val)}
                            options={["محلي", "دولي", "جاري الاستخراج", "غير مرخص"]}
                            placeholder="اختر نوع الترخيص المالي"

                        />
                        {errors.licenseType && (
                            <p className="text-red-500 text-sm flex items-center mt-1">
                                <AlertCircle className="h-4 w-4 ml-1" /> {errors.licenseType}
                            </p>
                        )}
                    </div>
                </div>

                {/* Contact info */}
                <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="font-semibold mb-4">بيانات التواصل</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">اسم مسؤول التواصل</label>
                            <input
                                type="text"
                                value={formData.contactName}
                                onChange={(e) => handleChange("contactName", e.target.value)}
                                className="w-full p-3 border rounded-lg"
                            />
                            {errors.contactName && (
                                <p className="text-red-500 text-sm flex items-center mt-1">
                                    <AlertCircle className="h-4 w-4 ml-1" /> {errors.contactName}
                                </p>
                            )}
                        </div>


                        <div>
                            <label className="block text-sm text-gray-700 mb-2">الوظيفة داخل الشركة</label>
                            <input
                                type="text"
                                value={formData.contactPosition}
                                onChange={(e) => handleChange("contactPosition", e.target.value)}
                                className="w-full p-3 border rounded-lg"
                            />
                            {errors.contactPosition && (
                                <p className="text-red-500 text-sm flex items-center mt-1">
                                    <AlertCircle className="h-4 w-4 ml-1" /> {errors.contactPosition}
                                </p>
                            )}
                        </div>


                        <div>
                            <label className="block text-sm text-gray-700 mb-2">رقم الموبايل (واتساب مفضل)</label>
                            <input
                                type="tel"
                                value={formData.contactPhone}
                                onChange={(e) => handleChange("contactPhone", e.target.value)}
                                className="w-full p-3 border rounded-lg"
                            />
                            {errors.contactPhone && (
                                <p className="text-red-500 text-sm flex items-center mt-1">
                                    <AlertCircle className="h-4 w-4 ml-1" /> {errors.contactPhone}
                                </p>
                            )}
                        </div>


                        <div>
                            <label className="block text-sm text-gray-700 mb-2">البريد الإلكتروني الرسمي</label>
                            <input
                                type="email"
                                value={formData.contactEmail}
                                onChange={(e) => handleChange("contactEmail", e.target.value)}
                                className="w-full p-3 border rounded-lg"
                            />
                            {errors.contactEmail && (
                                <p className="text-red-500 text-sm flex items-center mt-1">
                                    <AlertCircle className="h-4 w-4 ml-1" /> {errors.contactEmail}
                                </p>
                            )}
                        </div>

                    </div>
                </div>

                {/* Activity details */}
                <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="font-semibold mb-4">تفاصيل النشاط</h3>

                    <label className="block text-sm text-gray-700 mb-2">مجالات الوساطة (يمكن اختيار أكثر من مجال)</label>
                    <div className="flex flex-wrap gap-2">
                        {activityOptions.map((a) => (
                            <button
                                key={a}
                                type="button"
                                onClick={() => handleToggle("activityAreas", a)}
                                className={`px-3 py-2 rounded-lg border ${(formData.activityAreas || []).includes(a)
                                    ? "bg-green-600 text-white border-transparent"
                                    : "border-gray-300 text-gray-700 hover:bg-green-100 hover:border-green-100"
                                    }`}
                            >
                                {a}
                            </button>
                        ))}
                    </div>
                    {errors.activityAreas && (
                        <p className="text-red-500 text-sm flex items-center mt-1">
                            <AlertCircle className="h-4 w-4 ml-1" /> {errors.activityAreas}
                        </p>
                    )}

                    <label className="block text-sm text-gray-700 mt-4 mb-2">حجم الصفقات المعتاد</label>
                    <div className="flex flex-wrap gap-2">
                        {dealSizeOptions.map((d) => (
                            <button
                                key={d}
                                type="button"
                                onClick={() => handleChange("dealSize", d)}
                                className={`px-3 py-2 rounded-lg border ${formData.dealSize === d
                                    ? "bg-green-600 text-white border-transparent"
                                    : "border-gray-300 text-gray-700 hover:bg-green-100 hover:border-green-100"
                                    }`}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                    {errors.dealSize && (
                        <p className="text-red-500 text-sm flex items-center mt-1">
                            <AlertCircle className="h-4 w-4 ml-1" /> {errors.dealSize}
                        </p>
                    )}

                    <label className="block text-sm text-gray-700 mt-4 mb-2">ماهي المرحلة الحالية لشركتكم؟</label>
                    <div className="flex flex-wrap gap-2">
                        {companyStages.map((s) => (
                            <button
                                key={s}
                                type="button"
                                onClick={() => handleChange("companyStage", s)}
                                className={`px-3 py-2 rounded-lg border ${formData.companyStage === s
                                    ? "bg-green-600 text-white border-transparent"
                                    : "border-gray-300 text-gray-700 hover:bg-green-100 hover:border-green-100"
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                    {errors.companyStage && (
                        <p className="text-red-500 text-sm flex items-center mt-1">
                            <AlertCircle className="h-4 w-4 ml-1" /> {errors.companyStage}
                        </p>
                    )}

                    <label className="block text-sm text-gray-700 mt-4 mb-2">هل لديكم اهتمام بشراكات استراتيجية عبر منصتنا؟</label>
                    <div className="flex gap-3">
                        {[
                            { key: "yes", label: "نعم" },
                            { key: "no", label: "لا" },
                            { key: "need_more", label: "نحتاج تفاصيل أكثر" },
                        ].map((opt) => (
                            <button
                                key={opt.key}
                                type="button"
                                onClick={() => handleChange("strategicPartnership", opt.key)}
                                className={`px-4 py-2 rounded-lg border ${formData.strategicPartnership === opt.key
                                    ? "bg-green-600 text-white border-transparent"
                                    : "border-gray-300 text-gray-700 hover:bg-green-100 hover:border-green-100"
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>

                    <label className="block text-sm text-gray-700 mt-4 mb-2">ملاحظات إضافية أو طلبات خاصة</label>
                    <textarea
                        value={formData.notes}
                        onChange={(e) => handleChange("notes", e.target.value)}
                        className="w-full p-3 border rounded-lg h-28 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"
                        placeholder="ملاحظات، متطلبات إضافية، أو أي شيء تريد مشاركته"
                    />
                </div>

                <div className="flex justify-end">
                    <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
                        سجّل شركتك
                    </button>
                </div>
            </form>


            <p className="mt-4 text-sm text-gray-600">
                محتاج مساعدة؟ <Link to="/support" className=" text-green-400 font-medium">اتواصل مع مركز الدعم</Link>
            </p>

        </div>
    );
}
