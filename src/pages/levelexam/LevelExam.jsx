import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Login } from "..";
import LevelExamQuestions from "./LevelExamQuestions";
import { useAuth } from "../../Context/AuthContext";

function LevelExam() {
  const [formError, setFormError] = useState(false);
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");

  const { userData } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !birthDate || !email || !phone || !country) {
      setFormError(true);
      return;
    }

    setFormError(false);

    const submissionData = {
      fullName: name,
      email,
      phoneNumber: phone,
      birthDate,
      country,
    };
  };

  return (
    <>
      {!userData ? (
        <>
          {/* SECTION بدون تسجيل دخول */}
          <div className="flex flex-col items-center gap-5 mt-5">
            <div className="p-2 rounded-2xl border w-[90%] md:w-[60%] shadow-md bg-green-100">
              <FontAwesomeIcon
                icon={faCircle}
                className="text-white border bg-[#25863f] rounded-full"
              />
              <h4 className="text-[12px] md:text-xl lg:text-xl px-1 md:px-3 mb-4 flex flex-col text-green-400 font-semibold leading-5">
                يساعدك اختبار تحديد المستوى على اختيار مستوى التدريب المناسب
                لخبرتك والحصول على تدريب تفاعلي فعال بناء على الاجابات المختارة…
                <br />
                <span className="text-green-600 self-center mt-2 font-bold">
                  *لا تحتاج الي عمل الاختبار اذا كنت ستبدأ من المستوي المبتدئ
                </span>
              </h4>
            </div>

            <LevelExamQuestions />
          </div>

          {/* <Login /> */}
        </>
      ) : (
        <>
          {/* SECTION بعد تسجيل الدخول */}
          <div className="flex flex-col items-center gap-5 mt-5">
            <div className="p-2 rounded-2xl border w-[90%] md:w-[60%] shadow-md bg-green-100">
              <FontAwesomeIcon
                icon={faCircle}
                className="text-white border bg-[#25863f] rounded-full"
              />
              <h4 className="text-[12px] md:text-xl lg:text-xl px-1 md:px-3 mb-4 flex flex-col text-green-600 font-semibold leading-5">
                يساعدك اختبار تحديد المستوى على اختيار المستوى المناسب…
                <br />
                <span className="text-green-700 self-center mt-2 font-bold">
                  *لا تحتاج الي عمل الاختبار اذا كنت ستبدأ من المستوي المبتدئ
                </span>
              </h4>
            </div>

            <LevelExamQuestions />
          </div>
        </>
      )}
    </>
  );
}

export default LevelExam;
