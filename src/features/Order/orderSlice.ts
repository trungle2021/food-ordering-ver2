import { createSlice } from "@reduxjs/toolkit";
import OrderProps from "~/interface/order/order-response";
import { getOrderHistory } from "./orderAction";



interface OrderState {
    isLoading: boolean,
    orders: OrderProps[],
    totalPages: number,
    error: string | null
}

const initialState: OrderState = {
    orders: [],
    isLoading: false,
    totalPages: 1,
    error: null
}

const orderSlice = createSlice({
    initialState,
    reducers: {},
    name: 'order',
    extraReducers: (builder) => {
        builder.addCase(getOrderHistory.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getOrderHistory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orders = action.payload.data.orders;
            state.totalPages = action.payload.data.totalPages;
        });
        builder.addCase(getOrderHistory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || "Something went wrong";
        });
    }
})

const { reducer } = orderSlice;
export default reducer;

