
import axios from "~/lib/axios";
import { loginApi, registerApi, logoutApi, refreshTokenApi } from "~/utils/api";
import { LoginPayload } from "~/interface/auth/login-payload";
import { RegisterPayload } from "~/interface/auth/register-payload";
import { LogoutPayload } from "~/interface/auth/logout-payload";
import { GetNewAccessTokenPayload } from "~/interface/auth/get-new-access-token-payload";


const login = (credential: LoginPayload): Promise<any> => {
  return axios.post(loginApi, credential);

};

const register = (registerUserFormData: RegisterPayload): Promise<any> => {
  return axios.post(registerApi, registerUserFormData);
}

const logout = (payload: LogoutPayload): Promise<any> => {
  return axios.post(logoutApi, payload);

}


const getNewAccessToken = (payload: GetNewAccessTokenPayload): Promise<any> => {
  return axios.post(refreshTokenApi, payload);
}


const AuthService = {
  login,
  register,
  logout,
  getNewAccessToken
};

export default AuthService;
