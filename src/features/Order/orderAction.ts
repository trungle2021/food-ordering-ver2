import { createAsyncThunk } from "@reduxjs/toolkit";
import OrderService from "~/services/order/order-serivce";

export const getOrderHistory = createAsyncThunk("order/getOrderHistory", async ({filter = undefined, page,limit}: {filter?: string | undefined, page:number, limit:number}) => {
    return await OrderService.fetchOrderHistory(filter , page, limit);
})