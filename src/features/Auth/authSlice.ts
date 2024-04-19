import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginPayload } from "~/interface/LoginPayload";
import AuthService from "~/services/auth/auth-service";

interface AuthState {
  user: any;
  accessToken: string;
  refreshToken: string;
  loading: false;
  error: null;
  message: string;
}
const initialState: AuthState = {
  user: null,
  accessToken: "",
  refreshToken: "",
  loading: false,
  error: null,
  message: "null"
};


export const loginUser = createAsyncThunk('auth/loginUser', async (payload: LoginPayload, thunkAPI) => {
  try {
    const response = await AuthService.checkLogin(payload);
    const { user, accessToken, refreshToken } = response;
    if (user && accessToken && refreshToken) {
      return response
    } else {
      console.log("Login failed");
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
})

export const authSlice = createSlice({
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    // Add extra reducers here
  },
  name: "auth",
});

const { reducer } = authSlice;
export default reducer;
