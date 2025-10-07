import axios from "axios";
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import type { reqInterceptorArguments } from "./types";
import { convertQueryString } from "./formater";
import http from "./http";
import { storageKeys } from "../utils/constants";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3051/api",
});


axiosInstance.interceptors.request.use(
  (req: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(storageKeys.accessToken);

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    if (req.data && !(req.data instanceof FormData)) {
      req.headers["Content-Type"] = "application/json";
    }

    return req;
  },
  (error: Error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error: Error) => Promise.reject(error)
);

export const reqInterceptor = async ({
  method,
  url,
  query,
  data,
}: reqInterceptorArguments): Promise<any> => {
  try {
    if (!method) throw new Error("Method not provided");
    if (!url) throw new Error("Url not provided");

    const apiMethod = method.toLowerCase().trim();
    const apiUrl = url.trim() + convertQueryString(query);

    let response: AxiosResponse;

    switch (apiMethod) {
      case "get":
        response = await axiosInstance.get(apiUrl);
        break;
      case "post":
        response = await axiosInstance.post(apiUrl, data);
        break;
      case "put":
        response = await axiosInstance.put(apiUrl, data);
        break;
      case "patch":
        response = await axiosInstance.patch(apiUrl, data);
        break;
      case "delete":
        response = await axiosInstance.delete(apiUrl);
        break;
      default:
        throw new Error("Method not identified");
    }

    return response.data;
  } catch (error: any) {
    let statusMessage: string;
    const errorCode = error?.response?.status ?? http.StatusMethodNotAllowed;

    switch (errorCode) {
      case http.StatusBadRequest:
        statusMessage = "Bad Request";
        break;
      case http.StatusUnauthorized:
        statusMessage = "Unauthorized";
        break;
      case http.StatusPaymentRequired:
        statusMessage = "Payment Required";
        break;
      case http.StatusForbidden:
        statusMessage = "Forbidden";
        break;
      case http.StatusNotFound:
        statusMessage = "Not Found";
        break;
      case http.StatusMethodNotAllowed:
        statusMessage = "Method Not Allowed";
        break;
      case http.StatusNotAcceptable:
        statusMessage = "Not Acceptable";
        break;
      case http.StatusProxyAuthRequired:
        statusMessage = "Proxy Authentication Required";
        break;
      case http.StatusRequestTimeout:
        statusMessage = "Request Timeout";
        break;
      case http.StatusConflict:
        statusMessage = "Conflict";
        break;
      case http.StatusRequestEntityTooLarge:
        statusMessage = "Payload Too Large";
        break;
      case http.StatusRequestURITooLong:
        statusMessage = "URI Too Long";
        break;
      case http.StatusTooManyRequests:
        statusMessage = "Too Many Requests";
        break;
      default:
        statusMessage = "Network Error";
        break;
    }

    if (errorCode === 401 && !url.includes("/auth")) {
      statusMessage = "Session Expired, Sign In Again";

      localStorage.removeItem(storageKeys.accessToken);
      localStorage.removeItem(storageKeys.userDetails);
      window.location.href = "/";
    }

    const errorMessage = error?.response?.data?.message ?? error?.error ?? statusMessage;
    const customError = new Error(errorMessage) as Error & { status?: number };
    customError.status = errorCode;

    throw customError;
  }
};
