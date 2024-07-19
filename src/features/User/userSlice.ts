import { createSlice } from "@reduxjs/toolkit";
import {
    getUserByUserId,
    createAddress,
    updateAddress
} from "./userAction";
import { BaseUser } from "~/interface/user/baseUser";

interface UserState {
    user: BaseUser | null;
    isLoading: boolean;
    error: string
}
const initialState: UserState = {
    user: {
        _id: "",
        name: "",
        phone: "",
        email: "",
        avatar: "",
        user_address: [],
    },
    isLoading: false,
    error: ''
};

export const userSlice = createSlice({
    initialState,
    reducers: {
        updateAddressInState: (state, action) => {
            const newAddress = action.payload
            if (state.user && state.user.user_address.length > 0) {
                const currentUserAddressList = [...state.user.user_address];
                state.user.user_address = [...currentUserAddressList, newAddress];
                console.log(state.user.user_address);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUserByUserId.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getUserByUserId.fulfilled, (state, action) => {
            state.user = action.payload.data.user;
            state.isLoading = false;
        })
        builder.addCase(getUserByUserId.rejected, (state) => {
            state.error = "Failed to get user information"
        })

        builder.addCase(createAddress.pending, (state) => { })
        builder.addCase(createAddress.fulfilled, (state) => { })
        builder.addCase(createAddress.rejected, (state) => { })

        builder.addCase(updateAddress.pending, (state) => { })
        builder.addCase(updateAddress.fulfilled, (state) => { })
        builder.addCase(updateAddress.rejected, (state) => { })

    },
    name: "user",
});
const { reducer, actions } = userSlice;
export const { updateAddressInState } = actions;
export default reducer;
