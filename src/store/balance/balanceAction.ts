import { createAsyncThunk } from "@reduxjs/toolkit";
import TopUpProps from "~/interface/balance/topUp";
import PaymentService from "~/services/payment/paymentService";
import BalanceService from "~/services/balance/balanceService";

export const getBalance = createAsyncThunk("balance/getBalance", async (userId: string, { rejectWithValue }) => {
    try {
        return await BalanceService.getBalanceByUserId(userId);
    } catch (error: any) {
        return rejectWithValue("Failed to get balance");
    }
});

export const topUp = createAsyncThunk("balance/topUp", async (payload: TopUpProps, { rejectWithValue }) => {
    try {
        return await PaymentService.topUp(payload);
    } catch (error: any) {
        return rejectWithValue("Top up failed");
    }
});
