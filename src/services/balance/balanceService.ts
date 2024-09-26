import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseBalanceApi } from '~/utils/api';

const balanceApi = createApi({
  reducerPath: 'balanceApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseBalanceApi }), // Adjust base URL as needed
  endpoints: (builder) => ({
    getBalanceByUserId: builder.query<any, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetBalanceByUserIdQuery } = balanceApi;
export default balanceApi;
