import { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Auth_rouite_group } from "./routes/auth/auth";
import { Dashboard_route_group } from "./routes/dashboard/routeGroup/route-group";
import PrivateRoute from "./routes/privateRoutes/private-route";
import DashboardLayout from "./components/pages/dashboard/layout/dashboardLayout/dashboard-layout";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* auth route group start */}
        {Auth_rouite_group.map((route, idx) => {
          return <Route key={idx} {...route} />;
        })}
        {/* auth route group end */}
        {/* Dashboard route group start */}
        {Dashboard_route_group.map((route, idx) => {
          return <Route key={idx} {...route} />;
        })}
        {/* Dashboard route group end */}
      </Routes>
    </Fragment>
  );
}

export default App;
