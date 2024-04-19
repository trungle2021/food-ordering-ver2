import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginPayload } from "~/interface/LoginPayload";
import AuthService from "~/services/auth/auth-service";

interface AuthState {
  user: any;
  accessToken: string;
  refreshToken: string;
  loading: boolean;
  error: null | string;
  message: string;
}
const initialState: AuthState = {
  user: {},
  accessToken: "",
  refreshToken: "",
  loading: false,
  error: "",
  message: "",
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload: LoginPayload, thunkAPI) => {
    try {
      const response = await AuthService.checkLogin(payload);
      const { user, accessToken, refreshToken } = response.data;
      if (user && accessToken && refreshToken) {
        return response.data;
      } else {
        console.log("Login failed");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const authSlice = createSlice({
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("action", action.payload);
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.message = "Login success";
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = null;

        console.log(action);
        if (action.error.message === "Request failed with status code 401") {
          state.error = "Access denied. Please check your email and password";
        } else {
          state.error = action.error.message || null;
        }
      });
  },
  name: "auth",
});

const { reducer } = authSlice;
export default reducer;
