import {
  faBook,
  faBullhorn,
  faGraduationCap,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { Routes, Route} from "react-router-dom";
import { faNewspaper, faUser } from "@fortawesome/free-regular-svg-icons";
import { faHandshake } from "@fortawesome/free-regular-svg-icons";
import MainComponent from "./pages/Admin/main/Main";
import AdsComponent from "./adminPages/ads/Ads";
import CoursesComponent from "./adminPages/coursesPages/Courses";
import EmployeesComponent from "./adminPages/employees/Employees";
import ClientsComponent from "./adminPages/Clients/Clients";
import PartnersComponent from "./adminPages/partners/Partners";
import BooksComponent from "./adminPages/books/Books";
import ArticlesComponent from "./adminPages/articlesPages/Articles";
import Activities from "./adminPages/activities/Activities";
import SideBar from "../../components/general/SideBar/SideBar";

function Admin1() {
  const links = [
    {
      icon: faHome,
      name: "الرئيسية",
      path: "/Admin1"
    },
    {
      icon: faUser,
      name: "الزبائن",
      path: "/Admin1/Clients"

    },
    {
      icon: faHandshake,
      name: "الشركاء",
      path: "/Admin1/Partners"

    },
    {
      icon: faUser,
      name: "الموظفين",
      path: "/Admin1/Employees"

    },
    {
      icon: faBullhorn,
      name: "الإعلانات",
      path: "/Admin1/Ads"
    },
    {
      id: "articles",
      icon: faNewspaper,
      name: "المقالات",
      path: "/Admin1/Articles"

    },
    {
      icon: faGraduationCap,
      name: "الكورسات",
      path: "/Admin1/Courses"

    },
    {
      icon: faBook,
      name: "الكتب",
      path: "/Admin1/Books"

    },
    {
      icon: faBook,
      name: "الأنشطه",
      path: "/Admin1/Activities"

    },
  ];

  return (
    <SideBar menuItems={links}>
      <Routes>
        <Route index element={<MainComponent />} />
        <Route path="Clients" element={<ClientsComponent />} />
        <Route path="Partners" element={<PartnersComponent />} />
        <Route path="Employees" element={<EmployeesComponent />} />
        <Route path="Ads" element={<AdsComponent />} />
        <Route path="Articles" element={<ArticlesComponent />} />
        <Route path="Courses" element={<CoursesComponent />} />
        <Route path="Books" element={<BooksComponent />} />
        <Route path="Activities" element={<Activities />} />
      </Routes>
    </SideBar>
  );
}
export default Admin1;
