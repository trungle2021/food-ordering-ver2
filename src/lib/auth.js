import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/static';
import { getDataFromLocalStorage } from './useLocalStorage'


const getAccessTokenFromLocalStorage = () => {
    const accessToken = getDataFromLocalStorage(ACCESS_TOKEN,'');
    console.log('Access token', accessToken);
    return accessToken;
}

const getRefreshTokenFromLocalStorage = () => {
    const refreshToken = getDataFromLocalStorage(REFRESH_TOKEN,'');
    console.log('Refresh token', refreshToken);
    return refreshToken;
}

module.exports = {
    getAccessTokenFromLocalStorage,
    getRefreshTokenFromLocalStorage
}