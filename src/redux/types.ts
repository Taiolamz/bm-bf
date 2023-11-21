export interface AuthState {
  loading: boolean;
  isAuth: boolean;
  token?: string;
  user: {} | any;
  //   user: any;
  logging_out?: boolean;
  // response: any;
}

export interface BillingState {
  loading: boolean;

  //   billing?: {
  //     billing: {} | any;
  //   };
  billing?: {} | any;
  // logging_out?: boolean;
  // response: any;
}

export interface DashboardhomeState {
  loading: boolean;
  dashboard_home?: {} | any;
}

export interface SubscriptionState {
  loading: boolean;
  loadingStatus: boolean;
  loadingView: boolean;
  subscriptions?: {} | any;
  subscription: {};
  prev_page: string | any;
  next_page: string | any;
}

export interface ReportState {
  loading: boolean;
  loadingStatus: boolean;
  //   loadingView: boolean;
  reports?: {} | any;
  //   subscription: {};
  prev_page: string | any;
  next_page: string | any;
}

export interface UsersLogState {
  loading: boolean;
  loadingStatus: boolean;
  loadingView: boolean;
  usersLog?: {} | any;
  userLog: {};
  prev_page: string | any;
  next_page: string | any;
}

export interface RolesState {
  loading: boolean;
  deleteLoading: boolean;
  roles?: {} | any;
  prev_page: string | any;
  next_page: string | any;
}

export interface OfferState {
  loading: boolean;
  //   deleteLoading: boolean;
  offers?: {} | any;
  privileges?: {} | any;
  //   prev_page: string | any;
  //   next_page: string | any;
}

type RootState = {
  auth: AuthState;
  billing: BillingState;
  subscriptions: SubscriptionState;
  userslog: UsersLogState;
  roles: RolesState;
  dashboard: DashboardhomeState;
  reports: ReportState;
  offers: OfferState;

  // Add other reducer states here if you have more reducers
};

export default RootState;
