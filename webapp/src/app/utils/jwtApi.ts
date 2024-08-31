import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import agent from "./agent";
import { Envs } from "./env";

NProgress.configure({ showSpinner: false });

const baseURL = Envs.api;
const timeout = 60 * 1000;

const jwtApi = axios.create({
  baseURL,
  timeout: timeout,
  signal: AbortSignal.timeout(timeout),
  // withCredentials: true,
});

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

jwtApi.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  if (token) {
    const date = new Date();
    const decodeToken = jwtDecode(token) as { exp: number };

    if (decodeToken.exp < date.getTime() / 1000) {
      try {
        const data = await agent.Auth.refreshToken({
          refreshToken: refreshToken,
        });
        config.headers["Authorization"] = `Bearer ${data.accessToken}`;
        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("refresh_token", data.refreshToken);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error);
          if (error.response?.status === 400) {
            localStorage.clear();
            window.location.href = "/login";
            // router.navigate("/login");
            throw error;
          }
        } else {
          localStorage.clear();
          window.location.href = "/login";
        }
      }
    } else {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  NProgress.start();
  return config;
});

jwtApi.interceptors.response.use(
  async (response) => {
    await sleep();
    NProgress.done();
    return response;
  },
  (error) => {
    NProgress.done();
    if (error.response && [401].includes(error.response.status)) {
      localStorage.clear();
      window.location.href = "/login";
      // router.navigate("/login");
    }
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

export default jwtApi;
