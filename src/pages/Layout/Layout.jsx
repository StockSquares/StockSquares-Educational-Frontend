import React, { useContext } from "react";

// Internal Imports (components, Assets and Styles)
import Style from "./Layout.module.css";
import { Navbar, Footer, Header, Topbar } from "../../components";

// External libraries
import { Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "../../routes";
import DashNavbar from "../../components/general-layout-context/Header/dashNav/DashNavbar";

function Layout() {
  const location = useLocation();
  const dashboards = [
    ROUTES.ADMIN,
    ROUTES.CLIENT,
    ROUTES.EMPLOYEE,
    ROUTES.TRAINER,
    ROUTES.PARTNER,
  ];

  const noContainerPaths = ["/home"];
  const shouldApplyContainer = !noContainerPaths.includes(location.pathname);

  const hideFooterPaths = ["/investorSurvey"];
  const hideFooter = hideFooterPaths.includes(location.pathname);

  const hideHeader = dashboards.some((path) =>
    location.pathname.startsWith(path.replace("/*", ""))
  );

  return (
    <>
      {!hideHeader ? <Header /> : <DashNavbar />}
      {/* <div className='py-12 my-12'>
            {shouldApplyContainer ? (
                    <div className='container'>
                        <Outlet />
                    </div>
                ) : (
                <Outlet />
            )}
        </div> */}
      <div className="min-h-96">
        <Outlet />
      </div>
      {!hideFooter && <Footer />}
    </>
  );
}

export default Layout;
