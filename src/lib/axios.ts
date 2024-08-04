import axios, {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import axiosRetry from "axios-retry";
import { store } from "~/store/store";
import { getNewAccessToken, logoutUser } from '~/store/auth/authAction';
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
    const { config } = error;

    if (!config) {
        return Promise.reject(error);
    }

    const responseStatusIs401Error = error?.response?.status === 401;
    // const requestHasNotBeenRetriedYet = !config?._retry;

    if (responseStatusIs401Error && !config?._retry) {
        try {
            const state = store.getState();
            const localStorageRefreshToken = state.auth.refreshToken

            refreshTokenResult = refreshTokenResult ? refreshTokenResult : store.dispatch(getNewAccessToken({ refreshToken: localStorageRefreshToken }))
            const response = await refreshTokenResult
            
            refreshTokenResult = null

            const {accessToken, refreshToken } = response?.payload?.data;
            
            if (accessToken && refreshToken) {
                store.dispatch(updateToken({ accessToken, refreshToken }))
                config.headers.Authorization = "Bearer " + accessToken;
                config._retry = true
                return instance.request(config);
            }

            if (response.payload.status === 'fail') {
                await store.dispatch(logoutUser())
                return Promise.reject(error?.response?.data); 
            }
           
        } catch (e) {
            return Promise.reject(e)
        }
    }
    return Promise.reject(error?.response?.data);
};

instance.interceptors.request.use(onRequest, onRequestError);
instance.interceptors.response.use(onResponse, onResponseError);

export default instance;
