// import axios from "~/lib/axios";
// import { loginApi, registerApi, logoutApi, refreshTokenApi } from "~/utils/api";
// import { LoginPayload } from "~/interface/auth/loginPayload";
// import { RegisterPayload } from "~/interface/auth/registerPayload";
// import { GetNewAccessTokenPayload } from "~/interface/auth/getNewAccessTokenPayload";

// const login = (credential: LoginPayload): Promise<any> => {
//   return axios.post(loginApi, credential);
// };

// const register = (registerUserFormData: RegisterPayload): Promise<any> => {
//   return axios.post(registerApi, registerUserFormData);
// }

// const logout = (): Promise<any> => {
//   return axios.post(`${logoutApi}`);
// }

// const getNewAccessToken = (payload: GetNewAccessTokenPayload): Promise<any> => {
//   return axios.post(refreshTokenApi, payload);
// }

// const AuthService = {
//   login,
//   register,
//   logout,
//   getNewAccessToken,
// };

// export default AuthService;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginPayload } from '~/interface/auth/loginPayload';
import { RegisterPayload } from '~/interface/auth/registerPayload';
import { GetNewAccessTokenPayload } from '~/interface/auth/getNewAccessTokenPayload';
import { baseAuthApi } from '~/utils/api';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseAuthApi }), // Adjust base URL as needed
  endpoints: (builder) => ({

    login: builder.mutation<any, LoginPayload>({
      query: (credential) => ({
        url: '/login',
        method: 'POST',
        body: credential,
      }),
    }),

    register: builder.mutation<any, RegisterPayload>({
      query: (registerUserFormData) => ({
        url: '/register',
        method: 'POST',
        body: registerUserFormData,
      }),
    }),

    logout: builder.mutation<any, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),

    getNewAccessToken: builder.mutation<any, GetNewAccessTokenPayload>({
      query: (payload) => ({
        url: '/refresh-token',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useGetNewAccessTokenMutation } = authApi;
export default authApi;