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
        oauthProviders: [],
        is_email_verified: false,
    },
    isLoading: false,
    error: ''
};

export const userSlice = createSlice({
    initialState,
    reducers: {
        // add new address to user_address
        addAddress: (state, action) => {
            if (state.user){
                const userAddress = state.user.user_address
                state.user.user_address = Array.isArray(userAddress) ? [...userAddress, action.payload] : [userAddress, action.payload];
            }
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUserByUserId.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getUserByUserId.fulfilled, (state, action) => {
            console.log("action: ", action)
            state.user = action.payload.data;
            state.isLoading = false;
        })
        .addCase(getUserByUserId.rejected, (state) => {
            state.error = "Failed to get user information"
        })

        .addCase(createAddress.pending, (state) => { 
            state.isLoading = true;
        })
        .addCase(createAddress.fulfilled, (state, action:any) => {
            state.user = action.payload.data
            state.isLoading = false;

         })
        .addCase(createAddress.rejected, (state, action:any) => { 
            state.error = action.payload
        })

        .addCase(updateAddress.pending, (state) => { 
            state.isLoading = true;
        })
        .addCase(updateAddress.fulfilled, (state, action: any) => { 
            state.isLoading = false;
            state.user = action.payload.data
        })
        .addCase(updateAddress.rejected, (state, action:any) => { 
            state.error = action.payload;
        })
    },
    name: "user",
});
const { reducer, actions } = userSlice;
export const { addAddress } = actions;
export default reducer;
