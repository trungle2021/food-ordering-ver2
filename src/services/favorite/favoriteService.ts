import { baseFavoriteApi } from "~/utils/api";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const favoriteApi = createApi({
  reducerPath: 'favoriteApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseFavoriteApi }),
  endpoints: (builder) => ({
    createFavoriteDish: builder.mutation<any, { dishId: string; userId: string }>({
      query: ({ dishId, userId }) => ({
        url: '/',
        method: 'POST',
        body: { dishId, userId },
      }),
    }),
    deleteFavoriteDish: builder.mutation<any, string>({
      query: (favoriteId) => ({
        url: `/${favoriteId}`,
        method: 'DELETE',
      }),
    }),
    getFavoriteDishes: builder.query<any, string>({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateFavoriteDishMutation,
  useDeleteFavoriteDishMutation,
  useGetFavoriteDishesQuery,
} = favoriteApi;
export default favoriteApi;