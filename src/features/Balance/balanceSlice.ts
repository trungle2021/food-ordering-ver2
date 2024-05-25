import { createSlice } from "@reduxjs/toolkit";
import { TransactionProps } from "~/interface/transaction";

interface BalanceState {
    userBalance: number;
    transactions: TransactionProps[]
}
const initialState: BalanceState= {
    userBalance: 0,
    transactions: []
}

export const balanceSlice = createSlice({
    initialState,
    reducers:{},
    extraReducers: (builder) => {},
    name: "balance"
})

const {reducer} = balanceSlice;
export default reducer