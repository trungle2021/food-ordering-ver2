
import axios from "~/lib/axios";
import { loginApi, registerApi, logoutApi, refreshTokenApi } from "~/utils/api";
import { LoginPayload } from "~/interface/auth/loginPayload";
import { RegisterPayload } from "~/interface/auth/registerPayload";
import { GetNewAccessTokenPayload } from "~/interface/auth/getNewAccessTokenPayload";


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
};

export default AuthService;
