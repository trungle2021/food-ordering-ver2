import { createAsyncThunk } from "@reduxjs/toolkit";
import OrderService from "~/services/order/order-serivce";

export const getOrderHistory = createAsyncThunk("order/getOrderHistory", async ({page,limit}: {page:number, limit:number}) => {
    return await OrderService.fetchOrderHistory(page, limit);
})