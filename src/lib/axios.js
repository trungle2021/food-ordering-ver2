import axios from 'axios';
import { getAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage } from './auth';
import { origin } from '../utils/api'

const instance = axios.create({
    baseURL: origin,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

const onRequestSuccess = (config) => {

}

instance.interceptors.request.use(
    (config) => {
        const token = getAccessTokenFromLocalStorage()
        if (token && token.trim() !== '') {
            config.headers = {
                Authorization: 'Bearer ' + token
            }
            return config
        }

    },
    (error) => {
        return Promise.reject(error);
    }
)



instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  })



module.exports = instance;

