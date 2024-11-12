
import axios from "~/lib/axios";
import { loginApi, registerApi, logoutApi, refreshTokenApi, loginGoogleApi, loginFacebookApi } from "~/utils/api";
import { LoginPayload } from "~/interface/auth/loginPayload";
import { RegisterPayload } from "~/interface/auth/registerPayload";
import { GetNewAccessTokenPayload } from "~/interface/auth/getNewAccessTokenPayload";

const loginOAuth = (token: string, provider: string) => {
  switch (provider) {
    case 'google':
      return axios.post(`${loginGoogleApi}`, { token, provider });
    case 'facebook':
      return axios.post(`${loginFacebookApi}`, { token, provider });
    default:
      throw new Error('Invalid OAuth resource type');
  }
   
}

const login = (credential: LoginPayload): Promise<any> => {
  return axios.post(loginApi, credential);
};

const register = (registerUserFormData: RegisterPayload): Promise<any> => {
  return axios.post(registerApi, registerUserFormData);
}

const logout = (): Promise<any> => {
  return axios.post(`${logoutApi}`);
}


const getNewAccessToken = (payload: GetNewAccessTokenPayload): Promise<any> => {
  return axios.post(refreshTokenApi, payload);
}



const AuthService = {
  login,
  register,
  logout,
  getNewAccessToken,
  loginOAuth,
};

export default AuthService;
