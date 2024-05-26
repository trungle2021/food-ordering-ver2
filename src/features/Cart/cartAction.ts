import { createAsyncThunk } from "@reduxjs/toolkit";
import CartService from "~/services/cart/cart-service";

export const getCart = createAsyncThunk("cart/getCart", async(userId: string) => {
    return await CartService.getCart({userId});
});     

export const addItem = createAsyncThunk("cart/addItem", async (item: any) => {
    const response = await CartService.addItem(item);
    return response.data;
});

export const updateItem = createAsyncThunk("cart/updateItem", async ({userId, item, action}: {userId: string, item: any, action: string}) => {
    const response = await CartService.updateItem({userId, item, action});
    return response.data;
});

export const removeItem = createAsyncThunk("cart/removeItem", async ({userId, dishId}: {userId: string, dishId: string}) => {
    const response = await CartService.removeItem({userId, dishId});
    return response.data;
});
