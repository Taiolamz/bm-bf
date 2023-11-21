import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../utils/axios";
import { OfferState } from "./types";
import { addLabelValueFunc } from "../components/helpers/helpers";

interface offersPayload {
  // Add appropriate types for the payload
}

// pending >>
export const getOffers = createAsyncThunk(
  "web/get-offers",
  async (payload: offersPayload, thunkAPI) => {
    try {
      const data = await axios.get(
        "/back-office/bc-subscription-privilage",
        payload
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
        thunkAPI.dispatch(SET_OFFERS(data?.data?.data));
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

export const getPrivileges = createAsyncThunk(
  "web/get-privileges",
  async (payload: offersPayload, thunkAPI) => {
    try {
      const data = await axios.get(
        "/back-office/bc-subscription-privilage",
        payload
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
        thunkAPI.dispatch(
          SET_PRIVILEGES(data?.data?.data?.subscriptionPrivilage)
        );
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

const initialState: OfferState = {
  loading: false,
  offers: {},
  privileges: {},
  // initialize other state properties
};

export const offerSlice = createSlice({
  name: "billing",
  initialState,

  reducers: {
    SET_OFFERS: (state, action) => {
      state.offers = action.payload;
    },
    SET_PRIVILEGES: (state, action) => {
      state.privileges = addLabelValueFunc(action.payload);
    },
  },

  extraReducers: (builder) => {
    // pending state changes

    builder.addCase(getOffers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOffers.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(getOffers.rejected, (state) => {
      state.loading = false;
      return initialState;
    });
    builder.addCase(getPrivileges.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPrivileges.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(getPrivileges.rejected, (state) => {
      state.loading = false;
      return initialState;
    });
  },
});

// Action creators are generated for each case reducer function
export const { SET_OFFERS, SET_PRIVILEGES } = offerSlice.actions;

export default offerSlice.reducer;
