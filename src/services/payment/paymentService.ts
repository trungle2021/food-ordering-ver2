import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { basePaymentApi } from "~/utils/api";
import TopUpProps from "~/interface/balance/topUp";

const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({ baseUrl: basePaymentApi }), // Adjust base URL as needed
  endpoints: (builder) => ({
    topUp: builder.mutation<any, TopUpProps>({
      query: (payload) => ({
        url: '/top-up',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useTopUpMutation } = paymentApi;
export default paymentApi;