import { TOKEN_TYPE } from "~/utils/static";
import { getDataFromLocalStorage } from "./useLocalStorage";

const getAccessTokenFromLocalStorage = () => {
  const accessToken: string = getDataFromLocalStorage(
    TOKEN_TYPE.ACCESS_TOKEN.toString(),
    ""
  );
  return accessToken;
};

const getRefreshTokenFromLocalStorage = () => {
  const refreshToken: string = getDataFromLocalStorage(
    TOKEN_TYPE.REFRESH_TOKEN.toString(),
    ""
  );
  return refreshToken;
};

export { getAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage };
