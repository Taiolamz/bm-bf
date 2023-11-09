import CreateRoles from "../../../../components/pages/dashboard/modules/roles/create/create";
import Roles from "../../../../components/pages/dashboard/modules/roles/main/roles";

export const Roles_route_group = [
  {
    element: Roles,
    path: "/dashboard-roles",
  },
  {
    element: CreateRoles,
    path: "/dashboard-roles-create",
  },
];
