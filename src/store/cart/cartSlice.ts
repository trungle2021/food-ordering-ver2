import { createSlice } from "@reduxjs/toolkit";
import CartState from "~/interface/cart/CartState";
import { addItem, getCart, removeItem, updateItem } from "./cartAction";

const initialState: CartState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    isLoading: false,
    cartHasBeenUpdated: false,
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
                // state.cartIsUpdated = false;
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
                state.cartHasBeenUpdated = true;
            })
            .addCase(addItem.rejected, (state, action: any) => {
                state.error = action.payload || "Something went wrong";
            })
            .addCase(updateItem.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                state.cartHasBeenUpdated = true;
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
    },
    name: "cart"
})

const { reducer } = cartSlice
export default reducer