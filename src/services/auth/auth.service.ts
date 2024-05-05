
import { loginApi, registerApi, logoutApi, refreshTokenApi } from "~/utils/api";
import axios from "~/lib/axios";
import { LoginPayload } from "~/interface/login.payload";
import { RegisterPayload } from "~/interface/register.payload";
import { LogoutPayload } from "~/interface/logout.payload";
import { GetNewAccessTokenPayload } from "~/interface/get-new-access-token.payload";


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
