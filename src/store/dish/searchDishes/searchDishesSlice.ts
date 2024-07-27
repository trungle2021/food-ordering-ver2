import { createSlice } from "@reduxjs/toolkit";
import { searchDishes } from "./searchDishesAction";

interface SearchDishesState {
    data: any,
    isLoading: boolean,
    error: string
}

const initialState: SearchDishesState = {
    data: null,
    isLoading: false,
    error: ""
}

export const searchDishesSlice = createSlice({
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

export const { clearSearchData } = searchDishesSlice.actions
const { reducer } = searchDishesSlice
export default reducer