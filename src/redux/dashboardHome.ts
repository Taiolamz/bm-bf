import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../utils/axios";
import { DashboardhomeState } from "./types";

interface DashboardHomePayload {
  // Add appropriate types for the payload
}

export const getDashboardHome = createAsyncThunk(
  "backoffice/get-roles",
  async (payload: DashboardHomePayload, thunkAPI) => {
    try {
      const data = await axios.get("/back-office/dashboard", payload);
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
        thunkAPI.dispatch(SET_DASHBOARD_HOME(data?.data?.data));
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

const initialState: DashboardhomeState = {
  loading: false,
  dashboard_home: {},
};
export const dashboardHomeSlice = createSlice({
  name: "roles",
  initialState,

  reducers: {
    SET_DASHBOARD_HOME: (state, action) => {
      state.dashboard_home = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getDashboardHome.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDashboardHome.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(getDashboardHome.rejected, (state) => {
      state.loading = false;
      return initialState;
    });
  },
});

const { SET_DASHBOARD_HOME } = dashboardHomeSlice.actions;

export default dashboardHomeSlice.reducer;
