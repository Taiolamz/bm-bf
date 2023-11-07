import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../utils/axios";
// import { toast } from '@ravenpay/raven-bank-ui';
import {  SubscriptionState } from "./types";

interface subscriptionPayload {
  // Add appropriate types for the payload
  year: string;
  search: string;
  month: string;
  status: string;
  payment_method: string;
  per_page: string;
  url: string;
}

export const getSubscriptions = createAsyncThunk(
  "web/get-subscriptions",
  async (payload: subscriptionPayload, thunkAPI) => {
    try {
      const data = await axios.get(
        `/back-office/subscription-management?type=${payload?.status || "active"}&year=${payload?.year || ""}&search=${
          payload?.search || ""
        }&month=${payload?.month || ""}&status=${
          payload?.status || ""
        }&payment_method=${payload?.payment_method || ""}&per_page=${
          payload?.per_page || 10
        }`
      );
        // console.log(data.data.data, "-------------------------");

      if (data?.data?.status === "fail") {
        if (typeof data.data === "string") {
          toast.error(data.data);
        } else
          toast.error(data?.data?.message, {
            position: "top-right",
          });
        return thunkAPI.rejectWithValue(data);
      }
      if (data?.data?.success) {
        //    console.log(data?.data?.data);

        // SET_SUBSCRIPTION(data?.data?.data)
        thunkAPI.dispatch(SET_SUBSCRIPTION(data?.data?.data));
        return data;
      }
      return data;
    } catch (error: any) {
      console.log(error);

      if (error.message === "Network Error") {
        toast.error(error.message, {
          position: "top-right",
        });
      }
      if (
        error.response?.data?.status === "fail" &&
        error.response?.status !== 401
      ) {
        return thunkAPI.rejectWithValue(error);
      }
      return error;
    }
  }
);

export const getSubscriptionsPagination = createAsyncThunk(
  "web/get-billings",
  async (payload: subscriptionPayload, thunkAPI) => {
    try {
      const data = await axios.get(`${payload?.url}&per_page=${
        payload?.per_page || 10
      }` || "");
      //   console.log(data);

      if (data?.data?.status === "fail") {
        if (typeof data.data === "string") {
          toast.error(data.data);
        } else
          toast.error(data?.data?.message, {
            position: "top-right",
          });
        return thunkAPI.rejectWithValue(data);
      }
      if (data?.data?.success) {
        //    console.log(data?.data?.data);

        // SET_SUBSCRIPTION(data?.data?.data)
        thunkAPI.dispatch(SET_SUBSCRIPTION(data?.data?.data));
        return data;
      }
      return data;
    } catch (error: any) {
      console.log(error);

      if (error.message === "Network Error") {
        toast.error(error.message, {
          position: "top-right",
        });
      }
      if (
        error.response?.data?.status === "fail" &&
        error.response?.status !== 401
      ) {
        return thunkAPI.rejectWithValue(error);
      }
      return error;
    }
  }
);

const initialState: SubscriptionState = {
  loading: false,
  subscriptions: {
    subscriptions: {},
  },
  // initialize other state properties
};

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,

  reducers: {
    SET_SUBSCRIPTION: (state, action) => {
      state.subscriptions = action.payload;
    },
  },

  extraReducers: (builder) => {
    // pending state changes

    builder.addCase(getSubscriptions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSubscriptions.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(getSubscriptions.rejected, (state) => {
      state.loading = false;
      return initialState;
    });
  },
});

// Action creators are generated for each case reducer function
export const { SET_SUBSCRIPTION } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
