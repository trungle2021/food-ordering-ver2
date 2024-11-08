import { BaseUser } from "~/interface/user/baseUser";
import UserProfileFormValues from "~/interface/user/userProfileFormValues";
import axios from "~/lib/axios";
import { createUserAddressApi, getUserAddressListApi, getUserByUserIdApi, updateUserAddressApi, updateUserProfileApi } from "~/utils/api";


const getUserByUserId = (userId: string) => {
    return axios.get(`${getUserByUserIdApi}/${userId}`)
}

const getUserAddressList = (userId: string) => {
    const url = `${getUserAddressListApi}`.replace(':userId', userId)
    return axios.get(url)
}

const createAddress = async (userId: string, addressDetail: CreateAddressFormValues) => {
    const url = `${createUserAddressApi}`.replace(':userId', userId)
    return await axios.post(url, addressDetail)
}

const updateAddress = async (userId: string, addressDetail: UpdateAddressFormValues) => {
    const url = `${updateUserAddressApi}`.replace(':userId', userId)
    return await axios.put(url, addressDetail)
}

const updateUserProfile = async (userId: string, payload: UserProfileFormValues) => {
    const url = `${updateUserProfileApi}`.replace(':userId', userId)
    return await axios.put(url, payload)
}

export const UserService = {
    getUserByUserId,
    getUserAddressList,
    createAddress,
    updateAddress,
    updateUserProfile
};

export default UserService;
