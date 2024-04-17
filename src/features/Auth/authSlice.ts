import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: any;
  accessToken: string;
  refreshToken: string;
  loading: false;
  error: null;
  message: string
}
const initialState: AuthState = {
  user: {},
  accessToken: "",
  refreshToken: "",
  loading: false,
  error: null,
  message: ""
};

const loginUser = createAsyncThunk('loginUser',)

export const authSlice = createSlice({
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },

    logout: (state, action) => {
      state.user = {};
      state.accessToken = "";
      state.refreshToken = "";
    },
  },
  extraReducers(builder) {
    // Add extra reducers here
  },
  name: "auth",
});

const { actions, reducer } = authSlice;
export const { login, logout } = actions;
export default reducer;
