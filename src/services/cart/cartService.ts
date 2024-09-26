import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseCartApi, getCartByUserIdApi } from "~/utils/api";

const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseCartApi }),
  endpoints: (builder) => ({
    getCart: builder.query<any, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'GET',
      }),
    }),
    addItem: builder.mutation<any, {dishId: string, quantity: number}>({
      query: (payload) => ({
        url: '',
        method: 'POST',
        body: payload,
      }),
    }),
    updateItem: builder.mutation<any, {dishId: string, updateQuantity: number}>({
      query: (payload) => ({
        url: '',
        method: 'PUT',
        body: payload,
      }),
    }),
    removeItem: builder.mutation<any, string>({
      query: (dishId) => ({
        url: `/${dishId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetCartQuery, useAddItemMutation, useUpdateItemMutation, useRemoveItemMutation } = cartApi;