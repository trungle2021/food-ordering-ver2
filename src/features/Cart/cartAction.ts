import { createAsyncThunk } from "@reduxjs/toolkit";
import CartService from "~/services/cart/cartService";

export const getCart = createAsyncThunk("cart/getCart", async(userId: string) => {
    return await CartService.getCart(userId);
});     

export const addItem = createAsyncThunk("cart/addItem", async (item: any) => {
    return await CartService.addItem(item);
});

export const updateItem = createAsyncThunk("cart/updateItem", async ({itemId, updateQuantity}: {itemId: string, updateQuantity: number}) => {
    return await CartService.updateItem({itemId, updateQuantity});
});

export const removeItem = createAsyncThunk("cart/removeItem", async (itemId: string) => {
    return await CartService.removeItem(itemId);
});
