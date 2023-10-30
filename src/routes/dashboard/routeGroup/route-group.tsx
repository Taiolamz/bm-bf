import { Admin_route_group } from "../modules/admin/admin";
import { Billing_route_group } from "../modules/billing/billing";
import { Subscription_route_group } from "../modules/subscription/subscription";

export const Dashboard_route_group = [
  ...Subscription_route_group,
  ...Admin_route_group,
  ...Billing_route_group,
];
