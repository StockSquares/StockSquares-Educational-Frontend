import { TabItem, Tabs } from "flowbite-react";
import { bookBG} from "../../assets";
import { VideoCard } from "../../components/recorded-courses-section/RecordedCoursesSection/RecordedCoursesSection";
import { Button } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faClock,faRankingStar,faCertificate} from "@fortawesome/free-solid-svg-icons";
function CourseContent() {
  const courseTime = "20 دقيقه";
  return (
    <>
      <div className=" grid grid-cols-1 md:grid-cols-2 mb-10 mt-5">
        <VideoCard videoTitle="مقدمه اعلانيه عن الدوره" imageUrl={bookBG} />
        <div className=" p-5">
          <div className="content flex flex-col gap-5 p-4">
            <h1 className="text-2xl">مبادئ التحليل الفني</h1>
            <h3>
              تقديم:
              <span className="font-bold"> ادهم جمال الدين </span>
            </h3>
            <ul className=" ">
              <li> <FontAwesomeIcon  icon={faClock} className="px-2" />ساعتان - ١٤ درس 
              </li>
              <li ><FontAwesomeIcon icon={faRankingStar} className="px-2"/>مبتدئ - ٧ مرفقات </li>
              <li><FontAwesomeIcon icon={faCertificate} className="px-2"/>شهاده اتمام الدورة </li>
            </ul>
            <p className="text-red-700">
              احصل علي كل الدورات ب 499 جنيه/ شهريا
            </p>
            <div className="flex gap-5 ">
              <Button btnText="اشترك الان" bgColor="accent" textColor="black" />
              <Button btnText="شارك الدوره" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="mb-5 font-semibold text-2xl">الفئات : التحليل الفني</h1>
        <Tabs>
          <TabItem title="البورصه المصريه"></TabItem>
          <TabItem title="البورصه العالميه"></TabItem>
          <TabItem title="البورصه الامريكيه"></TabItem>
          <TabItem title="البورصه السعوديه"></TabItem>
        </Tabs>
        <hr />
        <div className="coursedetails text-sm sm:text-[16px] w-full md:w-[60%] lg:w-[50%] p-3 flex flex-col gap-5">
          <ol className="flex flex-col  gap-3 mb-5">
            <li>
              <div className="flex justify-between ">
                <div className="gap-1 lg:flex ">
                  <p>١-١ مقدمه حول التحليل الفني و أهميته</p>
                  <p className="text-red-500 font-semibold">(درس مجاني )</p>
                </div>
                <span className="text-green-500">&nbsp;{courseTime}</span>
              </div>
            </li>
            <li>
              <div className="flex justify-between gap-5">
                <p>١-٢ انواع التحليل الفني و ادواته</p>
                <span className="text-green-500">&nbsp;{courseTime}</span>
              </div>
            </li>
            <li>
              <div className="flex justify-between gap-5">
                <p>١-٣ قواعد و مبادئ التحليل الفني</p>
                <span className="text-green-500">&nbsp;{courseTime}</span>
              </div>
            </li>
          </ol>

          <ol className="flex flex-col  gap-3 mb-5">
            <li>
              <div className="flex justify-between gap-5">
                <p>٢-١ مفهوم الاتجاهات و النماذج الشهيرة</p>
                <span className="text-green-500">&nbsp;{courseTime}</span>
              </div>
            </li>
            <li>
              <div className="flex justify-between gap-5">
                <p>٢-٢ التحليل الفني الكلاسيكي و المودرن</p>
                <span className="text-green-500">&nbsp;{courseTime}</span>
              </div>
            </li>
            <li>
              <div className="flex justify-between gap-5">
                <p>٢-٣ تطبيقات عامه للتحليل الفني</p>
                <span className="text-green-500">&nbsp;{courseTime}</span>
              </div>
            </li>
          </ol>

          <ol className="flex flex-col  gap-3 mb-5">
            <li>
              <div className="flex gap-5 justify-between">
                <p>٣-١ الدعم و المقاومه في التحليل الفني</p>
                <span className="text-green-500">&nbsp;{courseTime}</span>
              </div>
            </li>
            <li>
              <div className="flex gap-5 justify-between">
                <p>٣-٢ استراتيحيات التداول باستخدام التحليل الفني</p>
                <span className="text-green-500">&nbsp;{courseTime}</span>
              </div>
            </li>
            <li>
              <div className="flex gap-2 justify-between">
                <p>٣-٣ نصائح و توجيهات للمبتدئين في التحليل الفني</p>
                <span className="text-green-500">&nbsp;{courseTime}</span>
              </div>
            </li>
          </ol>
        </div>
        <hr className="h-0.5 w-[50%] translate-x-[-50%] left-[50%] bg-gray-400 mt-3 mb-3" />
        <div className="expertCV">
          <h1 className="mb-3"> السيره الذاتيه للخبير</h1>
          <p>lorem mmmmmmmm n nnjnjnjknjnjnkjnjnjbhh</p>
        </div>
        <div className="anotherCourses">
          <hr className="h-0.5 w-[50%] translate-x-[-50%] left-[50%] bg-gray-400 mt-3 mb-3" />
          <h1>كورسات مشابهه</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 p-4 gap-3 mb-10">
            <VideoCard videoTitle="lorem" />
            <VideoCard videoTitle="lorem" />
            <VideoCard videoTitle="lorem" />
            <VideoCard videoTitle="lorem" />
          </div>
        </div>
      </div>
    </>
  );
}
export default CourseContent;
