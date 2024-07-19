import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetNewAccessTokenPayload } from "~/interface/auth/getNewAccessTokenPayload";
import { LoginPayload } from "~/interface/auth/loginPayload";
import { RegisterPayload } from "~/interface/auth/registerPayload";
import AuthService from "~/services/auth/authService";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (payload: LoginPayload, thunkAPI) => {
        try {
            const response = await AuthService.login(payload);
            const { accessToken, refreshToken } = response.data;

            if (accessToken && refreshToken) {
                return response;
            }
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const registerUser = createAsyncThunk('auth/registerUser', async (payload: RegisterPayload, thunkAPI) => {
    try {
        const response = await AuthService.register(payload);
        const {  accessToken, refreshToken } = response.data;
        if ( accessToken && refreshToken) {
            return response;
        }
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (userId:string, thunkAPI) => {
    try {
        return await AuthService.logout(userId);
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err);
    }

})

export const getNewAccessToken = createAsyncThunk('auth/getNewAccessToken', async (payload: GetNewAccessTokenPayload, thunkAPI) => {
    try {
        const response = await AuthService.getNewAccessToken(payload);
        const { accessToken } = response.data;
        if (accessToken) {
            return response;
        }
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err);
    }
})

