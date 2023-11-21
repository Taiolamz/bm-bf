import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../utils/axios";
import { RolesState } from "./types";

interface RolesPayload {
  // Add appropriate types for the payload
}

export const createRole = createAsyncThunk(
  "backoffice/create-roles",
  async (payload: RolesPayload, thunkAPI) => {
    try {
      const data = await axios.post("/back-office/bc-roles", payload);
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

export const getRoles = createAsyncThunk(
  "backoffice/get-roles",
  async (payload: RolesPayload, thunkAPI) => {
    try {
      const data = await axios.get("/back-office/bc-roles", payload);
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
        thunkAPI.dispatch(SET_ROLES(data?.data?.data));
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

export const deleteUserFromRole = createAsyncThunk(
  "backoffice/delete-user-roles",
  async (payload: RolesPayload, thunkAPI) => {
    try {
      const data = await axios.delete(`/back-office/roles/${payload}`);
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

const initialState: RolesState = {
  loading: false,
  deleteLoading: false,
  roles: {},
  prev_page: "",
  next_page: "",
};

export const RolesSlice = createSlice({
  name: "roles",
  initialState,

  reducers: {
    SET_ROLES: (state, action) => {
      state.roles = action.payload;
      state.prev_page = action.payload?.prev_page_url;
      state.next_page = action.payload?.next_page_url;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createRole.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createRole.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createRole.rejected, (state) => {
      state.loading = false;
      return initialState;
    });
    builder.addCase(getRoles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRoles.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(getRoles.rejected, (state) => {
      state.loading = false;
      return initialState;
    });
    builder.addCase(deleteUserFromRole.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deleteUserFromRole.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteUserFromRole.rejected, (state) => {
      state.deleteLoading = false;
      return initialState;
    });
  },
});

const { SET_ROLES } = RolesSlice.actions;

export default RolesSlice.reducer;
