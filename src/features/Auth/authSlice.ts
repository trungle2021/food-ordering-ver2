import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginPayload } from "~/interface/LoginPayload";
import AuthService from "~/services/auth/auth-service";

interface AuthState {
  user: any;
  accessToken: string;
  refreshToken: string;
  loading: boolean;
  error: null | object;
  message: string;
}
const initialState: AuthState = {
  user: {},
  accessToken: "",
  refreshToken: "",
  loading: false,
  error: null,
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
    } catch (err: any) {
      let error = err.response ? err.response.data : err.message;
      return thunkAPI.rejectWithValue(error);
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
        console.log(action.payload)
        if(action.payload.status === 'success'){
          state.loading = false;
          state.user = action.payload.user;
          state.accessToken = action.payload.data.accessToken;
          state.refreshToken = action.payload.data.refreshToken;
          state.message = "Login success";
          state.error = null;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("state", state)
        console.log("action", action);
        // state.loading = false;
        // state.error = null;
        // state.user = null;

        // if (action.payload === "fail") {
        //   state.error = action.payload;
        // } else {
        //   state.error = action.error.message || null;
        // }
      });
  },
  name: "auth",
});

const { reducer } = authSlice;
export default reducer;
