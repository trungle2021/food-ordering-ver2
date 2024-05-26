import { createAsyncThunk } from "@reduxjs/toolkit";
import CartService from "~/services/cart/cart-service";

const getCart = createAsyncThunk("cart/getCart", async(userId: string) => {
    const response = await CartService.getCart({userId});
    return response.data;
});     

const addItem = createAsyncThunk("cart/addItem", async (item: any) => {
    const response = await CartService.addItem(item);
    return response.data;
});

const updateItem = createAsyncThunk("cart/updateItem", async ({userId, item, action}: {userId: string, item: any, action: string}) => {
    const response = await CartService.updateItem({userId, item, action});
    return response.data;
});

const removeItem = createAsyncThunk("cart/removeItem", async ({userId, dishId}: {userId: string, dishId: string}) => {
    const response = await CartService.removeItem({userId, dishId});
    return response.data;
});

const CartActionThunk = {
    getCart,
    addItem,
    updateItem,
    removeItem
}

export default CartActionThunk;