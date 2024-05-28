import { createAsyncThunk } from "@reduxjs/toolkit";
import CartService from "~/services/cart/cart-service";

export const getCart = createAsyncThunk("cart/getCart", async() => {
    return await CartService.getCart();
});     

export const addItem = createAsyncThunk("cart/addItem", async (item: any) => {
    return await CartService.addItem(item);
});

export const updateItem = createAsyncThunk("cart/updateItem", async ({dishId, updateQuantity}: {dishId: string, updateQuantity: number}) => {
    return await CartService.updateItem({dishId, updateQuantity});
});

export const removeItem = createAsyncThunk("cart/removeItem", async ({dishId}: {dishId: string}) => {
    return await CartService.removeItem({dishId});
});
