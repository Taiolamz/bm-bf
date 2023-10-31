import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../utils/axios";
// import { toast } from '@ravenpay/raven-bank-ui';
import { AuthState } from "./types"

interface LoginPayload {
  // Add appropriate types for the payload
}

export const loginUser = createAsyncThunk(
  "web/login_with_otp",
  async (payload: LoginPayload, thunkAPI) => {
    try {
      const data = await axios.post("/back-office/auth/login", payload);
    console.log(data);
	
      if (data?.data?.status === "fail") {
        if (typeof data.data === "string") {
          toast.error(data.data);
        } else
          toast.error(data?.data?.message, {
            position: "top-right",
          });
        return thunkAPI.rejectWithValue(data);
      }
      if (data?.data?.status === "success") {
        toast.success(data?.data?.message, {
          position: "top-right",
        });

        SET_TOKEN(data.data.data.token);
        // localStorage.setItem('token', data.data.data.token);
        return data;
      }
	  return data
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
	  return error
    }
  }
);


const initialState: AuthState = {
  loading: false,
  isAuth: false,
  logging_out: false,
  token: "",
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
  },

  extraReducers: (builder) => {
    // pending state changes

    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });

    //fullfilled state changes

    builder.addCase(loginUser.fulfilled, (state) => {
      state.loading = false;
    });

    //rejected state changes
    builder.addCase(loginUser.rejected, () => {
      return initialState;
    });
  },
});

// Action creators are generated for each case reducer function
export const { LOGIN, LOGOUT, SET_TOKEN } = authSlice.actions;

export default authSlice.reducer;
