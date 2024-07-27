import { createSlice } from "@reduxjs/toolkit";
import CartState from "~/interface/cart/CartState";
import { addItem, getCart, removeItem, updateItem } from "./cartAction";

const initialState: CartState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    isLoading: false,
    error: "",
}

const cartSlice = createSlice({
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCart.pending, (state, action) => {
            state.isLoading = true;
        })
            .addCase(getCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.items;
                state.totalItems = action.payload.items.length;
                state.totalPrice = action.payload.total;
            })
            .addCase(getCart.rejected, (state, action: any) => {
                state.isLoading = false;
                state.error = action.payload || "Something went wrong";
            })
            .addCase(addItem.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(addItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.items;
                state.totalItems = action.payload.items.length;
                state.totalPrice = action.payload.total;
            })
            .addCase(addItem.rejected, (state, action: any) => {
                state.isLoading = false;
                state.error = action.payload || "Something went wrong";
            })
            .addCase(updateItem.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.items;
                state.totalItems = action.payload.items.length;
                state.totalPrice = action.payload.total;
            })
            .addCase(updateItem.rejected, (state, action: any) => {
                state.isLoading = false;
                state.error = action.payload || "Something went wrong";
            }
            )
            .addCase(removeItem.pending, (state, action) => {

            })
            .addCase(removeItem.fulfilled, (state, action) => {

            })
            .addCase(removeItem.rejected, (state, action: any) => {

            })
    },
    name: "cart"
})

const { reducer } = cartSlice
export default reducer