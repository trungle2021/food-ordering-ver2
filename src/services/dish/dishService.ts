import { DishQueryParams } from '~/interface/dish';
import axios from '~/lib/axios';
import { baseDishApi, getDishesByNameApi } from '~/utils/api';

const DEFAULT_SORT: string[] = [
  'created_at-desc'
];

   


const getDishes = async (queryString: string): Promise<any> => {
  try {
    const response = await axios.get(`${baseDishApi}${queryString}`);
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch dishes: ${error.response?.data?.message || error.message}`);
  }
};

const getPopularDishes = (queryString: string): Promise<any> => {
  const params = new URLSearchParams(queryString);
  params.append('sort', 'itemSold-desc');
  return getDishes(`?${params.toString()}`);
};


const searchDishes = (keyword: string, limit: number = 10): Promise<any> => {
  return axios.get(`${getDishesByNameApi}?keyword=${keyword}&limit=${limit}`);
};

export const DishService = {
  getDishes,
  getPopularDishes,
  searchDishes,
};