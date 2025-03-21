import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import security from "../../assets/imgs/Safe.gif";

function PrivacyPolicy() {
  const collectData = [
    {
      title: "جمع البيانات",
      data: [
        {
          name: "المعلومات الشخصيه",
          detail:
            ": نجمع اسمك، عنوان بريدك الإلكتروني، رقم هاتفك، وبعض البيانات الارشادية",
        },
        {
          name: " بيانات الاستخدام: ",
          detail:
            "نجمع بيانات حول استخدامك للموقع، مثل صفحات الزيارة، والتفاعل مع المحتوى",
        },
        {
          name: "بيانات المتصفح",
          detail: ": نجمع بيانات حول متصفحك، مثل نوع المتصفح، واللغة، والإصدار",
        },
        { name: "بيانات الموقع", detail: ": نجمع بيانات حول موقعك الجغرافي" },
      ],
    },
    {
      title: " استخدام البيانات ",
      data: [
        {
          name: " تقديم الخدمات",
          detail: ": نستخدم معلوماتك لتقديم الخدمات المالية والاستثمارية",
        },
        {
          name: "تحسين الموقع",
          detail: ": نستخدم بيانات الاستخدام لتحسين تجربة المستخدم",
        },
        {
          name: "التواصل",
          detail: ": نستخدم معلوماتك للتواصل معك حول تحديثات الموقع والخدمات",
        },
        {
          name: "الأسواق المستهدفة",
          detail: ": نستخدم معلوماتك لتقديم إعلانات مستهدفة",
        },
      ],
    },
    {
      title: " حمايه البيانات ",
      data: [
        {
          name: "الأمان",
          detail: ": نستخدم تقنيات أمان متقدمة لحماية معلوماتك",
        },
        {
          name: "الوصول المحدود",
          detail: ": نحدد الوصول إلى معلوماتك لمن لديهم الحق فقط",
        },
        { name: "التخزين الآمن", detail: ": نخزن معلوماتك على خوادم آمنة" },
      ],
    },
    {
      title: " مشاركه البيانات ",
      data: [
        {
          name: "الموردين",
          detail: ": نشارك معلوماتك مع موردي الخدمات المالية",
        },
        {
          name: "الشركاء",
          detail: ": نشارك معلوماتك مع شركائنا لتقديم الخدمات المالية",
        },
        {
          name: "السلطات",
          detail: ": نشارك معلوماتك مع السلطات عند الجرائم المثبته فقط",
        },
      ],
    },

    {
      title: " حقوق المستخدم ",
      data: [
        { name: "الوصول", detail: ": يمكنك الوصول إلى معلوماتك الشخصية" },
        { name: "التعديل", detail: ": يمكنك تعديل معلوماتك الشخصية" },
        { name: "الحذف", detail: ": يمكنك حذف معلوماتك الشخصية" },
        {
          name: "الاستعاضة",
          detail: ": يمكنك استعاضة عن قرارات الذكاء الاصطناعي",
        },
      ],
    },
  ];

  return (
    <div className="p-3  mt-5 ">
      <div className="flex flex-col-reverse md:flex-row  justify-between ">
        <div className=" w-[100%] md:w-[60%] ">
          <div className=" gap-3  ">
            <h1 className="font-bold text-3xl mb-3 ">سياسه الخصوصيه :</h1>
            <p className="font-bold">
              ستوك سكويرز يعتبر خصوصية المستخدمين أمرًا هامًا للغاية. هذه
              السياسة تشمل كيفية جمعنا واستخدامنا وحماية معلوماتك الشخصية.
            </p>
          </div>

          <div className="mb-10 mt-5">
            {collectData.map((collectdata, idx) => (
              <div key={idx} className="mb-5">
                <div className="flex items-center gap-4">
                  <FontAwesomeIcon icon={faCircle} className="" size="xs" />
                  <h1 className="font-bold text-2xl mt-3 mb-4">
                    {collectdata.title}
                  </h1>
                </div>

                {collectdata.data.map((d, idx) => (
                  <div className="flex flex-col md:flex-row gap-2 text-[14px] md:text-lg">
                    <p key={idx} className="text-red-700 font-semibold">
                      {" "}
                      {d.name}
                    </p>
                    <p>{d.detail}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className=" w-[100%] h-[50%]  md:w-[40%] md:h-[40%]  md:mt-20">
          <img src={security} />
        </div>
      </div>
    </div>
  );
}
export default PrivacyPolicy;
