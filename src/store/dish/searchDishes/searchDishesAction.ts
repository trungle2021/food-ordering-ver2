import { createAsyncThunk } from '@reduxjs/toolkit';
import { DishService } from '~/services/dish/dishService';

interface SearchDishesPayload {
    keyword: string;
    limit?: number;
}

export const searchDishes = createAsyncThunk(
    "mainContent/searchDishes",
    async (payload: SearchDishesPayload, thunkAPI) => {
        try {
            const { keyword, limit } = payload
            return  await DishService.searchDishes(keyword, limit);
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

