import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import localStorage from "./local-storage";
import { origin } from "~/utils/api";
import { TOKEN_TYPE } from '../utils/static';



const instance: AxiosInstance = axios.create({
  baseURL: origin,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

type TokenType = string | null | object;


const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
    const token: TokenType = localStorage.getDataFromLocalStorage(TOKEN_TYPE.ACCESS_TOKEN);
    if (token && typeof token === "string" && token.trim() !== "") {
      console.log(token)
      config.headers = {
        ...config.headers,
        Authorization: "Bearer " + token,
      } as AxiosRequestHeaders;
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
