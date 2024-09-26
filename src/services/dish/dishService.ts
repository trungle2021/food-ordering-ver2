import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseDishApi } from "~/utils/api";

const mapSortParam = (param: string): string => {
    switch (param) {
        case 'Price-Ascending':
            return 'price';
        case 'Price-Descending':
            return '-price';
        case 'Newest':
            return '-created';
        default:
            return param;
    }
};

const replaceSortParams = (queryParams: string): string => {
    return queryParams.replace(/sort=([^&]*)/g, (_, sortValue) => {
        return `sort=${mapSortParam(sortValue)}`;
    });
};

const dishApi = createApi({
  reducerPath: 'dishApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseDishApi }),
  endpoints: (builder) => ({
    getDishes: builder.query<any, { queryParams: string; limit: number }>({
      query: ({ queryParams, limit }) => {
        const modifiedQueryParams = replaceSortParams(queryParams);
        return {
          url: `?${modifiedQueryParams}&limit=${limit}`,
          method: 'GET',
        };
      },
    }),
    getPopularDishes: builder.query<any, { limit: number }>({
      query: ({ limit }) => ({
        url: `/popular-dishes?limit=${limit}`,
        method: 'GET',
      }),
    }),
    searchDishes: builder.query<any, { keyword: string; limit: number }>({
      query: ({ keyword, limit }) => ({
        url: `/search?keyword=${keyword}&limit=${limit}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetDishesQuery,
  useGetPopularDishesQuery,
  useSearchDishesQuery,
} = dishApi;
export default dishApi;
