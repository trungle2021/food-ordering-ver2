import { loginApi } from "../../utils/api";
import axios from "../../lib/axios";
import { LoginCredential } from "../../interface/credential";

const login = (credential: LoginCredential) => {
  const isLoggedIn = axios.post(loginApi, credential);
};
