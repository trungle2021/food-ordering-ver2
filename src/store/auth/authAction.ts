import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetNewAccessTokenPayload } from "~/interface/auth/getNewAccessTokenPayload";
import LoginOAuthPayload from "~/interface/auth/loginOAuthPayload";
import { LoginPayload } from "~/interface/auth/loginPayload";
import { RegisterPayload } from "~/interface/auth/registerPayload";
import AuthService from "~/services/auth/authService";

export const loginOAuth = createAsyncThunk("auth/loginOAuth", async (payload: LoginOAuthPayload, thunkAPI) => {
    try{
        const {token, provider} = payload;
        const response = await AuthService.loginOAuth(token, provider);
        const { accessToken, refreshToken } = response.data;

        if (accessToken && refreshToken) {
            return response;
        }
    }catch (err: any){
        return thunkAPI.rejectWithValue(err);
    }
})

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

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, thunkAPI) => {
    try {
        return await AuthService.logout();
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const getNewAccessToken = createAsyncThunk('auth/getNewAccessToken', async (payload: GetNewAccessTokenPayload, thunkAPI) => {
    try {
        return await AuthService.getNewAccessToken(payload);
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err);
    }
})

