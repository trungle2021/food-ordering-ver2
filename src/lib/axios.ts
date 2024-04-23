import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { store } from "~/app/store";
import { origin } from "~/utils/api";

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
  const state = store.getState()
  const accessToken = state.auth.accessToken;
  console.log("Access token: " + accessToken);
  if (accessToken) {
    console.log("In if condition Access token: " + accessToken);
    config.headers.Authorization =  "Bearer " + accessToken;
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): Promise<AxiosResponse> => {
 
  if (!response.data) {
    throw new Error("Something went wrong");
  }
  return response.data;
};

const onResponseError = (error: any): Promise<AxiosError> => {
  return Promise.reject(error?.response?.data);
};

instance.interceptors.request.use(onRequest, onRequestError);
instance.interceptors.response.use(onResponse, onResponseError);

export default instance;
