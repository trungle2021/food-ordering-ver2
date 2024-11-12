import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransactionProps } from "~/interface/transaction/transaction";
import { getBalance, topUp } from "./balanceAction";

interface BalanceState {
    amount: number;
    transactions: TransactionProps[],
    isLoading: boolean;
    error: string
}
const initialState: BalanceState = {
    amount: 0,
    transactions: [],
    isLoading: false,
    error: ''
}

export const balanceSlice = createSlice({
    initialState,
    reducers: {
        updateBalance: (state, action) => {
            state.amount = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getBalance.pending, (state, action) => {
            state.isLoading = true;
        })
            .addCase(getBalance.fulfilled, (state, action) => {
                state.isLoading = false;
                state.amount = action.payload?.data?.amount || 0;
            })
            .addCase(getBalance.rejected, (state, action: any) => {
                state.isLoading = false;
                state.error = action.payload || "Something went wrong";
            })
            .addCase(topUp.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(topUp.fulfilled, (state, action) => {
                state.isLoading = true;
                state.amount = action.payload?.data?.current_balance || 0;
            })
            .addCase(topUp.rejected, (state, action: any) => {
                state.isLoading = false;
                state.error = action.payload || "Something went wrong";
            })
    },
    name: "balance"
})

export const { updateBalance } = balanceSlice.actions;
const { reducer } = balanceSlice;
export default reducer