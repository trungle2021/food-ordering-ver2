import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getNewAccessToken,
  loginUser,
  logoutUser,
  registerUser,
} from "./authAction";
import { BaseUser } from "~/interface/user/baseUser";

interface AuthState {
  user: BaseUser | null;
  accessToken: string;
  refreshToken: string;
  isLoading: boolean;
  message: string;
  isLoggedIn: boolean;
  isRefreshingToken: null | object;
}
const initialState: AuthState = {
  user: {
    _id: "",
    name: "",
    phone: "",
    email: "",
    avatar: "",
    user_address: [],
  },
  accessToken: "",
  refreshToken: "",
  isLoading: false,
  message: "",
  isLoggedIn: false,
  isRefreshingToken: null,
};

export const authSlice = createSlice({
  initialState,
  reducers: {
    updateAddress: (state, action) => {
      const currentUserAddressList = [...(<[]>state?.user?.user_address)];
      if (state.user && state.user.user_address) {
        const currentUserAddressList = [...state.user.user_address];
        state.user.user_address = [...currentUserAddressList, action.payload];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload.data.user;
          state.accessToken = action.payload.data.accessToken;
          state.refreshToken = action.payload.data.refreshToken;
          state.message = "Login success";
          state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.user = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload.data.user;
          state.accessToken = action.payload.data.accessToken;
          state.refreshToken = action.payload.data.refreshToken;
          state.message = "Register success";
          state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
          state.user = null;
          state.accessToken = "";
          state.refreshToken = "";
          state.isLoading = false;
          state.message = "";
          state.isLoggedIn = false;
      })
      .addCase(logoutUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(getNewAccessToken.pending, (state) => {
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
export const { updateAddress } = actions;
export default reducer;
