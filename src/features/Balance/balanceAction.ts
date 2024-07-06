import { createAsyncThunk } from "@reduxjs/toolkit";
import PaymentService from "~/services/payment/payment-service";

export const topUp = createAsyncThunk("balance/topUp", async(amount: number) => {
    return await PaymentService.topUp(amount);
});     
