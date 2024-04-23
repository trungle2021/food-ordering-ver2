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
        return response;
      } else {
        console.log("Login failed");
      }
    } catch (err: any) {
      console.log("Login failed", err);
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
        if(action.payload.status === 'success'){
          console.log("status is success")
          state.loading = false;
          state.user = action.payload.data.user;
          state.accessToken = action.payload.data.accessToken;
          state.refreshToken = action.payload.data.refreshToken;
          state.message = "Login success";
          state.error = null;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("Rejected");
        state.loading = false;
        state.error = null;
        state.user = null;
      });
  },
  name: "auth",
});

const { reducer } = authSlice;
export default reducer;
