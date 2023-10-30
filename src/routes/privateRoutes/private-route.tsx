import { Route } from "react-router-dom";
import DashboardLayout from "../../components/pages/dashboard/layout/dashboardLayout/dashboard-layout";
import React, { ComponentType, useEffect, useState } from "react";

interface PrivateRouteProps {
  goBack?: boolean;
  pageTitle?: string;
//   component: any;
}

const PrivateRoute = ({
//   component: Component,
  goBack,
  pageTitle,
  ...rest
}: PrivateRouteProps) => {
  const [newPageTitle, setNewPageTitle] = useState("");
  useEffect(() => {
    if (pageTitle) {
      setNewPageTitle(pageTitle);
    }
  }, [pageTitle]);
  return (
    <Route
      {...rest}
      element={
        <DashboardLayout goBack={goBack} pageTitle={pageTitle}>
          {/* <Component {...rest} pageTitle={pageTitle} /> */}
        </DashboardLayout>
      }
    />
    // <DashboardLayout goBack={goBack} pageTitle={pageTitle}>
    //   <Component {...rest} pageTitle={pageTitle} />
    // </DashboardLayout>
  );
};
export default PrivateRoute;
