import { createAsyncThunk } from "@reduxjs/toolkit";
import TopUpProps from "~/interface/balance/topUp";
import PaymentService from "~/services/payment/paymentService";
import BalanceService from "~/services/balance/balanceService";

export const getBalance = createAsyncThunk("balance/getBalance", async (userId:string) => {
    return await BalanceService.getBalanceByUserId(userId);
});

export const topUp = createAsyncThunk("balance/topUp", async(payload : TopUpProps) => {
    return await PaymentService.topUp(payload);
});     
