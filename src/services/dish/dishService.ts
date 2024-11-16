import axios from '~/lib/axios';
import { baseDishApi, getDishesByNameApi, getPopularDishApi } from '~/utils/api';

type SortField = 'itemSold' | 'created_at' | 'price';
type SortOrder = 'asc' | 'desc';

interface DishQueryParams {
  sort?: {
    field: SortField;
    order: SortOrder;
  };
  category?: string | string[];
  page?: number;
  limit?: number;
}

// Map frontend sort values to backend values
const SORT_FIELD_MAP: Record<string, string> = {
  'price-asc': 'price',
  'price-desc': '-price',
  'created_at-desc': '-created',
  'itemSold-desc': '-itemSold',
};

const mapSortParam = (field: SortField, order: SortOrder): string => {
  const sortKey = `${field}-${order}`;
  
  // Use the mapping or construct the sort parameter
  return SORT_FIELD_MAP[sortKey] || (order === 'desc' ? `-${field}` : field);
};



const getDishes = async (params: DishQueryParams): Promise<any> => {
   const queryParams = new URLSearchParams();

  // Handle sorting with mapping
  if (params.sort) {
    const sortValue = mapSortParam(params.sort.field, params.sort.order);
    queryParams.append('sort', sortValue);
  }

  // Handle categories
  if (params.category) {
    const categories = Array.isArray(params.category) ? params.category : [params.category];
    categories.forEach(category => {
      queryParams.append('category.name', category);
    });
  }

  // Handle pagination
  if (params.page) {
    queryParams.append('page', params.page.toString());
  }

  if (params.limit) {
    queryParams.append('limit', params.limit.toString());
  }

  try {
    const response = await axios.get(`${baseDishApi}?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    // if (axios.isAxiosError(error)) {
    //   throw new Error(`Failed to fetch dishes: ${error.response?.data?.message || error.message}`);
    // }
    // throw error;
  }
};

const getPopularDishes = (params?: Omit<DishQueryParams, 'sort'>): Promise<any> => {
  return getDishes({
    ...params,
    sort: {
      field: 'itemSold',
      order: 'desc'
    }
  });
};


const searchDishes = (keyword: string, limit: number = 10): Promise<any> => {
  return axios.get(`${getDishesByNameApi}?keyword=${keyword}&limit=${limit}`);
};

export const DishService = {
  getDishes,
  getPopularDishes,
  searchDishes,
};

export default DishService;
