import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetNewAccessTokenPayload } from "~/interface/auth/get-new-access-token-payload";
import { LoginPayload } from "~/interface/auth/login-payload";
import { RegisterPayload } from "~/interface/auth/register-payload";
import AuthService from "~/services/auth/auth-service";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (payload: LoginPayload, thunkAPI) => {
        try {
            const response = await AuthService.login(payload);
            const { user, accessToken, refreshToken } = response.data;

            if (user && accessToken && refreshToken) {
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
        const { user, accessToken, refreshToken } = response.data;
        if (user && accessToken && refreshToken) {
            return response;
        }
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (payload, thunkAPI) => {
    try {
        return await AuthService.logout();
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

