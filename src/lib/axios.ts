import axios, {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import axiosRetry from "axios-retry";
import { store } from "~/store/store";
import { origin } from "~/utils/api";
import { updateToken } from "~/store/auth/authSlice";

const instance: AxiosInstance = axios.create({
    baseURL: origin,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosRetry(instance, {
    retries: 3,
    retryCondition: axiosRetry.isNetworkOrIdempotentRequestError,
    retryDelay: axiosRetry.exponentialDelay,
});

const onRequest = async (
    config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig<any>> => {
    const state = store.getState()
    const accessToken = state.auth.accessToken;
    if (accessToken) {
        config.headers.Authorization = "Bearer " + accessToken;
    }
    return config;
};

const onRequestError = async (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
};

const onResponse = async (response: AxiosResponse): Promise<AxiosResponse> => {
    return response.data;
};

let refreshTokenResult: any = null

const onResponseError = async (error: any): Promise<AxiosError> => {
   const originalRequest = error.config
    if (error?.response?.status === 401 && !originalRequest._retry) {
        try {
            originalRequest._retry = true;
            const state = store.getState();
            const localStorageRefreshToken = state.auth.refreshToken

            refreshTokenResult = refreshTokenResult ? refreshTokenResult : store.dispatch(getNewAccessToken({ refreshToken: localStorageRefreshToken }))
            const response = await refreshTokenResult
            
            refreshTokenResult = null

            const accessToken = response?.payload?.data?.accessToken
            const refreshToken = response?.payload?.data?.refreshToken
            
            if (accessToken && refreshToken) {
                store.dispatch(updateToken({ accessToken, refreshToken }))
                originalRequest.headers.Authorization = "Bearer " + accessToken;
                return instance.request(originalRequest);
            }
        } catch (e) {
            return Promise.reject(e)
        }
    }

    if(error.response.status === 403 && error.response.data.message === 'Refresh token expired'){
        store.dispatch(logoutUser())
        return Promise.reject(error?.response?.data);
    }
    return Promise.reject(error?.response?.data);
};

instance.interceptors.request.use(onRequest, onRequestError);
instance.interceptors.response.use(onResponse, onResponseError);

export default instance;
