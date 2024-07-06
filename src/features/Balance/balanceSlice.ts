import { createSlice } from "@reduxjs/toolkit";
import { TransactionProps } from "~/interface/transaction";
import { topUp } from "./balanceAction";

interface BalanceState {
    userBalance: number;
    transactions: TransactionProps[],
    isLoading: boolean;
    errors: null
}
const initialState: BalanceState= {
    userBalance: 0,
    transactions: [],
    isLoading: false,
    errors: null
}

export const balanceSlice = createSlice({
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(topUp.pending, (action, state) => {
            
        })
        .addCase(topUp.fulfilled, (action, state) =>{})
        .addCase(topUp.rejected, (action, state) =>{})
    },
    name: "balance"
})

const {reducer} = balanceSlice;
export default reducer