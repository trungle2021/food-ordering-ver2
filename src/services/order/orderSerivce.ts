import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseOrderApi } from "~/utils/api";

const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseOrderApi }), // Adjust base URL as needed
  endpoints: (builder) => ({
    getRecentOrderList: builder.query<any, { userId: string; limit: number }>({
      query: ({ userId, limit }) => ({
        url: `/recent-orders/users/${userId}?limit=${limit}`,
        method: 'GET',
      }),
    }),
    getOrderHistory: builder.query<any, { userId: string; filter?: string; page: number; limit: number }>({
      query: ({ userId, filter, page, limit }) => {
        const queryFilter = filter ? `${filter}&` : '';
        return {
          url: `/history/users/${userId}?${queryFilter}page=${page}&limit=${limit}`,
          method: 'GET',
        };
      },
    }),
    getOrder: builder.query<any, string>({
      query: (orderId) => ({
        url: `/${orderId}`,
        method: 'GET',
      }),
    }),
    checkOut: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/check-out`,
        method: 'POST',
        body: payload,
      }),
    }),
    updateOrder: builder.mutation<any, { orderId: string; payload: any }>({
      query: ({ orderId, payload }) => ({
        url: `/${orderId}`,
        method: 'PUT',
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetRecentOrderListQuery,
  useGetOrderHistoryQuery,
  useGetOrderQuery,
  useCheckOutMutation,
  useUpdateOrderMutation,
} = orderApi;
export default orderApi;
