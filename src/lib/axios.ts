import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
} from "./auth";
import { origin } from "../utils/api";

const instance: AxiosInstance = axios.create({
  baseURL: origin,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  //   const token: string | null = getAccessTokenFromLocalStorage();
  //   if (token && token.trim() !== "") {
  //     config.headers = {
  //       Authorization: "Bearer " + token,
  //     } as AxiosRequestHeaders;
  //   }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): Promise<AxiosResponse> => {
  return response.data;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

instance.interceptors.request.use(onRequest, onRequestError);
instance.interceptors.response.use(onResponse, onResponseError);

export default instance;
