import AllActivity from "../../../../components/pages/dashboard/modules/admin/allActivity/all-activity";
import AllOrganisation from "../../../../components/pages/dashboard/modules/admin/allOrganisation/all-organisation";
import Admin from "../../../../components/pages/dashboard/modules/admin/main/admin";

export const Admin_route_group = [
  {
    path: "/dashboard-home",
    element: <Admin />,
  },

  {
    path: "/dashboard-home-all-organisation",
    element: <AllOrganisation />,
  },

  {
    path: "/dashboard-home-active-subscribers",
    element: <AllActivity />,
  },
];
