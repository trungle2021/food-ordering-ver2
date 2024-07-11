import { createAsyncThunk } from "@reduxjs/toolkit";
import OrderService from "~/services/order/orderSerivce";

export const getOrderHistory = createAsyncThunk("order/getOrderHistory", async ({ userId, filter = undefined, page, limit }: { userId: string, filter?: string | undefined, page: number, limit: number }) => {
    return await OrderService.fetchOrderHistory(userId, filter, page, limit);
})