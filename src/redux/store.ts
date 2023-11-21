import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./userAuth";
import thunk from "redux-thunk";
// import themeReducer from './theme';
import thunkMiddleware from "redux-thunk";
import { billingSlice } from "./Billing";
import { subscriptionSlice } from "./Subscription";
import { usersLogSlice } from "./usersLog";
import { RolesSlice } from "./roles";
import { dashboardHomeSlice } from "./dashboardHome";
import { reportSlice } from "./Report";
import { offerSlice } from "./Offers";

// create a makeStore function
const makeStore = () =>
  configureStore({
    reducer: {
      auth: authSlice.reducer,
      billing: billingSlice.reducer,
      subscriptions: subscriptionSlice.reducer,
      userslog: usersLogSlice.reducer,
      roles: RolesSlice.reducer,
      dashboard: dashboardHomeSlice.reducer,
      reports: reportSlice.reducer,
      offers: offerSlice.reducer,
      // theme: themeReducer, // Access the reducer generated by createSlice
    },
    middleware: (getDefaultMiddleware: any) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActionPaths: [
            // 'payload.headers',
            // 'payload.config.transformRequest',
          ],
        },
      }).concat(thunk, thunkMiddleware),
  });

const store = makeStore();

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
