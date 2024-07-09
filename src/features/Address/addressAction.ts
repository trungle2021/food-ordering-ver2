import { createAsyncThunk } from "@reduxjs/toolkit"

export const addAddress = createAsyncThunk('address/addAddress', async (formData: AddAddressFormValues, { rejectWithValue }) => {
    try {
        const response = await axios.post('/address', formData)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
