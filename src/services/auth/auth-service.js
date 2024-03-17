import { loginApi } from "../../utils/api";
import axios from "../../lib/axios";

const login = (credential) => {
  const login = axios.post(loginApi, credential);
};
