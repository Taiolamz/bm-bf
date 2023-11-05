import "./sidebar.css";
import {
  RevvexDashboardLogo,
  DashboardIcon,
  SubscriptionIcon,
  BillingIcon,
  OffersIcon,
  ReportIcon,
  UsersLogIcon,
  RolesIcon,
  SupportIcon,
  SettingsIcon,
  ExitIcon,
} from "../../../../../assets/icons/icons";
import ProfilePicture from "../../../../../assets/Profile-picture.svg";
import React, { ReactNode, useContext } from "react";
import { capitalizeFirstWord } from "../../../../helpers/helpers";
import ActionContext from "../../../../context/actionContext";
import { useLocation, useNavigate } from "react-router-dom";

interface SidebarList {
  icon: ReactNode;
  label: string;
  path: string;
}

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const actionCtx = useContext(ActionContext);

  const path = [
    "/dashboard-home",
    "/dashboard-subscription",
    "/dashboard-billing",
    "/dashboard-offers",
    "/dashboard-report",
    "/dashboard-users-log",
    "/dashboard-roles",
    "/dashboard-support",
    "/dashboard-settings",
  ];

  const sidebarItems: SidebarList[] = [
    {
      icon: (
        <DashboardIcon
          className="admin-main-icon"
          activeColor={
            location.pathname.includes(path[0]) && "var(--blue-color)"
          }
        />
      ),
      label: "Dashboard",
      path: path[0],
    },
    {
      icon: (
        <SubscriptionIcon
          className="subscription-icon"
          activeColor={
            location.pathname.includes(path[1]) && "var(--blue-color)"
          }
        />
      ),
      label: "Subscription",
      path: path[1],
    },
    {
      icon: (
        <BillingIcon
          className="billing-icon"
          activeColor={
            location.pathname.includes(path[2]) && "var(--blue-color)"
          }
        />
      ),
      label: "Billing",
      path: path[2],
    },
    {
      icon: (
        <OffersIcon
          className="offers-icon"
          activeColor={
            location.pathname.includes(path[3]) && "var(--blue-color)"
          }
        />
      ),
      label: "Offers",
      path: path[3],
    },
    {
      icon: (
        <ReportIcon
          className="report-icon"
          activeColor={
            location.pathname.includes(path[4]) && "var(--blue-color)"
          }
        />
      ),
      label: "Report",
      path: path[4],
    },
    {
      icon: (
        <UsersLogIcon
          className="userlog-icon"
          activeColor={
            location.pathname.includes(path[5]) && "var(--blue-color)"
          }
        />
      ),
      label: "Users Log",
      path: path[5],
    },
  ];

  const moreItems: SidebarList[] = [
    {
      icon: (
        <RolesIcon
          className="roles-icon"
          activeColor={
            location.pathname.includes(path[6]) && "var(--blue-color)"
          }
        />
      ),
      label: "Roles",
      path: path[6],
    },
    {
      icon: (
        <SupportIcon
          className="support-icon"
          activeColor={
            location.pathname.includes(path[7]) && "var(--blue-color)"
          }
        />
      ),
      label: "Support",
      path: path[7],
    },
    {
      icon: (
        <SettingsIcon
          className="settings-icon"
          activeColor={
            location.pathname.includes(path[8]) && "var(--blue-color)"
          }
        />
      ),
      label: "Settings",
      path: path[8],
    },
  ];

  return (
    <div className="sidebar-wrap">
      {/* sidebar wrap start */}

      {/* revvex logo start */}
      <figure className="logo">{RevvexDashboardLogo}</figure>
      {/* revvex logo end */}

      {/* sidebar items start */}
      <div className="sidebar-items-wrap">
        {sidebarItems.map((chi, idx) => {
          const { icon, label, path } = chi;
          return (
            <React.Fragment key={idx}>
              <div
                className={`sidebar-items-box ${
                  location.pathname.includes(path) && "sidebar-items-box-active"
                }`}
                onClick={() => navigate(path)}
              >
                <figure className="dashboard-icon">{icon}</figure>
                <p>{label}</p>
              </div>
            </React.Fragment>
          );
        })}

        {/* more-items-wrap start */}
        <div
        //   onMouseEnter={() =>
        //     actionCtx.moreSideItemsFunc(!actionCtx.moreSideItems)
        //   }
        //   onMouseLeave={() => actionCtx.moreSideItemsFunc(false)}
        >
          <div className="more-items-text">
            <p>More</p>
          </div>

          <div
            className="more-item-box"
            // className={`more-item-box ${
            //   actionCtx.moreSideItems && "more-item-box-show"
            // }`}
          >
            {moreItems.map((chi, idx) => {
              const { icon, label, path } = chi;
              return (
                <React.Fragment key={idx}>
                  <div
                    className={`sidebar-items-box ${
                      location.pathname.includes(path) &&
                      "sidebar-items-box-active"
                    }`}
                    onClick={() => navigate(path)}
                  >
                    <figure className="dashboard-icon">{icon}</figure>
                    <p>{label}</p>
                  </div>
                </React.Fragment>
              );
            })}

            {/* bottom-line-wrap start */}
            <div className="horizontal-line-wrap">
              <div></div>
            </div>
            {/* bottom-line-wrap end */}
          </div>
          {/* more-items-wrap end */}
        </div>

        {/* user profile wrap start----> */}
        <div className="user-profile-wrap">
          <img
            className="profile-picture"
            src={ProfilePicture}
            alt="profile_picture"
          />

          {/* user profile box start */}
          <div className="user-profile-box">
            {/* user-details box start */}
            <div className="user-details-box">
              <p>Hassan Lamidi</p>
              <p>{capitalizeFirstWord("hlamidi@zojatech.com")}</p>
            </div>
            {/* user-details box end */}

            <div className="exit-wrap">
              <figure>
                <ExitIcon className="exit-icon" />
              </figure>
            </div>
          </div>
          {/* user profile box end */}
        </div>
        {/* user profile wrap end------> */}
      </div>
      {/* sidebar items end */}

      {/* sidebar wrap end */}
    </div>
  );
};
export default Sidebar;
