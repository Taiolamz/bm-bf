import { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Auth_rouite_group } from "./routes/auth/auth";
import { Dashboard_route_group } from "./routes/dashboard/routeGroup/route-group";
import { Provider } from "react-redux"; 
import PrivateRouteDashboard from "./routes/privateRoutes/private-route";
import store from "./redux/store";

function App() {
  type RouteProp = {
    path: string;
    element: () => any;
    // location:
  };
  return (
    <Fragment>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* auth group start */}
          {Auth_rouite_group?.map((route: RouteProp, idx: number) => (
            <Route key={idx} path={route.path} element={<route.element />} />
          ))}
          {/* auth group end */}
          {/* auth group end */}
          {/* verification group start */}
          {/* {verification_routes_group?.map((route: RouteProp, idx: number) => (
          <Route key={idx} path={route.path} element={<route.element />} />
        ))} */}
          {/* verification group end */}
          {/* dashboard group start */}
          {Dashboard_route_group?.map((route: RouteProp, idx: number) => (
            <Route
              key={idx}
              path={route.path}
              element={
                <PrivateRouteDashboard>
                  {<route.element />}
                </PrivateRouteDashboard>
              }
            />
          ))}
          {/* dashboard group end */}
        </Routes>
      </Provider>
    </Fragment>
  );
}

export default App;
