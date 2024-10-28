import axios, { AxiosError } from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { Envs } from "../utils/env";

NProgress.configure({ showSpinner: false });

const baseURL = Envs.api;
const timeout = 60 * 1000;

const baseApi = axios.create({
  baseURL,
  timeout: timeout,
  signal: AbortSignal.timeout(timeout),
  // withCredentials: true,
});

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

baseApi.interceptors.request.use(async (config) => {
  NProgress.start();
  return config;
});

baseApi.interceptors.response.use(
  async (response) => {
    await sleep();
    NProgress.done();
    return response;
  },
  (error) => {
    NProgress.done();
    if (["ECONNABORTED"].includes(error.code)) {
      const reformatError = new AxiosError(
        "Connection Timeout.", // New error message
        error.code,
        error.config,
        error.request,
        error.response,
      );
      reformatError.stack = error.stack; // Preserve stack trace

      return Promise.reject(reformatError);
    }
    return Promise.reject(error);
  },
);

export default baseApi;
