import { createSlice } from "@reduxjs/toolkit";
import { addAddressAsync } from "./addressAction";
import { AddressResponse } from "~/interface/address/addressResponse";

type AddressState = {
    addresses: AddressResponse[];
    isLoading: boolean;
    errors: string
}

const initialState: AddressState = {
    addresses: [],
    isLoading: false,
    errors: ''
};
const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(addAddressAsync.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addAddressAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addresses = [...state.addresses, action.payload];
            state.errors = '';
        });
        builder.addCase(addAddressAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.errors = action?.error?.message || 'Something went wrong'
        });
    }
})

const {reducer} = addressSlice
export default reducer