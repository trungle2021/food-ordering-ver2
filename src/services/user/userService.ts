import axios from "~/lib/axios";
import { getUserAddressApi, getUserInfoApi } from "~/utils/api";


const getUserInfo = (userId: string) => {
    return axios.get(`${getUserInfoApi}/${userId}`)
}

const getUserAddressList = (userId: string) => {
    return axios.get(`${getUserAddressApi}/${userId}`)
}




export const UserService = {
    getUserInfo,
    getUserAddressList,
};

export default UserService;
