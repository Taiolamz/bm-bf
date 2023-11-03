import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../utils/axios";
// import { toast } from '@ravenpay/raven-bank-ui';
import { BillingState } from "./types";

interface billingPayload {
  // Add appropriate types for the payload
  year: string;
  search: string;
  month: string;
  status: string;
  payment_method: string;
  per_page: string;
}

export const getBillings = createAsyncThunk(
  "web/get-billings",
  async (payload: billingPayload, thunkAPI) => {
    try {
      const data = await axios.get(
        `/back-office/billing?year=${payload?.year || ""}&search=${
          payload?.search || ""
        }&month=${payload?.month || ""}&status=${
          payload?.status || ""
        }&payment_method=${payload?.payment_method || ""}&per_page=${
          payload?.per_page || ""
        }`,
      );
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
    //    console.log(data?.data?.data);
       
        // SET_BILLING(data?.data?.data)
       thunkAPI.dispatch(SET_BILLING(data?.data?.data))
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

const initialState: BillingState = {
  loading: false,
  billing: {
    billing: {}
  },
  // initialize other state properties
};

export const billingSlice = createSlice({
  name: "billing",
  initialState,

  reducers: {
    SET_BILLING: (state, action) => {
      state.billing = action.payload;
    },
  },

  extraReducers: (builder) => {
    // pending state changes

    builder.addCase(getBillings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBillings.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(getBillings.rejected, (state) => {
      state.loading = false;
      return initialState;
    });
  },
});

// Action creators are generated for each case reducer function
export const { SET_BILLING } = billingSlice.actions;

export default billingSlice.reducer;
