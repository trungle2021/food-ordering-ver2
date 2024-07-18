import { createAsyncThunk } from "@reduxjs/toolkit"
import AddressService from "~/services/address/addressService"

export const addAddressAsync = createAsyncThunk('address/addAddress', async (payload: AddressFormValues, { rejectWithValue }) => {
        return await AddressService.addAddress(payload)
})

export const updateAddressAsync = createAsyncThunk('address/updateAddress', async (payload: AddressFormValues, { rejectWithValue }) => {
        return await AddressService.updateAddress(payload)
})