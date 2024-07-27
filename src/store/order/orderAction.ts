import { createAsyncThunk } from "@reduxjs/toolkit";
import OrderService from "~/services/order/orderSerivce";

export const getOrderHistory = createAsyncThunk("order/getOrderHistory", async ({ userId, filter = undefined, page, limit }: { userId: string, filter?: string | undefined, page: number, limit: number }, thunkApi) => {
    try {
        return await OrderService.getOrderHistory(userId, filter, page, limit);
    } catch (error) {
        return thunkApi.rejectWithValue("Failed to get order history")
    }
})

// export const getOrder = createAsyncThunk("order/getOrder", async (orderId: string, thunkApi) => {
//     try {
//         return await OrderService.getOrder(orderId);
//     } catch (error) {
//         return thunkApi.rejectWithValue("Get order information failed")
//     }
// })


export const checkOut = createAsyncThunk("order/checkOut", async (payload, thunkApi) => {
    try {
        return await OrderService.checkOut();
    } catch (error) {
        return thunkApi.rejectWithValue("Checkout failed")
    }
})