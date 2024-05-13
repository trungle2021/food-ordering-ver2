import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetNewAccessTokenPayload } from "~/interface/get-new-access-token-payload";
import { LoginPayload } from "~/interface/login-payload";
import { LogoutPayload } from "~/interface/logout-payload";
import { RegisterPayload } from "~/interface/register-payload";
import AuthService from "~/services/auth/auth.service";

interface AuthState {
  user: any;
  accessToken: string;
  refreshToken: string;
  loading: boolean;
  status: null | object;
  message: string;
  isLoggedIn: boolean;
  isRefreshingToken: null | object;
}
const initialState: AuthState = {
  user: {},
  accessToken: "",
  refreshToken: "",
  loading: false,
  status: null,
  message: "",
  isLoggedIn: false,
  isRefreshingToken: null
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
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (payload: LogoutPayload, thunkAPI) => {
  try {
    return await AuthService.logout(payload);
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err);
  }

})

export const getNewAccessToken = createAsyncThunk('auth/getNewAccessToken', async (payload: GetNewAccessTokenPayload, thunkAPI) => {
  try {
    const response = await AuthService.getNewAccessToken(payload);
    const { accessToken } = response.data;
    if (accessToken) {
      return response;
    }
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const authSlice = createSlice({
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.status = null;
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload.status === 'success') {
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
        if (action.payload.status === 'success') {
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
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.status = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        if (action.payload.status === 'success') {
          state.user = {};
          state.accessToken = "";
          state.refreshToken = "";
          state.loading = false;
          state.status = null;
          state.message = "";
          state.isLoggedIn = false;
        }
      })
      .addCase(logoutUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
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
          state.loading = false;
        }
      })
  },
  name: "auth",
});


const { reducer } = authSlice;
export default reducer;
