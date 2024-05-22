import { createSlice } from "@reduxjs/toolkit";
import { searchDishes } from "./searchDishesAction";

interface searchDishState {
    data: any,
    loading: boolean,
    error: string | null
}

const initialState: searchDishState = {
    data: null,
    loading: false,
    error: null
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
                state.data = []
                state.loading = true
            })
            .addCase(searchDishes.fulfilled, (state, action) => {
                state.data = action.payload
                state.loading = false
            }).addCase(searchDishes.rejected, (state, action) => {
                state.loading = false;
            })
    }, //
    name: "searchDish"
})

export const { clearSearchData } = searchDishSlice.actions
const { reducer } = searchDishSlice
export default reducer