import { Route, Routes } from "react-router-dom";
import SideBar from "../../components/general/SideBar/SideBar";
import Home from "./Home";
import ProbabilityEmployees from "./ProbabilityEmployees";
import Benefits from "./Benefits";
import CurrentEmployees from "./CurrentEmployees";
import MarketingLink from "./MarketingLink";
import Partners from "./Partners";
import FutureTasks from "./FutureTasks";

function Partner() {
  const links = [
    { name: "الرئيسية", path: "/Partner" },
    {
      name: " العملاء المحتملين",

      path: "/Partner/ProbabilityEmployees",
    },
    {
      name: " العملاء الحالين",

      path: "/Partner/CurrentEmployees",
    },
    { name: " الشركاء", path: "/Partner/Partners" },
    {
      name: "الارباح و العمولات",

      path: "/Partner/Benefits",
    },
    {
      name: " مهمات مستقبليه",

      path: "/Partner/FutureTasks",
    },
    {
      name: " الرابط التسويقي ",

      path: "/Partner/MarketingLink",
    },
  ];

  return (
    <SideBar menuItems={links}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="ProbabilityEmployees" element={<ProbabilityEmployees />} />
        <Route path="CurrentEmployees" element={<CurrentEmployees />} />
        <Route path="Partners" element={<Partners />} />
        <Route path="Benefits" element={<Benefits />} />
        <Route path="FutureTasks" element={<FutureTasks />} />
        <Route path="MarketingLink" element={<MarketingLink />} />
      </Routes>
    </SideBar>
  );
}
export default Partner;
