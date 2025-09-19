import axios from "axios";
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import type { reqInterceptorArguments } from "./types";
import { convertQueryString } from "./formater";

export const tokenFelidName: string = "accessToken";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3051/api",
});


axiosInstance.interceptors.request.use(
  (req: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(tokenFelidName);

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
    const errorCode = error?.response?.status ?? 405;

    switch (errorCode) {
      case 400:
        statusMessage = "Bad Request";
        break;
      case 401:
        statusMessage = "Unauthorized";
        break;
      case 402:
        statusMessage = "Payment Required";
        break;
      case 403:
        statusMessage = "Forbidden";
        break;
      case 404:
        statusMessage = "Not Found";
        break;
      case 405:
        statusMessage = "Method Not Allowed";
        break;
      case 406:
        statusMessage = "Not Acceptable";
        break;
      case 407:
        statusMessage = "Proxy Authentication Required";
        break;
      case 408:
        statusMessage = "Request Timeout";
        break;
      case 409:
        statusMessage = "Conflict";
        break;
      case 413:
        statusMessage = "Payload Too Large";
        break;
      case 414:
        statusMessage = "URI Too Long";
        break;
      case 429:
        statusMessage = "Too Many Requests";
        break;
      default:
        statusMessage = "Network Error";
        break;
    }

    if (errorCode === 401 && !url.includes("/auth")) {
      statusMessage = "Session Expired, Sign In Again";

      localStorage.removeItem(tokenFelidName);
      window.location.href = "/";
    }

    const errorMessage =
      error?.response?.data?.message ?? error?.error ?? statusMessage;

    throw new Error(errorMessage);
  }
};
