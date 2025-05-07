import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  Calendar,
  Lock,
  User,
  Tag,
  AlertCircle,
  Check,
  X,
} from "lucide-react";

export default function Payment() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    paymentMethod: "credit",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    promoCode: "",
  });
  const steps = ["خصائص التدريب", "الموعد", "الدفع"];
  const currentStep = 3;

  const [errors, setErrors] = useState({});
  const [promoStatus, setPromoStatus] = useState(null); // 'success', 'error', or null
  const [orderSummary, setOrderSummary] = useState({
    serviceAmount: 500,
    tax: 75,
    discount: 0,
    total: 575,
  });

  const [selectedMethod, setselectedMethod] = useState("credit");

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    return v.match(/.{1,4}/g)?.join(" ") || "";
  };

  // Format expiry date
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    let formattedValue = value;
    if (field === "cardNumber") {
      formattedValue = formatCardNumber(value);
    } else if (field === "expiryDate") {
      formattedValue = formatExpiryDate(value);
    } else if (field === "paymentMethod") {
      setselectedMethod(value);
    }

    setFormData((prev) => ({
      ...prev,
      [field]: formattedValue,
    }));

    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (
      !formData.cardNumber ||
      formData.cardNumber.replace(/\s/g, "").length !== 16
    ) {
      newErrors.cardNumber = "رقم البطاقة غير صحيح";
    }

    if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "تاريخ انتهاء غير صحيح";
    }

    if (!formData.cvv || formData.cvv.length !== 3) {
      newErrors.cvv = "رمز CVV غير صحيح";
    }

    if (!formData.nameOnCard) {
      newErrors.nameOnCard = "الرجاء إدخال الاسم على البطاقة";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle promo code
  const handlePromoCode = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (formData.promoCode === "DISCOUNT50") {
        setPromoStatus("success");
        setOrderSummary((prev) => ({
          ...prev,
          discount: 50,
          total: prev.serviceAmount + prev.tax - 50,
        }));
      } else {
        setPromoStatus("error");
      }
      setLoading(false);
    }, 1000);
  };

  // Handle payment submission
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Navigate to success page or show success message
      navigate("/success");
    } catch (error) {
      setErrors({ submit: "حدث خطأ أثناء معالجة الدفع" });
    } finally {
      setLoading(false);
    }
  };

  const imgs = ["/src/assets/imgs/card.png ", "/src/assets/imgs/visa.png "];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 rtl" dir="rtl">
      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto mb-8">
        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index + 1 === currentStep
                      ? "bg-green-600 text-white"
                      : index + 1 < currentStep
                      ? "bg-green-200"
                      : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="mr-2 text-sm text-gray-600">{step}</span>
                {index < steps.length - 1 && (
                  <div className="w-24 h-1 mx-4 bg-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-xl">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
            <CreditCard className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            إتمام عملية الدفع
          </h2>
          <p className="text-gray-600 mt-2">
            أدخل تفاصيل بطاقتك لإتمام عملية الدفع
          </p>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-8">
          <label className="block text-gray-700 mb-3 font-medium flex items-center">
            <CreditCard className="h-5 w-5 ml-2 text-green-600" />
            طريقة الدفع
          </label>
          <div className="flex gap-4">
            {[
              { id: "credit", label: "بطاقة ائتمان" },
              { id: "wallet", label: " محفظه الكترونيه" },
              { id: "bitcoin", label: "  العملات المشفره" },
              { id: "debit", label: "   التقسيط" },
            ].map((method) => (
              <button
                key={method.id}
                onClick={() => handleInputChange("paymentMethod", method.id)}
                className={`flex-1 px-6 py-3 rounded-xl border transition-all duration-200 ${
                  formData.paymentMethod === method.id
                    ? "bg-green-600 text-white border-transparent shadow-lg"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {method.label}
              </button>
            ))}
          </div>
        </div>

        {/* Card Details */}
        {selectedMethod === "credit" && (
          <div className="space-y-6">
            <div className="  flex gap-3 justify-center ">
              {imgs.map((img) => (
                <div className="w-[10%] h-[5vh] overflow-hidden rounded-lg border border-2 ">
                  <img
                    className="w-full h-full object-cover hover:scale-105 transition-all"
                    src={img}
                  />
                </div>
              ))}
            </div>
            {/* Card Number */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <label className="block text-gray-700 mb-3 font-medium flex items-center">
                <CreditCard className="h-5 w-5 ml-2 text-green-600" />
                رقم البطاقة
              </label>
              <input
                type="text"
                value={formData.cardNumber}
                onChange={(e) =>
                  handleInputChange("cardNumber", e.target.value)
                }
                maxLength={19}
                className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 ${
                  errors.cardNumber ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="**** **** **** ****"
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <AlertCircle className="h-4 w-4 ml-1" />
                  {errors.cardNumber}
                </p>
              )}
            </div>

            {/* Expiry Date and CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-6 rounded-xl">
                <label className="block text-gray-700 mb-3 font-medium flex items-center">
                  <Calendar className="h-5 w-5 ml-2 text-green-600" />
                  تاريخ الانتهاء
                </label>
                <input
                  type="text"
                  value={formData.expiryDate}
                  onChange={(e) =>
                    handleInputChange("expiryDate", e.target.value)
                  }
                  placeholder="MM/YY"
                  maxLength={5}
                  className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 ${
                    errors.expiryDate ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.expiryDate && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <AlertCircle className="h-4 w-4 ml-1" />
                    {errors.expiryDate}
                  </p>
                )}
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <label className="block text-gray-700 mb-3 font-medium flex items-center">
                  <Lock className="h-5 w-5 ml-2 text-green-600" />
                  رمز الأمان CVV
                </label>
                <input
                  type="password"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange("cvv", e.target.value)}
                  maxLength={3}
                  className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 ${
                    errors.cvv ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="***"
                />
                {errors.cvv && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <AlertCircle className="h-4 w-4 ml-1" />
                    {errors.cvv}
                  </p>
                )}
              </div>
            </div>

            {/* Name on Card */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <label className="block text-gray-700 mb-3 font-medium flex items-center">
                <User className="h-5 w-5 ml-2 text-green-600" />
                الاسم على البطاقة
              </label>
              <input
                type="text"
                value={formData.nameOnCard}
                onChange={(e) =>
                  handleInputChange("nameOnCard", e.target.value)
                }
                className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 ${
                  errors.nameOnCard ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="الاسم كما يظهر على البطاقة"
              />
              {errors.nameOnCard && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <AlertCircle className="h-4 w-4 ml-1" />
                  {errors.nameOnCard}
                </p>
              )}
            </div>

            {/* Promo Code */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <label className="block text-gray-700 mb-3 font-medium flex items-center">
                <Tag className="h-5 w-5 ml-2 text-green-600" />
                كود الخصم
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.promoCode}
                  onChange={(e) =>
                    handleInputChange("promoCode", e.target.value)
                  }
                  className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="أدخل كود الخصم"
                />
                <button
                  onClick={handlePromoCode}
                  disabled={loading || !formData.promoCode}
                  className={`px-6 py-2 rounded-xl transition-colors ${
                    loading
                      ? "bg-gray-200 text-gray-500"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {loading ? "جارٍ التحقق..." : "تطبيق"}
                </button>
              </div>
              {promoStatus === "success" && (
                <p className="text-green-600 text-sm mt-2 flex items-center">
                  <Check className="h-4 w-4 ml-1" />
                  تم تطبيق الخصم بنجاح
                </p>
              )}
              {promoStatus === "error" && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <X className="h-4 w-4 ml-1" />
                  كود الخصم غير صالح
                </p>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Tag className="h-5 w-5 ml-2 text-green-600" />
                ملخص الطلب
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>قيمة الخدمة</span>
                  <span>{orderSummary.serviceAmount} جنيه</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>الضريبة</span>
                  <span>{orderSummary.tax} جنيه</span>
                </div>
                {orderSummary.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>الخصم</span>
                    <span>- {orderSummary.discount} جنيه</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg pt-3 border-t">
                  <span>الإجمالي</span>
                  <span>{orderSummary.total} جنيه</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedMethod === "wallet" && (
          <div className="w-full text-black text-center">
            <img
              src="/src/assets/imgs/vodafone-cash.png"
              className="w-[70px] h-[40px] m-auto mb-4"
            />
            <button className=" px-7 py-3 rounded-lg bg-accent-950">
              {" "}
              الدفع بواسطه المحفظه
            </button>
          </div>
        )}

        {selectedMethod === "bitcoin" && (
          <div className="w-full flex flex-col items-center gap-3 ">
            <h2 className="mb-4 font-semibold"> Deposit USDT to Binance </h2>
            <img
              src="/src/assets/imgs/qrCode.jfif"
              className="w-[180px] h-[170px] object-cover rounded-lg mb-4"
            />
            <div className="flex flex-col items-center text-start">
              <div className="w-full max-w-md">
                <div className="flex justify-between gap-5">
                  <p className="text-start">Tron (TRC20)</p>
                  <p className="text-end text-gray-400">Network</p>
                </div>
                <div className="flex justify-between gap-5 mt-2">
                  <p className="text-start">
                    TNbY6Rmz9CdEXJHhS5YoUSR8RwEKYpWLsq
                  </p>
                  <p className="text-end text-gray-400">Wallet Address</p>
                </div>
                <p className="text-gray-500 text-sm text-end mt-5">
                  .Don't send NFTs to this address
                  <br/>
                 
                  Smart contract deposits are not supported with the exception
                  of ETH via ERC20,
                  
                  BSC via BEP20, Arbitrum and Optimism networks
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <button
            onClick={() => navigate(-1)}
            className="text-red-500 hover:text-red-600 transition-colors"
          >
            إلغاء
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-8 py-3 rounded-xl transition-colors ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } text-white shadow-lg flex items-center`}
          >
            {loading ? "جارٍ المعالجة..." : "تأكيد الدفع"}
          </button>
        </div>

        {errors.submit && (
          <p className="text-red-500 text-sm mt-4 text-center">
            {errors.submit}
          </p>
        )}
      </div>
    </div>
  );
}
