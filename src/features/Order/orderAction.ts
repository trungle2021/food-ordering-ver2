import { createAsyncThunk } from "@reduxjs/toolkit";
import OrderService from "~/services/order/order-serivce";

export const getOrderHistory = createAsyncThunk("order/orderHistory", async ({limit}: {limit:number}) => {
    return await OrderService.fetchOrderHistory(limit);
})