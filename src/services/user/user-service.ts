import axios from "../../lib/axios";

const fetchUserList = () => {
  const userApi = "https://reqres.in/api/users?page=2";
  return axios.get(userApi);
};

export const UserService = {
  fetchUserList,
};

export default UserService;
