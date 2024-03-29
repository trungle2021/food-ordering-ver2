import { loginApi } from "../../utils/api";
import axios from "../../lib/axios";
import { LoginCredential } from "../../interface/credential";

const checkLogin = (credential: LoginCredential) => {
  return axios.post(loginApi, credential);
};

const AuthService = {
  checkLogin,
};

export default AuthService;
