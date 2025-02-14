import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBook,
  faBullhorn,
  faGraduationCap,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { faNewspaper, faUser } from "@fortawesome/free-regular-svg-icons";
import {  NavLink } from "react-router-dom";
import { faHandshake } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import MainComponent from "./main/main";

function Admin1() {
  const [isopened, setisopened] = useState(true);
const [activeLink, setActiveLink] = useState("home");

const links = [
  { id: "home", icon: faHome, label: "الرئيسية" , component:<MainComponent/>  },
  { id: "clients", icon: faUser, label: "الزبائن", component:"mm" },
  { id: "partners", icon: faHandshake, label: "الشركاء", component:"dd" },
  { id: "employees", icon: faUser, label: "الموظفين" , component:"ff" },
  { id: "ads", icon: faBullhorn, label: "الإعلانات", component:"" },
  { id: "articles", icon: faNewspaper, label: "المقالات", component:"" },
  { id: "courses", icon: faGraduationCap, label: "الكورسات" , component:""},
  { id: "books", icon: faBook, label: "الكتب", component:"" },
];

return(
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
            className={`px-4 py-2 rounded-md text-lg flex items-center gap-2 transition-all ${
              activeLink === link.id
                ? "bg-primary-dark text-white"
                : "bg-transparent text-black"
            }`}
            onClick={() => setActiveLink(link.id)}
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
  {activeLink === "home" ? (
    <MainComponent/>
    
  ):(
    <div className="flex justify-center items-center">
      <h1>soon!</h1>
    </div>
  )}
  
  </div>
);
}
export default Admin1;