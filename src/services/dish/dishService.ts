import axios from "~/lib/axios";
import { baseDishApi, getDishesByNameApi, getPopularDishesApi } from "~/utils/api";

const getDishes = (limit: number): Promise<any> => {
    return axios.get(`${baseDishApi}?limit=${limit}`);
}

const getPopularDishes = (limit: number): Promise<any> => {
    return axios.get(`${getPopularDishesApi}?limit=${limit}`);
};

const searchDishes = (keyword: string, limit: number = 10): Promise<any> => {
    return axios.get(`${getDishesByNameApi}?keyword=${keyword}&limit=${limit}`);
}

export const DishService = {
    getDishes,
    getPopularDishes,
    searchDishes
};

export default DishService;
