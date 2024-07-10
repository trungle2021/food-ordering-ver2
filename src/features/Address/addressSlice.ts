import { createSlice } from "@reduxjs/toolkit";
import { addAddress } from "./addressAction";
import { Address } from "~/interface/address/addressState";

type AddressState = {
    addresses: Address[];
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
        builder.addCase(addAddress.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addresses = [...state.addresses, action.payload];
            state.errors = '';
        });
        builder.addCase(addAddress.rejected, (state, action) => {
            state.isLoading = false;
            state.errors = action?.error?.message || 'Something went wrong'
        });
    }
})

const {reducer} = addressSlice
export default reducer