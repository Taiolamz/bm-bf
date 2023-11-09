import { Admin_route_group } from "../modules/admin/admin";
import { Billing_route_group } from "../modules/billing/billing";
import { Offers_route_group } from "../modules/offers/offers";
import { Report_route_group } from "../modules/report/report";
import { Roles_route_group } from "../modules/roles/roles";
import { Settings_route_group } from "../modules/settings/settings";
import { Subscription_route_group } from "../modules/subscription/subscription";
import { Support_route_group } from "../modules/support/support";
import { Userlog_route_group } from "../modules/userLog/user-log";

export const Dashboard_route_group = [
  ...Subscription_route_group,
  ...Admin_route_group,
  ...Billing_route_group,
  ...Offers_route_group,
  ...Report_route_group,
  ...Userlog_route_group,
  ...Roles_route_group,
  ...Support_route_group,
  ...Settings_route_group,
];
