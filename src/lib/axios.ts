import { authSlice, logoutUser } from './../features/Auth/authSlice';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import axiosRetry from "axios-retry";
import { store } from "~/app/store";
import { getNewAccessToken } from "~/features/Auth/authSlice";
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
 });


let refreshingToken:any = null


const onRequest = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig<any>> => {
  const state = store.getState()
  const accessToken = state.auth.accessToken;
  if (accessToken) {
    config.headers.Authorization =  "Bearer " + accessToken;
  }
  return config;
};

const onRequestError = async (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = async (response: AxiosResponse): Promise<AxiosResponse> => {
  return response.data;
};

const onResponseError = async (error: any): Promise<AxiosError> => {
  const { config } = error;
  console.log("Config retry:", config._retry);
  if (error?.response?.status === 401 && !config._retry) {
    //dispatch to getNewAccessToken. After getting the new access token replace it into the header then re-send the request
      config._retry = true
      const state = store.getState();
      const userId = state.auth.user._id
      const refreshToken = state.auth.refreshToken
      console.log("Refreshing access token")
      refreshingToken = refreshingToken ? refreshingToken : store.dispatch(getNewAccessToken({user: userId, token: refreshToken}))
      const response = await refreshingToken
      const accessToken = response.payload.data.accessToken;
      console.log("Access Token: " + accessToken)
      console.log(accessToken)
      if (accessToken) {
        config.headers.Authorization =  "Bearer " + accessToken;
        return instance.request(config);
      }
      refreshingToken = null
      
    if (error?.response.data?.error === 'Refresh Token Expired'){
      //dispatch to logout
      await store.dispatch(logoutUser(userId))
    }
 
  }
  return Promise.reject(error?.response?.data);
};

instance.interceptors.request.use(onRequest, onRequestError);
instance.interceptors.response.use(onResponse, onResponseError);

export default instance;
