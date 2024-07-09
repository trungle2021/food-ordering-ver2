import { createAsyncThunk } from "@reduxjs/toolkit";
import TopUpProps from "~/interface/balance/topUp";
import PaymentService from "~/services/payment/payment-service";
import BalanceService from "~/services/balance/balance-service";

export const getBalance = createAsyncThunk("balance/getBalance", async () => {
    return await BalanceService.getBalance();
});

export const topUp = createAsyncThunk("balance/topUp", async(data : TopUpProps) => {
    return await PaymentService.topUp(data);
});     
