import React, { useState } from "react";

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [promoCode, setPromoCode] = useState("");
  
  const formatCardNumber = (value) => {
    return value.replace(/\s/g, "").match(/.{1,4}/g)?.join(" ") || "";
  };

  return (
    <div className="bg-gray-100 p-6 md:p-12 rtl" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-md">
        <h2 className="text-center text-2xl font-semibold mb-6">إتمام عملية الدفع</h2>
        <div className="flex justify-between items-center mb-8">
          <span className="text-green-600 border-b-2 border-green-600 pb-1">
            تفاصيل الدفع
          </span>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">طريقة الدفع</label>
          <div className="flex gap-4">
            {[
              { id: "credit", label: "بطاقة ائتمان" },
              { id: "debit", label: "بطاقة مدين" }
            ].map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`px-6 py-2 rounded-full border ${
                  paymentMethod === method.id
                    ? "bg-green-600 text-white"
                    : "border-gray-300 text-gray-600"
                }`}
              >
                {method.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">رقم البطاقة</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              maxLength={19}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="**** **** **** ****"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">تاريخ الانتهاء</label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                maxLength={5}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">رمز الأمان CVV</label>
              <input
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                maxLength={3}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="***"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">الاسم على البطاقة</label>
            <input
              type="text"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="الاسم كما يظهر على البطاقة"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">كود الخصم</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="أدخل كود الخصم"
              />
              <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md">
                تطبيق
              </button>
            </div>
          </div>

          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">ملخص الطلب</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>قيمة الخدمة</span>
                <span>500 جنيه</span>
              </div>
              <div className="flex justify-between">
                <span>الضريبة</span>
                <span>75 جنيه</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>الإجمالي</span>
                <span>575 [جنيه]</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button className="text-red-500 underline">إلغاء</button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-md">تأكيد الدفع</button>
        </div>
      </div>
    </div>
  );
}

