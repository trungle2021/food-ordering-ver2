import { createSlice } from "@reduxjs/toolkit";
import { getOrderHistory } from "./orderAction";
import OrderProps from "~/interface/order/orderResponse";


interface OrderState {
    orderHistories: OrderProps[],
    isLoading: boolean,
    totalPage: number,
    error: string
}

const initialState: OrderState = {
    orderHistories: [],
    isLoading: false,
    totalPage: 1,
    error: ''
}

const orderSlice = createSlice({
    initialState,
    reducers: {},
    name: 'order',
    extraReducers: (builder) => {
        builder.addCase(getOrderHistory.pending, (state, action) => {
            state.isLoading = true;
        })
            .addCase(getOrderHistory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderHistories = action.payload.data.orders;
                state.totalPage = action.payload.data.totalPages;
            })
            .addCase(getOrderHistory.rejected, (state, action: any) => {
                state.isLoading = false;
                state.error = action.payload || "Something went wrong";
            });
    }


})

const { reducer } = orderSlice;
export default reducer;

