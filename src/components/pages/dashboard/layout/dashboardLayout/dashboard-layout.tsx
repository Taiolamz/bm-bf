import { ReactNode } from "react";
import Sidebar from "../sidebar/sidebar";
import "./dashboard-layout.css";
import Navbar from "../navbar/navbar";
import { useLocation } from "react-router-dom";
import DashboardRightSubscriptionBar from "../../modules/admin/rightBar/right-subscription-bar";

interface DashboardLayoutProps {
  children?: ReactNode;
  pageTitle?: string;
  goBack?: boolean;
}
const DashboardLayout = ({
  children,
  pageTitle,
  goBack,
}: DashboardLayoutProps) => {
  const location = useLocation();

  return (
    <div
      className={`dashboard-layout-wrap ${
        location.pathname === "/dashboard-home" &&
        "dashboard-home-main-layout-wrap"
      }`}
    >
      {location.pathname === "/dashboard-home" && (
        <div className="right-admin-main-side-bar">
          <DashboardRightSubscriptionBar />
        </div>
      )}
      {/*  sidemenu wrap starts*/}
      <div className="sidebar-wrap">
        <Sidebar />
      </div>
      {/*  sidemenu wrap end*/}

      {/* navbar menu wrap start */}
      <div
        className={`navbar ${
          location.pathname === "/dashboard-home" &&
          "navbar-dashboard-home-main-layout-wrap"
        }`}
      >
        <Navbar pageTitle={pageTitle} goBack={goBack} />
      </div>
      {/* navbar menu wrap end */}
      <div className="body-wrap">{children}</div>
    </div>
  );
};
export default DashboardLayout;
