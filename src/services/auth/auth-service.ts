import { loginApi } from "~/utils/api";
import axios from "~/lib/axios";
import { LoginCredential } from "~/interface/credential";


const checkLogin = (credential: LoginCredential): Promise<any> => {
  const result = axios.post(loginApi, credential);
  return result
};



const AuthService = {
  checkLogin,
};

export default AuthService;
