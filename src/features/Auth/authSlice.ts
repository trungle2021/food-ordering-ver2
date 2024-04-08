import { createSlice } from "@reduxjs/toolkit";
import { access } from "fs";
import { ref } from "yup";

interface AuthState {
  user: object | undefined;
  accessToken: string;
  refreshToken: string;
}
const initialState: AuthState = {
  user: undefined,
  accessToken: "",
  refreshToken: "",
};

export const authSlice = createSlice({
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    logout: (state) => {
      state.user = undefined;
      state.accessToken = "";
      state.refreshToken = "";
    },
  },
  name: "auth",
});

const { actions, reducer } = authSlice;
export const { login, logout } = actions;
export default reducer;
