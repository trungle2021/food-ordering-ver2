import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginPayload } from "~/interface/login.payload";
import { RegisterPayload } from "~/interface/register.payload";
import AuthService from "~/services/auth/auth.service";

interface AuthState {
  user: any;
  accessToken: string;
  refreshToken: string;
  loading: boolean;
  status: null | object;
  message: string;
  isLoggedIn: boolean;
}
const initialState: AuthState = {
  user: {},
  accessToken: "",
  refreshToken: "",
  loading: false,
  status: null,
  message: "",
  isLoggedIn: false
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload: LoginPayload, thunkAPI) => {
    try {
      const response = await AuthService.login(payload);
      const { user, accessToken, refreshToken } = response.data;

      if (user && accessToken && refreshToken) {
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
    const { user, accessToken, refreshToken } = response.data;
    if (user && accessToken && refreshToken) {
      return response;
    } 
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const authSlice = createSlice({
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = {};
      state.accessToken = "";
      state.refreshToken = "";
      state.loading = false;
      state.status = null;
      state.message = "";
      state.isLoggedIn = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.status = null;
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if(action.payload.status === 'success'){
          state.loading = false;
          state.user = action.payload.data.user;
          state.accessToken = action.payload.data.accessToken;
          state.refreshToken = action.payload.data.refreshToken;
          state.message = "Login success";
          state.isLoggedIn = true;
          state.status = action.payload.status;
        }
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.status = action.payload.status;
        state.message = action.payload.message
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.status = null;
        state.user = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        if(action.payload.status === 'success'){
          state.loading = false;
          state.user = action.payload.data.user;
          state.accessToken = action.payload.data.accessToken;
          state.refreshToken = action.payload.data.refreshToken;
          state.message = "Register success";
          state.isLoggedIn = true;
          state.status = action.payload.status;
        }
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.status = action.payload.status;
        state.message = action.payload.message
      });
  },
  name: "auth",
});

export const { logoutUser } = authSlice.actions;
const { reducer } = authSlice;
export default reducer;
