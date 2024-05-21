import { createAsyncThunk } from '@reduxjs/toolkit';
import DishService from '~/services/dish/dish-service';

interface SearchDishesPayload {
    keyword: string;
    limit?: number;
}

export const searchDishes = createAsyncThunk(
    "mainContent/searchDishes",
    async (payload: SearchDishesPayload, thunkAPI) => {
        try {
            const { keyword, limit } = payload
            const response = await DishService.searchDishes(keyword, limit);
            return response.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

