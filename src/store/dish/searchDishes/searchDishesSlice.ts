import { createSlice } from "@reduxjs/toolkit";
import { searchDishes } from "./searchDishesAction";

interface SearchDishesState {
    data: any,
    isLoading: boolean,
    message: string
}

const initialState: SearchDishesState = {
    data: null,
    isLoading: false,
    message: ""
}

export const searchDishesSlice = createSlice({
    initialState,
    reducers: {
        clearSearchData: (state) => {
            state.data = null;
            state.isLoading = false;
            state.message = ""
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
                state.data = action.payload.data.results
            }).addCase(searchDishes.rejected, (state, action: any) => {
                state.message = action.payload.message
            })
    },
    name: "searchDish"
})

export const { clearSearchData } = searchDishesSlice.actions
const { reducer } = searchDishesSlice
export default reducer