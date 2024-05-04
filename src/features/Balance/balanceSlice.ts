import { createSlice } from "@reduxjs/toolkit";
import { Transaction } from "~/interface/transaction";

interface BalanceState {
    userBalance: number;
    transactions: Transaction[]
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