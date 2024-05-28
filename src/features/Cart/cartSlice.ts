import { createSlice } from "@reduxjs/toolkit";
import CartState from "~/interface/cart/CartState";
import { addItem, getCart, removeItem, updateItem } from "./cartAction";

const initialState : CartState= {
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
       });
       builder.addCase(getCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.items;
                state.totalItems = action.payload.items.length;
                state.totalPrice = action.payload.total;
       });
       builder.addCase(getCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message ||  "Something went wrong";
       });
       builder.addCase(addItem.pending, (state, action) => {
                state.isLoading = true;
       });
       builder.addCase(addItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.items;
                state.totalItems = action.payload.items.length;
                state.totalPrice = action.payload.total;
       });
       builder.addCase(addItem.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Something went wrong";
       });
       builder.addCase(updateItem.pending, (state, action) => {
                state.isLoading = true;
       });
       builder.addCase(updateItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.items;
                state.totalItems = action.payload.items.length;
                state.totalPrice = action.payload.total;
       });
       builder.addCase(updateItem.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Something went wrong";
       }
    );
       builder.addCase(removeItem.pending, (state, action) => {});
       builder.addCase(removeItem.fulfilled, (state, action) => {});
       builder.addCase(removeItem.rejected, (state, action) => {});
   }, 
   name: "cart"
})

const {reducer} = cartSlice
export default reducer