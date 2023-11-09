import UsersLog from "../../../../components/pages/dashboard/modules/userLog/main/user-log";
import ViewUserLog from "../../../../components/pages/dashboard/modules/userLog/view/view";

export const Userlog_route_group = [
  {
    element: UsersLog,
    path: "/dashboard-users-log",
  },
  {
    element: ViewUserLog,
    path: "/dashboard-users-log-view",
  },
];
