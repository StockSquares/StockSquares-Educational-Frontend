// src/components/support/UserSupportCenterProfessional.jsx
import React, { useState } from "react";
import { ChangeScheduleForm, ChangeTrainerForm, DelaySessionForm, MakeupSessionForm, PauseSubscriptionForm, TechSupportForm, UrgentContactForm } from ".";
import { HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
// ----------- الصفحة الرئيسية لمركز الدعم -----------
export default function UserSupportCenterProfessional() {
    const [message, setMessage] = useState("");

    const onSubmitHandler = (payload) => {
        console.log("support payload", payload);
        let msg = "تم استلام طلبك، وسنعاود التواصل معك قريبًا.";
        if (payload.type === "delay") msg = "تم استلام طلبك بنجاح، وسيتم الرد خلال 24 ساعة.";
        if (payload.type === "makeup") msg = "تم استلام طلبك، وسنرد عليك خلال يومين عمل.";
        if (payload.type === "urgent_contact") msg = "تم إرسال طلبك، وسيتم التواصل معك قريبًا.";
        if (payload.type === "pause") msg = "تم استلام طلبك، وسيتم تأكيد التعليق خلال 24 ساعة.";

        setMessage(msg);
        setTimeout(() => setMessage(""), 6000);
    };

    return (
        <div className="max-w-5xl mx-auto bg-white p-8 shadow-md rounded-xl space-y-6">
            <div className="p-2 rounded-2xl flex flex-col gap-3 border w-full justify-center items-center mb-7 shadow-md bg-green-100 py-5">
                <div className="inline-block p-3 bg-gray-50 rounded-full mb-4">
                    <HelpCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">مركز الرعاية والمساعدة</h2>
                <p className="text-[12px] md:text-xl lg:text-xl px-1 md:px-3 mb-4 flex flex-col text-green-400 font-semibold leading-5">استخدم أي نموذج أدناه لإرسال طلبك — سنرد عليك بسرعة وفقًا لسياسة الاستجابة.</p>
            </div>

            {message && <div className="bg-green-50 border border-green-200 p-3 rounded">{message}</div>}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DelaySessionForm onSubmit={onSubmitHandler} />
                <ChangeScheduleForm onSubmit={onSubmitHandler} />
                <MakeupSessionForm onSubmit={onSubmitHandler} />
                <UrgentContactForm onSubmit={onSubmitHandler} />
                <PauseSubscriptionForm onSubmit={onSubmitHandler} />
                <ChangeTrainerForm onSubmit={onSubmitHandler} />
                <TechSupportForm onSubmit={onSubmitHandler} />
            </div>
        </div>
    );
}
