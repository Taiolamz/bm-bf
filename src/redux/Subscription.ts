import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../utils/axios";
import { SubscriptionState } from "./types";

interface subscriptionPayload {
  // Add appropriate types for the payload
  year: string;
  search: string;
  month: string;
  status: string;
  payment_method: string;
  per_page: string;
  page: number;
  type: string;
  exec_type: string;
  id: string;
  report_type: string;
}

export const getSubscriptions = createAsyncThunk(
  "web/get-subscriptions",
  async (payload: subscriptionPayload, thunkAPI) => {
    try {
      const data = await axios.get(
        `/back-office/subscription-management?search=${
          payload?.search || ""
        }&per_page=${payload?.per_page || 10}&type=${payload?.type}&page=${
          payload?.page || 1
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

        // SET_SUBSCRIPTIONS(data?.data?.data)
        thunkAPI.dispatch(SET_SUBSCRIPTIONS(data?.data?.data));
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
export const getSingleSubscription = createAsyncThunk(
  "web/get-single-subscription",
  async (payload: subscriptionPayload, thunkAPI) => {
    try {
      const data = await axios.get(
        `/back-office/subscription-management/${payload}`
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

// to handle subscription based on their type (cancel || send-reminder)
export const executeTypedSubscription = createAsyncThunk(
  "web/execute-typed-subscription",
  async (payload: subscriptionPayload, thunkAPI) => {
    try {
      const data = await axios.post(
        `/back-office/subscription-management/${payload?.exec_type || ""}/${
          payload?.id || ""
        }`
      );

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
        toast.success(data?.data?.message, {
          position: "top-right",
          theme: "colored",
        });
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
export const exportSubscription = createAsyncThunk(
  "web/export-subscription",
  async (payload: subscriptionPayload, thunkAPI) => {
    try {
      const data = await axios.get(
        `/back-office/subscription-management/export?report_type=${
          payload?.report_type || ""
        }&type=${payload?.type || ""}`
      );

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
        toast.success(data?.data?.message, {
          position: "top-right",
          theme: "colored",
        });
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
  loadingStatus: false,
  loadingView: false,
  subscriptions: {},
  subscription: {},
  prev_page: "",
  next_page: "",

  // initialize other state properties
};

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,

  reducers: {
    SET_SUBSCRIPTIONS: (state, action) => {
      state.subscriptions = action.payload;
      state.prev_page = action.payload?.prev_page_url;
      state.next_page = action.payload?.next_page_url;
    },
    SET_SUBSCRIPTION: (state, action) => {
      state.subscription = action.payload;
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
    builder.addCase(executeTypedSubscription.pending, (state) => {
      state.loadingStatus = true;
    });
    builder.addCase(executeTypedSubscription.fulfilled, (state) => {
      state.loadingStatus = false;
    });
    builder.addCase(executeTypedSubscription.rejected, (state) => {
      state.loadingStatus = false;
      return initialState;
    });
    builder.addCase(exportSubscription.pending, (state) => {
      state.loadingStatus = true;
    });
    builder.addCase(exportSubscription.fulfilled, (state) => {
      state.loadingStatus = false;
    });
    builder.addCase(exportSubscription.rejected, (state) => {
      state.loadingStatus = false;
      return initialState;
    });
    builder.addCase(getSingleSubscription.pending, (state) => {
      state.loadingView = true;
    });
    builder.addCase(getSingleSubscription.fulfilled, (state) => {
      state.loadingView = false;
    });
    builder.addCase(getSingleSubscription.rejected, (state) => {
      state.loadingView = false;
      return initialState;
    });
  },
});

// Action creators are generated for each case reducer function
export const { SET_SUBSCRIPTIONS, SET_SUBSCRIPTION } =
  subscriptionSlice.actions;

export default subscriptionSlice.reducer;
