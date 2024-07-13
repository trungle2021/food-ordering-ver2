import { createAsyncThunk } from "@reduxjs/toolkit";
import CartService from "~/services/cart/cartService";

export const getCart = createAsyncThunk("cart/getCart", async(userId: string) => {
    return await CartService.getCart(userId);
});     

export const addItem = createAsyncThunk("cart/addItem", async ({userId, dishId, quantity}: {userId: string, dishId: string, quantity: number}) => {
    return await CartService.addItem({userId, dishId, quantity});
});

export const updateItem = createAsyncThunk("cart/updateItem", async ({userId, dishId, updateQuantity}: {userId: string, dishId: string, updateQuantity: number}) => {
    return await CartService.updateItem({userId, dishId, updateQuantity});
});

export const removeItem = createAsyncThunk("cart/removeItem", async (dishId: string) => {
    return await CartService.removeItem(dishId);
});
