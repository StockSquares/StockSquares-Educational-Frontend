import termsimg from "../../assets/imgs/Accept terms.gif"
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TermsAndConditions() {

  const termsData = [
    {
      title: "تعريفات",
      data: [
        {
          name: "الموقع",
          detail: "يشير إلى ستوك سكويرز وجميع محتوياته وخدماته.",
        },
        {
          name: "المستخدم",
          detail:
            "يشير إلى أي فرد أو كيان يقوم بالوصول إلى الموقع أو استخدامه.",
        },
        {
          name: "الخدمات",
          detail: "تشمل جميع الخدمات التي نقدمها عبر الموقع.",
        },
        { name: "المحتوى", detail: "يشمل جميع المواد المتاحة على الموقع." },
        {
          name: "الذكاء الاصطناعي",
          detail:
            "يشير إلى التقنيات التي تستخدمها لمعالجة البيانات وتقديم الاستشارات والتحليلات.",
        },
        {
          name: "المعلومات الشخصية",
          detail: "تشمل أي معلومات يمكن استخدامها لتحديد هويتك.",
        },
      ],
    },
    {
      title: "قبول الشروط",
      data: [
        {
          name: "بلوغ السن القانونية",
          detail:
            "باستخدامك للموقع، فإنك تؤكد أنك قد بلغت السن القانونية وأنك مسؤول عن جميع الأنشطة التي تتم تحت حسابك.",
        },
        {
          name: "سرية البيانات",
          detail:
            "أنت مسؤول عن الحفاظ على سرية بيانات اعتماد حسابك وتوافق على استخدام الموقع لأغراض قانونية فقط.",
        },
      ],
    },
    {
      title: "الخدمات المقدمة",
      data: [
        {
          name: "معلومات مالية",
          detail:
            "نقدم لك معلومات استثمارية ومالية بناءً على تحليلات الذكاء الاصطناعي.",
        },
        {
          name: "استشارات تدريب",
          detail: "قد نقدم لك خدمات استشارات مالية وتعليمية.",
        },
        {
          name: "أدوات تحليل",
          detail: "نقدم لك أدوات تحليلية لمساعدتك في اتخاذ قرارات استثمارية.",
        },
      ],
    },
    {
      title: "إخلاء المسؤولية",
      data: [
        {
          name: "عدم الدقة",
          detail:
            "المعلومات المقدمة على الموقع قد تكون غير دقيقة أو غير كاملة.",
        },
        {
          name: "عدم الضمان",
          detail: "لا نضمن دقة أو موثوقية المعلومات أو النتائج.",
        },
        {
          name: "عدم المسؤولية عن الخسائر",
          detail: "لا نتحمل أي مسؤولية عن أي خسارة مباشرة أو غير مباشرة.",
        },
      ],
    },
    {
      title: "الملكية الفكرية",
      data: [
        {
          name: "حقوق الملكية",
          detail: "جميع الحقوق المتعلقة بالموقع ومحتواه تعود إلينا فقط.",
        },
        {
          name: "الحظر",
          detail:
            "يحظر عليك نسخ أو تعديل أو توزيع أي جزء من الموقع أو محتواه دون الحصول على إذن كتابي منا.",
        },
      ],
    },
    {
      title: "التعديل على الشروط",
      data: [
        {
          name: "حق التعديل",
          detail: "نحتفظ بالحق في تعديل هذه الشروط في أي وقت.",
        },
        { name: "نشر التعديلات", detail: "سيتم نشر أي تغييرات على الموقع." },
      ],
    },
    {
      title: "القابلية للتطبيق",
      data: [
        {
          name: "القوانين",
          detail: "تحكم قوانين جمهورية مصر العربية هذه الشروط.",
        },
      ],
    },
    {
      title: "الاستخدام المقبول",
      data: [
        {
          name: "الاستخدام القانوني",
          detail: "يحظر عليك استخدام الموقع لأي غرض غير قانوني أو ضار.",
        },
        {
          name: "الاستخدام غير القانوني",
          detail:
            "مثل نشر محتوى غير لائق أو مسيء، انتهاك حقوق الملكية الفكرية، إجراء معاملات غير قانونية.",
        },
      ],
    },
    {
      title: "الاتصال",
      data: [
        {
          name: "طرق الاتصال",
          detail:
            "يمكنك التواصل معنا عبر [البريد الإلكتروني أو أي وسيلة اتصال أخرى].",
        },
      ],
    },
  ];

  return (
    <div className="p-3 mt-5">
      <div className="flex flex-col-reverse justify-between  md:flex-row">
        <div className="w-[100%] md:w-[60%]">
          <div className="gap-3">
            <h1 className="text-3xl font-bold mb-3"> اتفاقيه الشروط و الأحكام :</h1>
            <p className="font-bold">
              أهلاً بك في ستوك سكويرز! من خلال استخدامك لهذا الموقع، فإنك توافق
              على الالتزام بشروط الاستخدام والخصوصية التالية.
            </p>
          </div>

          <div className="mb-10 mt-5">
            {termsData.map((termsdata, idx) => (
              <div key={idx} className="mb-5">
                <div className="flex gap-4 items-center">
                  <FontAwesomeIcon icon={faCircle} className="" size="xs" />
                  <h1 className="text-2xl font-bold mb-4 mt-3">
                    {termsdata.title}
                  </h1>
                </div>

                {termsdata.data.map((d, idx) => (
                  <div className="flex flex-col text-[14px] gap-2 md:flex-row md:text-lg">
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

        <div className="h-[50%] w-[100%] md:h-[40%] md:mt-20 md:w-[40%]">
          <img src={termsimg} />
        </div>
      </div>
    </div>
  );
}
export default TermsAndConditions;
