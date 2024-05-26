import { createSlice } from "@reduxjs/toolkit";
import CartState from "~/interface/cart/CartState";
import { addItem, getCart, removeItem, updateItem } from "./cartAction";

const initialState : CartState= {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    isLoading: false,
    error: null,
}

const cartSlice = createSlice({
   initialState,
   reducers: {},
   extraReducers: (builder) => {
       builder.addCase(getCart.pending, (state, action) => {
              state.isLoading = true;
       });
       builder.addCase(getCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.items;
                state.totalItems = action.payload.totalItems;
                state.totalPrice = action.payload.totalPrice;
       });
       builder.addCase(getCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.toString();
       });
       builder.addCase(addItem.pending, (state, action) => {});
       builder.addCase(addItem.fulfilled, (state, action) => {});
       builder.addCase(addItem.rejected, (state, action) => {});
       builder.addCase(updateItem.pending, (state, action) => {});
       builder.addCase(updateItem.fulfilled, (state, action) => {});
       builder.addCase(updateItem.rejected, (state, action) => {});
       builder.addCase(removeItem.pending, (state, action) => {});
       builder.addCase(removeItem.fulfilled, (state, action) => {});
       builder.addCase(removeItem.rejected, (state, action) => {});
   }, 
   name: "cart"
})

const {reducer} = cartSlice
export default reducer