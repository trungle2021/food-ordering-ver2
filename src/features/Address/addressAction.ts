import { createAsyncThunk } from "@reduxjs/toolkit"
import AddressService from "~/services/address/addressService"

export const addAddress = createAsyncThunk('address/addAddress', async (formData: AddAddressFormValues, { rejectWithValue }) => {
        return await AddressService.addAddress(formData)
})
