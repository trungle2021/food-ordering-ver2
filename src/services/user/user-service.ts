import axios from "~/lib/axios";
import { getUserAddressApi, getUserInfoApi } from "~/utils/api";

const fetchUserList = () => {
  const userApi = "https://reqres.in/api/users";
  return axios.get(userApi);
};

const getUserInfo = (userId: string) => {
  return axios.get(`${getUserInfoApi}/${userId}`)
}

const getUserAddressesById = (userId: string) => {
    return axios.get(`${getUserAddressApi}/${userId}`)
  }




export const UserService = {
  getUserInfo,
  getUserAddressesById,
  fetchUserList,
};

export default UserService;
