import axios from "~/lib/axios";
import { getDishesByNameApi, getPopularDishesApi } from "~/utils/api";

const fetchPopularDishes = (limit: number): Promise<any> => {
  return axios.get(`${getPopularDishesApi}?limit=${limit}`);
};

const searchDishes = (keyword: string, limit: number = 10): Promise<any> => {
  return axios.get(`${getDishesByNameApi}?keyword=${keyword}&limit=${limit}`);
}

export const DishService = {
  fetchPopularDishes,
  searchDishes
};

export default DishService;
