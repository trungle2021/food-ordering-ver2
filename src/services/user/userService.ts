import axios from "~/lib/axios";
import { getUserAddressListApi, getUserByUserIdApi } from "~/utils/api";


const getUserByUserId = (userId: string) => {
    return axios.get(`${getUserByUserIdApi}/${userId}`)
}

const getUserAddressList = (userId: string) => {
    const url = `${getUserAddressListApi}`.replace(':userId', userId)
    return axios.get(url)
}

const createAddress = async (userId: string, addressDetail: CreateAddressFormValues) => {
    const url = `${getUserAddressListApi}`.replace(':userId', userId)

    const response = await axios.post(url, addressDetail)
    return response.data
}

const updateAddress = async (userId: string, addressDetail: UpdateAddressFormValues) => {
    const url = `${getUserAddressListApi}`.replace(':userId', userId)

    const response = await axios.put(url, addressDetail)
    return response.data
}


export const UserService = {
    getUserByUserId,
    getUserAddressList,
    createAddress,
    updateAddress
};

export default UserService;
