import { createSlice } from "@reduxjs/toolkit";

interface CartState {
    data: any,
    itemCount: number,
    loading: boolean
}

const initialState = {

}

const cartSlice = createSlice({
   initialState,
   reducers: {},
   extraReducers: (builder) => {
       
   }, 
   name: "cart"
})