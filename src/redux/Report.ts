import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../utils/axios";
import { ReportState } from "./types";

interface reportPayload {
  // Add appropriate types for the payload
  report_type: "";
  per_page: string;
  page: number;
  export_type: string;
}

export const getReports = createAsyncThunk(
  "web/get-reports",
  async (payload: reportPayload, thunkAPI) => {
    try {
      const data = await axios.get(
        `back-office/report?report_type=${
          payload?.report_type || ""
        }&per_page=${payload?.per_page || ""}&page=${payload?.page || 1}`
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
        thunkAPI.dispatch(SET_REPORTS(data?.data?.data));
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

export const exportReports = createAsyncThunk(
  "web/export-reports",
  async (payload: reportPayload, thunkAPI) => {
    try {
      const data = await axios.get(
        `back-office/report/download?report_type=${
          payload?.report_type || ""
        }&type=${payload?.export_type}`
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

const initialState: ReportState = {
  loading: false,
    loadingStatus: false,
  //   loadingView: false,
  reports: {},
  prev_page: "",
  next_page: "",

  // initialize other state properties
};

export const reportSlice = createSlice({
  name: "reports",
  initialState,

  reducers: {
    SET_REPORTS: (state, action) => {
      state.reports = action.payload;
      state.prev_page = action.payload?.prev_page_url;
      state.next_page = action.payload?.next_page_url;
    },
  },

  extraReducers: (builder) => {
    // pending state changes

    builder.addCase(getReports.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getReports.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(getReports.rejected, (state) => {
      state.loading = false;
      return initialState;
    });
    builder.addCase(exportReports.pending, (state) => {
      state.loadingStatus = true;
    });
    builder.addCase(exportReports.fulfilled, (state) => {
      state.loadingStatus = false;
    });
    builder.addCase(exportReports.rejected, (state) => {
      state.loadingStatus = false;
      return initialState;
    });
  },
});

// Action creators are generated for each case reducer function
export const { SET_REPORTS } = reportSlice.actions;

export default reportSlice.reducer;
