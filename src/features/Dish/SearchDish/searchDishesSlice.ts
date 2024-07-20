import { createSlice } from "@reduxjs/toolkit";
import { searchDishes } from "./searchDishesAction";

interface SearchDishState {
    data: any,
    isLoading: boolean,
    error: string
}

const initialState: SearchDishState = {
    data: null,
    isLoading: false,
    error: ""
}

export const searchDishSlice = createSlice({
    initialState,
    reducers: {
        clearSearchData: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchDishes.pending, (state, action) => {
                state.isLoading = true
                state.data = []
            })
            .addCase(searchDishes.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
            }).addCase(searchDishes.rejected, (state, action:any) => {
                state.error = action.payload
            })
    }, //
    name: "searchDish"
})

export const { clearSearchData } = searchDishSlice.actions
const { reducer } = searchDishSlice
export default reducer