import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../utils/axios";
// import { toast } from '@ravenpay/raven-bank-ui';
import { AuthState } from "./types";
import setAuthToken from "./setAuthToken";

interface LoginPayload {
  // Add appropriate types for the payload
}

export const loginUser = createAsyncThunk(
  "web/login_with_otp",
  async (payload: LoginPayload, thunkAPI) => {
    try {
      await setAuthToken();
      const data = await axios.post("/back-office/auth/login", payload);
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
        SET_USER(data.data.data.user);
        localStorage.setItem("user", JSON.stringify(data.data.data.user));
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

export const logoutUser: any = createAsyncThunk(
  "back_office/log_out",
  async (payload: LoginPayload, thunkAPI) => {
    try {
      // await setAuthToken();
      const data = await axios.delete("/back-office/auth/logout", payload);
      if (data?.data?.status === "fail") {
        if (typeof data.data === "string") {
          toast.error(data.data);
          localStorage.clear();
          window.location.reload();
        } else
          toast.error(data?.data?.message, {
            position: "top-right",
          });
        return thunkAPI.rejectWithValue(data);
      }
      if (data?.status === 200) {
        toast.success(data?.data?.message, {
          position: "top-right",
          theme: "colored",
        });
        localStorage.clear();
        window.location.reload();

        // SET_TOKEN(data.data.data.token);
        // localStorage.setItem('token', data.data.data.token);
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

export const requestOtpForgetPassword = createAsyncThunk(
  "web/request-otp-password",
  async (payload: LoginPayload, thunkAPI) => {
    try {
      const data = await axios.post("/admin/confirm-email", payload);
      // console.log(data);

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

        // SET_TOKEN(data.data.data.token);
        // localStorage.setItem('token', data.data.data.token);
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

export const changePassword = createAsyncThunk(
  "web/change-password",
  async (payload: LoginPayload, thunkAPI) => {
    try {
      const data = await axios.post("/admin/reset-password", payload);
      // console.log(data);

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

        // SET_TOKEN(data.data.data.token);
        // localStorage.setItem('token', data.data.data.token);
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

export const submitOtpForgetPassword = createAsyncThunk(
  "web/submit-otp-password",
  async (payload: LoginPayload, thunkAPI) => {
    try {
      const data = await axios.post("/admin/verify-password-otp", payload);
      // console.log(data);

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

        // SET_TOKEN(data.data.data.token);
        // localStorage.setItem('token', data.data.data.token);
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

const storedUserString = localStorage.getItem("user");
const user = storedUserString ? JSON.parse(storedUserString) : null;

const initialState: AuthState = {
  loading: false,
  isAuth: false,
  logging_out: false,
  token: "",
  user: user,
  // initialize other state properties
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    LOGIN: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    SET_TOKEN: (state, action) => {
      state.token = action.payload;
    },
    LOGOUT: (state, action) => {
      state.logging_out = action.payload;
      state.isAuth = true;
    },
    SET_USER: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },
  },

  extraReducers: (builder) => {
    // pending state changes

    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.loading = false;
      return initialState;
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.loading = false;
      return initialState;
    });
    builder.addCase(requestOtpForgetPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(requestOtpForgetPassword.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(requestOtpForgetPassword.rejected, (state) => {
      state.loading = false;
      return initialState;
    });
    builder.addCase(submitOtpForgetPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(submitOtpForgetPassword.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(submitOtpForgetPassword.rejected, (state) => {
      state.loading = false;
      return initialState;
    });
    builder.addCase(changePassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changePassword.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(changePassword.rejected, (state) => {
      state.loading = false;
      return initialState;
    });
  },
});

// Action creators are generated for each case reducer function
export const { LOGIN, LOGOUT, SET_TOKEN, SET_USER } = authSlice.actions;

export default authSlice.reducer;
