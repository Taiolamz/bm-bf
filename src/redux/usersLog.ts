import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../utils/axios";
import { UsersLogState } from "./types";

interface UsersLogPayload {
  // Add appropriate types for the payload
  type: string;
  per_page: string;
  search: string;
  url: string;
  status: boolean;
  user_id: string;
  report_type: string;
  page: number;
  filter_status: boolean;
}

export const createAdmin = createAsyncThunk(
  "backoffice/create-admin",
  async (payload: UsersLogPayload, thunkAPI) => {
    try {
      const data = await axios.post("/back-office/auth/register", payload);
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

export const getUsersLog = createAsyncThunk(
  "backoffice/get-users-log",
  async (payload: UsersLogPayload, thunkAPI) => {
    try {
      const data = await axios.get(
        `back-office/user-logs?type=${payload.type || ""}&per_page=${
          payload.per_page || 10
        }&search=${payload?.search}&page=${payload?.page || 1}`
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
        thunkAPI.dispatch(SET_USERS_LOG(data?.data?.data));
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
export const getSingleUserLog = createAsyncThunk(
  "backoffice/get-single-users-log",
  async (payload: UsersLogPayload, thunkAPI) => {
    try {
      const data = await axios.get(`back-office/user-logs/${payload}`);
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
        thunkAPI.dispatch(SET_USER_LOG(data?.data?.data));
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

export const updateUserStatus = createAsyncThunk(
  "backoffice/update-user-status",
  async (payload: UsersLogPayload, thunkAPI) => {
    try {
      const data = await axios.post(
        `/back-office/update-user-status?filter[status]=${
          payload?.filter_status || ""
        }&user_id=${payload?.user_id || ""}&status=${payload?.status || ""}`
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
export const exportUsersLogReport = createAsyncThunk(
  "backoffice/export-users-log",
  async (payload: UsersLogPayload, thunkAPI) => {
    try {
      const data = await axios.get(
        `export-user-logs?report_type=${payload?.report_type || ""}&type=${
          payload?.type || ""
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

const initialState: UsersLogState = {
  loading: false,
  loadingStatus: false,
  loadingView: false,
  usersLog: {},
  userLog: {},
  prev_page: "",
  next_page: "",
};

export const usersLogSlice = createSlice({
  name: "userslog",
  initialState,

  reducers: {
    SET_USERS_LOG: (state, action) => {
      state.usersLog = action.payload;
      state.prev_page = action.payload?.prev_page_url;
      state.next_page = action.payload?.next_page_url;
    },
    SET_USER_LOG: (state, action) => {
      state.userLog = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createAdmin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAdmin.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createAdmin.rejected, (state) => {
      state.loading = false;
      return initialState;
    });

    builder.addCase(updateUserStatus.pending, (state) => {
      state.loadingStatus = true;
    });
    builder.addCase(updateUserStatus.fulfilled, (state) => {
      state.loadingStatus = false;
    });
    builder.addCase(updateUserStatus.rejected, (state) => {
      state.loadingStatus = false;
      return initialState;
    });
    builder.addCase(exportUsersLogReport.pending, (state) => {
      state.loadingStatus = true;
    });
    builder.addCase(exportUsersLogReport.fulfilled, (state) => {
      state.loadingStatus = false;
    });
    builder.addCase(exportUsersLogReport.rejected, (state) => {
      state.loadingStatus = false;
      return initialState;
    });
    builder.addCase(getSingleUserLog.pending, (state) => {
      state.loadingView = true;
    });
    builder.addCase(getSingleUserLog.fulfilled, (state) => {
      state.loadingView = false;
    });
    builder.addCase(getSingleUserLog.rejected, (state) => {
      state.loadingView = false;
      return initialState;
    });
  },
});

const { SET_USERS_LOG, SET_USER_LOG } = usersLogSlice.actions;

export default usersLogSlice.reducer;
