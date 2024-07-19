import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getNewAccessToken,
  loginUser,
  logoutUser,
  registerUser,
} from "./authAction";

interface AuthState {
  accessToken: string;
  refreshToken: string;
  isLoading: boolean;
  message: string;
  error: string;
  isLoggedIn: boolean;
  isRefreshingToken: null | object;
}
const initialState: AuthState = {
  accessToken: "",
  refreshToken: "",
  isLoading: false,
  message: "",
  error: "",
  isLoggedIn: false,
  isRefreshingToken: null,
};

export const authSlice = createSlice({
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.accessToken = action.payload.data.accessToken;
          state.refreshToken = action.payload.data.refreshToken;
          state.message = "Login success";
          state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = 'Login failed';
      })

      builder.addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.accessToken = action.payload.data.accessToken;
          state.refreshToken = action.payload.data.refreshToken;
          state.message = "Register success";
          state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = 'Register failed';
      })

      builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
          state.accessToken = "";
          state.refreshToken = "";
          state.isLoading = false;
          state.message = "";
          state.isLoggedIn = false;
      })
      .addCase(logoutUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = 'Logout failed';
      })

      builder.addCase(getNewAccessToken.pending, (state) => {
        // state.isRefreshingToken = true;
      })
      .addCase(getNewAccessToken.fulfilled, (state, action) => {
          console.log("New access token: " + action.payload.data.accessToken);
          state.accessToken = action.payload.data.accessToken;
          state.isLoading = false;
      });
  },
  name: "auth",
});
const { reducer, actions } = authSlice;
export default reducer;
