import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseCategoryApi } from '~/utils/api';

const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseCategoryApi }),
  endpoints: (builder) => ({
    getCategoryList: builder.query<any, { limit?: number }>({
      query: ({ limit }) => ({
        url: `/`,
        method: 'GET',
        params: { limit },
      }),
    }),
  }),
});

export const { useGetCategoryListQuery } = categoryApi;
export default categoryApi;

