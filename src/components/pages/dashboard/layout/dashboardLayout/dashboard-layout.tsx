import { ReactNode, useContext, useState } from "react";
import Sidebar from "../sidebar/sidebar";
import "./dashboard-layout.css";
import Navbar from "../navbar/navbar";
import { useLocation } from "react-router-dom";
import DashboardRightSubscriptionBar from "../../modules/admin/rightBar/right-subscription-bar";
import ActionContext from "../../../../context/actionContext";

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
  //   const location = useLocation();
  const actionCtx = useContext(ActionContext);

  return (
    <div
      className={`dashboard-layout-wrap`}
      //   className={`dashboard-layout-wrap ${
      //     location.pathname === "/dashboard-home" &&
      //     "dashboard-home-main-layout-wrap"
      //   }`}
    >
      {/* {actionCtx.moreSubscribers && (
        <div className="right-admin-main-side-bar">
          <div className="blur-bg"></div>
          <div className="main-bg">
            <DashboardRightSubscriptionBar />
          </div>
        </div>
      )} */}

      {/*  sidemenu wrap starts*/}
      <div className="sidebar-wrap">
        <Sidebar />
      </div>
      {/*  sidemenu wrap end*/}

      {/* navbar menu wrap start */}
      <div
        className={`navbar `}
        // className={`navbar ${
        //   location.pathname === "/dashboard-home" &&
        //   "navbar-dashboard-home-main-layout-wrap"
        // }`}
      >
        <Navbar pageTitle={pageTitle} goBack={goBack} />
      </div>
      {/* navbar menu wrap end */}
      <div
        className="body-wrap"
        style={{ zIndex: actionCtx.isModalOut ? "4" : "1" }}
      >
        {children}
      </div>
    </div>
  );
};
export default DashboardLayout;
