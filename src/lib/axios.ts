import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import axiosRetry from "axios-retry";
import { store } from "~/app/store";
import { origin } from "~/utils/api";

const instance: AxiosInstance = axios.create({
  baseURL: origin,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
// Exponential back-off retry delay between requests

axiosRetry(instance, {
  
  retries: 3,
  
  retryDelay: axiosRetry.exponentialDelay,
  
  retryCondition(error) {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || error?.response?.status === 429 || error?.response?.status === 405;
}, });


const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const state = store.getState()
  const accessToken = state.auth.accessToken;
  if (accessToken) {
    config.headers.Authorization =  "Bearer " + accessToken;
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): Promise<AxiosResponse> => {
 
  console.log("On Response", response);
  if(response.status === 401){
    store.dispatch(getNewAccessToken())  
  }
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
