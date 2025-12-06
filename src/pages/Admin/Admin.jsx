import {
  faBook,
  faBullhorn,
  faGraduationCap,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { Routes, Route } from "react-router-dom";
import { faNewspaper, faUser } from "@fortawesome/free-regular-svg-icons";
import { faHandshake } from "@fortawesome/free-regular-svg-icons";
import MainComponent from "./adminPages/main/Main.jsx";
import AdsComponent from "./adminPages/ads/Ads.jsx";
import CoursesComponent from "./adminPages/coursesPages/Courses.jsx";
import EmployeesComponent from "./adminPages/employees/Employees.jsx";
import ClientsComponent from "./adminPages/Clients/Clients.jsx";
import PartnersComponent from "./adminPages/partners/Partners.jsx";
import BooksComponent from "./adminPages/books/Books.jsx";
import ArticlesComponent from "./adminPages/articlesPages/Articles.jsx";
import Activities from "./adminPages/activities/Activities.jsx";
import SideBar from "../../components/general/SideBar/SideBar.jsx";
import CategoriesManagement from "./adminPages/categories/CategoriesManagement.jsx";

function Admin() {
  const links = [
    {
      icon: faHome,
      name: "الرئيسية",
      path: "/Admin"
    },
    {
      icon: faUser,
      name: "الزبائن",
      path: "/Admin/Clients"

    },
    {
      icon: faHandshake,
      name: "الشركاء",
      path: "/Admin/Partners"

    },
    {
      icon: faUser,
      name: "الموظفين",
      path: "/Admin/Employees"

    },
    {
      icon: faBullhorn,
      name: "الإعلانات",
      path: "/Admin/Ads"
    },
    {
      icon: faNewspaper,
      name: "المدونة التعليمية",
      path: "/Admin/Categories"
    },
    {
      icon: faGraduationCap,
      name: "الكورسات",
      path: "/Admin/Courses"

    },
    {
      icon: faBook,
      name: "الكتب",
      path: "/Admin/Books"

    },
    {
      icon: faBook,
      name: "الأنشطه",
      path: "/Admin/Activities"

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
        <Route path="Categories" element={<CategoriesManagement />} />
        <Route path="Courses" element={<CoursesComponent />} />
        <Route path="Books" element={<BooksComponent />} />
        <Route path="Activities" element={<Activities />} />
      </Routes>
    </SideBar>
  );
}
export default Admin;
