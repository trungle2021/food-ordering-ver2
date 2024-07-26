import { createAsyncThunk } from "@reduxjs/toolkit";
import CartService from "~/services/cart/cartService";

export const getCart = createAsyncThunk("cart/getCart", async (userId: string, { rejectWithValue }) => {
    try {
        return await CartService.getCart(userId);
    } catch (error) {
        return rejectWithValue("Failed to get cart information");
    }
});

export const addItem = createAsyncThunk("cart/addItem", async ({ dishId, quantity }: {  dishId: string; quantity: number }, { rejectWithValue }) => {
    try {
        return await CartService.addItem({ dishId, quantity });
    } catch (error) {
        return rejectWithValue("Failed to add item to cart");
    }
});

export const updateItem = createAsyncThunk("cart/updateItem", async ({ dishId, updateQuantity }: {dishId: string; updateQuantity: number }, { rejectWithValue }) => {
    try {
        return await CartService.updateItem({ dishId, updateQuantity });
    } catch (error) {
        return rejectWithValue("Failed to update item in cart");
    }
});

export const removeItem = createAsyncThunk("cart/removeItem", async (dishId: string, { rejectWithValue }) => {
    try {
        return await CartService.removeItem(dishId);
    } catch (error) {
        return rejectWithValue("Failed to remove item in cart");
    }
});
