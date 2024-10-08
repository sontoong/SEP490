import { AxiosResponse } from "axios";

// import apiJWT from "./jwtApi";
import baseApi from "./baseApi";

const responseBody = (response: AxiosResponse) => response.data;

// const jwtRequests = {
//   get: <T>(url: string, params?: T) =>
//     apiJWT.get(url, { params }).then(responseBody),
//   post: <T>(url: string, body: T) => apiJWT.post(url, body).then(responseBody),
//   put: <T>(url: string, body: T) => apiJWT.put(url, body).then(responseBody),
//   patch: <T>(url: string, body: T) =>
//     apiJWT.patch(url, body).then(responseBody),
//   del: <T>(url: string, params?: T) =>
//     apiJWT.delete(url, { params }).then(responseBody),
// };

const baseRequests = {
  get: <T>(url: string, params?: T) =>
    baseApi.get(url, { params }).then(responseBody),
  post: <T>(url: string, body: T) => baseApi.post(url, body).then(responseBody),
  put: <T>(url: string, body: T) => baseApi.put(url, body).then(responseBody),
  patch: <T>(url: string, body: T) =>
    baseApi.patch(url, body).then(responseBody),
  del: <T>(url: string, params?: T) =>
    baseApi.delete(url, { params }).then(responseBody),
};

//apis
const _authBase = "Authenticate";
const Auth = {
  login: (data: any) => baseRequests.post(`${_authBase}/auth`, data),
  refreshToken: (data: any) =>
    baseRequests.post(`${_authBase}/auth/refresh`, data),
};

const agent = {
  Auth,
};
export default agent;
