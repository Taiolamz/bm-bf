import axios from "axios";
import { toast } from "react-toastify";
import { customErrorId } from "../components/helpers/helpers";
import env from "./env";
// import env from '../env';

const API = env.base_url;

/** base url to make request to the BE end point */

const instance = axios.create({
  baseURL: API,
});

instance.interceptors.request.use(
  async (config: any) => {
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  async (response: any) => {
    return response;
  },
  async (error: any) => {
    // console.log(error);
    
    if (error?.response?.status === 422) {
      toast.error(`${error?.response?.data?.message}`, {
        theme: "colored",
        toastId: customErrorId,
      });
    //   console.log(error);
      return error;
    }
    if (error?.response?.status !== 401) {
      // console.log(error);
      return error;
    }
    if (
      error?.response?.status === 401 &&
      error?.response?.data?.message === "Not authorized!"
    ) {
      toast.error(`${error?.response?.data?.message}`, {
        theme: "colored",
        toastId: customErrorId,
      });
      return error;
    }
    return error;
  }
);

export default instance;
