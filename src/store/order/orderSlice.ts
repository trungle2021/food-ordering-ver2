import { createSlice } from "@reduxjs/toolkit";
import { getOrderHistory } from "./orderAction";
import OrderProps from "~/interface/order/orderResponse";


interface OrderState {
    data: OrderProps[],
    isLoading: boolean,
    totalPage: number,
    error: string
}

const initialState: OrderState = {
    data: [],
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
                state.data = action.payload.data.results;
                state.totalPage = action.payload.totalPages;
            })
            .addCase(getOrderHistory.rejected, (state, action: any) => {
                state.isLoading = false;
                state.error = action.payload || "Something went wrong";
            });
    }


})

const { reducer } = orderSlice;
export default reducer;

