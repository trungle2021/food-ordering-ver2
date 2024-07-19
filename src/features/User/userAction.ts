import { createAsyncThunk } from "@reduxjs/toolkit"
import UserService from "~/services/user/userService"

export const getUserByUserId = createAsyncThunk('auth/getUserByUserId', async (userId:string, thunkAPI) => {
    try {
        return await UserService.getUserByUserId(userId);
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const createAddress = createAsyncThunk('user/createAddress', async ({ userId, addressDetail }: {userId:string, addressDetail: CreateAddressFormValues}) => {
    return await UserService.createAddress(userId, addressDetail)
})

export const updateAddress = createAsyncThunk('user/updateAddress', async ({ userId, addressDetail }: {userId:string, addressDetail: UpdateAddressFormValues} ) => {
    return await UserService.updateAddress(userId, addressDetail)
})