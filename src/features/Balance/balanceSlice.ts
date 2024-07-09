import { createSlice } from "@reduxjs/toolkit";
import { TransactionProps } from "~/interface/transaction";
import { getBalance, topUp } from "./balanceAction";

interface BalanceState {
    amount: number;
    transactions: TransactionProps[],
    isLoading: boolean;
    errors: string
}
const initialState: BalanceState= {
    amount: 0,
    transactions: [],
    isLoading: false,
    errors: ''
}

export const balanceSlice = createSlice({
    initialState,
    reducers:{
        updateBalance: (state, action) => {
            console.log(action)
            state.amount = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getBalance.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getBalance.fulfilled, (state, action) => {
            state.isLoading = false;
            state.amount = action.payload.data.amount;
        });
        builder.addCase(getBalance.rejected, (state, action) => {
            console.log("getBalance rejected action", action)

            state.isLoading = false;
            state.errors = action.error.message || "Something went wrong";
        });


        builder.addCase(topUp.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(topUp.fulfilled, (state, action) =>{
            console.log("action", action)
            state.isLoading = true;
            state.amount = action.payload.data.current_balance;
        });
        builder.addCase(topUp.rejected, (state, action) =>{
            console.log("topup rejected action", action)
            state.isLoading = false;
            state.errors = action.error.message || "Something went wrong";
        });
    },
    name: "balance"
})

export const { updateBalance } = balanceSlice.actions;
const {reducer} = balanceSlice;
export default reducer