import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBook,
  faBullhorn,
  faGraduationCap,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { faNewspaper, faUser } from "@fortawesome/free-regular-svg-icons";
import { NavLink } from "react-router-dom";
import { faHandshake } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import MainComponent from "./main/main";
import AdsComponent from "./adminPages/ads/Ads";
import CoursesComponent from "./adminPages/coursesPages/Courses";
import EmployeesComponent from "./adminPages/employees/Employees";
import ClientsComponent from "./adminPages/Clients/Clients";
import PartnersComponent from "./adminPages/partners/Partners";
import BooksComponent from "./adminPages/books/Books";
import ArticlesComponent from "./adminPages/articlesPages/Articles";

function Admin1() {
  const [isopened, setisopened] = useState(true);
  const [activeLink, setActiveLink] = useState("home");
  const [activeComponent, setActiveComponent] = useState(<MainComponent />);

  function handleClick(component, id) {
    setActiveComponent(component);
    setActiveLink(id);
  }

  const links = [
    {
      id: "home",
      icon: faHome,
      label: "الرئيسية",
      component: <MainComponent />,
    },
    {
      id: "clients",
      icon: faUser,
      label: "الزبائن",
      component: <ClientsComponent />,
    },
    {
      id: "partners",
      icon: faHandshake,
      label: "الشركاء",
      component: <PartnersComponent />,
    },
    {
      id: "employees",
      icon: faUser,
      label: "الموظفين",
      component: <EmployeesComponent />,
    },
    {
      id: "ads",
      icon: faBullhorn,
      label: "الإعلانات",
      component: <AdsComponent />,
    },
    {
      id: "articles",
      icon: faNewspaper,
      label: "المقالات",
      component: <ArticlesComponent />,
    },
    {
      id: "courses",
      icon: faGraduationCap,
      label: "الكورسات",
      component: <CoursesComponent />,
    },
    {
      id: "books",
      icon: faBook,
      label: "الكتب",
      component: <BooksComponent />,
    },
  ];

  return (
    <div className="">
      <div
        className={`sidebar   w-[150px] absolute flex justify-between transition-all ${
          isopened ? "" : "translate-x-[90%]"
        }`}
      >
        <div className="bg-white w-[90%] flex flex-col gap-10 p-2 text-center">
          <nav className="flex flex-col gap-2">
            {links.map((link) => (
              <NavLink
                key={link.id}
                className={`px-4 py-2 rounded-md text-lg flex items-center gap-2 transition-all  ${
                  activeLink === link.id
                    ? "bg-primary-dark text-white"
                    : "bg-transparent text-black"
                } `}
                onClick={() => handleClick(link.component, link.id)}
              >
                <FontAwesomeIcon icon={link.icon} />
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <button
          className="  bg-accent-900"
          onClick={() => setisopened(!isopened)}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="xl" />
        </button>
      </div>

      {activeComponent}
    </div>
  );
}
export default Admin1;
