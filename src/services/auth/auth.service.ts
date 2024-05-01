
import { loginApi, registerApi, logoutApi, refreshTokenApi } from "~/utils/api";
import axios from "~/lib/axios";
import { LoginPayload } from "~/interface/login.payload";
import { RegisterPayload } from "~/interface/register.payload";
import { LogoutPayload } from "~/interface/logout.payload";
import { get } from 'http';


const login = (credential: LoginPayload): Promise<any> => {
  return axios.post(loginApi, credential);
 
};

const register = (registerUserFormData: RegisterPayload): Promise<any> => {
 return axios.post(registerApi, registerUserFormData);
}

const logout = (userId: LogoutPayload): Promise<any> => {
  return axios.post(logoutApi, userId);

}

const getNewAccessToken = (refreshToken: string): Promise<any> => {
  return axios.post(refreshTokenApi, refreshToken);
}


const AuthService = {
  login,
  register,
  logout,
  getNewAccessToken
};

export default AuthService;
