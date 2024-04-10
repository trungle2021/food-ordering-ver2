import { TOKEN_TYPE } from "~/utils/static";
import LocalStorage from "./local-storage";

const getAccessTokenFromLocalStorage = () => {
  const accessToken: string | object = LocalStorage.getDataFromLocalStorage(
    TOKEN_TYPE.ACCESS_TOKEN.toString(),
    ""
  );
  return accessToken;
};

const getRefreshTokenFromLocalStorage = () => {
  const refreshToken: string | object = LocalStorage.getDataFromLocalStorage(
    TOKEN_TYPE.REFRESH_TOKEN.toString(),
    ""
  );
  return refreshToken;
};

const getUserFromLocalStorage = () => {
  const user: object | string = LocalStorage.getDataFromLocalStorage(
    "USER",
    {}
  );
  return user;
};

export { getAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage };
