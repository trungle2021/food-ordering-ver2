import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userId: string;
  status: string;
  accessToken: string;
  refreshToken: string;
  isLoggedIn: boolean;
  isRefreshingToken: null | object;
}
const initialState: AuthState = {
  status: "",
  accessToken: "",
  refreshToken: "",
  isLoggedIn: false,
  isRefreshingToken: null,
  userId: ""
};

export const authSlice = createSlice({
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken
    },
    loginUser: (state, action: PayloadAction<any>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
    },
    registerUser: (state, action: PayloadAction<any>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.status = "";
      state.accessToken = "";
      state.refreshToken = "";
      state.isLoggedIn = false;
      state.isRefreshingToken = null;
      state.userId = "";
    },
    getNewAccessToken: (state, action: PayloadAction<any>) => {
      state.accessToken = action.payload.accessToken;
    }
  },
  name: "auth",
});
const { reducer, actions } = authSlice;
export const { updateToken, loginUser, registerUser, logoutUser, getNewAccessToken } = actions;
export default reducer;
