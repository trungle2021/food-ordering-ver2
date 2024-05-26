import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getNewAccessToken, loginUser, logoutUser, registerUser } from "./authAction";

interface AuthState {
  user: any;
  accessToken: string;
  refreshToken: string;
  isLoading: boolean;
  status: null | object;
  message: string;
  isLoggedIn: boolean;
  isRefreshingToken: null | object;
}
const initialState: AuthState = {
  user: {},
  accessToken: "",
  refreshToken: "",
  isLoading: false,
  status: null,
  message: "",
  isLoggedIn: false,
  isRefreshingToken: null
};


export const authSlice = createSlice({
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.status = null;
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload.status === 'success') {
          state.isLoading = false;
          state.user = action.payload.data.user;
          state.accessToken = action.payload.data.accessToken;
          state.refreshToken = action.payload.data.refreshToken;
          state.message = "Login success";
          state.isLoggedIn = true;
          state.status = action.payload.status;
        }
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.status = action.payload.status;
        state.message = action.payload.message
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.status = null;
        state.user = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        if (action.payload.status === 'success') {
          state.isLoading = false;
          state.user = action.payload.data.user;
          state.accessToken = action.payload.data.accessToken;
          state.refreshToken = action.payload.data.refreshToken;
          state.message = "Register success";
          state.isLoggedIn = true;
          state.status = action.payload.status;
        }
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.status = action.payload.status;
        state.message = action.payload.message
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        if (action.payload.status === 'success') {
          state.user = {};
          state.accessToken = "";
          state.refreshToken = "";
          state.isLoading = false;
          state.status = null;
          state.message = "";
          state.isLoggedIn = false;
        }
      })
      .addCase(logoutUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.status = action.payload.status;
        state.message = action.payload.message
      })
      .addCase(getNewAccessToken.pending, (state) => {
        // state.isRefreshingToken = true;
      }).addCase(getNewAccessToken.fulfilled, (state, action) => {
        console.log("Status: " + action.payload.status)
        if (action.payload.status === 'success') {
          console.log("New access token: " + action.payload.data.accessToken)
          state.accessToken = action.payload.data.accessToken;
          state.isLoading = false;
        }
      })
  },
  name: "auth",
});


const { reducer } = authSlice;
export default reducer;
