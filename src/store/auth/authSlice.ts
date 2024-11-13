import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getNewAccessToken,
  loginOAuth,
  loginUser,
  logoutUser,
  registerUser,
} from "./authAction";

interface AuthState {
  userId: string;
  oauthProvider: string | null;
  status: string;
  accessToken: string;
  refreshToken: string;
  isLoading: boolean;
  message: string;
  error: string;
  isLoggedIn: boolean;
  isRefreshingToken: null | object;
}
const initialState: AuthState = {
  userId: "",
  oauthProvider: null,
  status: "",
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
  reducers: {
    setOAuthProvider: (state, action: PayloadAction<string>) => {
      state.oauthProvider = action.payload;
    },
    updateToken: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.accessToken = action.payload.data.accessToken;
          state.refreshToken = action.payload.data.refreshToken;
          state.userId = action.payload.data.userId;
          state.message = "Login success";
          state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = 'Login failed';
      })

      builder
      .addCase(loginOAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginOAuth.fulfilled, (state, action) => {
          state.isLoading = false;
          state.accessToken = action?.payload?.data.accessToken;
          state.refreshToken = action?.payload?.data.refreshToken;
          state.userId = action?.payload?.data.userId;
          state.message = "Login success";
          state.isLoggedIn = true;
      })
      .addCase(loginOAuth.rejected, (state, action: PayloadAction<any>) => {
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
          state.userId = action.payload.data.userId;
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
          state.message = "Logged out successfully";
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
          state.accessToken = action.payload.data.accessToken;
          state.isLoading = false;
      })
      .addCase(getNewAccessToken.rejected, (state, action:any) => {
        state.status = action.payload.status;
        state.message = action.payload.message;
    });
  },
  name: "auth",
});
const { reducer, actions } = authSlice;
export const { updateToken, setOAuthProvider } = actions;
export default reducer;
