import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AddressResponse } from '~/interface/user/addressResponse';
import { BaseUser } from '~/interface/user/baseUser';
import { baseUserApi } from '~/utils/api';

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUserApi }), // Adjust base URL as necessary
    endpoints: (builder) => ({
        getUserByUserId: builder.query<BaseUser, string>({
            query: (userId) => `/${userId}`,
        }),
        getUserAddressList: builder.query<AddressResponse[], string>({
            query: (userId) => `${userId}/addresses`,
        }),
        createAddress: builder.mutation<void, { userId: string; addressDetail: CreateAddressFormValues }>({
            query: ({ userId, addressDetail }) => ({
                url: `/${userId}/addresses`,
                method: 'POST',
                body: addressDetail,
            }),
        }),
        updateAddress: builder.mutation<void, { userId: string; addressDetail: UpdateAddressFormValues }>({
            query: ({ userId, addressDetail }) => ({
                url: `/${userId}/addresses`,
                method: 'PUT',
                body: addressDetail,
            }),
        }),
    }),
});

export const {
    useGetUserByUserIdQuery,
    useGetUserAddressListQuery,
    useCreateAddressMutation,
    useUpdateAddressMutation,
} = userApi;

export default userApi;
