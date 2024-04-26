import { loginApi, registerApi } from "~/utils/api";
import axios from "~/lib/axios";
import { LoginPayload } from "~/interface/login.payload";
import { RegisterPayload } from "~/interface/register.payload";


const login = (credential: LoginPayload): Promise<any> => {
  const result = axios.post(loginApi, credential);
  return result
};

const register = (registerUserFormData: RegisterPayload): Promise<any> => {
  const result = axios.post(registerApi, registerUserFormData);
  return result;

}



const AuthService = {
  login,
  register
};

export default AuthService;
