import CreateOffers from "../../../../components/pages/dashboard/modules/offers/create/create";
import Offers from "../../../../components/pages/dashboard/modules/offers/main/offers";

export const Offers_route_group = [
  {
    path: "/dashboard-offers",
    element: Offers,
  },
  {
    path: "/dashboard-offers-create",
    element: CreateOffers,
  },
];
