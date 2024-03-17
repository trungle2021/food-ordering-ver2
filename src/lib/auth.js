import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/static";
import { getDataFromLocalStorage } from "./useLocalStorage";

const getAccessTokenFromLocalStorage = () => {
  const accessToken = getDataFromLocalStorage(ACCESS_TOKEN, "");
  return accessToken;
};

const getRefreshTokenFromLocalStorage = () => {
  const refreshToken = getDataFromLocalStorage(REFRESH_TOKEN, "");
  return refreshToken;
};

export { getAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage };
