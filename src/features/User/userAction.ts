import { createAsyncThunk } from "@reduxjs/toolkit"
import UserService from "~/services/user/userService"

export const getUserByUserId = createAsyncThunk('auth/getUserByUserId', async (userId:string, thunkAPI) => {
    try {
        return await UserService.getUserByUserId(userId);
    } catch (err: any) {
        return thunkAPI.rejectWithValue("Fetch user failed");
    }
})

export const createAddress = createAsyncThunk('user/createAddress', async ({ userId, addressDetail }: {userId:string, addressDetail: CreateAddressFormValues}, thunkAPI) => {
    try {
        return await UserService.createAddress(userId, addressDetail);
    } catch (err: any) {
        return thunkAPI.rejectWithValue("Create address failed");
    }
})

export const updateAddress = createAsyncThunk('user/updateAddress', async ({ userId, addressDetail }: {userId:string, addressDetail: UpdateAddressFormValues}, thunkAPI ) => {
    try {
        return await UserService.updateAddress(userId, addressDetail);
    } catch (err: any) {
        return thunkAPI.rejectWithValue("Update address failed");
    }
})