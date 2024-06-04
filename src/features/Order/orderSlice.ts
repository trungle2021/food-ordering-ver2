import { createSlice } from "@reduxjs/toolkit";
import OrderProps from "~/interface/order/order-response";



interface OrderState {
    orders: OrderProps[],
    isLoading: boolean,
    error: string | null
}

const initialState: OrderState = {
    orders: [],
    isLoading: false,
    error: null
}

const orderSlice = createSlice({
    initialState,
    reducers:{},
    name: 'order',
    extraReducers: (builder) => {
        builder.addCase(getOrders.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orders = action.payload;
        });
        builder.addCase(getOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || "Something went wrong";
        });
    }
})