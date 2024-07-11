import axios from "~/lib/axios";
import { getUserAddressApi, getUserInfoApi } from "~/utils/api";


const getUserInfoByUserId = (userId: string) => {
    return axios.get(`${getUserInfoApi}/${userId}`)
}

const getUserAddressesByUserId = (userId: string) => {
    return axios.get(`${getUserAddressApi}/${userId}`)
}




export const UserService = {
    getUserInfoByUserId,
    getUserAddressesByUserId,
};

export default UserService;
