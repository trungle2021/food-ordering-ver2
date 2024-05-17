import axios from "~/lib/axios";
import { getDishesByNameApi, getPopularDishesApi } from "~/utils/api";

const fetchPopularDishes = (limit: number): Promise<any> => {
  return axios.get(`${getPopularDishesApi}?limit=${limit}`);
};

const fetchDishesByName = (keyword: string): Promise<any> => {
  return axios.get(`${getDishesByNameApi}?keyword=${keyword}`);
}

export const DishService = {
  fetchPopularDishes,
  fetchDishesByName
};

export default DishService;
