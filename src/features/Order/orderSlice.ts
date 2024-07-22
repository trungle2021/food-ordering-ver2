import { createSlice } from "@reduxjs/toolkit";
import { checkOut, getOrder, getOrderHistory } from "./orderAction";
import OrderProps from "~/interface/order/orderResponse";



interface OrderState {
    orderHistories: OrderProps[],
    order: OrderProps,
    isLoading: boolean,
    totalPage: number,
    error: string
}

const initialState: OrderState = {
    orderHistories: [],
    order: {
        _id: "",
        user: "",
        order_date: "",
        created_at: "",
        time_completed: null,
        order_status: "",
        order_details: [],
        payment_status: "",
        payment_method: null,
        order_total: 0,
        shipping_address: ""
    },
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

        builder.addCase(getOrder.pending, (state, action) => {
            state.isLoading = true;
        })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.order = action.payload.data;
            })
            .addCase(getOrder.rejected, (state, action: any) => {
                state.error = action.payload || "Something went wrong";
            })

        builder.addCase(checkOut.pending, (state, action) => {
            state.isLoading = true;
        })
            .addCase(checkOut.fulfilled, (state, action) => {
                state.isLoading = false;
                state.order = action.payload.data;
            })
            .addCase(checkOut.rejected, (state, action:any) => {
                state.error = action.payload || "Something went wrong";
            })
    }
})

const { reducer } = orderSlice;
export default reducer;

