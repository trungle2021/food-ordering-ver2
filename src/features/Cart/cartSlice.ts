import { createSlice } from "@reduxjs/toolkit";
import CartState from "~/interface/cart/CartState";
import CartActionThunk from '~/features/Cart/cartAction'

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
       builder.addCase(CartActionThunk.getCart.pending, (state, action) => {
              state.isLoading = true;
       });
       builder.addCase(CartActionThunk.getCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.items;
                state.totalItems = action.payload.totalItems;
                state.totalPrice = action.payload.totalPrice;
       });
       builder.addCase(CartActionThunk.getCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.toString();
       });
       builder.addCase(CartActionThunk.addItem.pending, (state, action) => {});
       builder.addCase(CartActionThunk.addItem.fulfilled, (state, action) => {});
       builder.addCase(CartActionThunk.addItem.rejected, (state, action) => {});
       builder.addCase(CartActionThunk.updateItem.pending, (state, action) => {});
       builder.addCase(CartActionThunk.updateItem.fulfilled, (state, action) => {});
       builder.addCase(CartActionThunk.updateItem.rejected, (state, action) => {});
       builder.addCase(CartActionThunk.removeItem.pending, (state, action) => {});
       builder.addCase(CartActionThunk.removeItem.fulfilled, (state, action) => {});
       builder.addCase(CartActionThunk.removeItem.rejected, (state, action) => {});
   }, 
   name: "cart"
})

const {reducer} = cartSlice
export default reducer