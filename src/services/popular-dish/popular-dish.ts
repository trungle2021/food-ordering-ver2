import axios from "../../lib/axios";
import { getPopularDishesApi } from "../../utils/api";

const fetchPopularDishList = (limit: number): Promise<any> => {
  return axios.get(`${getPopularDishesApi}?limit=${limit}`);
};

export const PopularDishService = {
  fetchPopularDishList,
};

export default PopularDishService;
